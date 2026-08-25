export type LicenceSector = "all" | "basic" | "energy" | "health" | "finance" | "food";

export interface LicenceItem {
  name: string;
  body: string;
  badge: "active" | "add";
}

export interface LicenceGroup {
  heading: string;
  items: LicenceItem[];
}

export const licenceSections: Record<Exclude<LicenceSector, "all">, LicenceGroup[]> = {
  basic: [
    {
      heading: "Core Registration",
      items: [
        { name: "CAC Business Registration", body: "Corporate Affairs Commission (CAC)", badge: "active" },
        { name: "Ltd Company Upgrade", body: "Corporate Affairs Commission (CAC)", badge: "add" },
        { name: "Post-Incorporation Setup", body: "Corporate Affairs Commission (CAC)", badge: "add" },
      ],
    },
    { heading: "Brand Protection", items: [{ name: "Trademark Registration", body: "Trademarks, Patents & Designs Registry", badge: "active" }] },
    {
      heading: "Tax & Compliance",
      items: [
        { name: "Tax Identification Number (TIN)", body: "Federal Inland Revenue Service (FIRS)", badge: "add" },
        { name: "NDPR Compliance Registration", body: "Nigeria Data Protection Commission (NDPC)", badge: "active" },
        { name: "SCUML Certificate", body: "Special Control Unit Against Money Laundering", badge: "add" },
      ],
    },
    { heading: "Annual Obligations", items: [{ name: "Annual Returns", body: "Corporate Affairs Commission (CAC)", badge: "active" }] },
  ],
  energy: [
    {
      heading: "Electricity",
      items: [
        { name: "Generation Licence", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
        { name: "Distribution Licence", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
        { name: "Transmission Licence", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
        { name: "Electricity Trading Licence", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
        { name: "Mini-Grid Permit", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
        { name: "Embedded Generation Permit", body: "Nigerian Electricity Regulatory Commission (NERC)", badge: "add" },
      ],
    },
    {
      heading: "Petroleum",
      items: [
        { name: "Petroleum Exploration Licence (PEL)", body: "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)", badge: "add" },
        { name: "Petroleum Prospecting Licence (PPL)", body: "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)", badge: "add" },
        { name: "Petroleum Mining Lease (PML)", body: "Nigerian Upstream Petroleum Regulatory Commission (NUPRC)", badge: "add" },
        { name: "LPG Licence", body: "Nigerian Midstream & Downstream Petroleum Regulatory Authority (NMDPRA)", badge: "add" },
      ],
    },
  ],
  health: [
    {
      heading: "Product Registration",
      items: [
        { name: "Drug Registration Certificate", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "add" },
        { name: "Food Product Registration Certificate", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "active" },
        { name: "Medical Device Registration Certificate", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "add" },
      ],
    },
    {
      heading: "Practice & Facility",
      items: [
        { name: "Pharmacy Premises Licence", body: "Pharmacists Council of Nigeria (PCN)", badge: "add" },
        { name: "Pharmacist Registration Licence", body: "Pharmacists Council of Nigeria (PCN)", badge: "add" },
        { name: "Medical Laboratory Licence", body: "Medical Laboratory Science Council of Nigeria (MLSCN)", badge: "add" },
        { name: "Medical Practitioner Licence", body: "Medical and Dental Council of Nigeria (MDCN)", badge: "add" },
        { name: "Health Facility Registration Licence", body: "State Ministry of Health / Health Facility Regulatory Agency", badge: "add" },
      ],
    },
  ],
  finance: [
    {
      heading: "CBN Licences",
      items: [
        { name: "Payment Solution Service Provider (PSSP) Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
        { name: "Mobile Money Operator (MMO) Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
        { name: "Payment Service Bank (PSB) Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
        { name: "Switching Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
        { name: "Microfinance Bank (MFB) Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
        { name: "Finance Company Licence", body: "Central Bank of Nigeria (CBN)", badge: "add" },
      ],
    },
    {
      heading: "Other Compliance",
      items: [
        { name: "Capital Market Operator Registration", body: "Securities and Exchange Commission (SEC)", badge: "add" },
        { name: "Data Protection Compliance Registration", body: "Nigeria Data Protection Commission (NDPC)", badge: "add" },
        { name: "SCUML Certificate", body: "Special Control Unit Against Money Laundering (SCUML)", badge: "add" },
      ],
    },
  ],
  food: [
    {
      heading: "Registration & Manufacturing",
      items: [
        { name: "NAFDAC Food Product Registration", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "active" },
        { name: "Manufacturing Licence", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "add" },
        { name: "Product Certification (MANCAP)", body: "Standards Organisation of Nigeria (SON)", badge: "add" },
      ],
    },
    {
      heading: "Facility & Environment",
      items: [
        { name: "Factory Registration Certificate", body: "Federal Ministry of Labour and Employment", badge: "add" },
        { name: "Environmental Impact Assessment (EIA) Approval", body: "Federal Ministry of Environment", badge: "add" },
        { name: "Fertilizer Registration Certificate", body: "Federal Fertilizer Department (FFD)", badge: "add" },
        { name: "Pesticide Registration Certificate", body: "National Agency for Food and Drug Administration and Control (NAFDAC)", badge: "add" },
        { name: "Agricultural Quarantine Permit", body: "Nigeria Agricultural Quarantine Service (NAQS)", badge: "add" },
      ],
    },
  ],
};

export const sectorTabs: { value: LicenceSector; label: string }[] = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "energy", label: "Energy" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
  { value: "food", label: "Food" },
];
