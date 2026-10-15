// I2B redesign — shared behaviour. No dependencies.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.remove('no-js');

  /* ---------- nav: mobile menu + light/dark surface ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const btn = nav.querySelector('.menu-btn');
    btn?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    const lightSecs = [...document.querySelectorAll('[data-surface="light"]')];
    const setSurface = () => {
      const y = 44; // nav centre line
      const onLight = lightSecs.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });
      nav.classList.toggle('on-light', onLight);
    };
    addEventListener('scroll', setSurface, { passive: true });
    setSurface();
  }

  /* ---------- reveal-on-enter (plays once) ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.dataset.count) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, [data-anim], [data-count]').forEach(el => io.observe(el));

  function countUp(el) {
    const end = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduce) { el.innerHTML = end + suffix; return; }
    const t0 = performance.now(), dur = 800;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.innerHTML = v + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- hero: scattered nodes resolve into a connected structure ---------- */
  const cv = document.querySelector('.hero canvas');
  if (cv) {
    const ctx = cv.getContext('2d');
    let W, H, dpr, nodes = [], t0 = performance.now();
    const N = innerWidth < 700 ? 34 : 64;
    const rand = (a, b) => a + Math.random() * (b - a);
    function layout() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // target: a loose lattice on the right side (the "intelligent business")
      const cx = W * .5, cy = H * .5, R = W < 700 ? Math.min(W, H) * .62 : Math.min(W * .34, H * .5);
      nodes = Array.from({ length: N }, (_, i) => {
        const ring = i % 3, a = (i / N) * Math.PI * 2 * 3 + ring * .4;
        const r = R * (.62 + ring * .2);
        return { sx: rand(0, W), sy: rand(0, H), tx: cx + Math.cos(a) * r, ty: cy + Math.sin(a) * r * .8, ph: rand(0, 6.28), hub: i % 9 === 0 };
      });
    }
    const ease = p => 1 - Math.pow(1 - p, 4);
    function frame(now) {
      const p = reduce ? 1 : ease(Math.min(1, (now - t0 - 300) / 2200));
      const k = Math.max(0, p);
      ctx.clearRect(0, 0, W, H);
      const pts = nodes.map(n => {
        const drift = reduce ? 0 : Math.sin(now / 2400 + n.ph) * 3;
        return { x: n.sx + (n.tx - n.sx) * k + drift, y: n.sy + (n.ty - n.sy) * k + drift * .6, hub: n.hub };
      });
      const link = 140 * k + 20;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < link) {
          ctx.strokeStyle = `rgba(106,227,255,${(1 - d / link) * .32 * k})`;
          ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
      pts.forEach(q => {
        ctx.fillStyle = q.hub ? 'rgba(106,227,255,.95)' : 'rgba(250,250,250,.55)';
        ctx.beginPath(); ctx.arc(q.x, q.y, q.hub ? 2.6 : 1.5, 0, 6.283); ctx.fill();
        if (q.hub && k > .9) { ctx.fillStyle = 'rgba(106,227,255,.12)'; ctx.beginPath(); ctx.arc(q.x, q.y, 9, 0, 6.283); ctx.fill(); }
      });
      // after settling, keep a very slow idle drift; stop entirely when off-screen
      if (!reduce && heroVisible) requestAnimationFrame(frame);
    }
    let heroVisible = true;
    new IntersectionObserver(([e]) => { const was = heroVisible; heroVisible = e.isIntersecting; if (heroVisible && !was) requestAnimationFrame(frame); }).observe(cv);
    layout(); requestAnimationFrame(frame);
    addEventListener('resize', () => { layout(); if (reduce) requestAnimationFrame(frame); });
  }

  /* ---------- How we build: scroll-driven flow ---------- */
  const flow = document.querySelector('.flow');
  if (flow) {
    const NS = 'http://www.w3.org/2000/svg', U = 78, C = Math.cos(Math.PI / 6);
    const svg = flow.querySelector('.flow-cubes'), steps = [...flow.querySelectorAll('.flow-step')], N = steps.length;
    // isometric projection of grid point (x, y, z), z up
    const P = (x, y, z) => [(x - y) * C * U, ((x + y) / 2 - z) * U];
    const pts = a => a.map(p => P(...p).join(',')).join(' ');
    // a block placed whose screen centre is (X, Y) in grid units, at height z
    const at = (X, Y, z = 0) => { const d = X / C, s = 2 * (Y + z); return [(s + d) / 2 - .5, (s - d) / 2 - .5, z - .5]; };
    // eight blocks, s = how solid each one is (0 = ghost wireframe, 1 = solid block)
    const slots = [[-1, -1, 0], [0, -1, 0], [-1, 0, 0], [0, 0, 0], [-1, -1, -1], [0, -1, -1], [-1, 0, -1], [0, 0, -1]];
    const ring = k => { const t = (-90 + 60 * k) * Math.PI / 180; return at(Math.cos(t) * 2.3, Math.sin(t) * 1.55); };
    const burst = (p, f) => p.map(v => (v + .5) * f - .5);
    const F = [
      // 1 Problem: loose pieces everywhere, one worth building on
      [[at(-2.6, -1.6, .4), 0], [at(2.4, -2.2, 0), 0], [at(-3, 1.5, 0), 0], [at(0, 0, 0), 1], [at(1.2, 2.5, 0), 0], [at(3, .9, 0), 0], [at(-1.1, -3, 0), 0], [at(-.9, 2.9, 0), 0]],
      // 2 Validate: pieces line up in a ring, half of them proven
      [[ring(0), 1], [ring(1), 0], [ring(2), 1], [ring(3), 0], [ring(4), 1], [ring(5), 0], [at(-3.2, 2.6), 0], [at(3.2, -2.7), 0]],
      // 3 Build: a tower goes up
      [[[-.5, -.5, -1], 1], [[.5, -.5, -1], 1], [[-.5, .5, .2], 0], [[-1.9, -.4, -1.4], 0], [[-.5, -.5, -2], 1], [[-.5, -.5, 0], 1], [[-.5, -.5, 1], 1], [[.6, -.5, .6], 0]],
      // 4 Launch: almost a cube, one piece still on its way
      slots.map((p, i) => [i === 3 ? [0, 0, 1.9] : burst(p, 1.55), i === 3 ? 0 : 1]),
      // 5 Scale: one solid cube, every piece in place
      slots.map(p => [p, 1])
    ];
    const cubes = slots.map(() => {
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'cube');
      g.innerHTML = `<path class="back" d="M${P(0, 0, 0)} L${P(1, 0, 0)} M${P(0, 0, 0)} L${P(0, 1, 0)} M${P(0, 0, 0)} L${P(0, 0, 1)}"/>` +
        `<polygon class="face right" points="${pts([[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]])}"/>` +
        `<polygon class="face left" points="${pts([[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]])}"/>` +
        `<polygon class="face top" points="${pts([[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]])}"/>`;
      svg.append(g); return { g, faces: [...g.querySelectorAll('.face')], back: g.querySelector('.back') };
    });
    const out = flow.querySelector('.flow-out b');
    let cur = 0, order = '', shown = -1, outT;
    const ease = f => f * f * (3 - 2 * f), clamp = v => Math.min(1, Math.max(0, v));
    const render = () => { // cur runs 0..N; the segment after Scale breaks the cube back into pieces
      const k = Math.floor(cur) % N, nk = (k + 1) % N, f = cur - Math.floor(cur);
      const state = cubes.map((c, i) => {
        const e = ease(clamp((f - i * .035) / .755)); // pieces move one after another, not in lockstep
        const [pa, sa] = F[k][i], [pb, sb] = F[nk][i];
        const p = pa.map((v, n) => v + (pb[n] - v) * e), s = sa + (sb - sa) * e;
        const [x, y] = P(...p);
        c.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        c.faces.forEach(el => { el.style.fillOpacity = s; el.style.strokeOpacity = .3 + .7 * s; });
        c.back.style.strokeOpacity = .22 * (1 - s);
        return [p[0] + p[1] + p[2], i];
      });
      const o = state.sort((a, b) => a[0] - b[0]).map(d => d[1]); // paint back to front
      if (o.join() !== order) { order = o.join(); o.forEach(i => svg.append(cubes[i].g)); }
      const now = Math.round(cur) % N;
      steps.forEach((s, n) => { s.classList.toggle('now', n === now); s.classList.toggle('done', n < now); });
      if (now !== shown) { // swap the outcome caption under the blocks
        shown = now; const t = steps[now].dataset.out;
        out.classList.add('swap-out'); clearTimeout(outT);
        outT = setTimeout(() => { out.textContent = t; out.classList.remove('swap-out'); }, 250);
      }
    };
    if (reduce) { cur = N - 1; render(); }
    else {
      // loops on its own: rest on each step, then flow to the next; a longer rest on the finished cube
      const HOLD = 800, MOVE = 1300, hold = k => k === N - 1 ? 1600 : HOLD;
      let seg = 0, t = 0, last = 0, raf = 0;
      flow.classList.add('flow-live');
      const tick = now => {
        t += Math.min(64, now - (last || now)); last = now;
        if (t > hold(seg) + MOVE) { t -= hold(seg) + MOVE; seg = (seg + 1) % N; }
        cur = seg + ease(clamp((t - hold(seg)) / MOVE));
        render(); raf = requestAnimationFrame(tick);
      };
      render();
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !raf) { last = 0; raf = requestAnimationFrame(tick); }
        else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: .2 }).observe(flow);
    }
  }

  /* ---------- are we a fit: strike "not this", reveal "this", row by row ---------- */
  const fit = document.querySelector('[data-fit]');
  if (fit && !reduce) {
    const rows = [...fit.querySelectorAll('.sf-rows li')], replay = fit.querySelector('.sf-replay');
    let timers = [];
    const play = () => {
      timers.forEach(clearTimeout); rows.forEach(r => r.classList.remove('on'));
      void fit.offsetWidth; // restart the transitions
      timers = rows.map((r, i) => setTimeout(() => r.classList.add('on'), 250 + i * 450));
    };
    fit.classList.add('sf-live'); replay.hidden = false;
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { play(); o.disconnect(); } }, { threshold: .3 }).observe(fit);
    replay.addEventListener('click', play);
  }

  /* ---------- routed contact / application form ---------- */
  document.querySelectorAll('form[data-routed]').forEach(form => {
    const groups = [...form.querySelectorAll('.fields[data-for]')];
    const shared = form.querySelector('.fields[data-shared]');
    const submit = form.querySelector('[type=submit]');
    const note = form.querySelector('[data-note]') || form.querySelector('.next-note');
    const notes = { founder: 'Goes straight to the founding team. Expect a reply within 5 working days.', other: 'We route it to the right person and usually reply within 3 working days.' };
    const route = v => {
      groups.forEach(g => { const on = g.dataset.for === v; g.hidden = !on; g.querySelectorAll('input,textarea,select').forEach(f => f.disabled = !on); });
      if (shared) shared.hidden = !v;
      if (submit) { submit.hidden = !v; submit.querySelector('.lbl').textContent = form.dataset['label' + (v ? v[0].toUpperCase() + v.slice(1) : '')] || 'Send'; }
      if (note && note.hasAttribute('data-swap')) note.querySelectorAll('[data-n]').forEach(n => n.hidden = n.dataset.n !== v);
      else if (note) note.textContent = notes[v] || '';
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
      let ok = true, first;
      form.querySelectorAll('[required]:not(:disabled)').forEach(f => {
        const wrap = f.closest('.field'), err = wrap?.querySelector('.err');
        const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value)) || (f.type === 'url' && f.value && !/^https?:\/\//.test(f.value));
        wrap?.classList.toggle('bad', bad);
        if (err) err.textContent = bad ? (f.dataset.err || 'Please fill this in.') : '';
        f.setAttribute('aria-invalid', bad);
        if (bad && !first) first = f;
        ok = ok && !bad;
      });
      if (!ok) { first.focus(); return; }
      const intent = form.querySelector('input[name=intent]:checked')?.value;
      const done = form.parentElement.querySelector('.success');
      form.hidden = true;
      if (done) { done.hidden = false; done.querySelector('[data-next]')?.replaceChildren(document.createTextNode(notes[intent] || '')); done.focus(); }
    });
  });

  /* ---------- What we build: play each motion card once in view, hold the end frame ---------- */
  document.querySelectorAll('.pillar-video').forEach(v => {
    if (reduce) return; // reduced motion: the poster is the finished end frame; never play
    v.removeAttribute('poster'); // motion users start from the clean first frame
    const play = () => { try { v.currentTime = 0; const p = v.play(); if (p) p.catch(() => {}); } catch {} };
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { play(); o.disconnect(); } }), { threshold: 0.5 }).observe(v);
    const box = v.closest('.pillar-viz');
    box.addEventListener('mouseenter', () => { if (v.ended) play(); });
    box.addEventListener('click', () => { if (v.ended || v.paused) play(); });
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
