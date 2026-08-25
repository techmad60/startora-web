import type { Business, Founder, Shareholder, Witness } from "@/lib/types";

export const business: Business = {
  name: "Chiamaka's Kitchen",
  entityType: "BN",
  entityTypeLabel: "Business Name (BN)",
  rcNumber: "BN-2026-481923",
  state: "Lagos",
  lga: "Ikeja LGA",
  address: "12 Adeniyi Jones Avenue, Ikeja, Lagos",
  sector: "Food Manufacturing & Distribution",
};

export const founder: Founder = {
  fullName: "Chiamaka Okonkwo",
  initials: "CO",
  email: "chiamaka@kitchenng.com",
  phone: "+234 810 000 0000",
  nin: "••• •••• 901",
  dob: "1992-03-14",
  address: "12 Adeniyi Jones Ave, Lagos",
};

export const defaultShareholders: Shareholder[] = [
  {
    id: "sh-1",
    name: "Chiamaka Okonkwo",
    initials: "CO",
    role: "Director & Shareholder",
    pct: 70,
    nin: "••• •••• 901",
    address: "12 Adeniyi Jones Ave, Lagos",
  },
  {
    id: "sh-2",
    name: "Emeka Okafor",
    initials: "EO",
    role: "Shareholder",
    pct: 30,
    nin: "••• •••• 447",
    address: "8 Allen Avenue, Lagos",
  },
];

export const defaultWitnesses: Witness[] = [
  {
    id: "wit-1",
    name: "Chidi Okonkwo",
    initials: "CO",
    relationship: "Spouse",
    phone: "+234 810 111 2222",
    nin: "••• •••• 552",
  },
];

export const complianceScore = 65;
