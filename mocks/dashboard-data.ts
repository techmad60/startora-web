import type {
  AppNotification,
  Deadline,
  DocItem,
  MessageThread,
  Obligation,
} from "@/lib/types";

export const obligations: Obligation[] = [
  {
    id: "obl-1",
    number: "01",
    name: "Confirm trademark name",
    meta: "Waiting on your response · Today",
    badge: "action",
    badgeLabel: "Action",
  },
  {
    id: "obl-2",
    number: "02",
    name: "NAFDAC Registration",
    meta: "Submitted · awaiting approval",
    badge: "in_progress",
    badgeLabel: "In progress",
  },
  {
    id: "obl-3",
    number: "03",
    name: "Post-Incorporation Setup",
    meta: "Not yet started",
    badge: "todo",
    badgeLabel: "To do",
  },
];

export const deadlines: Deadline[] = [
  {
    id: "dl-1",
    title: "NDPR Policy Review",
    sub: "Annual review recommended",
    dateLabel: "Dec 2026",
    urgency: "due",
  },
  {
    id: "dl-2",
    title: "CAC Annual Return",
    sub: "Auto-filed by Startora",
    dateLabel: "Feb 2027",
    urgency: "ok",
  },
  {
    id: "dl-3",
    title: "Tax Filing",
    sub: "Coordinate with your accountant",
    dateLabel: "Jun 2027",
    urgency: "ok",
  },
];

export const notifications: AppNotification[] = [
  {
    id: "n-1",
    kind: "action",
    title: "Action needed — Trademark",
    desc: "We found two similar names. Confirm which to file before we proceed.",
    time: "Today · 8:14 AM",
    unread: true,
    href: "/filing-status",
  },
  {
    id: "n-2",
    kind: "update",
    title: "CAC Registration approved",
    desc: "Certificate is in your Docs. RC number: BN-2026-481923.",
    time: "Yesterday · 3:42 PM",
    unread: true,
    href: "/filing-status/STR-2026-04471",
  },
  {
    id: "n-3",
    kind: "deadline",
    title: "NDPR Policy review due in 6 months",
    desc: "Annual review due December 2026.",
    time: "Jun 28 · 9:00 AM",
    unread: true,
    href: "/deadlines",
  },
  {
    id: "n-4",
    kind: "update",
    title: "Payment of ₦300,000 confirmed",
    desc: "3 filings queued and under review.",
    time: "Jun 22 · 2:30 PM",
    unread: false,
    href: "/filing-status",
  },
];

export const messageThreads: MessageThread[] = [
  {
    id: "m-1",
    senderInitials: "TA",
    filingLabel: "Trademark · STR-2026-04473",
    preview: 'We found two similar names. Should we file as "Chiamaka\'s Kitchen" or "Chiamaka\'s Kitchen NG"?',
    time: "Today · 8:14 AM",
    unread: true,
    href: "/filing-status/STR-2026-04473",
  },
  {
    id: "m-2",
    senderInitials: "TA",
    filingLabel: "CAC Registration · STR-2026-04471",
    preview: "Certificate is confirmed. RC number: BN-2026-481923.",
    time: "Jun 18 · 3:42 PM",
    unread: false,
    href: "/filing-status/STR-2026-04471",
  },
  {
    id: "m-3",
    senderInitials: "TA",
    filingLabel: "NAFDAC · STR-2026-04472",
    preview: "Submitted. Response expected in 5–10 business days.",
    time: "Jun 24 · 11:05 AM",
    unread: false,
    href: "/filing-status/STR-2026-04472",
  },
];

export interface DocEntry {
  id: string;
  name: string;
  meta: string;
  iconLabel: "PDF" | "DOC";
  iconStyled: boolean;
  status: "view" | "pending";
}

export const certificateDocs: DocEntry[] = [
  { id: "cac-cert", name: "CAC Certificate of Registration", meta: "BN-2026-481923 · Issued Jun 18, 2026", iconLabel: "PDF", iconStyled: true, status: "view" },
  { id: "ndpr-policy", name: "NDPR Privacy Policy", meta: "Generated Jun 18, 2026 · Valid 1 year", iconLabel: "PDF", iconStyled: true, status: "view" },
  { id: "nafdac-cert", name: "NAFDAC Product Certificate", meta: "Pending · ~90 working days", iconLabel: "PDF", iconStyled: false, status: "pending" },
];

export const corporateDocs: DocEntry[] = [
  { id: "shareholders-reg", name: "Shareholders Register", meta: "2 shareholders · Updated Jun 18", iconLabel: "DOC", iconStyled: false, status: "view" },
  { id: "memart", name: "Memorandum & Articles of Association", meta: "Filed Jun 18, 2026", iconLabel: "DOC", iconStyled: false, status: "view" },
  { id: "receipts", name: "Payment Receipts", meta: "₦300,000 total · 1 payment", iconLabel: "PDF", iconStyled: false, status: "view" },
];

export const documents: DocItem[] = [
  { id: "doc-1", name: "CAC Certificate", category: "Registration", issuedLabel: "Issued Jun 18, 2026", icon: "cac-cert" },
  { id: "doc-2", name: "NDPR Privacy Policy", category: "Compliance", issuedLabel: "Issued Jun 20, 2026", icon: "ndpr-policy" },
  { id: "doc-3", name: "Register of Shareholders", category: "Registration", issuedLabel: "Issued Jun 18, 2026", icon: "shareholders-reg" },
  { id: "doc-4", name: "Memorandum & Articles", category: "Registration", issuedLabel: "Issued Jun 18, 2026", icon: "memart" },
  { id: "doc-5", name: "Payment Receipts", category: "Billing", issuedLabel: "3 receipts", icon: "receipts" },
];
