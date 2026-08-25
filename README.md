# Startora Web — Developer Handoff

Next.js 14 (App Router) conversion of Startora's 57-screen prototype. **Every screen is
built and navigable. Nothing is connected to a real backend yet** — all data comes from
files in `mocks/`. This document is the map for wiring up the real thing.

Read section 3 before touching any code — the whole app is built around one rule, and
nothing else here makes sense without it.

---

## 1. Getting started

```bash
npm install
npm run dev
```

No environment variables exist yet, because nothing real is connected. Section 7 lists
what you'll need to add as you wire up each piece.

Requires Node 18+. Next.js 14.2.5, React 18.3.1 — both pinned in `package.json`,
upgrade deliberately, not incidentally.

---

## 2. Project shape

```
app/
  (app)/          → routes with sidebar+topbar+tabbar chrome (dashboard, filing-status, etc.)
  (focused)/      → bare routes: auth, onboarding, the 4 registration wizards
components/       → one subfolder per feature area, mirrors the routes
lib/
  api.ts          → THE data layer. Read section 3.
  types.ts        → every domain type in the app
  wizard/         → Context+useReducer state for each multi-step wizard
mocks/            → all current data lives here — nothing else should import from here directly
```

42 routes total. Full list at the bottom of this file if you need it.

---

## 3. The one thing to understand before anything else

**Every piece of data in this app flows through `lib/api.ts`.** Not "should flow
through" — it already does. No component imports from `mocks/` directly (with one
documented exception, see below). Every function in that file is `async` and currently
just returns mock data:

```ts
export async function getBusiness(): Promise<Business> {
  return business; // ← this line is the only thing that changes in Phase 3
}
```

**This is the entire integration surface.** Wiring up a real backend means editing
function bodies in this one file. No component, no page, nothing else needs to change,
because every call site already does `await getBusiness()` and already handles it as
an async call.

### Why every function is async even though mocks are instant

Because a real backend call is async. The shape is already correct for the swap.

### `import "server-only"` at the top of the file — this is not decoration

If any Client Component (`"use client"`) ever imports from `lib/api.ts` — now, or by
accident later — **`next build` fails**, naming the offending file. This is
intentional and it matters: once real credentials live in these function bodies (a
database connection string, a Clerk secret key, whatever), this is what stops them
from silently ending up in client-side JavaScript where anyone can read them from dev
tools. Do not remove this import to "fix" a build error — fix the actual import
instead (see next point).

### Server Components vs. Client Components — why this isn't optional

Next.js App Router has a hard rule: Client Components can't `await` at the top level,
so they can't call `lib/api.ts` functions directly. Every page in this app is
structured as: an `async` Server Component (`page.tsx`, or sometimes a `layout.tsx`)
`await`s the data it needs, then passes it down as **props** to whatever Client
Component actually renders the interactive UI.

If you need a new page to show new data:
1. Add a function to `lib/api.ts`
2. `await` it in that page's Server Component
3. Pass the result down as props

If you're tempted to just `import` a mock directly into a Client Component to save a
step — don't. That's the exact mistake `server-only` exists to catch.

### The one deliberate exception

