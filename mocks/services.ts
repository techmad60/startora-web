export type Sector = "all" | "basic" | "food" | "finance" | "energy";

export interface ServiceCatalogItem {
  id: string;
  name: string;
  body: string;
  priceLabel: string;
  action: { kind: "active" } | { kind: "start" | "enquire"; href: string };
}

export interface ServiceSectorGroup {
  sector: Exclude<Sector, "all">;
  label: string;
  items: ServiceCatalogItem[];
}

export const serviceSectors: ServiceSectorGroup[] = [
  {
    sector: "basic",
    label: "Core Registration",
    items: [
      { id: "cac", name: "CAC Business Registration", body: "Register your business with the CAC. The legal foundation for all other filings.", priceLabel: "CAC · ₦50,000", action: { kind: "active" } },
      { id: "trademark", name: "Trademark Registration", body: "Legally protect your brand name and logo from competitors.", priceLabel: "₦60,000", action: { kind: "active" } },
      { id: "ndpr", name: "NDPR Compliance", body: "Data protection documentation for businesses handling personal data.", priceLabel: "Included with CAC", action: { kind: "active" } },
      { id: "scuml", name: "SCUML Registration", body: "Required for designated non-financial businesses. Free to register.", priceLabel: "Free", action: { kind: "start", href: "/registration/scuml/1" } },
      { id: "annual-returns", name: "Annual Returns", body: "CAC Annual Returns filed automatically in February each year.", priceLabel: "₦20,000", action: { kind: "active" } },
      { id: "ltd-upgrade", name: "Ltd Company Upgrade", body: "Upgrade to Private Limited Company. Enables equity fundraising.", priceLabel: "₦75,000", action: { kind: "start", href: "/contact" } },
    ],
  },
  {
    sector: "food",
    label: "Food, Health & Pharmaceutical",
    items: [
      { id: "nafdac-food", name: "NAFDAC Food Registration", body: "Register packaged food products before sale or distribution in Nigeria.", priceLabel: "₦50,000", action: { kind: "active" } },
      { id: "nafdac-drug", name: "NAFDAC Drug Registration", body: "Register pharmaceutical products before they can be distributed.", priceLabel: "₦80,000", action: { kind: "start", href: "/contact" } },
      { id: "pharmacy", name: "Pharmacy Premises Licence", body: "Licence to operate a pharmacy or dispense medications.", priceLabel: "₦45,000", action: { kind: "start", href: "/contact" } },
    ],
  },
  {
    sector: "finance",
    label: "Financial Services",
    items: [
      { id: "pssp", name: "PSSP Licence", body: "CBN Payment Solution Service Provider licence for payment businesses.", priceLabel: "CBN · Enquire", action: { kind: "enquire", href: "/contact" } },
      { id: "microfinance", name: "Microfinance Bank Licence", body: "CBN licence to operate a microfinance bank.", priceLabel: "CBN · Enquire", action: { kind: "enquire", href: "/contact" } },
      { id: "capital-market", name: "Capital Market Registration", body: "SEC registration for fund managers and investment advisers.", priceLabel: "SEC · Enquire", action: { kind: "enquire", href: "/contact" } },
    ],
  },
  {
    sector: "energy",
    label: "Energy",
    items: [
      { id: "generation", name: "Generation Licence", body: "NERC licence for electricity generation including renewable energy.", priceLabel: "NERC · Enquire", action: { kind: "enquire", href: "/contact" } },
      { id: "mini-grid", name: "Mini-Grid Permit", body: "NERC permit for off-grid electricity providers.", priceLabel: "NERC · Enquire", action: { kind: "enquire", href: "/contact" } },
      { id: "lpg", name: "LPG Licence", body: "Licence for LPG trading and distribution from NMDPRA.", priceLabel: "NMDPRA · Enquire", action: { kind: "enquire", href: "/contact" } },
    ],
  },
];

export interface StartupDocSummaryEntry {
  id: string;
  icon: string;
  name: string;
  meta: string;
}

export const startupDocs: StartupDocSummaryEntry[] = [
  { id: "founders-agreement", icon: "DOC", name: "Founders Agreement", meta: "Equity split, roles, vesting" },
  { id: "nda", icon: "DOC", name: "Non-Disclosure Agreement", meta: "For investors, partners, employees" },
  { id: "cap-table", icon: "XLS", name: "Cap Table Template", meta: "Track ownership and dilution" },
];

export interface RegistrationEntry {
  id: string;
  name: string;
  meta: string;
  state: "active" | "add";
}

export const myRegistrations: RegistrationEntry[] = [
  { id: "cac-reg", name: "CAC Business Registration", meta: "Active since Jun 18, 2026", state: "active" },
  { id: "trademark-reg", name: "Trademark Registration", meta: "Awaiting name confirmation", state: "active" },
  { id: "ltd-reg", name: "Ltd Company Upgrade", meta: "Convert business name to Ltd", state: "add" },
];
