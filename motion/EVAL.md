# Eval loop for I2B motion cards (bounded — max 3 rounds)

Run from the project folder. One round = check → snapshot → look → fix. Stop after the round that passes, or after round 3 — then report what still fails instead of continuing.

## Gate 1 — automated
`npx hyperframes check .` must show **0 error(s)** and all contrast text checks passing.
Allowed: the `nested_structure_needs_subcomposition` warning (single-scene piece) and layout *info* lines on elements marked `data-layout-allow-*` for intended crossfades / off-canvas entrances.

## Gate 2 — visual (read the contact sheet image)
`npx hyperframes snapshot --at 0,0.5,1.2,2.6,4.0,6.3` then open `contact-sheet.jpg`.

| # | Criterion | Pass when |
| - | --- | --- |
| V1 | Clean open | t=0 shows only the light dot-grid ground (no object peeking in) |
| V2 | Real words | Every object carries a readable name (≥ 18 px small text, ≥ 22 px names) |
| V3 | Before | By ~1.2 s the *before* state of this card's concept is clear (the container + the problem) |
| V4 | Cue + change | By ~2.6 s a cue has signalled the change and the transformation is visibly happening — objects travel/morph, not pop |
| V5 | Proof | By ~4.0 s the outcome / metric is visibly resolving |
| V6 | End frame | At 6.3 s the frame reads on its own: output + headline, nothing clipped, ≥ 80 px margins, no unintended overlaps |
| V7 | System | Light ground `#f3f2ef`, paper objects with 3 px ink outline and hard ink shadow, colours by role per DESIGN-SYSTEM.md, cyan only for the hub / live / "after" |
| V8 | Story | Someone who hides the headline can still say the one-sentence message |
| V9 | Focus | In every snapshot there is one obvious focal object (DESIGN-SYSTEM §8 rule 1) |
| V10 | Distinct | The layout, container and motion are clearly NOT the B2B pipeline (no left-inputs → hub → right-stack) |

## Report back
Project path · rounds used · final check summary line · contact-sheet path · any criterion still failing and why.
