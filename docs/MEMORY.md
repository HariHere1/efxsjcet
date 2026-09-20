# MEMORY — EFx SJCET

Running context for whoever (human or AI agent) picks this project up next. Update this file, don't just append forever — condense old entries once they're resolved.

## What this project is
Event website for **ASME EFx India 2027**, hosted by **SJCET Palai**. Built as an MVP by the owner (a BTech Electronics & Computer Engineering student focused on embedded systems/IoT and full-stack dev) — the site is also being used as a portfolio/academic-career artifact, not just a live event tool.

## Stack, in one line
React 18 + TypeScript, hand-rolled hash routing in `App.tsx` (no react-router), Tailwind v4 + a large custom dark-theme CSS file (`style.css`), Framer Motion for the mobile dock, canvas/DOM-based decorative effects (`Particles`, `Meteors`, scroll-reactive marquee).

## Environment constraint (important)
This Claude Project only has **12 files mounted**: `App.tsx`, `main.tsx`, `style.css`, and 9 components (`CountdownTimer`, `NumberTicker`, `Dock`, `EventCard`, `StatsBand`, `Meteors`, `Particles`, `ScrollVelocityMarquee`, plus the checklist `.md`). The `pages/`, `data/`, and `assets/` folders that `App.tsx`/`Dock.tsx` import from **are not here**. Any audit or task involving registration, accommodation, booking, or payment logic is currently blind to the actual implementation — add those files before relying on conclusions about them.

## Decisions & history
- **2026-09-20 — CSS deduplication pass.** `style.css` had 78 selectors declared more than once further down the file: 44 byte-identical dead copies, 34 with genuinely conflicting values (a later, unrelated-looking rule silently overriding an earlier, intended one — e.g. a leftover cream/tan palette winning over the dark-theme tokens on `.section-kicker`, `.newsroom-panel`, `.criteria-panel`, `.competition-footer`, `.host-label`). Resolved by mechanically keeping only the last (currently-rendering) declaration for each selector, verified cascade-equivalent (zero visual change). File went from 3160 → 2642 lines. **This is very likely the root cause of the "brownish color of navbar-related elements" issue already on the owner's fix list** — see DESIGN.md/TASKS.md for the follow-up decision (restore dark styling vs. formalize the cream palette).
- **Open discrepancy found:** `CountdownTimer.tsx` counts down to `2027-01-21`; the site footer says the event is `21-24 MARCH 2027`. Not yet reconciled — flag to the owner before launch.
- **Functional gap found:** `EventCard` links to `#competition/<slug>`, but `App.tsx`'s route matcher sends every `#competition/*` hash to `NotFoundPage`. The competition detail page does not exist yet — this is a live broken link, not cosmetic debt.

## Owner's own standing priorities (as previously stated, not yet all resolved)
1. Loading screen — needs rework (file not reviewable in this Project yet).
2. Text size & font — several sizes were previously being silently overridden by CSS duplication (now deduped to single values; worth a visual re-check).
3. Brownish color on navbar-related elements — likely explained by the cream-palette override found above.

## Companion docs
`PRD.md` (what/why), `ARCHITECTURE.md` (how it's built + routing table), `RULES.md` (conventions to keep, esp. "never redeclare an existing CSS selector"), `DESIGN.md` (tokens, type scale, breakpoints, component patterns), `TASKS.md` (actionable backlog incl. the pre-launch client checklist).
