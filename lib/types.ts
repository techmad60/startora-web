// Shared domain types. Every screen reads through these instead of
// inlining shape assumptions, so Phase 3 (real API) only touches
// mocks/*.ts and any fetch wrappers, never component code.

export type EntityType = "BN" | "LTD";

export interface Business {
  name: string;
  entityType: EntityType;
  entityTypeLabel: string;
  rcNumber: string;
  state: string;
  lga: string;
  address: string;
  sector: string;
}

export interface Founder {
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  nin: string;
  dob: string;
  address: string;
}

export type FilingStatus = "approved" | "in_progress" | "action_needed" | "submitted";

export type FilingStepKey = "preparing" | "reviewed" | "submitted" | "approved";

export interface FilingStepState {
  key: FilingStepKey;
  label: string;
  state: "done" | "active" | "pending";
}

export interface Filing {
  id: string;
  name: string;
  refLabel?: string;
  reference: string;
  status: FilingStatus;
  statusLabel: string;
  steps: FilingStepState[];
  updatedAt: string;
}

export type ObligationBadge = "action" | "in_progress" | "todo";

export interface Obligation {
  id: string;
  number: string;
  name: string;
  meta: string;
  badge: ObligationBadge;
  badgeLabel: string;
}

export type DeadlineUrgency = "due" | "ok";

export interface Deadline {
  id: string;
  title: string;
  sub: string;
  dateLabel: string;
  urgency: DeadlineUrgency;
}

export type NotificationKind = "action" | "update" | "deadline";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  href: string;
}

export interface MessageThread {
  id: string;
  senderInitials: string;
  filingLabel: string;
  preview: string;
  time: string;
  unread: boolean;
  href: string;
}

export interface DocItem {
  id: string;
  name: string;
  category: string;
  issuedLabel: string;
  icon: string;
}

export interface Shareholder {
  id: string;
  name: string;
  initials: string;
  role: string;
  pct: number;
  nin: string;
  address: string;
}

export interface Witness {
  id: string;
  name: string;
  initials: string;
  relationship: string;
  phone: string;
  nin: string;
}

export type ComplianceStepStatus = "done" | "unlocked" | "locked";

export interface ComplianceStep {
  id: string;
  order: number;
  name: string;
  tag: string;
  tagVariant: "required" | "recommended";
  why: string;
  price: string;
  status: ComplianceStepStatus;
  ctaLabel: string;
  ctaHref: string;
}

export interface TrackingStep {
  id: string;
  name: string;
  sub: string;
  eta: string;
  state: "done" | "now" | "pending";
}

export interface PayLineItem {
  id: string;
  name: string;
  meta: string;
  priceLabel: string;
}

export type PaymentMethod = "card" | "transfer" | "ussd";

// ── Onboarding wizard (business profile, steps 1-5) ──────────────
export interface OnboardingState {
  businessName: string;
  businessDescription: string;
  operatingLength: "Just starting" | "Under 1 year" | "1–3 years" | "3+ years";
  fullLegalName: string;
  dob: string;
  nin: string;
  email: string;
  phone: string;
  residentialAddress: string;
  street: string;
  city: string;
  state: string;
  lga: string;
  activities: string[];
  entityType: EntityType;
}

export const emptyOnboardingState: OnboardingState = {
  businessName: "",
  businessDescription: "",
  operatingLength: "Just starting",
  fullLegalName: "",
  dob: "",
  nin: "",
  email: "",
  phone: "",
  residentialAddress: "",
  street: "",
  city: "",
  state: "",
  lga: "",
  activities: [],
  entityType: "LTD",
};

// ── CAC registration wizard (shareholders/witness/documents/preview/tracking) ──
export interface PersonDocs {
  signature: boolean;
  ninSlip: boolean;
  passportPhoto: boolean;
}

export interface CacWizardState {
  shareholders: Shareholder[];
  witnesses: Witness[];
  docsByPersonId: Record<string, PersonDocs>;
}

export const CAC_STEPS = ["shareholders", "witness", "documents", "preview", "tracking"] as const;
export type CacStep = (typeof CAC_STEPS)[number];
