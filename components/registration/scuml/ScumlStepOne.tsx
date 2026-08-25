"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useScumlWizardActions, useScumlWizardState } from "@/lib/wizard/scuml-context";
import type { ScumlCategory } from "@/lib/wizard/scuml-context";

const CATEGORIES: { value: ScumlCategory; sub: string }[] = [
  { value: "Real Estate", sub: "Agents, developers, property managers" },
  { value: "Hotel & Hospitality", sub: "Hotels, guest houses, short-let operators" },
  { value: "Car Dealership", sub: "Buying and selling of vehicles" },
  { value: "Supermarket / Retail", sub: "High-volume consumer goods retail" },
  { value: "Professional Services", sub: "Accountants, lawyers, auditors" },
  { value: "Jewellery / Luxury Goods", sub: "Dealers in precious metals, gems, luxury items" },
  { value: "NGO / Non-profit", sub: "All registered non-profit entities" },
];

export function ScumlStepOne() {
  const { category } = useScumlWizardState();
  const { patch } = useScumlWizardActions();

  return (
    <>
      <RegBackNav href="/services" label="Back" />
      <RegProgress step={1} total={4} />
      <div className="reg-eyebrow">SCUML Registration · Step 1 of 4</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        What type of business do you run?
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        SCUML is required for Designated Non-Financial Institutions (DNFIs). Select your category to confirm
        eligibility.
      </p>
      <div className="info-box">
        SCUML registration is free of charge and your e-certificate is delivered directly to your email within
        14–21 days.
      </div>

      {CATEGORIES.map((c) => (
        <div key={c.value} className={`qualifier-card${category === c.value ? " sel" : ""}`} onClick={() => patch({ category: c.value })}>
          <div>
            <div className="qualifier-label">{c.value}</div>
            <div className="qualifier-sub">{c.sub}</div>
          </div>
          <div className="q-check">{category === c.value ? "✓" : ""}</div>
        </div>
      ))}

      <Link className="btn btn-primary" href="/registration/scuml/2" style={{ marginTop: 20 }}>
        Confirm eligibility →
      </Link>
    </>
  );
}
