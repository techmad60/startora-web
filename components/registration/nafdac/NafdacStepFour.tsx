"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useNafdacWizardActions, useNafdacWizardState } from "@/lib/wizard/nafdac-context";

export function NafdacStepFour() {
  const state = useNafdacWizardState();
  const { patch } = useNafdacWizardActions();

  function setDate(index: 0 | 1 | 2, value: string) {
    const next: [string, string, string] = [...state.inspectionDates];
    next[index] = value;
    patch({ inspectionDates: next });
  }

  return (
    <>
      <RegBackNav href="/registration/nafdac/3" label="Back" />
      <RegProgress step={4} total={5} />
      <div className="reg-eyebrow">NAFDAC Registration · Step 4 of 5</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Schedule facility inspection
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        NAFDAC inspectors will visit your production facility to verify Good Manufacturing Practices (GMP). Samples
        are collected during this visit.
      </p>
      <div className="warn-box">
        Your facility must meet GMP standards before inspection. NAFDAC will not collect samples if hygiene practices
        are unsatisfactory.
      </div>

      <div className="field-group">
        <label className="field-label">Production facility address</label>
        <input
          className="field"
          placeholder="Full address of where you manufacture"
          style={{ marginBottom: 0 }}
          value={state.facilityAddress}
          onChange={(e) => patch({ facilityAddress: e.target.value })}
        />
      </div>
      <div className="field-group">
        <label className="field-label">Preferred inspection dates (pick 2–3 options)</label>
        <input className="field" type="date" style={{ marginBottom: 8 }} value={state.inspectionDates[0]} onChange={(e) => setDate(0, e.target.value)} />
        <input className="field" type="date" style={{ marginBottom: 8 }} value={state.inspectionDates[1]} onChange={(e) => setDate(1, e.target.value)} />
        <input className="field" type="date" style={{ marginBottom: 0 }} value={state.inspectionDates[2]} onChange={(e) => setDate(2, e.target.value)} />
      </div>
      <div className="field-group">
        <label className="field-label">Contact person during inspection</label>
        <input
          className="field"
          placeholder="Name and phone number"
          style={{ marginBottom: 0 }}
          value={state.contactPerson}
          onChange={(e) => patch({ contactPerson: e.target.value })}
        />
      </div>

      <div className="info-box">
        Product samples are taken during inspection and sent to NAFDAC laboratory for analysis. This is the longest
        part of the process.
      </div>
      <Link className="btn btn-primary" href="/registration/nafdac/5">
        Continue to review →
      </Link>
      <Link className="btn btn-ghost" href="/registration/nafdac/3">
        Back
      </Link>
    </>
  );
}
