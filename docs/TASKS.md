# TASKS — EFx SJCET

## Done
- [x] **CSS deduplication** — removed 78 duplicated selectors (44 identical dead copies, 34 conflicting) from `style.css`. Cascade-verified equivalent (no visual change); file cut from 3160 → 2642 lines. New `style.css` delivered.

## High priority (carried over from prior fix list + confirmed by CSS audit)
- [ ] **Loading screen rework** (stated priority #1) — `LoadingScreen.tsx` isn't in this Project; add it to review/fix.
- [ ] **Text size & font pass** (stated priority #2) — several conflicting duplicate rules in `style.css` were only font-size tweaks (`.location-line span`, `.highlights-copy p`, `.schedule-item span`, `.news-item time`, `.footer-meta`, etc.) — now resolved to a single value each, but worth a visual pass to confirm the sizes that "won" are the ones actually wanted.
- [ ] **Brownish navbar-area color** (stated priority #3) — root cause likely found: a leftover cream/tan palette (`#f3ded6`, `#8c6a5c`, `#6f5e57`, etc.) is currently overriding dark-token rules on `.section-kicker`, `.newsroom-panel`, `.criteria-panel`, `.competition-footer`, `.host-label` (see DESIGN.md §1). **Decide:** restore dark-token styling, or keep cream as an intentional accent and formalize it as a token.
- [ ] **Confirm real event date** — `CountdownTimer.tsx` targets `2027-01-21`, footer says `21-24 MARCH 2027`. Fix whichever is wrong.
- [ ] **Build competition detail page** — `#competition/<slug>` currently renders `NotFoundPage`; `EventCard` already links to it, so this is a live dead link, not just missing polish.

## From the client readiness checklist (pre-launch, all currently open per the checklist doc)
- [ ] Deployment: custom domain, HTTPS, no dev/preview URLs visible, refresh-safe routing
- [ ] Content/branding: placeholder content removed, logos/branding correct, favicon, page title, spelling pass
- [ ] Navigation: all navbar/footer/CTA/registration/accommodation/social links verified, 404 page verified
- [ ] Registration: full-flow test, field validation, duplicate-submission prevention, data storage check
- [ ] Accommodation: room availability/selection, booking flow, confirmation, data storage
- [ ] Payment: gateway in production, success/failure/cancel handling, duplicate-payment prevention, confirmation
- [ ] Mobile/responsive: full flow on mobile, no horizontal scroll, no cut-off content, tap targets
- [ ] Performance/security: asset optimization, no console errors, no exposed secrets, debug content removed
- [ ] Final journey: full incognito walkthrough on Chrome + Safari/mobile

## Needs more context to plan
- [ ] Get `pages/` (`HomePage`, `AccommodationPage`, `BookingPage`, `ExploreKeralaPage`, `NotFoundPage`), `data/navItems`, and `assets/images` added to this Project so registration/accommodation/payment logic (the areas most likely to hide *functional*, not just cosmetic, duplication) can actually be audited.
