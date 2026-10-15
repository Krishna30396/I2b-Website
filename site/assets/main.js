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

  /* ---------- How we build: involvement chart + stage highlight ---------- */
  const journey = document.querySelector('.journey');
  if (journey) {
    const svg = journey.querySelector('svg'), tags = journey.querySelector('.j-tags');
    const NS = 'http://www.w3.org/2000/svg', W = 1000, H = 200;
    // share of the work at each stage (illustrative): I2B tapers off, the founder's team grows
    const i2b = [.92, .96, .86, .52, .2], you = [.12, .22, .42, .72, .96];
    const xs = i2b.map((_, k) => (k + .5) * W / 5), y = v => H - 8 - v * (H - 24);
    const smooth = vals => { // Catmull-Rom through the stage centres, flat to the edges
      const p = [[0, y(vals[0])], ...vals.map((v, k) => [xs[k], y(v)]), [W, y(vals[vals.length - 1])]];
      let d = `M${p[0][0]},${p[0][1]}`;
      for (let k = 0; k < p.length - 1; k++) {
        const a = p[k - 1] || p[k], b = p[k], c = p[k + 1], e = p[k + 2] || c;
        d += ` C${b[0] + (c[0] - a[0]) / 6},${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6},${c[1] - (e[1] - b[1]) / 6} ${c[0]},${c[1]}`;
      }
      return d;
    };
    const el = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
    const defs = el('defs', {});
    defs.innerHTML = '<linearGradient id="gI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ae3ff" stop-opacity=".35"/><stop offset="1" stop-color="#6ae3ff" stop-opacity="0"/></linearGradient><linearGradient id="gY" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fafafa" stop-opacity=".16"/><stop offset="1" stop-color="#fafafa" stop-opacity="0"/></linearGradient>';
    svg.append(defs);
    const bands = xs.map((x, k) => { const b = el('rect', { class: 'band', x: k * W / 5, y: 0, width: W / 5, height: H }); svg.append(b); return b; });
    [1, 2, 3, 4].forEach(k => svg.append(el('line', { x1: k * W / 5, x2: k * W / 5, y1: 0, y2: H, stroke: '#ffffff14', 'vector-effect': 'non-scaling-stroke' })));
    const dI = smooth(i2b), dY = smooth(you);
    svg.append(el('path', { d: `${dI} L${W},${H} L0,${H} Z`, fill: 'url(#gI)' }));
    svg.append(el('path', { d: `${dY} L${W},${H} L0,${H} Z`, fill: 'url(#gY)' }));
    svg.append(el('path', { d: dI, fill: 'none', stroke: '#6ae3ff', 'stroke-width': 2.5, 'vector-effect': 'non-scaling-stroke' }));
    svg.append(el('path', { d: dY, fill: 'none', stroke: '#fafafa', 'stroke-width': 2, 'stroke-dasharray': '6 5', 'vector-effect': 'non-scaling-stroke' }));
    // curve labels sit in HTML so the stretched SVG never distorts text
    const tag = (cls, txt, k, v) => { const t = document.createElement('span'); t.className = 'j-tag ' + cls; t.textContent = txt; t.style.left = (xs[k] / W * 100) + '%'; t.style.top = (y(v) / H * 100) + '%'; tags.append(t); };
    tag('i2b', 'I2B leads the build', 1, i2b[1]);
    tag('you end', 'You lead', 4, you[4]);
    // hover / focus highlights one stage column and its slice of the chart
    const stages = [...journey.querySelectorAll('.jstage')];
    const hl = k => { journey.classList.toggle('has-hl', k >= 0); stages.forEach((s, n) => s.classList.toggle('hl', n === k)); bands.forEach((b, n) => b.classList.toggle('on', n === k)); };
    stages.forEach((s, k) => { s.addEventListener('mouseenter', () => hl(k)); s.addEventListener('focus', () => hl(k)); s.addEventListener('blur', () => hl(-1)); });
    journey.querySelector('.jstages').addEventListener('mouseleave', () => hl(-1));
  }

  /* ---------- routed contact / application form ---------- */
  document.querySelectorAll('form[data-routed]').forEach(form => {
    const groups = [...form.querySelectorAll('.fields[data-for]')];
    const shared = form.querySelector('.fields[data-shared]');
    const submit = form.querySelector('[type=submit]');
    const note = form.querySelector('.next-note');
    const notes = { founder: 'Goes straight to the founding team. Expect a reply within 5 working days.', other: 'We route it to the right person and usually reply within 3 working days.' };
    const route = v => {
      groups.forEach(g => { const on = g.dataset.for === v; g.hidden = !on; g.querySelectorAll('input,textarea,select').forEach(f => f.disabled = !on); });
      if (shared) shared.hidden = !v;
      if (submit) { submit.hidden = !v; submit.querySelector('.lbl').textContent = form.dataset['label' + (v ? v[0].toUpperCase() + v.slice(1) : '')] || 'Send'; }
      if (note) note.textContent = notes[v] || '';
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
