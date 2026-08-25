export interface StartupDocRow {
  name: string;
  meta: string;
  active?: boolean;
}

export interface StartupDocGroup {
  heading: string;
  rows: StartupDocRow[];
}

export const startupDocGroups: StartupDocGroup[] = [
  {
    heading: "Ownership & Equity",
    rows: [
      { name: "Cap Table", meta: "Founders, investors, ESOP pool", active: true },
      { name: "Founders' Agreement", meta: "Roles, equity split, exit clauses" },
      { name: "Shareholders' Agreement", meta: "Rights and obligations of all shareholders" },
      { name: "Vesting Schedule", meta: "Equity vesting for founders and team" },
    ],
  },
  {
    heading: "Fundraising",
    rows: [
      { name: "SAFE Note", meta: "Simple Agreement for Future Equity" },
      { name: "Term Sheet", meta: "Key terms for equity investment rounds" },
      { name: "Financial Model", meta: "3-year revenue, cost, and runway" },
    ],
  },
  {
    heading: "Team & IP",
    rows: [
      { name: "Employment Agreement", meta: "Offer letter with IP assignment clause" },
      { name: "IP Assignment Agreement", meta: "Assigns all IP built to the company" },
      { name: "NDA Template", meta: "For investors, partners, and new hires" },
    ],
  },
];
