"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useScumlWizardState } from "@/lib/wizard/scuml-context";
import type { Business } from "@/lib/types";

export function ScumlStepThree({ business }: { business: Business }) {
  const state = useScumlWizardState();

  return (
    <>
      <RegBackNav href="/registration/scuml/2" label="Back" />
      <RegProgress step={3} total={4} />
      <div className="reg-eyebrow">SCUML Registration · Step 3 of 4</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Review before we submit
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5 }}>
        A Startora compliance reviewer will verify everything before sending to the SCUML portal.
      </p>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Business</div>
          <Link className="prev-edit" href="/registration/scuml/1">Edit</Link>
        </div>
        <div className="prev-row"><span className="pk">Name</span><span className="pv">{business.name}</span></div>
        <div className="prev-row"><span className="pk">Category</span><span className="pv">{state.category}</span></div>
        <div className="prev-row"><span className="pk">RC Number</span><span className="pv">{business.rcNumber}</span></div>
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Documents</div>
          <Link className="prev-edit" href="/registration/scuml/2">Edit</Link>
        </div>
        <div className="prev-row"><span className="pk">CAC Certificate</span><span className="pv" style={{ color: "var(--ledger)" }}>✓ Uploaded</span></div>
        <div className="prev-row"><span className="pk">Status Report</span><span className="pv" style={{ color: "var(--ledger)" }}>✓ Uploaded</span></div>
        <div className="prev-row"><span className="pk">TIN</span><span className="pv" style={{ color: state.tin ? "var(--ledger)" : "var(--amber)" }}>{state.tin ? "✓ Provided" : "Pending"}</span></div>
        <div className="prev-row"><span className="pk">BVN</span><span className="pv" style={{ color: state.bvn ? "var(--ledger)" : "var(--amber)" }}>{state.bvn ? "✓ Provided" : "Pending"}</span></div>
        <div className="prev-row"><span className="pk">Valid ID</span><span className="pv" style={{ color: state.validIdUploaded ? "var(--ledger)" : "var(--amber)" }}>{state.validIdUploaded ? "✓ Uploaded" : "Pending"}</span></div>
      </div>

      <div className="info-box">SCUML registration is completely free. No payment required. Certificate delivered by email in 14–21 days.</div>
      <Link className="btn btn-primary" href="/registration/scuml/tracking">
        Submit to SCUML →
      </Link>
      <Link className="btn btn-ghost" href="/registration/scuml/2">
        Go back and edit
      </Link>
    </>
  );
}
