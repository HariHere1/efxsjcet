# RULES — EFx SJCET

No `CONTRIBUTING.md` or linter config was found in this Project, so nothing below is an official documented standard — it's the pattern already followed consistently across the mounted files, written down so it stays consistent as `pages/`, `data/`, and `assets/` get added back in.

## Components
- One component per file; file name matches the exported component name (`Dock.tsx` → `export function Dock`).
- Named exports only, not default exports (exception: `App.tsx`, which the entry point needs as default).
- Props typed with a local `interface`/`type` above the component (`NumberTickerProps`, `MeteorsProps`, `NavbarProps`), not inline.
- Side effects (`setInterval`, `IntersectionObserver`, `ResizeObserver`, canvas/DOM work) go in `useEffect` with a cleanup function — every existing component that starts a timer, observer, or `requestAnimationFrame` loop cancels it on unmount. Keep doing this; it's why nothing here leaks.
- Decorative/non-interactive elements (`Meteors`, `Particles`, marquee row) get `aria-hidden="true"`.

## CSS — the rule that matters most right now
**Never add a new declaration for a selector that already exists elsewhere in `style.css`; edit the existing rule instead.** The stylesheet just had 78 duplicated selectors (44 dead copies, 34 silently conflicting) from exactly this happening over time — a later block would quietly override an earlier, intended one. Before adding any new rule, search the file for the selector first.
- Design tokens live in `:root` — new colors go there, not as one-off hex values in a component rule. (Several of the conflicting duplicates were raw hex codes like `#f3ded6`/`#6f5e57` bypassing the token system — that's the anti-pattern to avoid.)
- Accent colors are limited to the three-color cycle already established (`--orange`, `--teal`, `--coral` via `.accent-orange/.accent-teal/.accent-coral`) — per the existing CSS comment, "reused, not invented." Don't add a fourth accent without a design decision.
- Breakpoints in use: `560px`, `760px` (primary mobile cutoff), `980px`, `1024px`. Reuse these; don't introduce new arbitrary breakpoints.

## Routing
- A new page needs all of: hash constant/check in `App.tsx`, entry in `navItems` (+ `NAV_ICONS` mapping) in `Dock.tsx`, and `navHref`/`isActive` handling if it doesn't fit the default lowercase-dash pattern.
- Nav item labels containing `&` or spaces should get an explicit `navHref` case rather than relying on the default `.toLowerCase().replace(/ /g, '-')`, which leaves `&` unescaped in the hash (see `"Stay & Payment"` → `#stay-&-payment`).

## Accessibility
- Icon-only buttons get `aria-label` (see `.icon-button` "Help" button).
- Images/logos get descriptive `alt` text (already followed for both logos everywhere they appear).

## Content accuracy
- Any event date, venue, or headline number (participant/college/competition counts in `StatsBand`) is client-facing and must match the single source of truth before launch — do not let the same value diverge between components (this is exactly how the countdown-date vs. footer-date mismatch happened — see PRD/TASKS).
