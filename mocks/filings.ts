import type { Filing } from "@/lib/types";

function steps(activeIndex: number): Filing["steps"] {
  const defs: { key: Filing["steps"][number]["key"]; label: string }[] = [
    { key: "preparing", label: "Preparing" },
    { key: "reviewed", label: "Reviewed" },
    { key: "submitted", label: "Submitted" },
    { key: "approved", label: "Approved" },
  ];
  return defs.map((d, i) => ({
    ...d,
    state: i < activeIndex ? "done" : i === activeIndex ? "active" : "pending",
  }));
}

export const filings: Filing[] = [
  {
    id: "STR-2026-04472",
    name: "NAFDAC Registration",
    refLabel: "Chiamaka's Jollof Paste",
    reference: "STR-2026-04472",
    status: "action_needed",
    statusLabel: "Action needed",
    steps: steps(3),
    updatedAt: "Jun 24",
  },
  {
    id: "STR-2026-04471",
    name: "CAC Registration",
    reference: "STR-2026-04471",
    status: "approved",
    statusLabel: "Approved",
    steps: steps(4),
    updatedAt: "Jun 18",
  },
  {
    id: "STR-2026-04473",
    name: "Trademark Registration",
    reference: "STR-2026-04473",
    status: "in_progress",
    statusLabel: "In progress",
    steps: steps(1),
    updatedAt: "Jun 20",
  },
];

export function getFilingById(id: string): Filing | undefined {
  return filings.find((f) => f.id === id);
}

export interface FilingDoc {
  icon: string;
  name: string;
  action: string;
}

export interface FilingMessage {
  from: "them" | "me";
  fromLabel?: string;
  text: string;
  time: string;
}

export const filingDocsById: Record<string, FilingDoc[]> = {
  "STR-2026-04471": [
    { icon: "PDF", name: "Certificate of Registration", action: "Download" },
    { icon: "PDF", name: "CAC Form CAC/BN/1", action: "View" },
    { icon: "PDF", name: "Name search result", action: "View" },
  ],
  "STR-2026-04472": [
    { icon: "PDF", name: "NAFDAC Application Form", action: "View" },
    { icon: "PDF", name: "Product Label Draft", action: "View" },
  ],
  "STR-2026-04473": [{ icon: "PDF", name: "Trademark Application Draft", action: "View" }],
};

export const filingMessagesById: Record<string, FilingMessage[]> = {
  "STR-2026-04471": [
    {
      from: "them",
      fromLabel: "Tobi A. · Compliance",
      text: "Your CAC registration is confirmed and approved. Certificate is attached. RC number: BN-2026-481923.",
      time: "Jun 18 · 3:42 PM",
    },
    { from: "me", text: "Thank you! Do I need to do anything else after this?", time: "Jun 18 · 4:10 PM" },
    {
      from: "them",
      fromLabel: "Tobi A. · Compliance",
      text: "Your NAFDAC filing is next — already queued. Your NDPR policy is also live in Docs. Nothing to do on your end right now.",
      time: "Jun 18 · 4:14 PM",
    },
  ],
  "STR-2026-04472": [
    {
      from: "them",
      fromLabel: "Tobi A. · Compliance",
      text: "Product label upload required before we can proceed with your NAFDAC submission. Upload your label artwork to continue.",
      time: "Jun 24 · 11:05 AM",
    },
  ],
  "STR-2026-04473": [
    {
      from: "them",
      fromLabel: "Tobi A. · Compliance",
      text: "We found two similar registered names. Should we file as \"Chiamaka's Kitchen\" or \"Chiamaka's Kitchen NG\"?",
      time: "Today · 8:14 AM",
    },
  ],
};
