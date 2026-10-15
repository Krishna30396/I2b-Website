// I2B redesign · v1.2 behaviour. No dependencies; every animation is gated on reduced motion.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wait = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- nav: mobile menu ---------- */
  const nav = document.querySelector('.nav');
  const menuBtn = nav?.querySelector('.menu-btn');
  menuBtn?.addEventListener('click', () => menuBtn.setAttribute('aria-expanded', nav.classList.toggle('open')));

  /* ---------- reveal-on-enter (plays once; content is visible without JS) ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach(el => reduce ? el.classList.add('in') : io.observe(el));

  /* ---------- hero: the real portfolio arrives, then the open slot draws in ---------- */
  const folio = document.querySelector('.portfolio');
  if (folio) {
    if (reduce) folio.classList.remove('anim');
    else requestAnimationFrame(() => setTimeout(() => {
      folio.classList.add('play');
      setTimeout(() => folio.classList.add('done'), 2000);
    }, 350));
  }

  /* ---------- What we build: three motion loops ----------
     Trigger: loop ≥50% in view AND 300 ms after its headline has appeared.
     Sequencing: never two at once; 600 ms gap after the previous loop ends.
     Duration ~1.8–2.2 s, then hold the end frame. Replay on hover/focus (desktop) or tap. */
  const LOOP_MS = 2200;
  let queueEnd = 0;
  const prepare = loop => {
    if (loop.classList.contains('l1')) {
      loop.querySelectorAll('.art').forEach(a => {
        const row = loop.querySelector('.' + a.dataset.to);
        const ax = a.offsetLeft + a.offsetWidth / 2, ay = a.offsetTop + a.offsetHeight / 2;
        const rx = row.offsetLeft + row.offsetWidth / 2, ry = row.offsetTop + row.offsetHeight / 2;
        a.style.setProperty('--dx', (rx - ax) + 'px');
        a.style.setProperty('--dy', (ry - ay) + 'px');
      });
    }
    if (loop.classList.contains('l2')) {
      const list = loop.querySelector('.list'), mid = list.offsetHeight / 2;
      loop.querySelectorAll('.item').forEach((it, i) => {
        it.style.setProperty('--i', i);
        it.style.setProperty('--sq', (mid - (it.offsetTop + it.offsetHeight / 2)) + 'px');
      });
    }
  };
  const play = loop => {
    loop.classList.remove('play', 'done');
    prepare(loop);
    void loop.offsetWidth;
    loop.classList.add('play');
    clearTimeout(loop._t);
    loop._t = setTimeout(() => loop.classList.add('done'), LOOP_MS);
  };
  const loops = [...document.querySelectorAll('.loop')];
  loops.forEach(loop => {
    if (reduce) { prepare(loop); loop.classList.add('rm', 'play', 'done'); return; }
    const head = loop.closest('.brow')?.querySelector('.btext');
    const lo = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      lo.disconnect();
      // wait for the headline to be in, then +300 ms, then for the queue
      for (let n = 0; n < 40 && head && !head.classList.contains('in'); n++) await wait(50);
      const now = performance.now();
      const start = Math.max(now + 300, queueEnd + 600);
      queueEnd = start + LOOP_MS;
      await wait(start - now);
      play(loop);
    }, { threshold: 0.5 });
    lo.observe(loop);
    const replay = () => { if (loop.classList.contains('done')) play(loop); };
    if (finePointer) loop.addEventListener('mouseenter', replay);
    loop.addEventListener('focus', replay);
    loop.addEventListener('click', replay);
    loop.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); replay(); } });
  });
  addEventListener('resize', () => loops.forEach(l => { if (l.classList.contains('play')) prepare(l); }));

  /* ---------- How we build: "the thing you leave with" ---------- */
  const STAGES = [
    { word: 'Problem',  line: 'You leave with <b>a sharp problem</b>, and the people who feel it.', you: 10 },
    { word: 'Validate', line: 'You leave with <b>a tested prototype</b>.', you: 28 },
    { word: 'Build',    line: 'You leave with <b>a v1 you own</b>.', you: 50 },
    { word: 'Launch',   line: 'You leave with <b>paying customers</b>.', you: 76 },
    { word: 'Scale',    line: 'You leave with <b>your own team</b>, ready to lead.', you: 100 }
  ];
  const how = document.querySelector('.how');
  if (how) {
    const track = how.querySelector('.how-track'), obj = how.querySelector('.obj');
    const counter = how.querySelector('.counter'), words = how.querySelector('.stage-word'), lines = how.querySelector('.stage-line');
    const bar = how.querySelector('.own-bar i');
    STAGES.forEach((s, i) => {
      counter.insertAdjacentHTML('beforeend', `<li><button type="button" aria-label="Stage ${i + 1}: ${s.word}">${i + 1}</button></li>`);
      words.insertAdjacentHTML('beforeend', `<span>${s.word}</span>`);
      lines.insertAdjacentHTML('beforeend', `<span>${s.line}</span>`);
    });
    const btns = [...counter.querySelectorAll('button')], wSpans = [...words.children], lSpans = [...lines.children];
    let cur = 0;
    const set = n => {
      if (n === cur) return; cur = n;
      obj.dataset.stage = n;
      wSpans.forEach((w, i) => w.classList.toggle('on', i === n - 1));
      lSpans.forEach((l, i) => l.classList.toggle('on', i === n - 1));
      btns.forEach((b, i) => { b.toggleAttribute('aria-current', i === n - 1); if (i === n - 1) b.setAttribute('aria-current', 'step'); b.classList.toggle('past', i < n - 1); });
      bar.style.setProperty('--you', STAGES[n - 1].you + '%');
    };
    const pinned = () => track.offsetParent !== null;
    const geo = () => { const r = track.getBoundingClientRect(); return { top: scrollY + r.top, span: r.height - innerHeight, r }; };
    const stageTop = i => { const g = geo(); return g.top + g.span * (i + 0.5) / STAGES.length; };
    // synchronous on purpose: one rect read per scroll event, and no frame-dependency
    const onScroll = () => {
      if (!pinned()) return;
      const { r, span } = geo();
      const p = Math.min(0.999, Math.max(0, -r.top / span));
      set(Math.floor(p * STAGES.length) + 1);
    };
    addEventListener('scroll', onScroll, { passive: true });
    // gentle snap to the current stage once scrolling settles inside the pinned range
    if ('onscrollend' in window) addEventListener('scrollend', () => {
      if (!pinned()) return;
      const { r } = geo();
      if (r.top > 0 || r.bottom < innerHeight) return;
      const target = stageTop(cur - 1);
      if (Math.abs(target - scrollY) > 24) scrollTo({ top: target, behavior: 'smooth' });
    });
    btns.forEach((b, i) => b.addEventListener('click', () => scrollTo({ top: stageTop(i), behavior: 'smooth' })));
    set(1); onScroll();

    // stacked frames for mobile and reduced motion: same object, five states, one line each
    const stack = how.querySelector('.how-stack');
    STAGES.forEach((s, i) => {
      const f = document.createElement('div');
      f.className = 'frame';
      f.innerHTML = `<div><span class="num">STAGE ${i + 1} / 5</span><h3>${s.word}</h3><p>${s.line}</p><div class="own"><div class="own-bar"><i style="--you:${s.you}%"></i></div><div class="own-labels"><span class="i2b">I2B leads</span><span>You lead</span></div></div></div>`;
      const o = obj.cloneNode(true);
      o.dataset.stage = i + 1;
      f.append(o);
      stack.append(f);
    });
  }

  /* ---------- routed contact / application form (two doors) ---------- */
  document.querySelectorAll('form[data-routed]').forEach(form => {
    const groups = [...form.querySelectorAll('.fields[data-for]')];
    const shared = form.querySelector('.fields[data-shared]');
    const actions = form.querySelector('.form-actions');
    const submit = form.querySelector('[type=submit]');
    const note = form.querySelector('[data-note]');
    const step = form.querySelector('.stepper .st'), pips = form.querySelectorAll('.stepper .pips i');
    const notes = { founder: 'Goes straight to the founding team.', other: 'We route it to the right person.' };
    const route = v => {
      groups.forEach(g => { const on = g.dataset.for === v; g.hidden = !on; g.querySelectorAll('input,textarea,select').forEach(f => f.disabled = !on); });
      if (shared) shared.hidden = !v;
      if (actions) actions.hidden = !v;
      if (submit && v) submit.querySelector('.lbl').textContent = form.dataset['label' + v[0].toUpperCase() + v.slice(1)] || 'Send';
      if (note) note.textContent = notes[v] || '';
      if (step) { step.textContent = v ? 'Step 2 of 2' : 'Step 1 of 2'; pips[1]?.classList.toggle('on', !!v); }
    };
    form.querySelectorAll('input[name=intent]').forEach(r => r.addEventListener('change', () => route(r.value)));
    const qs = new URLSearchParams(location.search), legacy = { client: 'business', careers: 'careers' };
    let pre = qs.get('intent') || form.dataset.default;
    if (legacy[pre]) { qs.set('topic', legacy[pre]); pre = 'other'; }
    const topicSel = form.querySelector('select[name=topic]');
    if (topicSel && qs.get('topic')) topicSel.value = qs.get('topic');
    const preEl = pre && form.querySelector(`input[name=intent][value=${pre}]`);
    if (preEl) { preEl.checked = true; route(pre); } else route('');

    form.addEventListener('submit', e => {
      e.preventDefault();
      let first = null;
      form.querySelectorAll('[required]:not(:disabled)').forEach(f => {
        const wrap = f.closest('.field'), err = wrap?.querySelector('.err');
        const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value)) || (f.type === 'url' && !/^https?:\/\//.test(f.value));
        wrap?.classList.toggle('bad', bad);
        if (err) err.textContent = bad ? (f.dataset.err || 'Please fill this in.') : '';
        f.setAttribute('aria-invalid', bad);
        if (bad && !first) first = f;
      });
      if (first) { first.focus(); return; }
      const intent = form.querySelector('input[name=intent]:checked')?.value;
      const done = form.parentElement.querySelector('.success');
      form.hidden = true;
      if (done) { done.hidden = false; done.querySelector('[data-next]')?.replaceChildren(document.createTextNode((notes[intent] || '') + ' We reply within 3 working days.')); done.focus(); }
    });
  });

  /* ---------- careers filter ---------- */
  const filter = document.querySelector('.filter');
  if (filter) {
    const roles = [...document.querySelectorAll('.role')];
    filter.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      filter.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      roles.forEach(r => r.hidden = b.dataset.f !== 'all' && r.dataset.team !== b.dataset.f);
    });
  }
})();
