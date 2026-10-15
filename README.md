# I2B website redesign

- `site/`: static redesign of i2b.in (no build step). Serve the folder and open `site/index.html`.
- `case-study/`: UX case study deck, rendered from `case-data.js`. Run `python case-study/publish.py` to build the publish copy.

Local preview: `python -m http.server 5320` from this folder, then open http://localhost:5320/site/index.html
