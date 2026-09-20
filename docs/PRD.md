# PRD — ASME EFx India 2027 @ SJCET Palai

## 1. Overview
Event website for **ASME EFx (Engineering Festival x) India 2027**, hosted by **SJCET Palai** (co-branded ASME EFx × SJCET). The site is the primary channel for participant discovery, registration, accommodation booking, and payment for a multi-day inter-college engineering fest (competitions + workshops).

> ⚠️ **Unresolved:** :

## 2. Goals
- Drive participant registrations from multiple colleges (stat band targets: 500+ participants, 40+ colleges, 10 competitions, 24 workshop hours).
- Let participants complete registration → accommodation → payment in one flow without dropping off.
- Give host-college (SJCET) and title sponsor (ASME EFx) branding equal, correct billing throughout.
- Be usable as a credible portfolio/academic-showcase artifact in addition to serving the live event.

## 3. Users
- **Participants** (students from other colleges) — browse events, register, book stay, pay.
- **SJCET / ASME organizers** — reference site for schedule, updates, logistics; source of truth for attendees.
- **General visitors** — explore competitions and Kerala tourism content, no login implied.

## 4. Core features (observed in current build)
| Feature | Status | Notes |
|---|---|---|
| Home page (hero, countdown, stats, event grid, schedule, newsroom) | Built | `HomePage` referenced but not in this Project's file set |
| Mobile dock / desktop navbar | Built | `Dock.tsx` |
| Event/competition cards | Built | `EventCard.tsx`; links to `#competition/<slug>` |
| Competition detail page | **Not implemented** | `App.tsx` routes any `#competition/*` hash to `NotFoundPage` |
| Explore Kerala page | Built | Not in this Project's mounted files |
| Accommodation browsing + selection | Built | `AccommodationPage`, not in mounted files |
| Multi-step booking (registration → accommodation → summary/payment) | Built | `BookingPage`, not in mounted files |
| Payment integration | Unverified | Checklist item "Payment gateway works in production" unchecked |
| 404 handling | Built | `NotFoundPage` |
| Loading screen | Built, flagged for rework | User priority #1 fix |

## 5. Out of scope / unconfirmed
- User accounts / login (checklist mentions auth "where applicable" — unclear if any part of the flow requires it).
- Competition detail content — needs a real page, currently 404s.
- Anything in `pages/`, `data/`, `assets/` — not present in this Claude Project; PRD scope limited to what's been reviewed.

## 6. Success criteria
Defined by `EFx_SJCET_Final_Client_Readiness_Checklist.md` in this repo — deployment, content/branding accuracy, navigation, registration, accommodation, payment, mobile responsiveness, performance/security, and a full incognito user-journey test, ending in **"Client-ready."**

## 7. Known risks
- Date inconsistency (see above) — content-accuracy risk.
- Competition detail route is a dead end today — functional gap, not just polish.
- CSS had significant dead/conflicting rules (see ARCHITECTURE/TASKS) — now cleaned up, but indicates the codebase has accumulated copy-paste drift that could recur in `pages/`.
