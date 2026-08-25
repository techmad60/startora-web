"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useNafdacWizardState } from "@/lib/wizard/nafdac-context";

export function NafdacStepFive() {
  const state = useNafdacWizardState();
  const docChecks: { label: string; done: boolean }[] = [
    { label: "CAC Certificate", done: state.docs.cacCertificate },
    { label: "Product label", done: state.docs.productLabel },
    { label: "Formula document", done: state.docs.formulaDocument },
    { label: "Certificate of analysis", done: state.docs.certificateOfAnalysis },
    { label: "Health certificates", done: state.docs.healthCertificates },
  ];
  const firstInspectionDate = state.inspectionDates.find((d) => d) || "Not yet set";

  return (
    <>
      <RegBackNav href="/registration/nafdac/4" label="Back" />
      <RegProgress step={5} total={5} />
      <div className="reg-eyebrow">NAFDAC Registration · Step 5 of 5</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Review &amp; submit
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5 }}>
        Startora submits directly to the NAFDAC e-registration portal and handles all follow-up communication.
      </p>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Product</div>
          <Link className="prev-edit" href="/registration/nafdac/1">Edit</Link>
        </div>
        <div className="prev-row"><span className="pk">Name</span><span className="pv">{state.productName || "—"}</span></div>
        <div className="prev-row"><span className="pk">Category</span><span className="pv">{state.productCategory}</span></div>
        <div className="prev-row"><span className="pk">Origin</span><span className="pv">{state.origin === "local" ? "Locally manufactured" : "Imported"}</span></div>
        <div className="prev-row"><span className="pk">NAFDAC fee</span><span className="pv">₦50,000</span></div>
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Documents</div>
          <Link className="prev-edit" href="/registration/nafdac/3">Edit</Link>
        </div>
        {docChecks.map((d) => (
          <div className="prev-row" key={d.label}>
            <span className="pk">{d.label}</span>
            <span className="pv" style={{ color: d.done ? "var(--ledger)" : "var(--amber)" }}>{d.done ? "✓" : "Pending"}</span>
          </div>
        ))}
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Inspection</div>
          <Link className="prev-edit" href="/registration/nafdac/4">Edit</Link>
        </div>
        <div className="prev-row"><span className="pk">Facility</span><span className="pv">{state.facilityAddress || "—"}</span></div>
        <div className="prev-row"><span className="pk">Preferred date</span><span className="pv">{firstInspectionDate}</span></div>
      </div>

      <div className="info-box">
        Total timeline: ~90 working days for food products. Startora tracks every stage and updates you at each
        milestone.
      </div>
      <Link className="btn btn-primary" href="/registration/nafdac/payment">
        Pay ₦50,000 &amp; submit →
      </Link>
      <Link className="btn btn-ghost" href="/registration/nafdac/4">
        Go back
      </Link>
    </>
  );
}
