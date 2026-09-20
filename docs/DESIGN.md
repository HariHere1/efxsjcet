# DESIGN — EFx SJCET

## 1. Palette (canonical — `:root` in `style.css`)
| Token | Value | Use |
|---|---|---|
| `--bg-dark` | `#0a0908` | Page base |
| `--bg-dark-raised` | `#14110f` | Cards / panels |
| `--ink` | `#f5ece7` | Body text |
| `--text-muted` | `#a89489` | Secondary text |
| `--line` | `#2a231f` | Borders / dividers |
| `--orange` | `#f06424` | Primary accent |
| `--orange-dark` | `#ff8752` | Accent on dark bg (brightened for contrast) |
| `--teal` | `#16a89f` | Secondary accent |
| `--teal-dark` | `#0a3d3a` | Teal panel background |
| `--coral` | `#f6b6a0` | Tertiary accent |
| `--dim` | `#1c1714` | Subtle panel fill |

> ⚠️ **Open issue:** a second, unnamed "cream/brown" palette (`#f3ded6`, `#dfc3b9`, `#e8c5b9`, `#f6ddd5`, `#ffe0d0`, `#ffe5d9`, `#8c6a5c`, `#6f5e57`, `#d6e5df`) currently wins the cascade in several places — `.section-kicker`, `.newsroom-panel`, `.criteria-panel`, `.competition-footer`, `.host-label` — because later CSS rules override the dark-token versions. This is the most likely cause of the "brownish color of navbar-related elements" issue already flagged as a fix priority. **Decision needed:** keep dark-token styling (recommended, matches the rest of the site) or formalize the cream palette as an intentional secondary theme for specific sections.

Shadcn/Tailwind `oklch()` tokens (`--background`, `--card`, `--primary`, etc.) also exist in `:root` and a `.dark` class variant, but no custom component visibly consumes them — likely scaffolding from the Tailwind/shadcn setup, not part of the active design.

## 2. Typography
| Font | Weight(s) loaded | Used for |
|---|---|---|
| **Outfit** | 400–800 | Primary UI/body font (`--outfit`), headings, stats, countdown |
| **Space Mono** | 400, 700 | Labels, kickers, nav, mono details (`--mono`) |
| **DM Sans** | 700 | Event card numerals (`.event-card h3`), 404 heading |
| Geist Variable | variable | Loaded via `@fontsource-variable/geist`, backs the Tailwind `--font-sans` token; not visibly used outside the shadcn scaffolding |

Headline sizes use `clamp()` throughout (e.g. hero `h1`: `clamp(57px, 6vw, 80px)`, section `h2`s: `clamp(42–66px)`) with tight negative letter-spacing (`-2px` to `-6px`) for a condensed display feel.

## 3. Layout / breakpoints
- **760px** — primary desktop/mobile split (navbar ↔ mobile dock, most grid collapses to single column).
- **980px** — secondary tablet adjustments (nav gap/size).
- **1024px** — event grid 4→2 columns.
- **560px** — event grid 2→1 column.
- Section padding standard: `~90–112px` vertical on desktop, `~24–75px` on mobile.

## 4. Recurring component patterns
- **Accent cycling**: cards (event, accommodation, booking-accommodation) use exactly three accent classes — `accent-orange` / `accent-teal` / `accent-coral` — applied as a top border + tinted icon/text color. Keep new card types on this same 3-color cycle.
- **Chip/kicker labels** (`.date-chip`, `.section-kicker`, `.mini-label`): small mono-font pills meant to sit above headings. `.section-kicker` currently renders as a plain transparent block (see palette note above) rather than the pill/chip its earlier CSS describes — worth restoring once the cascade conflict is resolved.
- **Countdown figures**: large tabular-nums numerals (`.countdown-value`) with a muted mono label underneath, separated by an orange colon.
- **Number ticker stats**: ease-out-quart count-up triggered at 40% viewport visibility, big `clamp(52–80px)` figures with a smaller colored suffix (`+`, `H`).
- **Ambient motion layers**: `Particles` (canvas, mouse-reactive) for the hero, `Meteors` (randomized CSS-animated streaks) as an alternate/additional decorative layer, `ScrollVelocityMarquee` (scroll-speed-reactive infinite text loop) for the brand marquee band.
- **Diagonal "stamp"/"panel" motifs**: `.brief-stamp` (rotated circular seal on competition pages) and `.newsroom-panel` (clipped-corner panel with diagonal accent lines) are the two deliberate "physical artifact" design flourishes — reuse these rather than inventing new decorative shapes.

## 5. Responsive rules of thumb
- Grids that are 4-column on desktop go to 2-column at `1024px` and 1-column at `560px`/`760px` (event grid, stats band, accommodation grid).
- Hero and page-hero sections stack to a single column below `760px` with reduced heading sizes and tighter letter-spacing.
