/* =====================================================================
   I2B redesign — UX case study content.
   The deck (index.html) renders entirely from this file.

   HOW TO UPDATE WHEN THE WEBSITE CHANGES
   1. Add an entry to ITERATIONS (newest first): version, date, what changed,
      which principles drove it, and any metric you re-measured.
   2. If a change replaces an existing fix, edit that slide's beats; tag
      new or updated slides with `since: '<version>'` so the deck shows a
      "Updated in vX" badge.
   3. Re-capture screenshots into ./shots (same file names) and update the
      numbers in IMPACT.measured.
   4. New principle? Add it to PRINCIPLES once and reference it by key.
   The principle index and iteration log slides build themselves.
   ===================================================================== */

window.CASE = {
  meta: {
    title: 'Making I2B explain itself in 10 seconds',
    subtitle: 'A UX case study on redesigning a venture studio website: clarity, proof and one path per audience.',
    client: 'I2B Technologies',
    role: 'UX research, UX/UI design, interaction & motion design, front-end prototype',
    version: 'v1.1',
    date: '15 Oct 2026',
    siteUrl: '../site/index.html',
    liveUrl: 'https://i2b.in/'
  },

  /* ---------------- principle library ---------------- */
  PRINCIPLES: {
    fiveSecond:  { name: '5-second test', emoji: '⏱️', def: 'If a first-time visitor can’t say what you do and who it’s for after ~5 seconds, the page has a clarity problem, not a looks problem.', src: 'Usability practice (UsabilityHub / Lyssna)' },
    cogLoad:     { name: 'Cognitive load', emoji: '🧠', def: 'Every extra word, option and moving thing takes working memory away from the one thing the visitor came to do.', src: 'Sweller, Cognitive Load Theory' },
    banner:      { name: 'Banner blindness', emoji: '🙈', def: 'People skip anything that looks like an ad: moving bands, carousels and decorative strips get ignored.', src: 'Nielsen Norman Group' },
    credibility: { name: 'Web credibility', emoji: '🛡️', def: 'Showing the real people and real work behind a site builds trust; stock imagery and small errors quietly erode it.', src: 'Stanford Web Credibility Guidelines' },
    authority:   { name: 'Authority bias', emoji: '🎖️', def: 'We give more weight to claims backed by a credible expert, here a founder who has already scaled a company.', src: 'Cialdini, Influence' },
    serial:      { name: 'Serial position effect', emoji: '🥇', def: 'People best remember what comes first and last, so the strongest proof shouldn’t sit in the middle.', src: 'Ebbinghaus; Murdock' },
    fpattern:    { name: 'F-pattern & layer-cake scanning', emoji: '👀', def: 'Most visitors scan headings, not paragraphs. If the headings alone tell the story, the page works.', src: 'Nielsen Norman Group eye-tracking' },
    scent:       { name: 'Information scent', emoji: '🐾', def: 'Links and labels should promise exactly what’s behind them, so people can tell where a path leads before they click.', src: 'Pirolli & Card, Information Foraging' },
    hick:        { name: "Hick's law", emoji: '🔀', def: 'Decision time grows with the number and complexity of choices, so show fewer options per step.', src: 'Hick (1952); Hyman (1953)' },
    progressive: { name: 'Progressive disclosure', emoji: '🪜', def: 'Show only what this step needs; reveal the rest when the visitor has chosen a path.', src: 'Nielsen Norman Group' },
    jakob:       { name: "Jakob's law", emoji: '🧭', def: 'Users spend most of their time on other sites, so navigation and forms should work the way they expect.', src: 'Jakob Nielsen' },
    vonRestorff: { name: 'Von Restorff effect', emoji: '🔦', def: 'The item that differs is the one remembered. One accent colour, used only for the main action, guides the eye.', src: 'Von Restorff (1933)' },
    mentalModel: { name: 'Mental models', emoji: '🗺️', def: 'People understand a service faster when it’s shown as steps they can picture, rather than abstract claims.', src: 'Norman, The Design of Everyday Things' },
    motion:      { name: 'Motion as explanation', emoji: '🎞️', def: 'Animation earns its place when it shows a change, a sequence or a relationship, plus quick feedback (~200–500 ms).', src: 'NN/g microinteractions; UX Collective' },
    selfSelect:  { name: 'Self-qualification', emoji: '✅', def: 'Clear yes/no criteria let the right people opt in and the wrong ones opt out, improving lead quality, not just volume.', src: 'Conversion design practice' },
    uncertainty: { name: 'Uncertainty reduction', emoji: '📬', def: 'Telling people what happens next and when lowers the anxiety of submitting.', src: 'Berger & Calabrese; form UX research' },
    a11yMotion:  { name: 'Reduced-motion support', emoji: '♿', def: 'Non-essential motion must be possible to turn off; it can make people with vestibular disorders unwell.', src: 'WCAG 2.2 SC 2.3.3' },
    interaction: { name: 'Interaction cost', emoji: '🖱️', def: 'The sum of effort (scrolling, reading, clicking) needed to reach a goal. Less effort means more people finish.', src: 'Nielsen Norman Group' },
    peakEnd:     { name: 'Peak-end rule', emoji: '🏁', def: 'People judge an experience largely by its most intense moment and its end, so the last screen should feel deliberate.', src: 'Kahneman & Fredrickson' },
    aesthetic:   { name: 'Aesthetic-usability effect', emoji: '✨', def: 'Interfaces that look considered are perceived as easier to use and more trustworthy.', src: 'Kurosu & Kashimura (1995)' }
  },

  /* ---------------- iteration log (newest first) ---------------- */
  ITERATIONS: [
    {
      v: 'v1.1', date: '15 Oct 2026', title: 'Clarity & effort pass',
      changes: [
        { area: 'Hero', what: 'Centred layout; headline refined to "Where ideas become enduring AI companies." The support line now carries the plain facts.', p: ['fiveSecond', 'aesthetic', 'vonRestorff'] },
        { area: 'How we build', what: 'Pinned 5-stage scroll (~4 screens) replaced by a one-screen chart: I2B’s role tapers as the founder’s team grows, with five stage columns below.', p: ['interaction', 'mentalModel', 'cogLoad'] },
        { area: 'Contact', what: 'Four intents cut to two: “I’m a founder” or “Something else”, with a topic picker for the rest.', p: ['hick', 'progressive'] },
        { area: 'Footer', what: 'Taller cyan closing section with one statement and one CTA.', p: ['peakEnd', 'vonRestorff'] }
      ]
    },
    {
      v: 'v1.0', date: '15 Oct 2026', title: 'First redesign',
      changes: [
        { area: 'Hero',        what: 'Generic slogan replaced with a concrete promise, two audience CTAs and a founder proof line.', p: ['fiveSecond', 'authority', 'vonRestorff'] },
        { area: 'Proof strip', what: '16-term marquee replaced with four static proof points.', p: ['banner', 'cogLoad'] },
        { area: 'How we build',what: 'Abstract bullets replaced with a pinned, scroll-linked 5-stage process.', p: ['mentalModel', 'motion', 'progressive'] },
        { area: 'Ventures',    what: 'Bento grid with status chips; SenseAhead gets a case page.', p: ['scent', 'credibility'] },
        { area: 'Fit',         what: '"Who we partner with" stock cards replaced with a yes/no fit checklist.', p: ['selfSelect'] },
        { area: 'Contact',     what: 'Two CTA blocks merged; one form routed by intent with "what happens next".', p: ['hick', 'progressive', 'uncertainty'] },
        { area: 'IA',          what: '2 pages → 5: Studio, Build with us, Careers, venture case page.', p: ['jakob', 'scent'] },
        { area: 'Accessibility', what: 'Reduced-motion fallbacks, keyboard focus states, labelled fields.', p: ['a11yMotion'] }
      ]
    }
  ],

  /* ---------------- measured impact ---------------- */
  IMPACT: {
    note: 'Measured from the live DOM of both pages at 1440×900 (v1.1, 15 Oct 2026). These are design deltas; behavioural outcomes are hypotheses until tracked.',
    measured: [
      { k: 'Founder proof position', before: '2,295 px', after: '680 px', delta: '−70% · in the first screen', good: true },
      { k: 'First venture mention', before: '4,653 px', after: '1,921 px', delta: '−59%', good: true },
      { k: 'Scroll to see the whole process', before: 'Never shown', after: '1 screen', delta: 'v1.0 needed ~4 screens', good: true },
      { k: 'Stock photos', before: '7', after: '0', delta: 'Real people & product only', good: true },
      { k: 'Moving text in reading area', before: '16-term marquee', after: 'None', delta: 'Static proof strip', good: true },
      { k: 'Competing closing CTAs', before: '2 blocks', after: '1', delta: 'One ask', good: true },
      { k: 'Form fields before choosing intent', before: '5', after: '0 → 3–4', delta: 'Intent first, then only what it needs', good: true },
      { k: 'Choices before the form', before: '1 dropdown of 4', after: '2 doors', delta: 'Founder · Something else', good: true },
      { k: 'Pages', before: '2', after: '5', delta: '+ Studio, Build with us, venture case', good: true },
      { k: 'Footer links', before: '8 (no ventures)', after: '12 (3 ventures)', delta: '+50%', good: true },
      { k: 'Home page height', before: '6,630 px', after: '8,636 px', delta: '+30%, down from +72% in v1.0', good: false }
    ],
    hypotheses: [
      { metric: 'Founder applications / month', why: 'Clear promise and a dedicated application path', how: 'Form submits tagged "founder"' },
      { metric: 'Qualified share of applications', why: 'Fit checklist filters before people apply', how: 'I2B review of submissions' },
      { metric: '5-second test: "What does I2B do?"', why: 'Hero states who, what and stage', how: '5–10 people, before vs after' },
      { metric: 'Scroll completion of "How we build"', why: 'Process is shown, not described', how: 'Scroll-depth events' },
      { metric: 'Clicks to venture pages', why: 'Proof is above the fold and has depth', how: 'Analytics events' }
    ]
  },

  /* ---------------- slides ---------------- */
  SLIDES: [
    { type: 'title' },

    { type: 'story', title: 'Meet I2B',
      beats: [
        { say: 'I2B is a Hyderabad venture studio and AI lab, founded by the person who built A23.' },
        { say: 'It co-builds AI companies with founders, runs three ventures, and is hiring six engineers.' },
        { say: 'Great raw material. So why did the website feel… forgettable?' }
      ],
      img: { src: 'shots/before-hero.jpg', alt: 'Current i2b.in hero', caption: 'i2b.in today' } },

    { type: 'quiz', title: 'Try it: the 10-second test',
      q: 'Look at the hero for 10 seconds. What does I2B do, who is it for, and what should you do next?',
      img: { src: 'shots/before-hero.jpg', alt: 'Current hero' },
      reveal: 'Most people can only answer “something with AI and businesses”. The headline “Building the Future of Intelligent Businesses” could belong to any studio, agency or SaaS company.',
      p: ['fiveSecond', 'cogLoad'] },

    { type: 'method', title: 'How we approached it',
      intro: 'A Double Diamond process: diverge to understand, converge to define, diverge to explore, converge to ship.',
      phases: [
        { n: 'Discover', items: ['Heuristic audit of every section', 'Content inventory & live-site teardown', 'Reference scan: venture studios and AI product sites'], status: 'done' },
        { n: 'Define', items: ['Audience map: founders, engineers, clients, co-investors', 'Jobs-to-be-done per audience', '"How might we" problem statements'], status: 'done' },
        { n: 'Develop', items: ['Information architecture: 2 → 5 pages', 'Content-first wireframes & story order', 'Motion spec: only where it explains'], status: 'done' },
        { n: 'Deliver', items: ['Hi-fi responsive build in I2B’s own palette', 'WCAG 2.2 AA & reduced-motion checks', 'Measurement plan & 5-second tests'], status: 'partial' }
      ],
      foot: 'Planned next: 5-second tests and three short interviews (founder, engineer, I2B network) to validate with real users.' },

    { type: 'audit', title: 'Can you spot the problems?',
      intro: 'Scroll the current home page. We found six issues; tap through to reveal them.',
      img: { src: 'shots/before-full.jpg', alt: 'Full current home page' },
      pins: [
        { y: 13.2, x: 50, t: 'A 16-term marquee', d: 'Moving buzzwords read like an ad and get skipped.', p: ['banner'] },
        { y: 21,   x: 50, t: 'Stock imagery', d: 'Robot hands and lightbulbs show nothing real about I2B.', p: ['credibility'] },
        { y: 35.5, x: 14, t: 'Strongest proof mid-page', d: 'The founder’s A23 record sits ~2,300 px down.', p: ['serial', 'authority'] },
        { y: 48,   x: 50, t: 'A reused photo', d: 'One partner card reuses the SaaS image, a small credibility leak.', p: ['credibility'] },
        { y: 70,   x: 50, t: 'Ventures without depth', d: 'Three short cards: no problem, outcome or I2B’s role.', p: ['scent'] },
        { y: 82,   x: 50, t: 'Two CTAs, one form for everyone', d: 'Back-to-back asks, then one form for founders, clients and candidates.', p: ['hick'] }
      ] },

    { type: 'define', title: 'Who is this site actually for?',
      intro: 'One page was serving four audiences with four different jobs.',
      rows: [
        { who: 'Early-stage founders', job: 'Is I2B for my stage? What do I get, and what does it cost me?', action: 'Apply to build with us' },
        { who: 'Engineers & designers', job: 'What will I build, with whom, and how is it run?', action: 'Apply to a role' },
        { who: 'Businesses', job: 'Can they build my B2B platform in my domain?', action: 'Request a call' },
        { who: 'Co-investors & partners', job: 'Track record, thesis, portfolio.', action: 'Contact the founder' }
      ],
      hmw: 'How might we help each visitor understand I2B in 10 seconds and see one obvious next step?' },

    { type: 'fix', n: 1, since: 'v1.1', title: 'Say one clear thing, quietly',
      compare: { before: 'shots/before-hero.jpg', after: 'shots/after-hero.jpg' },
      beats: [
        { say: 'A centred, quieter headline: “Where ideas become enduring AI companies.” It names the outcome without shouting it.' },
        { say: 'The support line does the plain work: pre-seed founders, capital, product and engineering, idea to production.' },
        { say: 'The founder proof line sits in the hero: it was 2,295 px down, now it’s at 680 px.' },
        { say: 'Cyan is used only for the primary action, so the eye goes straight to “Build with us”.' }
      ],
      p: ['fiveSecond', 'authority', 'serial', 'aesthetic'] },

    { type: 'phones', title: 'And on a phone',
      intro: 'Most of I2B’s audience browses on mid-range Android phones. Same first screen, before and after.',
      before: 'shots/before-mobile.jpg', after: 'shots/after-mobile.jpg',
      notes: ['Who it’s for and what you get, in the first screen', 'Founder proof visible without scrolling', 'Two thumb-sized CTAs (48 px tall)'],
      p: ['fiveSecond', 'jakob'] },

    { type: 'fix', n: 2, title: 'Swap noise for proof',
      img: { src: 'shots/after-proof.jpg', alt: 'Proof strip below the hero' },
      beats: [
        { say: 'The marquee cycled 16 buzzwords: AI-first, Fintech, Deep Tech, Procurement…' },
        { say: 'We replaced it with four static, verifiable facts: 20+ years, 3 ventures, pre-seed, 6 open roles.' },
        { say: 'Numbers count up once on entry to draw the eye, then stay still.' }
      ],
      p: ['banner', 'cogLoad', 'credibility'] },

    { type: 'fix', n: 3, since: 'v1.1', title: 'Show the whole process in one look',
      img: { src: 'shots/after-process.jpg', alt: 'How we build: involvement chart and five stages' },
      beats: [
        { say: '“Co-building from zero to production” was three abstract bullets.' },
        { say: 'v1.0 turned it into five pinned stages, but you had to scroll about four screens to see them all.' },
        { say: 'v1.1 shows everything in one screen: a chart of I2B’s role tapering while your team’s ownership grows, with five stage columns below.' },
        { say: 'Each column answers the same two questions: what I2B brings, and what you leave with. Hover a stage to focus it.' }
      ],
      p: ['interaction', 'mentalModel', 'cogLoad', 'motion'] },

    { type: 'fix', n: 4, title: 'Make the proof clickable',
      img: { src: 'shots/after-ventures.jpg', alt: 'Ventures bento grid' },
      beats: [
        { say: 'Ventures moved up the page by 57% and became a bento grid with honest status chips.' },
        { say: 'SenseAhead, the active venture, gets a full case page: problem, what I2B did, product, milestones.' },
        { say: 'An empty “Next venture: yours?” card ends the grid and turns proof into an invitation.' }
      ],
      p: ['scent', 'credibility', 'aesthetic'] },

    { type: 'fix', n: 5, title: 'Let founders qualify themselves',
      img: { src: 'shots/after-fit.jpg', alt: 'Are we a fit checklist' },
      beats: [
        { say: 'Four stock-photo cards became a two-column checklist: “We’re a fit if…” and “Probably not if…”.' },
        { say: 'Ticks draw in one by one, so you can check each criterion against your own idea.' },
        { say: 'The aim is better applications, not just more of them.' }
      ],
      p: ['selfSelect', 'fpattern'] },

    { type: 'fix', n: 6, since: 'v1.1', title: 'One ask, two doors',
      img: { src: 'shots/after-contact.jpg', alt: 'Contact form with two intents, founder path open' },
      beats: [
        { say: 'Two closing CTA blocks merged into one.' },
        { say: 'The form asks one question first: “I’m a founder” or “Something else”. Two doors, not four.' },
        { say: 'Each door shows only the 3–4 fields it needs; “Something else” adds a topic picker for business, careers, investors and press.' },
        { say: 'The button label and the promise change too: “Expect a reply within 5 working days.”' }
      ],
      p: ['hick', 'progressive', 'uncertainty', 'jakob'] },

    { type: 'fix', n: 7, since: 'v1.1', title: 'End on a high note',
      img: { src: 'shots/after-footer.jpg', alt: 'Cyan closing footer' },
      beats: [
        { say: 'The old footer was a short dark strip of links, missing the ventures.' },
        { say: 'Now the page ends on a tall cyan section: one statement, “Let’s build something that lasts.”, and one button.' },
        { say: 'Below it sits a full sitemap with all three ventures, so the last screen is both a close and a map.' }
      ],
      p: ['peakEnd', 'vonRestorff', 'scent'] },

    { type: 'headings', title: 'The headings-only test',
      intro: 'Most visitors only read headings. Read each column top to bottom: does it tell the story?',
      before: ['Building the Future of Intelligent Businesses', 'Three core pillars where deep technology meets massive structural opportunity.', 'Deepak Gullapalli', 'We collaborate with builders who prioritize strategic, long-term outcomes.', 'A growing set of AI-led technology platforms.', 'Have an idea worth building?', 'Let’s create something that lasts.'],
      after: ['Where ideas become enduring AI companies.', 'Three ways we turn structural problems into AI companies.', 'We lead the build early, then hand you the wheel.', 'Companies we’re building right now.', 'We back a few founders a year. Here’s who.', 'Build several companies, not one, from our Hyderabad studio.', 'Have an idea worth building?', 'Let’s build something that lasts.'],
      p: ['fpattern', 'scent'] },

    { type: 'rules', title: 'Motion & accessibility rules we shipped',
      items: [
        ['Motion explains, never decorates', 'If we can’t say in one sentence what an animation helps you understand, it’s cut.'],
        ['Fast by default', 'Feedback in 160 ms, UI changes in 360 ms, reveals in 700 ms. Only the hero and the process run longer.'],
        ['Plays once', 'Nothing loops in the reading area; the hero canvas stops when it’s off-screen.'],
        ['Transform & opacity only', 'Smooth on mid-range Android phones, a big share of Indian traffic.'],
        ['prefers-reduced-motion', 'Every animation has a static fallback; the pinned process becomes a grid.'],
        ['Keyboard & labels', 'Visible focus rings, labelled fields, inline errors, a skip link.']
      ],
      p: ['motion', 'a11yMotion'] },

    { type: 'impact' },
    { type: 'log' },
    { type: 'principles' },

    { type: 'end', title: 'What’s your main takeaway?',
      points: ['Clarity beats cleverness: say who, what and when in one line.', 'Put your strongest proof first, and make it clickable.', 'Give every audience its own path, and fewer choices per step.', 'Use motion only to explain a sequence.'] }
  ]
};