`lookupChatResponse` (AI chat's keyword matching) lives in `mocks/chat-responses.ts`
and is imported directly by `lib/useChatMessages.ts`, a Client Component hook — not
through `lib/api.ts`. This is intentional: it's triggered by a user typing a question,
not by page load, so a Server Component has no answer to pre-fetch. There's also
nothing sensitive in it. Every other function follows the normal rule.

---

## 4. Every function in `lib/api.ts`

For each one: what it returns, what it currently wraps, and every page/component that
currently calls it. "Called from" lists the Server Component that does the actual
`await` — if that component's job is just to fetch and hand off, the real UI consumer
is named too.

### Business & founder

**`getBusiness(): Promise<Business>`**
Name, entity type, RC number, state, LGA, address, sector. Currently returns the
single hardcoded `business` mock (Chiamaka's Kitchen) — real version needs to key off
the logged-in user's business (or selected business, once multi-business support
exists — the UI already has a "Register a new business" affordance implying more than
one business per account eventually).
Called from: `dashboard/page.tsx`, `health-score/page.tsx`, `payment/page.tsx`,
`payment/receipt/page.tsx`, `profile/page.tsx`, `settings/account/page.tsx`,
`settings/billing/page.tsx`, `filing-status/page.tsx`, `business/[slug]/page.tsx`,
`registration/trademark/page.tsx`, `contact/page.tsx`, `ai-chat/page.tsx`,
`onboarding/done` (via `StepDone`), and threaded into 3 registration wizard steps
(NAFDAC step 1, NAFDAC payment, SCUML step 3, CAC preview) via their `[step]/page.tsx`
dispatchers.

**`getFounder(): Promise<Founder>`**
Name, initials, email, phone, NIN, DOB, address. Real version: the logged-in user's
profile, from whatever auth/user table you end up with.
Called from: `AppShell` and `RegistrationShell` themselves (see below — this one's
special), plus `dashboard/page.tsx`, `profile/page.tsx`, `settings/account/page.tsx`,
`contact/page.tsx`, `ai-chat/page.tsx`, `business/[slug]/page.tsx` (business owners
list currently reuses shareholder data, not founder — worth revisiting),
`onboarding/done`.

> **`getFounder`/`getNotifications` are fetched once per request at the shell level,
> not per-page.** `AppShell` and `RegistrationShell` both call these and pass the
> results down as props into `Sidebar`, `MobileTopbar`, and `NotificationBell` — that's
> why almost every page shows the right founder name and unread badge without
> individually fetching it. If you swap `getFounder()` for a real `currentUser()`-style
> call, this is the one place a real auth provider's rate limits could actually bite —
> it's called from every single page's shell, not once per app load. Consider caching
> it per-request (React's `cache()` or Next's request memoization) once it's real.

**`getComplianceScore(): Promise<number>`**
A single 0–100 number. Currently hardcoded to 65. Real version presumably computes
this from filing status + obligations, or a backend service returns it precomputed.
Called from: `health-score/page.tsx`, `ai-chat/page.tsx` → `DesktopAiChat`,
`business/[slug]/page.tsx`, `dashboard/page.tsx` → `HealthCard`.

### Compliance map & tracking

**`getComplianceSteps(): Promise<ComplianceStep[]>`**
The 5-step compliance roadmap (CAC → SCUML → NAFDAC → trademark → annual returns),
each with a lock/unlock state, price, and CTA link. Real version: computed per
business based on sector + what's already filed.
Called from: `compliance-map/page.tsx`, `onboarding/done` (via `StepDone`).

**`getCacTrackingSteps()` / `getScumlTrackingSteps(): Promise<TrackingStep[]>`**
The 4-step "Preparing → Reviewed → Submitted → Approved" timeline shown after
submitting a CAC or SCUML filing. Real version: this is literally the filing's actual
status, polled or pushed from whatever government-portal integration exists (see
section 5 — this doesn't exist as a product to plug in, it's custom work).
Called from: `registration/cac/[step]/page.tsx` (tracking step) and
`registration/scuml/tracking/page.tsx` respectively.

### Filings

**`getFilings(): Promise<Filing[]>`**
All filings for the current business (currently 3 hardcoded: CAC/approved,
NAFDAC/action-needed, trademark/in-progress). Real version: a real query, probably
`WHERE business_id = ?`.
Called from: `dashboard/page.tsx` → `DesktopDashboard`'s filing table.

**`getFilingById(id): Promise<Filing | undefined>`**
Single filing lookup. Note it's genuinely `| undefined` — three call sites
(`filing-status/page.tsx`, `DesktopFilingStatus`, `MobileFilingStatus`) all guard
against this and return `null` if any of the three hardcoded IDs come back missing.
Keep that guard when this becomes a real query — don't assume the row exists.
Called from: `filing-status/page.tsx`, `filing-status/[filingId]/page.tsx` (via
`FilingDetail`).

**`getFilingDocs(filingId)` / `getFilingMessages(filingId)`**
Per-filing document list and message thread. Real version: these are almost certainly
their own tables (`filing_documents`, `filing_messages`), not columns on `filings`.
Called from: `filing-status/[filingId]/page.tsx` (via `FilingDetail`),
`filing-status/page.tsx` (both mobile and desktop cards show the latest trademark
message as a preview).

### Dashboard widgets

**`getObligations(): Promise<Obligation[]>`** — the "Pending obligations" card.
**`getDeadlines(): Promise<Deadline[]>`** — the "Deadlines & renewals" card, also
its own full page (`deadlines/page.tsx`, which currently has its own hardcoded
overdue/upcoming content that doesn't even call this function — worth reconciling).
**`getNotifications(): Promise<AppNotification[]>`** — also drives the unread badge
on every page's notification bell, via `AppShell`/`RegistrationShell` (same pattern as
`getFounder` above).
**`getMessageThreads(): Promise<MessageThread[]>`** — the Messages tab on
`/notifications`.
Called from: `dashboard/page.tsx`, `notifications/page.tsx`, `AppShell`,
`RegistrationShell`.

### Documents

**`getCertificateDocs()` / `getCorporateDocs(): Promise<DocEntry[]>`**
Two sections of the Docs screen — issued certificates vs. corporate records. Real
version: probably one `documents` table with a `category` column, split client-side,
rather than two separate queries — your call.
Called from: `docs/page.tsx`.

**`getDocuments(): Promise<DocItem[]>`**
A different, shorter document list — used for the business profile page's "Documents
obtained" section. Overlaps conceptually with the two functions above; worth deciding
whether these should actually be the same data source before building three separate
backend queries for what might be one table.
Called from: `business/[slug]/page.tsx`.

### Payment

**`getPaymentLineItems()` / `getPaymentTotalLabel()`**
What's being paid for and the formatted total. Read section 5 — the actual payment
flow is 100% fake right now, this only feeds the display.
Called from: `payment/page.tsx`, `payment/receipt/page.tsx`,
`settings/billing/page.tsx`.

### Services / registrations catalog

**`getServiceSectors(): Promise<ServiceSectorGroup[]>`** — desktop services page,
sector-filtered service catalog.
**`getMyRegistrations()`** — mobile services page, "your registrations" summary.
**`getStartupDocsSummary()`** — mobile services page, 3-item document summary.
**`getStartupDocGroups()`** — the full startup-documents catalog
(`docs/startup/page.tsx`) — a different, longer list than the summary above.
**`getLicenceSections()` / `getSectorTabs()`** — the 48-licence, 5-sector
registrations catalog.
These six are mostly static reference content (what licences exist, what they cost) —
plausibly a CMS or a seeded read-only table rather than user-generated data. Lower
priority to make dynamic than anything above.
Called from: `services/page.tsx`, `docs/startup/page.tsx`, `registrations/page.tsx`.

### Wizard seed data

**`getDefaultShareholders(): Promise<Shareholder[]>`**
Seeds the CAC wizard's shareholder list with the founder pre-filled as 100% owner.
Fetched in `registration/cac/layout.tsx` and passed into `CacWizardProvider` as a
prop — it can't be fetched by the provider itself, since that's a Client Component
(see section 3). Real version: probably just derives from `getFounder()`, not a
separate table.
Called from: `registration/cac/layout.tsx`.

**`getDefaultWitnesses(): Promise<Witness[]>`**
Defined, returns real mock data, but **nothing currently calls it** — the CAC wizard's
witness step starts empty and doesn't use this. Either wire it in or remove it;
currently dead code.

### Referral program

**`getReferralLink()` / `getReferrals()`**
Referral link + list of who's signed up through it. Real version needs actual
referral-code generation and attribution tracking — currently a static string and a
2-item hardcoded list.
Called from: `referral/page.tsx`.

### AI chat

**`getSuggestedQuestions()` / `getQuickTopics()`**
Static prompt suggestions shown in the AI chat UI. Genuinely static content, not user
data — fine to leave as-is or move to a CMS, low priority.
Called from: `ai-chat/page.tsx`.

(`lookupChatResponse` is the AI chat exception — see section 3. It's in
`mocks/chat-responses.ts`, not `lib/api.ts`, and it's the biggest fake-vs-real gap in
the whole app — see section 5.)

---

## 5. Everything that needs real backend work

Ordered roughly by "how badly does the app not work without this," not alphabetically.

### 1. Authentication — currently doesn't exist at all
`/auth/sign-in`'s "Sign in" button is a `<Link href="/dashboard">`. It does not check
what you typed. There is no session, no password check, no logic of any kind — anyone
who navigates to `/dashboard` sees Chiamaka's Kitchen's data, full stop. Same for every
other route: nothing is protected. This has to be solved before anything else here
matters, because right now there's no concept of "which user" any of these functions
should even query for.

No `middleware.ts` exists. Adding real auth means adding one, protecting the `(app)`
and `(focused)/registration` route groups, and leaving `(focused)/auth` and
`(focused)/onboarding` public.

### 2. A real database, for everything in section 4
Every function in `lib/api.ts` returns mock data. All of it needs a real source. See
section 6 for a schema sketch based on the existing TypeScript types.

### 3. Wizard submission — the biggest silent gap
This is easy to miss because the UI looks complete: every "Submit to CAC," "Submit to
SCUML," and "Pay ₦100,000" button in every wizard is **just a `<Link>` to the next
screen**. None of them send anything anywhere. A user can fill out the entire CAC
shareholder/witness/document flow, click Submit, and land on a tracking screen showing
fake progress for a filing that was never created.

Every wizard (`lib/wizard/cac-context.tsx`, `nafdac-context.tsx`, `scuml-context.tsx`,
plus onboarding's `lib/wizard/onboarding-context.tsx`) currently only persists to
`sessionStorage` — gone on browser close, never sent to a server. Each one needs a
real submit action wired to its final button.

### 4. File upload — currently a boolean toggle
Every "upload your ID," "upload signature," "upload product label" control in every
wizard (`UploadZoneItem` component) is a checkbox pretending to be a file picker —
clicking it just flips a `done: boolean` in local state. No file is ever selected,
read, or stored. Needs real `<input type="file">` handling plus wherever you're
storing files (S3, Supabase Storage, Cloudflare R2, etc.).

### 5. Payment processing — currently zero integration
The "🔒 Secured by Paystack" badge on the NAFDAC payment screen is decorative. There is
no Paystack, Flutterwave, or any processor wired in anywhere. The entire payment flow
is UI only.

### 6. Government portal integration — CAC, NAFDAC, SCUML
Worth being direct about this one: **there is no off-the-shelf backend for this.**
Unlike auth (Clerk, Auth0) or a database (Supabase, Neon), nobody sells "CAC filing
API as a service." This is custom integration work against Nigerian government systems
regardless of what you plug in for everything else, and it's the part of this project
most likely to need real research into what access those portals actually offer before
any code gets written.

### 7. Real AI chat — currently a 3-question lookup table
`mocks/chat-responses.ts` does an exact string match against 3 hardcoded questions and
returns a canned fallback for anything else. Wiring up a real model (with real
knowledge of the business's actual filing status, ideally) is a separate, sizeable
piece of work — the UI and message-threading (`lib/useChatMessages.ts`) are already
built and don't need to change, just what answers the question.

### 8. Real-time updates
Notifications, message threads, and filing status are all static reads right now — no
websocket, no polling, no revalidation. Worth deciding early whether "refresh the page
to see updates" is acceptable for v1 or whether this needs to be live.

---

## 6. Suggested database schema (sketch)

Based directly on `lib/types.ts` — not a spec, a starting point. Every field listed
there needs a home somewhere.

```
businesses
  id, owner_id (fk users), name, entity_type, rc_number, state, lga, address, sector

users  (or however your auth provider structures this)
  id, full_name, email, phone, nin, dob, address

filings
  id, business_id (fk), type (cac|nafdac|scuml|trademark), status, reference,
  ref_label, updated_at

filing_steps
  id, filing_id (fk), key, label, state, sort_order

filing_documents
  id, filing_id (fk), name, icon, storage_url

filing_messages
  id, filing_id (fk), from (them|me), from_label, text, sent_at

obligations, deadlines, notifications
  id, business_id (fk), + the fields already in lib/types.ts for each

shareholders, witnesses
  id, business_id (fk), name, initials, role/relationship, nin, address/phone, pct

referrals
  id, referrer_id (fk users), referred_name, status, reward_amount

payments
  id, business_id (fk), amount, method, line_items (jsonb or its own table), status
```

`filing_steps` as its own table (rather than a jsonb column) is worth it specifically
because `getCacTrackingSteps()`/`getScumlTrackingSteps()` need live status per step,
not just a snapshot.

---

## 7. Environment variables you'll need to add

None exist yet — nothing real is connected. As you wire up each piece from section 5,
you'll add things like:

```
# Auth (whichever you pick)
CLERK_SECRET_KEY=              # server-only, never NEXT_PUBLIC_
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Database
DATABASE_URL=                  # server-only

# File storage
S3_BUCKET= / SUPABASE_STORAGE_KEY=   # server-only

# Payment
PAYSTACK_SECRET_KEY=           # server-only
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# AI
OPENAI_API_KEY= / ANTHROPIC_API_KEY=   # server-only
```

The `NEXT_PUBLIC_` prefix is Next.js's explicit signal to inline a value into
client-side JavaScript. Anything without it stays server-only, same guarantee as the
`server-only` import in `lib/api.ts`. Don't prefix secrets.

---

## 8. Architecture notes worth knowing

- **Three page-chrome patterns**, matched to what each screen actually needs:
  `AppShell` (sidebar+topbar+tabbar — most of the app), `FocusedShell` (bare — auth,
  onboarding), `RegistrationShell` (focused + topbar — the 4 registration wizards).
- **Each wizard gets its own Context + `useReducer`** in `lib/wizard/`, currently
  persisted to `sessionStorage`. Onboarding, CAC, NAFDAC, and SCUML are all
  independent — switching between flows doesn't cross-contaminate drafts.
- **Desktop and mobile are separate components**, not one responsive component —
  `DesktopDashboard` vs. dashboard's mobile cards, `DesktopFilingStatus` vs.
  `MobileFilingStatus`, etc. Both render in the DOM; CSS (`.desk-only` / `.mob-hide`
  at the 1024px breakpoint) shows one and hides the other. If you add a field to one,
  check whether the other needs it too.
- **No TypeScript build tooling was available while building this** (sandboxed
  environment, no network access for `npm install`). Every change was checked with a
  real `tsc --noEmit` run using hand-written minimal type stubs for `react`/`next` —
  catches real logic errors, but can't catch everything a full `next build` would
  (see `README-buildlog.md` for exactly what that did and didn't cover). Run a real
  `npm run build` before you trust this in production; I never could.

Full build history, every bug found and fixed during construction, and the reasoning
behind smaller decisions (breakpoints, dead-code removal, source debris found and
dropped) is in `README-buildlog.md` — worth a skim if something looks like an odd
choice and you want to know if it was deliberate.

---

## 9. Landing page

**Lives at `/app`, not `/`.** `/` still redirects to `/auth/sign-in` — that's the
original behavior from before the landing page existed, restored deliberately when
troubleshooting a persistent-redirect issue on a preview deployment made it worth
isolating the landing page onto its own route rather than fighting a caching layer at
the root path. If you want it back at `/`, move `app/app/page.tsx` to `app/page.tsx`
and delete the redirect stub — the component itself doesn't care which route renders
it.

`components/landing/` — 17 sections, entirely static content, no `lib/api.ts` calls,
since there's no user-specific data on a public marketing page.

**Went through a real content revision after initial feedback — worth knowing why:**
- The first version put revenue and profit margin in the trust bar. That's investor
  material, not something a client registering their business needs to see. Replaced
  with client-relevant stats only: businesses served, referral rate (framed as
  satisfaction, not growth), months of manual validation.
- The first version named "Amazon Bedrock" specifically in the security section —
  publicly disclosing a specific infrastructure vendor is giving away detail
  competitors don't need and clients don't care about. Rewritten to describe the
  *outcome* (private inference, no public endpoints) without naming what's underneath.
- Testimonials were initially left out entirely with an explanation about not wanting
  to fabricate quotes. That's the right instinct but the wrong execution — the
  business has real clients and real testimonials to add later. `LandingTestimonials`
  now exists as a real section with three clearly-marked placeholder slots
  (`[Client name]`, `[Business name]`, bracketed quote text) — find it in
  `components/landing/LandingTestimonials.tsx` and swap in real quotes whenever
  they're ready. Don't ship the bracketed placeholder text to production.

**A real bug worth knowing about, in case it looks unrelated later:** the app shell's
CSS forces `body { overflow: hidden; height: 100vh }` at 768px+ so the sidebar layout
doesn't scroll the whole page. That's correct for every other route, but would have
made the landing page unscrollable and clipped to one screen height on desktop. Fixed
with a `body:has(.lp) { ... }` override — if you ever see a page mysteriously refuse
to scroll past 100vh, check whether it's missing the `.lp` wrapper class or whether
this override needs to extend to it.

CTAs point at `/auth/sign-in` throughout — that one screen already handles both
sign-in and the create-account entry point, so there was no reason to build separate
destinations. The two "Register your business" CTAs (hero and final section) route
through `RegisterCtaButton` first, which shows a mock-data disclosure modal before
navigating — see below.

`/` now redirects to `/app` (the landing page) instead of straight to `/auth/sign-in`.

## 10. Mock-data disclosure modal

`components/landing/RegisterCtaButton.tsx` — **every** button on the landing page
that leads to `/auth/sign-in` goes through this first: nav ("Sign in", "Get
started"), hero and final-section ("Register your business", "Sign in"), and footer
("Sign in", "Create account"). All seven. `/contact` in the footer is the one
exception — it's not an auth destination, so it stays a plain `Link`.

Renders via a React portal into `document.body`, not inline — the hero section has
`overflow: hidden` (needed to contain the decorative stamp circle, which intentionally
bleeds outside the hero's bounds), and `position: fixed` escaping an ancestor's
`overflow: hidden` is inconsistent across browsers, particularly on mobile WebKit.
Portal-rendering into `document.body` sidesteps the question entirely — the modal is
never a descendant of any section's DOM tree, so no section's overflow, transform, or
stacking context can affect it regardless of which button triggered it.

**Copy is deliberately confident, not apologetic** — "we're in the last stretch of
connecting it to our live systems," not "this is mock data, sorry." Says the same
thing, lands very differently to someone about to register a real business.

Since `RegisterCtaButton` renders a real `<button>`, not an `<a>`, two existing CSS
rules that only ever targeted anchor tags (`.lp-nav-signin`, `.lp-footer-col a`)
needed their own button-reset treatment (`background: none; border: none; padding: 0`)
— a `<button>` without that reset picks up ugly browser-default padding and borders
that a `<Link>` never would. Worth remembering if you add another text-style CTA here
later: check whether the class was ever written with only `<a>` in mind.

## 11. Empty dashboard redesign + first-time welcome tour

`components/dashboard/EmptyDashboardBody.tsx` — full rebuild of `/dashboard/empty`.
The previous version crammed a greeting, subtext, and 4 numbered steps into one dark
card with no visual hierarchy. This version separates that into a plain header (no
card), a prominent bordered CTA card with its own visual weight, and step rows with
real icons instead of bare numbers — same pattern the rest of the app already uses
for multi-step content (compliance map, wizard progress).

**First-time welcome tour**: on first visit, shows the same 4 steps as a modal before
the person even sees the page behind it. Tracked via `localStorage`
(`startora.seenWelcomeTour.v1`) — chosen over `sessionStorage` deliberately, since
"first time" should mean the actual first time, not just this browser tab. Won't
show again once dismissed, in this browser, unless that key is cleared.

Reuses the same portal-rendering technique as the landing page's `RegisterCtaButton`
(renders into `document.body`, not inline) for the same reason — avoids any
ancestor's `overflow`/stacking context ever being able to clip it. Also reuses the
`.lp-modal`/`.lp-modal-overlay` CSS from the landing page, since those are standalone
classes with no `.lp`-ancestor dependency — confirmed before reusing them here, not
assumed. The dismiss button uses the app's own `.btn .btn-primary`, not the landing
page's `.lp-btn` — the modal shell is shared, but everything inside it matches
whichever context it's actually rendered in.

Both the inline step list and the tour modal read from the same `STEPS` array defined
once at the top of the file — update the four steps in one place, both surfaces stay
in sync.

## 12. Removed an unnecessary `mounted` state from both portal-based modals

Both `RegisterCtaButton.tsx` and `EmptyDashboardBody.tsx`'s welcome tour originally
guarded `createPortal` behind a `mounted` state set in a `useEffect`, intended to
avoid calling `createPortal` before `document` exists during server rendering. It
was unnecessary in both cases specifically because the state that gates the portal
call (`open`, `showTour`) can only ever become `true` from code that itself only
runs client-side — a click handler in one case, a `useEffect` in the other. Neither
can fire during server rendering or before hydration completes, so by the time the
portal conditional evaluates true, `document.body` is already guaranteed to exist.
Removing `mounted` didn't reintroduce any risk — it removed a check that was never
actually doing anything. The portal itself stays, in both files — that's what
actually fixes the modal being clippable by an ancestor's `overflow: hidden`
(covered in sections 9 and 11), and removing it would have reintroduced that bug.

Also added an arrow to `RegisterCtaButton`'s "Continue" button ("Continue →"),
matching the arrow style already used on the other primary CTAs on the page.

## Full route list (43)

```
/  → redirects to /app
/app  (landing page)
/auth/sign-in  /auth/referral-code  /auth/whatsapp-verify  /auth/email-verify
/auth/how-heard  /auth/forgot-password  /auth/reset-password
/onboarding/[1-5]  /onboarding/complete  /onboarding/done
/dashboard  /dashboard/empty  /compliance-map  /payment  /payment/receipt
/registration/cac/[shareholders|witness|documents|preview|tracking]
/registration/nafdac/[1-5]  /registration/nafdac/payment  /registration/nafdac/success
/registration/scuml/[1-3]  /registration/scuml/tracking
/registration/trademark
/filing-status  /filing-status/[filingId]
/docs  /docs/startup  /services  /registrations  /notifications
/profile  /health-score  /deadlines  /referral  /contact
/settings/account  /settings/password  /settings/notifications
/settings/privacy  /settings/billing
/business/[slug]  /ai-chat  /ai-voice
```
