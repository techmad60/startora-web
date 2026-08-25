export interface ReferralEntry {
  initials: string;
  name: string;
  status: string;
}

export const referralLink = "startora.co/ref/chiamaka";

export const referrals: ReferralEntry[] = [
  { initials: "AO", name: "Adaeze Okeke", status: "Registered · CAC filed" },
  { initials: "TM", name: "Tunde Musa", status: "Registered · 2 filings active" },
];
