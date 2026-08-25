"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { UploadZoneItem } from "@/components/ui/UploadZoneItem";
import { useNafdacWizardActions, useNafdacWizardState } from "@/lib/wizard/nafdac-context";

export function NafdacStepTwo() {
  const { docs } = useNafdacWizardState();
  const { toggleDoc } = useNafdacWizardActions();

  return (
    <>
      <RegBackNav href="/registration/nafdac/1" label="Back" />
      <RegProgress step={2} total={5} />
      <div className="reg-eyebrow">NAFDAC Registration · Step 2 of 5</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Business documents
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        Startora has prefilled what it already has. Upload what&apos;s missing.
      </p>

      <div className="field-group">
        <label className="field-label">CAC Certificate of Incorporation</label>
        <UploadZoneItem icon="📄" text="CAC Certificate" sub="Prefilled ✓" done={docs.cacCertificate} />
      </div>
      <div className="field-group">
        <label className="field-label">Trademark approval (recommended)</label>
        <UploadZoneItem
          icon="™️"
          text="Upload trademark certificate"
          sub="Protects your product name — strongly advised"
          done={docs.trademarkApproval}
          onToggle={() => toggleDoc("trademarkApproval")}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Food handlers&apos; health certificates</label>
        <UploadZoneItem
          icon="🏥"
          text="Upload health certificates"
          sub="Sputum, stool, urine, Widal & Hepatitis B for all production staff"
          done={docs.healthCertificates}
          onToggle={() => toggleDoc("healthCertificates")}
        />
      </div>

      <Link className="btn btn-primary" href="/registration/nafdac/3">
        Continue →
      </Link>
      <Link className="btn btn-ghost" href="/registration/nafdac/1">
        Back
      </Link>
    </>
  );
}
