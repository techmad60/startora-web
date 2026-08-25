import type { ComplianceStep, PayLineItem, TrackingStep } from "@/lib/types";

export const complianceSteps: ComplianceStep[] = [
  {
    id: "map-step1",
    order: 1,
    name: "CAC Business Registration",
    tag: "Required",
    tagVariant: "required",
    why: "Every Nigerian business must be registered with the CAC before it can legally trade, open a bank account, or apply for any other licence.",
    price: "₦50,000 · filed within 24 hours",
    status: "done",
    ctaLabel: "Approved",
    ctaHref: "/payment",
  },
  {
    id: "map-step2",
    order: 2,
    name: "NDPR Compliance",
    tag: "Required",
    tagVariant: "required",
    why: "You collect customer data. Nigerian law requires a privacy policy and data protection documentation for any business handling personal data.",
    price: "Included with CAC registration",
    status: "unlocked",
    ctaLabel: "Start NDPR compliance",
    ctaHref: "/payment",
  },
  {
    id: "map-step3",
    order: 3,
    name: "NAFDAC Registration",
    tag: "Required",
    tagVariant: "required",
    why: "You sell packaged food. Every product must be NAFDAC-registered before it can legally be sold or distributed in Nigeria.",
    price: "₦50,000 NAFDAC fee · ~90 working days",
    status: "unlocked",
    ctaLabel: "Start NAFDAC registration",
    ctaHref: "/registration/nafdac/1",
  },
  {
    id: "map-step4",
    order: 4,
    name: "Trademark Registration",
    tag: "Recommended",
    tagVariant: "recommended",
    why: "Your CAC registration does not protect your brand name. A trademark is the only legal way to own \"Chiamaka's Kitchen\" in Nigeria.",
    price: "₦60,000 · 6–9 month process",
    status: "unlocked",
    ctaLabel: "Start trademark registration",
    ctaHref: "/registration/trademark",
  },
  {
    id: "map-step5",
    order: 5,
    name: "SCUML Registration",
    tag: "If applicable",
    tagVariant: "recommended",
    why: "Required for designated non-financial businesses. Free to register. Protects you from regulatory action.",
    price: "Free · 14–21 days · e-certificate by email",
    status: "unlocked",
    ctaLabel: "Start SCUML registration",
    ctaHref: "/registration/scuml/1",
  },
];

export const cacTrackingSteps: TrackingStep[] = [
  { id: "t-1", name: "Documents received", sub: "All files uploaded and verified", eta: "Jun 22, 2026 · 3:00 PM", state: "done" },
  { id: "t-2", name: "Compliance review complete", sub: "Reviewed by Tobi A. — cleared for submission", eta: "Jun 22, 2026 · 4:15 PM", state: "done" },
  { id: "t-3", name: "Submitted to CAC portal", sub: "Application is live on the CAC system", eta: "In progress · Jun 23, 2026", state: "now" },
  { id: "t-4", name: "CAC processing", sub: "Government review and approval", eta: "Est. 2–5 business days", state: "pending" },
  { id: "t-5", name: "Certificate issued", sub: "Certificate appears in your Docs automatically", eta: "Est. Jun 30, 2026", state: "pending" },
];

export const paymentLineItems: PayLineItem[] = [
  { id: "pay-1", name: "CAC Business Registration", meta: "Filed within 24 hours", priceLabel: "₦50,000" },
  { id: "pay-2", name: "NAFDAC Registration", meta: "Packaged food · end-to-end filing", priceLabel: "₦250,000" },
  { id: "pay-3", name: "NDPR Compliance", meta: "Privacy policy + data audit", priceLabel: "Included" },
];

export const paymentTotalLabel = "₦300,000";
