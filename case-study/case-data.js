/* =====================================================================
   I2B redesign — UX case study content.
   The deck (index.html) renders entirely from this file.

   HOW TO UPDATE WHEN THE WEBSITE CHANGES
   1. Add an entry to ITERATIONS (newest first): version, date, what changed,
      which principles drove it, and any metric you re-measured.
   2. Edit the affected slides; tag new or updated slides with `since: '<version>'`
      so the deck shows an "Updated in vX" badge. Keep superseded screenshots
      as `v11-*.jpg` etc. when a slide compares versions.
   3. Re-capture screenshots into ./shots (same file names) and update IMPACT.
   4. New principle? Add it to PRINCIPLES once and reference it by key.
   The principle index and iteration log slides build themselves.
   ===================================================================== */

window.CASE = {
  meta: {
    title: 'Making I2B explain itself in 10 seconds',
    subtitle: 'A UX case study on redesigning a venture studio website: clarity, proof, one path per audience, and motion that explains.',
    client: 'I2B Technologies',
    role: 'UX research, UX/UI design, interaction & motion design, front-end prototype',
    version: 'v1.2',
    date: '15 Oct 2026',
    siteUrl: '../site/index.html',
    liveUrl: 'https://i2b.in/'
  },

  /* ---------------- principle library ---------------- */
  PRINCIPLES: {
    fiveSecond:  { name: '5-second test', emoji: '⏱️', def: 'If a first-time visitor can’t say what you do and who it’s for after ~5 seconds, the page has a clarity problem, not a looks problem.', src: 'Usability practice (UsabilityHub / Lyssna)' },
    cogLoad:     { name: 'Cognitive load', emoji: '🧠', def: 'Every extra word, option and moving thing takes working memory away from the one thing the visitor came to do.', src: 'Sweller, Cognitive Load Theory' },
    banner:      { name: 'Banner blindness', emoji: '🙈', def: 'People skip anything that looks like an ad: moving bands, carousels and decorative strips get ignored.', src: 'Nielsen Norman Group' },
    credibility: { name: 'Web credibility', emoji: '🛡️', def: 'Showing the real people and real work behind a site builds trust; stock imagery, invented figures and small errors quietly erode it.', src: 'Stanford Web Credibility Guidelines' },
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
    selfSelect:  { name: 'Self-qualification', emoji: '✅', def: 'Clear criteria let the right people opt in and the wrong ones opt out, improving lead quality, not just volume.', src: 'Conversion design practice' },
    uncertainty: { name: 'Uncertainty reduction', emoji: '📬', def: 'Telling people what happens next, how long it takes and when they’ll hear back lowers the anxiety of submitting.', src: 'Berger & Calabrese; form UX research' },
    a11yMotion:  { name: 'Reduced-motion support', emoji: '♿', def: 'Non-essential motion must be possible to turn off; it can make people with vestibular disorders unwell.', src: 'WCAG 2.2 SC 2.3.3' },
    interaction: { name: 'Interaction cost', emoji: '🖱️', def: 'The sum of effort (scrolling, reading, clicking) needed to reach a goal. Less effort means more people finish.', src: 'Nielsen Norman Group' },
    peakEnd:     { name: 'Peak-end rule', emoji: '🏁', def: 'People judge an experience largely by its most intense moment and its end, so the last screen should feel deliberate.', src: 'Kahneman & Fredrickson' },
    aesthetic:   { name: 'Aesthetic-usability effect', emoji: '✨', def: 'Interfaces that look considered are perceived as easier to use and more trustworthy.', src: 'Kurosu & Kashimura (1995)' },
    consistency: { name: 'Consistency & standards', emoji: '📐', def: 'One accent, one button style, one background rhythm: a system people learn once and trust everywhere.', src: 'Nielsen’s 10 heuristics, #4' },
    framing:     { name: 'Framing effect', emoji: '🖼️', def: 'The same filter reads very differently as a rejection list or as an exchange; framing changes how people feel about it.', src: 'Tversky & Kahneman (1981)' },
    signal:      { name: 'Signal-to-noise', emoji: '📶', def: 'Every chip, pill and flourish competes with the message. Cut decoration that carries no information.', src: 'Tufte; visual design practice' },
    userTest:    { name: 'Small-sample usability testing', emoji: '🧪', def: 'Five people find most of the big problems. Test the motion with its headline hidden: if 4 of 5 can say what it means, it works.', src: 'Nielsen (2000)' }
  },

  /* ---------------- iteration log (newest first) ---------------- */
  ITERATIONS: [
    {
      v: 'v1.2', date: '15 Oct 2026', title: 'Expert review: from template to system',
      changes: [
        { area: 'System', what: 'Light-first: one paper base, one ink chapter, an ink footer. Background switches cut from 9 to 3; one accent (the logo’s cyan dot); one primary button.', p: ['consistency', 'vonRestorff', 'aesthetic'] },
        { area: 'Hero', what: 'Dark network canvas removed. Light, centred hero; the real portfolio arrives once, then an open “Your idea” slot draws in.', p: ['credibility', 'motion', 'signal'] },
        { area: 'What we build', what: 'Three tiny grey animations replaced by three 4:3 motion loops with real words, one grammar (messy before → one clear after), sequenced and replayable.', p: ['motion', 'mentalModel', 'userTest'] },
        { area: 'How we build', what: 'Chart + 20 text blocks replaced by one evolving object and an ownership bar: about 10 text items, nothing that reads as data.', p: ['cogLoad', 'mentalModel', 'interaction'] },
        { area: 'Ventures', what: 'Invented SenseAhead figures removed; the product view shows labels only.', p: ['credibility'] },
        { area: 'Fit', what: '“Probably not if you…” reframed as You bring / We bring under “A partnership, not a cheque.”', p: ['framing', 'selfSelect'] },
        { area: 'Team', what: 'Added how work rotates across ventures and slots for real studio photos.', p: ['credibility'] },
        { area: 'Contact & footer', what: 'Form shows “Step 1 of 2” and a reply time; tall cyan footer and its second CTA removed for a 351 px ink footer.', p: ['uncertainty', 'hick', 'peakEnd'] },
        { area: 'Copy & a11y', what: 'Italic accent phrases 7 → 2; “X, not Y” lines cut to two; every JS animation gated on reduced motion.', p: ['signal', 'a11yMotion'] }
      ]
    },
    {
      v: 'v1.1', date: '15 Oct 2026', title: 'Clarity & effort pass',
      changes: [
        { area: 'Hero', what: 'Centred layout; headline refined to "Where ideas become enduring AI companies."', p: ['fiveSecond', 'aesthetic'] },
        { area: 'How we build', what: 'Pinned 5-stage scroll (~4 screens) replaced by a one-screen chart with five stage columns.', p: ['interaction', 'mentalModel'] },
        { area: 'Contact', what: 'Four intents cut to two: “I’m a founder” or “Something else”.', p: ['hick', 'progressive'] },
        { area: 'Footer', what: 'Tall cyan closing section with one statement and one CTA.', p: ['peakEnd', 'vonRestorff'] }
      ]
    },
    {
      v: 'v1.0', date: '15 Oct 2026', title: 'First redesign',
      changes: [
        { area: 'Hero', what: 'Generic slogan replaced with a concrete promise, two audience CTAs and a founder proof line.', p: ['fiveSecond', 'authority', 'vonRestorff'] },
        { area: 'Proof strip', what: '16-term marquee replaced with four static proof points.', p: ['banner', 'cogLoad'] },
        { area: 'How we build', what: 'Abstract bullets replaced with a pinned, scroll-linked 5-stage process.', p: ['mentalModel', 'motion', 'progressive'] },
        { area: 'Ventures', what: 'Bento grid with status labels; SenseAhead gets a case page.', p: ['scent', 'credibility'] },
        { area: 'Fit', what: '"Who we partner with" stock cards replaced with a fit checklist.', p: ['selfSelect'] },
        { area: 'Contact', what: 'Two CTA blocks merged; one form routed by intent with "what happens next".', p: ['hick', 'progressive', 'uncertainty'] },
        { area: 'IA', what: '2 pages → 5: Studio, Build with us, Careers, venture case page.', p: ['jakob', 'scent'] },
        { area: 'Accessibility', what: 'Reduced-motion fallbacks, keyboard focus states, labelled fields.', p: ['a11yMotion'] }
      ]
    }
  ],

  /* ---------------- measured impact ---------------- */
  IMPACT: {
    note: 'Measured from the live DOM at 1440×900 (v1.2, 15 Oct 2026). Original = i2b.in today; v1.1 counts are from the expert review. These are design deltas; behavioural outcomes stay hypotheses until tracked.',
    measured: [
      { k: 'Founder proof position', before: '2,295 px', after: '559 px', delta: '−76% · first screen', good: true },
      { k: 'First venture on screen', before: '4,653 px', after: '650 px', delta: 'Portfolio row in the hero', good: true },
      { k: 'Background switches (v1.1 → v1.2)', before: '9', after: '3', delta: 'Paper · one ink chapter · ink footer', good: true },
      { k: 'Accent colours', before: '2 blues', after: '1', delta: 'The logo’s cyan dot', good: true },
      { k: 'Primary button styles', before: '2', after: '1', delta: '+ one outline secondary', good: true },
      { k: 'Italic accent phrases', before: '7', after: '2', delta: 'Hero + one chapter', good: true },
      { k: 'Text items in How we build', before: '20+', after: '10', delta: 'One word + one line per stage', good: true },
      { k: 'Invented figures on venture cards', before: '4', after: '0', delta: 'Labels only until real screens arrive', good: true },
      { k: 'Stock photos', before: '7', after: '0', delta: 'Real people & product only', good: true },
      { k: 'Closing CTAs', before: '2', after: '1', delta: 'Contact is the close', good: true },
      { k: 'Footer height (v1.1 → v1.2)', before: '872 px', after: '351 px', delta: '−60%', good: true },
      { k: 'Form fields before choosing intent', before: '5', after: '0 → 3–4', delta: 'Step 1 of 2, then only what’s needed', good: true },
      { k: 'Home page height', before: '6,630 px', after: '11,233 px', delta: '+69%: three motion cards + the pinned chapter', good: false }
    ],
    hypotheses: [
      { metric: 'Headline-hidden test, per motion loop', why: 'Each loop should explain its card on its own', how: '5 people per loop; pass = 4 of 5 say it in one sentence' },
      { metric: 'Founder applications / month', why: 'Clear promise and a dedicated application path', how: 'Form submits tagged "founder"' },
      { metric: 'Qualified share of applications', why: 'You bring / We bring filters before people apply', how: 'I2B review of submissions' },
      { metric: '5-second test: "What does I2B do?"', why: 'Hero states the outcome; portfolio shows proof', how: '5–10 people, before vs after' },
      { metric: 'Completion of "How we build"', why: 'One object to watch, one line to read', how: 'Scroll-depth to stage 5' }
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

    { type: 'method', since: 'v1.2', title: 'How we approached it',
      intro: 'A Double Diamond process, run twice: the second loop started from an expert review of our own v1.1.',
      phases: [
        { n: 'Discover', items: ['Heuristic audit of every section', 'Content inventory & live-site teardown', 'Reference scan: venture studios and AI product sites'], status: 'done' },
        { n: 'Define', items: ['Audience map: founders, engineers, clients, co-investors', 'Jobs-to-be-done per audience', '"How might we" problem statements'], status: 'done' },
        { n: 'Develop', items: ['IA: 2 → 5 pages', 'Content-first wireframes & story order', 'Motion design loops: message → options → storyboard → test'], status: 'done' },
        { n: 'Deliver', items: ['Hi-fi build in I2B’s own palette', 'Expert review of v1.1 → v1.2 system', 'Reduced-motion, contrast & mobile pass'], status: 'partial' }
      ],
      foot: 'Still to run with real people: 5-second tests, the headline-hidden test for each motion loop, and three short interviews (founder, engineer, I2B network).' },

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
        { who: 'Businesses', job: 'Can they build my B2B platform in my domain?', action: 'Get in touch' },
        { who: 'Co-investors & partners', job: 'Track record, thesis, portfolio.', action: 'Contact the founder' }
      ],
      hmw: 'How might we help each visitor understand I2B in 10 seconds and see one obvious next step?' },

    { type: 'critique', since: 'v1.2', title: 'Round two: why v1.1 still felt AI-made',
      intro: 'The structure and copy were right. An expert review of our own v1.1 found the same safe moves repeating until the page read as a template.',
      rows: [
        ['Black + electric cyan + a node-network canvas', 'The default AI-startup look', 'Light-first paper, one ink chapter; canvas removed'],
        ['Serif headline + coloured italic phrase, 7 times', 'A formula, not a voice', 'Italic kept for the hero and one chapter only'],
        ['Mono eyebrows + pills + chips everywhere', 'Reads as a UI kit', 'Chips only where they carry status'],
        ['“X, not Y” sentences, again and again', 'A rhythm people notice', 'Cut to two'],
        ['Grey placeholder art, invented dashboard numbers', 'Fake artefacts cost trust', 'Real words in every animation; numbers removed'],
        ['Two blues; logo dot changes colour', 'No single accent', 'One accent from the logo; ink logo keeps the cyan dot'],
        ['Cyan pills and black pills', 'Two primaries compete', 'One primary, one outline secondary']
      ],
      p: ['consistency', 'signal', 'credibility', 'aesthetic'] },

    { type: 'fix', since: 'v1.2', title: 'One system, not nine backgrounds',
      compare: { before: 'shots/v11-hero.jpg', after: 'shots/after-hero.jpg', lb: 'V1.1', la: 'V1.2' },
      beats: [
        { say: 'v1.1 flipped background 9 times across 10 sections: black, navy, off-white, beige, cyan…' },
        { say: 'v1.2 is light-first: one paper base, one ink chapter for How we build, and a quiet ink footer. Three switches, each with a reason.' },
        { say: 'One accent, the cyan dot from I2B’s own logo, used only for the primary button and “after” states.' }
      ],
      p: ['consistency', 'vonRestorff', 'aesthetic'] },

    { type: 'fix', since: 'v1.2', title: 'Say one clear thing, quietly',
      compare: { before: 'shots/before-hero.jpg', after: 'shots/after-hero.jpg' },
      beats: [
        { say: 'A centred, quieter headline: “Where ideas become enduring AI companies.” The support line carries the plain facts.' },
        { say: 'The founder proof line sits in the hero: it was 2,295 px down, now it’s at 559 px.' },
        { say: 'The motion piece is proof, not decoration: the three real ventures arrive once, then an open “Your idea” slot draws in.' }
      ],
      p: ['fiveSecond', 'authority', 'serial', 'credibility'] },

    { type: 'phones', since: 'v1.2', title: 'And on a phone',
      intro: 'Most of I2B’s audience browses on mid-range Android phones. Same first screen, before and after.',
      before: 'shots/before-mobile.jpg', after: 'shots/after-mobile.jpg',
      notes: ['Who it’s for and what you get, in the first screen', 'Founder proof visible without scrolling', 'Two thumb-sized CTAs (48 px tall)'],
      p: ['fiveSecond', 'jakob'] },

    { type: 'fix', since: 'v1.2', title: 'Swap noise for proof',
      img: { src: 'shots/after-proof.jpg', alt: 'Proof strip below the hero' },
      beats: [
        { say: 'The original marquee cycled 16 buzzwords: AI-first, Fintech, Deep Tech, Procurement…' },
        { say: 'Four static, verifiable facts replace it: 20+ years, 3 ventures, pre-seed, 6 open roles.' },
        { say: 'In v1.2 it sits on the same paper as the hero, separated by hairlines instead of another dark band.' }
      ],
      p: ['banner', 'cogLoad', 'consistency'] },

    { type: 'loops', since: 'v1.2', title: 'Motion that explains: three design loops',
      intro: 'All three “What we build” cards tell one story, a messy before resolving into one clear after, so they share one grammar and one timing.',
      steps: ['Message', 'Options', 'Storyboard', 'Assets', 'Build', 'What it resolves', 'Is it too much?'],
      loops: [
        { img: 'shots/after-loop-end.jpg', name: 'B2B SaaS', msg: 'Scattered spreadsheets, emails and chats become one live system.', chosen: 'Real work artefacts fly into one table, each becoming a row.', rejected: 'Tangled lines (abstract); tabs collapsing (overused).', r2: 'Jitter cut; one main movement; a status dot replaces the extra tag; 1.8 s.' },
        { img: 'shots/after-loop2.jpg', name: 'Consumer & growth', msg: 'A tedious checklist becomes one next action, with the reason why.', chosen: 'A 10-step checklist squeezes like an accordion into one “Do this next” card.', rejected: 'Typing chat bubble (the biggest AI cliché); funnel.', r2: 'List already on screen; 400 ms hold; counter replaced by a “10 steps → 1” label.' },
        { img: 'shots/after-loop3.jpg', name: 'Incubation', msg: 'A founder alone with an idea gets a full team on day one.', chosen: 'Four seats arrive in one arc around “Your idea”; a frame closes: “Day one: a company”.', rejected: 'The old bar chart (implied data); stacked layers (back-up).', r2: 'Note no longer straightens; seats arrive together so they read as a team.' }
      ],
      rules: '4:3 canvas ≥ 400 px · 1.5 px ink line art · real words ≥ 12 px · accent only on the “after” · starts at 50% in view, 300 ms after the headline · never two at once · 1.8–2.2 s, then hold · replay on hover, focus or tap · reduced motion shows the end frame with the “before” ghosted at 20%.',
      test: 'Pass = 4 of 5 people can say what each loop means with its headline hidden, nobody calls it distracting, and the end frame alone still makes sense. Not yet run.',
      p: ['motion', 'userTest', 'a11yMotion'] },

    { type: 'fix', since: 'v1.2', title: 'The thing you leave with',
      compare: { before: 'shots/v11-process.jpg', after: 'shots/after-process.jpg', lb: 'V1.1', la: 'V1.2' },
      beats: [
        { say: 'v1.0 was five pinned panels; v1.1 squeezed them into a chart plus five columns of four text blocks each: 20+ things to read, and the curves looked like data.' },
        { say: 'v1.2 keeps the best line on the page, “We lead the build early, then hand you the wheel”, and shows it with one object that grows as you scroll.' },
        { say: 'A sticky note becomes a prototype, then a real product, then customers connect, then your team appears. One word and one line per stage: about 10 text items.' },
        { say: 'Underneath, one ownership bar fills from “I2B leads” to “You lead”. Click 1–5 to jump; on phones and with reduced motion it becomes five still frames.' }
      ],
      p: ['mentalModel', 'cogLoad', 'interaction', 'motion'] },

    { type: 'fix', since: 'v1.2', title: 'Make the proof real',
      img: { src: 'shots/after-ventures.jpg', alt: 'Ventures grid' },
      beats: [
        { say: 'The bento grid and status labels stayed; the “Next venture: yours?” card closes the grid.' },
        { say: 'v1.1’s SenseAhead card showed invented numbers (“Moderate”, 3 alerts, 48 lanes). Made-up figures on a real company’s card are a credibility risk.' },
        { say: 'v1.2 shows the product’s real structure, Identify · Predict · Simulate · Comply, with labels only, until I2B supplies real screens.' }
      ],
      p: ['credibility', 'scent'] },

    { type: 'fix', since: 'v1.2', title: 'A partnership, not a cheque',
      img: { src: 'shots/after-fit.jpg', alt: 'You bring and we bring' },
      beats: [
        { say: '“Probably not if you…” filtered the right people, but read as rejection.' },
        { say: 'The same filter now reads as an exchange: You bring / We bring, four rows.' },
        { say: 'People who only want money or an agency opt themselves out from the right column, without being told no.' }
      ],
      p: ['framing', 'selfSelect'] },

    { type: 'fix', since: 'v1.2', title: 'One ask, two steps',
      compare: { before: 'shots/v11-contact.jpg', after: 'shots/after-contact.jpg', lb: 'V1.1', la: 'V1.2' },
      beats: [
        { say: 'Two doors stay: “I’m a founder” or “Something else”.' },
        { say: 'The panel is now sized to its content, says “Step 1 of 2”, and promises a reply within 3 working days.' },
        { say: 'Join the team gained one line on how work rotates across ventures, plus slots for real studio photos.' }
      ],
      p: ['uncertainty', 'hick', 'progressive'] },

    { type: 'fix', since: 'v1.2', title: 'Close once, quietly',
      compare: { before: 'shots/v11-footer.jpg', after: 'shots/after-footer.jpg', lb: 'V1.1', la: 'V1.2' },
      beats: [
        { say: 'v1.1 ended with 872 px of cyan and a second “Let’s build” CTA right after “Have an idea worth building?”.' },
        { say: 'Two asks in a row compete. The contact section is now the only close.' },
        { say: 'The footer is 351 px of ink: sitemap, office, the concept disclaimer, and one flourish, a faint “i2b.” wordmark.' }
      ],
      p: ['peakEnd', 'hick', 'signal'] },

    { type: 'headings', since: 'v1.2', title: 'The headings-only test',
      intro: 'Most visitors only read headings. Read each column top to bottom: does it tell the story?',
      before: ['Building the Future of Intelligent Businesses', 'Three core pillars where deep technology meets massive structural opportunity.', 'Deepak Gullapalli', 'We collaborate with builders who prioritize strategic, long-term outcomes.', 'A growing set of AI-led technology platforms.', 'Have an idea worth building?', 'Let’s create something that lasts.'],
      after: ['Where ideas become enduring AI companies.', 'Three ways we turn structural problems into companies.', 'We lead the build early, then hand you the wheel.', 'Companies we’re building now.', 'A partnership, not a cheque.', 'Build across ventures from our Hyderabad studio.', 'Have an idea worth building?'],
      p: ['fpattern', 'scent'] },

    { type: 'rules', since: 'v1.2', title: 'Motion & accessibility rules we shipped',
      items: [
        ['Motion explains, never decorates', 'Each loop has a one-sentence message and a headline-hidden test.'],
        ['Fast, then still', 'Loops run 1.8–2.2 s and hold their end frame; UI feedback in 160 ms.'],
        ['Never two at once', 'Loops queue with a 600 ms gap; nothing loops on its own.'],
        ['Transform & opacity only', 'Smooth on mid-range Android phones; the always-on hero canvas is gone.'],
        ['Reduced motion, everywhere', 'Every JS animation is gated: loops show the end frame with the “before” ghosted; the chapter becomes still frames.'],
        ['Keyboard & labels', 'Loops replay on focus; stage buttons 1–5 jump; visible focus rings; labelled fields.']
      ],
      p: ['motion', 'a11yMotion'] },

    { type: 'impact' },
    { type: 'log' },
    { type: 'principles' },

    { type: 'end', title: 'What’s your main takeaway?',
      points: ['Clarity beats cleverness: say what you make in one line.', 'Put real proof first, and never invent it.', 'One system: one accent, one button, one dark chapter.', 'Use motion only to show a change, then let it rest.'] }
  ]
};
