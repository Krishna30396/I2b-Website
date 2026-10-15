# I2B Object System — illustration & motion

The visual language for every I2B motion piece (website cards, How we build, case study).
**Objects, never people.** We show the *work* — files, tools, systems, building blocks — and
how it becomes one thing, then grows. Shared CSS lives in `system/i2b-objects.css`.

## 1. Principles

1. **Objects, not people.** No humans, hands, faces or avatars. A team is shown as seats, tools or blocks.
2. **Real words on every object.** File names, subjects, row labels (≥ 22 px at 1080). If an object can't be named, cut it.
3. **Mess → one system → scale.** Every piece tells the same three-beat story.
4. **Paper stickers on a ground.** Objects are always paper-filled with an ink outline and a hard offset shadow; only the ground (background) changes between pieces.
5. **Colour means something.** Colour marks *what kind of thing* an object is, plus one cyan for "the I2B system / live". Never decorative gradients.

## 2. Object anatomy

| Property | Value |
| --- | --- |
| Fill | Paper `#fafaf9` |
| Outline | 3 px Ink `#0f0f0f` (2 px for small parts) |
| Corner radius | 18 px objects · 10 px parts · 999 px chips |
| Shadow | Hard offset `6px 6px 0 #0f0f0f` (cut-paper feel); no blur. On the night ground the shadow turns structure-blue `#1C75BC` so it still reads |
| Type tag | A 14 px colour band or chip on the object's top/left edge |
| Text | Inter 600 (names) · Inter 400 (lines) · JetBrains Mono 500 (labels, counts) |
| Iconography | Same 3 px ink line, round caps, no fills except the type colour |

## 3. Colour roles (from i2b.in tokens)

| Role | Token | Hex | Used for |
| --- | --- | --- | --- |
| Ink | `--color-ink-dark` | `#0f0f0f` | outlines, text, shadows |
| Paper | `--color-light-primary` | `#fafaf9` | every object's fill |
| Ground · light | `--color-light-secondary` | `#f3f2ef` | light pieces |
| Ground · night | `--color-dark-secondary` | `#0a0d14` | dark pieces |
| System / live | `--color-accent` | `#6ae3ff` | the I2B system, "after" states, live dots |
| Data / structure | InfiGro blue | `#1C75BC` | email, tables, structure |
| Sheet / healthy | SenseAhead green | `#2ecf9a` | spreadsheets, resolved, OK |
| Conversation / AI | KruCo lavender | `#b49ef5` | chat, AI suggestions |
| Money / attention | `--color-amber-400` | `#fcbb00` | invoices, flagged items |

Artefact → colour is fixed: **sheet = green, email = blue, chat = lavender, invoice = amber, system = cyan.**
A ground may be any of light, night or cyan; objects stay paper + ink on all three.

## 4. Object library (v1)

| Family | Objects | Notes |
| --- | --- | --- |
| Artefacts (the mess) | Spreadsheet · Email · Chat bubble · Invoice PDF | Always carry a real-looking name, e.g. `Shipments_v7_FINAL.xlsx` |
| Systems (the one) | Table panel · Hub · Module card | Cyan header band = live |
| Units (the scale) | Row · Block · Tile | Uniform, stack and repeat |
| Connectors | Rail (dashed 3 px) · Pipe | Must join two real objects |
| Signals | Status dot · Count · Tick | Green OK · amber flagged · cyan live |
| Growth (How we build) | Note → prototype → product → customers → team-seats | Seats, never faces |

## 5. Motion grammar

| Beat | Share of time | What happens | Ease |
| --- | --- | --- | --- |
| **Mess** | ~0–25% | Artefacts enter from different edges, tilted 4–9°, resting slightly off-grid | `expo.out` / `back.out(1.4)` — vary per object |
| **Snap** | ~25–50% | Each artefact travels into its slot and becomes a unit (row/block/tile); 80–120 ms stagger | `power3.inOut` travel, `back.out(1.6)` settle |
| **Scale** | ~50–85% | The system repeats or grows: rows multiply, blocks stack, modules tile; one count-up | `power2.out`, ≤ 0.35 s per unit |
| **Hold** | last ~1 s | Still end frame with one label | none |

- One dominant motif per piece; nothing loops forever; first move at 0.2 s.
- Entrances longer than exits; never more than two tweens on the same ease.
- Reduced motion / poster: the **end frame** must read on its own.

## 6. Formats

1080 × 1080 (1:1) master, 30 fps, 6.5 s. Crops safely to 4:3 for the website card (keep content inside the central 1080 × 810).

## 7. B2B SaaS — three variations

| | A · Sort | B · Pipeline | C · Grid |
| --- | --- | --- | --- |
| Ground | Light `#f3f2ef` | Night `#0a0d14` | Cyan `#6ae3ff` |
| Mess | 4 artefacts scattered | 4 artefacts queued on the left | 4 artefacts tumble in |
| Snap | Fly into one table, become rows | Ride rails into a cyan hub | Lock into one module card |
| Scale | Rows multiply, count 4 → 1,280 | Hub stamps uniform blocks into a growing stack | Camera pulls back: one module becomes a grid of 25 |
| End label | One view. Any volume. | Many inputs. One system. | One system, built to repeat. |

## 8. Comprehension rules (research-backed)

Every card must be understood in ~3 seconds with the headline hidden.

1. **One focal point per moment** — each beat has a single primary object; everything else is still or dimmed (staging).
2. **Pose-to-pose** — design the *before* and *after* frames deliberately; keep the move between them simple and short.
3. **Cue before the change** — a scan, highlight, outline or pulse tells the eye where the change will happen (signalling / anticipation).
4. **Objects move, they don't vanish** — the thing that becomes the result travels or morphs into it (continuity).
5. **The container is the context** — pick a container people recognise instantly (a flow diagram, a phone, a blueprint).
6. **End on proof** — finish on a visible outcome: a metric, a state change, a finished object.
7. **Silhouette test** — the end frame must read as shapes alone.

Sources: Material Design motion (informative · focused · expressive), Nielsen Norman Group "The role of animation and motion in UX", Figma motion fundamentals, classic staging / pose-to-pose principles.

## 9. The three website cards — same style, different concepts

Same ground, objects, colours and ink; **different container, motion and metric** per card.

| Card | Concept & container | Motion signature | Proof / metric | Headline |
| --- | --- | --- | --- | --- |
| B2B SaaS | **Pipeline** — a flow diagram | Inputs ride rails into a hub; uniform blocks stack | 2,400 clean records / day | Many inputs. One system. |
| AI-led consumer & growth | **The phone** — a phone screen + a chart card | AI scan sweeps a 10-task list → accordion collapse → one suggestion card → "Apply" press | Growth line bends upward after "Applied"; "10 steps → 1 tap" | Ten steps. One good suggestion. |
| Incubation & investment | **The blueprint** — a blueprint sheet with a dashed building outline | Idea note pinned → support blocks drop into the outline (foundation, walls, floors, roof) → building grows | Timeline ruler: Idea → Prototype → v1 → Customers → Next round; flag on top | Your idea, with a team behind it. |

Incubation colour roles: capital = amber, product = lavender, engineering = blue, governance = green. Blueprint lines use structure-blue `#1C75BC` at low opacity on paper.
