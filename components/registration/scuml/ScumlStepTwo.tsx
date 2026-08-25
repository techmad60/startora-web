"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { UploadZoneItem } from "@/components/ui/UploadZoneItem";
import { useScumlWizardActions, useScumlWizardState } from "@/lib/wizard/scuml-context";

export function ScumlStepTwo() {
  const state = useScumlWizardState();
  const { patch, toggleId } = useScumlWizardActions();

  return (
    <>
      <RegBackNav href="/registration/scuml/1" label="Back" />
      <RegProgress step={2} total={4} />
      <div className="reg-eyebrow">SCUML Registration · Step 2 of 4</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Upload your documents
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        These are the official SCUML requirements. Startora prefills what it already has from your CAC registration.
      </p>

      <div className="field-group">
        <label className="field-label">CAC Certificate of Registration</label>
        <UploadZoneItem icon="📄" text="CAC Certificate" sub="Prefilled from your registration ✓" done />
      </div>
      <div className="field-group">
        <label className="field-label">CAC Status Report / Form BN-01</label>
        <UploadZoneItem icon="📄" text="Status Report" sub="Prefilled from your registration ✓" done />
      </div>
      <div className="field-group">
        <label className="field-label">Tax Identification Number (TIN)</label>
        <input className="field" placeholder="Enter your TIN" style={{ marginBottom: 0 }} value={state.tin} onChange={(e) => patch({ tin: e.target.value })} />
      </div>
      <div className="field-group">
        <label className="field-label">BVN of proprietor/director</label>
        <input className="field" placeholder="11-digit BVN" style={{ marginBottom: 0 }} value={state.bvn} onChange={(e) => patch({ bvn: e.target.value })} />
      </div>
      <div className="field-group">
        <label className="field-label">Bank name &amp; account number</label>
        <input className="field" placeholder="Bank name" style={{ marginBottom: 8 }} value={state.bankName} onChange={(e) => patch({ bankName: e.target.value })} />
        <input className="field" placeholder="Account number" style={{ marginBottom: 0 }} value={state.accountNumber} onChange={(e) => patch({ accountNumber: e.target.value })} />
      </div>
      <div className="field-group">
        <label className="field-label">Valid ID of proprietor</label>
        <UploadZoneItem
          icon="🪪"
          text="Upload valid ID"
          sub="NIN card, international passport, or driver's licence"
          done={state.validIdUploaded}
          onToggle={toggleId}
        />
      </div>

      <Link className="btn btn-primary" href="/registration/scuml/3">
        Continue →
      </Link>
    </>
  );
}
