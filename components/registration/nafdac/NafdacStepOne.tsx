"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useNafdacWizardActions, useNafdacWizardState } from "@/lib/wizard/nafdac-context";
import type { ProductCategory } from "@/lib/wizard/nafdac-context";
import type { Business } from "@/lib/types";

const CATEGORIES: ProductCategory[] = ["Food", "Cosmetics", "Drugs", "Medical Device", "Chemicals", "Packaged Water"];

export function NafdacStepOne({ business }: { business: Business }) {
  const state = useNafdacWizardState();
  const { patch } = useNafdacWizardActions();

  return (
    <>
      <RegBackNav href="/services" label="Back" />
      <RegProgress step={1} total={5} />
      <div className="reg-eyebrow">NAFDAC Registration · Step 1 of 5</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        What product are you registering?
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        NAFDAC registration applies to any product you manufacture, import, package or distribute. Each product
        requires a separate registration.
      </p>
      <div className="warn-box">
        You must have a valid CAC registration before applying. {business.name} is already registered ✓
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 10, fontWeight: 500 }}>
          Select product category
        </div>
        <div className="product-type-row">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={`product-type${state.productCategory === cat ? " sel" : ""}`}
              onClick={() => patch({ productCategory: cat })}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Product name</label>
        <input
          className="field"
          placeholder="e.g. Chiamaka's Jollof Paste"
          style={{ marginBottom: 0 }}
          value={state.productName}
          onChange={(e) => patch({ productName: e.target.value })}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Is this product locally manufactured or imported?</label>
        <div className="chip-row" style={{ marginBottom: 0 }}>
          <div className={`chip${state.origin === "local" ? " sel" : ""}`} onClick={() => patch({ origin: "local" })}>
            Locally manufactured
          </div>
          <div className={`chip${state.origin === "imported" ? " sel" : ""}`} onClick={() => patch({ origin: "imported" })}>
            Imported
          </div>
        </div>
      </div>

      <div className="info-box">Food registration takes approximately 90 working days. Fee: ₦50,000 payable via Remita.</div>
      <Link className="btn btn-primary" href="/registration/nafdac/2">
        Continue →
      </Link>
    </>
  );
}
