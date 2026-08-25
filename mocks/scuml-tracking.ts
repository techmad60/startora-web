import type { TrackingStep } from "@/lib/types";

export const scumlTrackingSteps: TrackingStep[] = [
  { id: "s-1", name: "Documents verified by Startora", sub: "All requirements confirmed", eta: "Today · 10:30 AM", state: "done" },
  { id: "s-2", name: "Submitted to SCUML portal", sub: "Application live on EFCC system", eta: "In progress", state: "now" },
  { id: "s-3", name: "SCUML review", sub: "Government processing", eta: "Est. 14–21 business days", state: "pending" },
  { id: "s-4", name: "E-certificate issued", sub: "Delivered to chiamaka@kitchenng.com and your Docs", eta: "Free of charge", state: "pending" },
];
