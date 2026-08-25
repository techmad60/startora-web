"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { UploadZoneItem } from "@/components/ui/UploadZoneItem";
import { useNafdacWizardActions, useNafdacWizardState } from "@/lib/wizard/nafdac-context";

export function NafdacStepThree() {
  const { docs, manufacturingProcess } = useNafdacWizardState();
  const { toggleDoc, patch } = useNafdacWizardActions();

  return (
    <>
      <RegBackNav href="/registration/nafdac/2" label="Back" />
      <RegProgress step={3} total={5} />
      <div className="reg-eyebrow">NAFDAC Registration · Step 3 of 5</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Product documents
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        Specific to your product. NAFDAC requires each of these before scheduling an inspection.
      </p>

      <div className="field-group">
        <label className="field-label">Product label / artwork</label>
        <UploadZoneItem
          icon="🏷️"
          text="Upload product label"
          sub="Must show ingredients, manufacturing date, expiry, usage instructions"
          done={docs.productLabel}
          onToggle={() => toggleDoc("productLabel")}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Complete product formula / ingredients list</label>
        <UploadZoneItem
          icon="📋"
          text="Upload formula document"
          sub="Detailed breakdown of all ingredients and quantities"
          done={docs.formulaDocument}
          onToggle={() => toggleDoc("formulaDocument")}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Certificate of analysis (raw materials &amp; finished product)</label>
        <UploadZoneItem
          icon="🔬"
          text="Upload certificate of analysis"
          sub="Issued by a certified laboratory"
          done={docs.certificateOfAnalysis}
          onToggle={() => toggleDoc("certificateOfAnalysis")}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Manufacturing process description</label>
        <textarea
          className="textarea"
          placeholder="Describe step-by-step how your product is manufactured…"
          style={{ minHeight: 90 }}
          value={manufacturingProcess}
          onChange={(e) => patch({ manufacturingProcess: e.target.value })}
        />
      </div>

      <Link className="btn btn-primary" href="/registration/nafdac/4">
        Continue →
      </Link>
      <Link className="btn btn-ghost" href="/registration/nafdac/2">
        Back
      </Link>
    </>
  );
}
