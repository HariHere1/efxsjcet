# ARCHITECTURE — EFx SJCET

## 1. Stack
- **React 18**, `StrictMode`, functional components + hooks only (no class components, no global state library observed).
- **TypeScript** (`.tsx` throughout).
- **Tailwind CSS v4** (`@import "tailwindcss"`) layered with `tw-animate-css`, a `shadcn/tailwind.css` import, and `@fontsource-variable/geist` — plus a large hand-written custom CSS layer in `style.css` (BEM-ish class names: `.event-card`, `.booking-*`, `.accommodation-*`).
- **Framer Motion** (`motion/react`) — used in `Dock.tsx` for the mobile dock's magnify-on-hover effect (`useMotionValue`/`useSpring`/`useTransform`).
- **lucide-react** for icons.
- Entry point is a standard Vite-style setup: `main.tsx` → `createRoot(...).render(<App/>)`, importing `../style.css` — implying `style.css` sits **one directory above** the component tree (worth confirming actual repo layout; this Project mounts both at the same flat level so the real relative path can't be verified here).

## 2. Routing
No router library. `App.tsx` reads `window.location.hash` directly and re-derives page state on every `hashchange`:

| Hash | Page | Notes |
|---|---|---|
| (default / `#top`) | `HomePage` | |
| `#explore-kerala` | `ExploreKeralaPage` | |
| `#accommodation` | `AccommodationPage` | |
| `#booking` | `BookingPage` | |
| `#competition/<anything>` | `NotFoundPage` | **Detail page not built** — matched by regex `^#competition\/.+$` but renders 404 |
| anything else | `HomePage` (falls through) | No explicit catch-all 404 for unknown non-competition hashes |

`Dock.tsx` builds nav hrefs independently via `navHref()` — Explore Kerala is special-cased, index 0 goes to `#top`, everything else is `#` + lowercase + spaces→dashes (e.g. "Stay & Payment" → `#stay-&-payment`, unescaped `&`). Any new page needs: (1) a hash constant/route check in `App.tsx`, (2) an entry in `navItems` + `NAV_ICONS` + `navHref`/`isActive` in `Dock.tsx`.

## 3. Component inventory (files present in this Project)
| Component | Purpose |
|---|---|
| `App.tsx` | Root shell: hash routing, loading-screen gate, footer |
| `main.tsx` | React entry point |
| `Dock.tsx` | Desktop navbar + mobile "magic dock" nav (Framer Motion hover magnify) |
| `EventCard.tsx` | Single competition/event card, accent-colored |
| `StatsBand.tsx` | 4-stat row, wraps `NumberTicker` |
| `NumberTicker.tsx` | Count-up animation on scroll-into-view (`IntersectionObserver` + `requestAnimationFrame`, ease-out-quart) |
| `CountdownTimer.tsx` | Days/hours/min/sec countdown to a hardcoded `EVENT_DATE` |
| `Meteors.tsx` | Decorative random meteor-trail DOM elements (CSS-animated) |
| `Particles.tsx` | Canvas-based ambient particle field with mouse-parallax |
| `ScrollVelocityMarquee.tsx` | Two infinite marquee rows whose speed reacts to scroll velocity |

Not in this Project (imported by `App.tsx` but no source available here): `LoadingScreen`, `HomePage`, `AccommodationPage`, `BookingPage`, `ExploreKeralaPage`, `NotFoundPage`, `data/navItems`, `assets/images/*`.

## 4. Styling architecture
- Single source of design tokens: `:root` custom properties in `style.css` (dark palette — see DESIGN.md) plus a parallel set of shadcn/Tailwind `oklch()` tokens for light/dark mode support (`--background`, `--card`, etc.) that don't appear to be used by the custom dark-themed components.
- **As of this pass, `style.css` has been deduplicated**: it previously contained 78 selectors declared more than once further down the file (44 identical dead copies, 34 with conflicting values where a later, unrelated-looking "cream/light" block silently overrode the intended dark-theme rule). All duplicates were resolved by keeping only the last (i.e. currently-rendering) declaration — cascade-equivalent, zero visual change, 3160 → 2642 lines. See TASKS.md for the follow-up decision needed on the 34 conflicting cases.

## 5. Data / state
- No global store, no data-fetching library visible in the mounted files. `App.tsx` uses local `useState` for route flags. Registration/accommodation/payment state almost certainly lives in `BookingPage` — not reviewable from this Project.

## 6. Known architecture gaps
- Competition detail routing is a stub (see §2).
- No visible error boundary or loading state beyond the initial `LoadingScreen`.
- No test files present in this Project.
