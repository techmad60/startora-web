/**
 * Single data-access layer for the whole app.
 *
 * Every function here is async, even though the mock data it wraps is
 * available synchronously — that's deliberate. A real backend call is
 * async, so every call site (`await getBusiness()`, etc.) is already
 * shaped correctly for Phase 3. When real endpoints exist, only the
 * function BODIES in this file change (mock reference → `fetch(...)`).
 * No component should import from `mocks/*` directly — everything
 * routes through here instead, so there's exactly one place to update.
 *
 * Server Components can `await` these directly. Client Components
 * can't `await` at the top level, so they receive this data as props
 * from a Server Component ancestor (see AppShell/FocusedShell/
 * RegistrationShell, and each wizard's layout.tsx) rather than calling
 * these functions themselves.
 *
 * The `server-only` import below is not a comment, it's enforcement:
 * if any "use client" file ever imports from this module — directly
 * or transitively — `next build` fails with an explicit error naming
 * the file that did it. Without this, a Client Component importing
 * from here would silently bundle this code (and, once real fetch()
 * calls with credentials exist, potentially those credentials) into
 * client-side JavaScript, inspectable by anyone. This turns that
 * mistake from a silent leak into a build failure.
 */
import "server-only";

import { business, founder, defaultShareholders, defaultWitnesses, complianceScore } from "@/mocks/business";
import {
  obligations,
  deadlines,
  notifications,
  messageThreads,
  certificateDocs,
  corporateDocs,
  documents,
  type DocEntry,
} from "@/mocks/dashboard-data";
import {
  filings,
  getFilingById as findFilingById,
  filingDocsById,
  filingMessagesById,
  type FilingDoc,
  type FilingMessage,
} from "@/mocks/filings";
import { complianceSteps, cacTrackingSteps, paymentLineItems, paymentTotalLabel } from "@/mocks/compliance-map";
import { scumlTrackingSteps } from "@/mocks/scuml-tracking";
import { serviceSectors, myRegistrations, startupDocs as startupDocsSummary, type ServiceSectorGroup, type RegistrationEntry, type StartupDocSummaryEntry } from "@/mocks/services";
import { startupDocGroups } from "@/mocks/startup-docs";
import { licenceSections, sectorTabs } from "@/mocks/registrations";
import { suggestedQuestions, quickTopics } from "@/mocks/chat-responses";
import { referralLink, referrals, type ReferralEntry } from "@/mocks/referral";

import type {
  Business,
  Founder,
  Shareholder,
  Witness,
  Obligation,
  Deadline,
  AppNotification,
  MessageThread,
  DocItem,
  Filing,
  ComplianceStep,
  TrackingStep,
  PayLineItem,
} from "@/lib/types";
import type { StartupDocGroup } from "@/mocks/startup-docs";
import type { LicenceGroup, LicenceSector } from "@/mocks/registrations";

// ── Business & founder ──────────────────────────────────────────
export async function getBusiness(): Promise<Business> {
  return business;
}

export async function getFounder(): Promise<Founder> {
  return founder;
}

export async function getComplianceScore(): Promise<number> {
  return complianceScore;
}

// ── Compliance map & tracking ───────────────────────────────────
export async function getComplianceSteps(): Promise<ComplianceStep[]> {
  return complianceSteps;
}

export async function getCacTrackingSteps(): Promise<TrackingStep[]> {
  return cacTrackingSteps;
}

export async function getScumlTrackingSteps(): Promise<TrackingStep[]> {
  return scumlTrackingSteps;
}

// ── Filings ──────────────────────────────────────────────────────
export async function getFilings(): Promise<Filing[]> {
  return filings;
}

export async function getFilingById(id: string): Promise<Filing | undefined> {
  return findFilingById(id);
}

export async function getFilingDocs(filingId: string): Promise<FilingDoc[]> {
  return filingDocsById[filingId] ?? [];
}

export async function getFilingMessages(filingId: string): Promise<FilingMessage[]> {
  return filingMessagesById[filingId] ?? [];
}

// ── Dashboard widgets ────────────────────────────────────────────
export async function getObligations(): Promise<Obligation[]> {
  return obligations;
}

export async function getDeadlines(): Promise<Deadline[]> {
  return deadlines;
}

export async function getNotifications(): Promise<AppNotification[]> {
  return notifications;
}

export async function getMessageThreads(): Promise<MessageThread[]> {
  return messageThreads;
}

// ── Documents ────────────────────────────────────────────────────
export async function getCertificateDocs(): Promise<DocEntry[]> {
  return certificateDocs;
}

export async function getCorporateDocs(): Promise<DocEntry[]> {
  return corporateDocs;
}

export async function getDocuments(): Promise<DocItem[]> {
  return documents;
}

// ── Payment ──────────────────────────────────────────────────────
export async function getPaymentLineItems(): Promise<PayLineItem[]> {
  return paymentLineItems;
}

export async function getPaymentTotalLabel(): Promise<string> {
  return paymentTotalLabel;
}

// ── Services / registrations catalog ────────────────────────────
export async function getServiceSectors(): Promise<ServiceSectorGroup[]> {
  return serviceSectors;
}

export async function getMyRegistrations(): Promise<RegistrationEntry[]> {
  return myRegistrations;
}

/** Short 3-item summary shown on the Services page. Distinct from getStartupDocGroups(), the full grouped catalog. */
export async function getStartupDocsSummary(): Promise<StartupDocSummaryEntry[]> {
  return startupDocsSummary;
}

/** Full grouped catalog shown on the /docs/startup page. */
export async function getStartupDocGroups(): Promise<StartupDocGroup[]> {
  return startupDocGroups;
}

export async function getLicenceSections(): Promise<Record<Exclude<LicenceSector, "all">, LicenceGroup[]>> {
  return licenceSections;
}

export async function getSectorTabs(): Promise<{ value: LicenceSector; label: string }[]> {
  return sectorTabs;
}

// ── Wizard defaults (seed data for client-side wizard state) ────
export async function getDefaultShareholders(): Promise<Shareholder[]> {
  return defaultShareholders;
}

export async function getDefaultWitnesses(): Promise<Witness[]> {
  return defaultWitnesses;
}

// ── Referral program ─────────────────────────────────────────────
export async function getReferralLink(): Promise<string> {
  return referralLink;
}

export async function getReferrals(): Promise<ReferralEntry[]> {
  return referrals;
}

// ── AI chat ──────────────────────────────────────────────────────
export async function getSuggestedQuestions(): Promise<string[]> {
  return suggestedQuestions;
}

export async function getQuickTopics(): Promise<string[]> {
  return quickTopics;
}

/**
 * lookupChatResponse is deliberately NOT re-exported from here.
 *
 * Every other function in this file is guarded by `server-only`
 * above — correct, because they return real page data. This one is
 * different: it's a synchronous, client-triggered lookup over
 * non-sensitive canned strings (see mocks/chat-responses.ts), called
 * from inside an event handler, not fetched at page load. It contains
 * nothing that needs hiding, and Client Components (MobileAiChat /
 * DesktopAiChat, via lib/useChatMessages.ts) need to call it directly.
 * Routing it through this server-only file would just break that with
 * no security benefit. It stays a direct import from mocks/ instead —
 * the one intentional exception to "everything goes through lib/api.ts".
 */
