# Startora Web — Next.js conversion (feature-complete, centralized data layer)

## Running it

`node_modules/` and `package-lock.json` are correctly absent — I don't
have network access in this environment, so I cannot run `npm install`,
and neither of those can exist without it.

```bash
npm install
npm run dev
```

## Data architecture

**`lib/api.ts` is the single place every screen reads data from.**
Every function is `async` and currently wraps mock data — swapping to
a real backend later means editing function bodies in this one file,
not hunting through 40+ components. No component imports from `mocks/*`
directly anymore, with one deliberate, documented exception (see below).

`import "server-only"` at the top of `lib/api.ts` makes this a hard
build-time rule, not a convention: if any Client Component ever imports
from it — now or by accident later — `next build` fails with an
explicit error naming the file, instead of silently bundling that code
(and, once real credentials exist in those function bodies) into
client-side JavaScript.

Server Components (`page.tsx` files, `AppShell`, `FilingDetail`, etc.)
`await` these functions directly. Client Components can't `await` at
the top level, so they receive the same data as **props**, fetched
once by the nearest Server Component ancestor — usually the page, or
for the shell chrome (Sidebar/MobileTopbar/NotificationBell),
`AppShell`/`RegistrationShell` themselves, which are now async.

**The one exception:** `lookupChatResponse` (AI chat's canned-response
matching) is NOT in `lib/api.ts`. It's a synchronous, client-triggered
lookup over non-sensitive strings, called from an event handler — a
Server Component can't pre-fetch the answer to a question the user
hasn't typed yet, and there's nothing here worth hiding anyway. It
stays a direct import from `mocks/chat-responses.ts`, which
`lib/useChatMessages.ts` already used correctly. Everything else
(`suggestedQuestions`, `quickTopics` — static, known at page load) goes
through the normal `lib/api.ts` + prop-threading path like everything
else.

## Restructuring this required

Making `AppShell` async (so it could fetch founder/notification data
once instead of every child importing mocks separately) meant it could
no longer be rendered directly from inside a `"use client"` file — a
real Next.js constraint, not a style preference. 7 pages hit this
(settings sub-pages, referral, contact, registrations, business
profile). Each was split into a thin async Server Component `page.tsx`
plus a separate Client Component holding just the interactive bits,
receiving data as props.

The CAC wizard's shareholder seed data was the trickiest case: it
seeds a `useReducer`'s initial state inside a Context Provider, which
is a Client Component and can't await. Fixed by making
`registration/cac/layout.tsx` async, fetching the seed data via
`lib/api.ts`, and passing it into `CacWizardProvider` as a prop — the
reducer itself moved inside the component body so `RESET` can close
over the correctly-seeded state.

## Verification method

Every batch of changes was checked with a real TypeScript compiler run
(`tsc --noEmit`, using minimal ambient stubs for `react`/`next` since
this sandbox has no network access to install the real `@types/*`
packages), not just written and assumed correct. Each checkpoint
confirmed zero new errors beyond the known stub-induced noise (missing
contextual event-handler typing, React's special `key` prop handling —
both artifacts of the stub being deliberately minimal, not real bugs).
The stub file itself is never part of the delivered project — leaving
it in would conflict with the real `@types/react` once `npm install`
actually runs.

## What's built — all 42 routes, every screen from the source prototype

**Auth:** sign-in/create account, forgot/reset password (real password
strength meter), email/WhatsApp verify (real 6-digit auto-advancing OTP
input), how-heard, referral-code.

**Onboarding:** steps 1–5, processing screen, done screen.

**Dashboard, compliance map, payment, payment receipt** — responsive.

**Registration wizards, all four:** CAC (shareholders/witness/documents/
preview/tracking), NAFDAC (5 steps + payment + success), SCUML (3 steps
+ tracking), Trademark (lead capture).

**App-shell screens:** filing status (list + detail with per-filing
docs/messages), docs (with a working preview modal), services (desktop
sector filtering), registrations catalog (48 licences, 5 sectors),
notifications (real tab state), profile, health score, deadlines,
referral (real clipboard copy + WhatsApp share), contact (real submit
flow), startup docs, business profile page, AI chat (mobile + desktop,
real canned-response matching), AI voice, settings (account, password,
notifications, privacy, billing).

## Real bugs found and fixed during the build (not invented, not silent)

- `noUncheckedIndexedAccess` (a strict tsconfig setting already in this
  project) caught unsafe positional array indexing (`filings[0]`,
  `filings[1]`, `filings[2]`) in the filing-status screens — fixed by
  looking up by ID instead, which is also more robust to the mock data
  ever being reordered.
- A settings toggle passed a possibly-`undefined` value into a prop
  typed as required `boolean` — fixed with a fallback.
- `registrations` page had an icon lookup typed to exclude `"all"`
  while both defining and using an `"all"` entry at runtime — the type
  was just wrong. Fixed.
- `.fl2-step-lbl`/`.fl2-step-labels` — real, used in the desktop filing
  table, unstyled in source (added). Distinct from `.fl2-labels`/
  `.fl2-label`, styled in source and used by the mobile filing card —
  `FilingProgressDots` takes a `labelVariant` prop for both.
- `.pill`/`.pill.green`/`.pill.amber` — real status-badge classes used
  4x in source markup, never styled there. Added.
- Several spots of hardcoded "Chiamaka's Kitchen" demo text scattered
  across components instead of reading from mock data — fixed to
  source from `business.name`/`founder.fullName`, including a filing's
  `refLabel` field that already existed in the mock but wasn't being
  used, and two duplicated message-thread text blocks now correctly
  reuse the same `filingMessagesById` source as the filing-detail page
  instead of drifting from it.
- `sendAI`/`sendAIText` (mobile AI chat) were dead in source — only the
  desktop panel's `deskAISend`/`deskAIText` worked. Unified both onto
  one real `useChatMessages` hook.
- `updatePwStrength()` was called (reset-password, settings-password)
  but never implemented — real strength meter built for both.
- Multiple large files (`registrations-all.html`, `settings-billing.html`)
  had a second unrelated screen's markup pasted in as dead debris near
  the end of the file — same root cause as `auth/splash.html`'s
  duplicate `payment.html` copy found early on. Dropped in each case.

## Architecture notes

- `AppShell` (sidebar+topbar+tabbar) / `FocusedShell` (bare, auth+onboarding)
  / `RegistrationShell` (focused + topbar, the four registration wizards)
  — matched to how each screen's source file is actually structured.
- Wizards each get their own Context + `useReducer` in `lib/wizard/`,
  persisted to `sessionStorage`.
- `FlowScreen` component covers the auth sub-screens (verify, forgot
  password) that share a `.flow-screen` layout in source.

## Decisions made without asking, earlier phases (still standing)

1. Two competing desktop dashboard renderings existed in source
   (`.desk-only` and a dead `.r-desk-only` block). Kept only the working one.
2. Wizard screens lost their header entirely at 768px+ in source. Fixed
   with a scoped `.focused-shell` rule, later corrected to a 1024px
   threshold after real-device testing showed large phones exceeding 768px.
3. `onboarding/step5.html`'s final button had two `onclick` attributes —
   only the broken one fired. Fixed.
4. `runOBCLight()` / `triggerAskMe()` were called but never implemented
   in source. Both rebuilt.
5. `auth/splash.html` contained a full duplicate copy of `payment.html`
   as dead markup — dropped, and used as the source for the real
   `/payment` route.
6. `FocusedShell` was wrapping every screen in `.body`, which added
   22px of padding never present in source. Both shells now let each
   screen bring its own root wrapper instead of forcing one.



