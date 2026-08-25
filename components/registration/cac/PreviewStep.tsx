"use client";

import Link from "next/link";
import { RegBackNav } from "@/components/ui/WizardNav";
import type { Business } from "@/lib/types";
import { useCacWizardState } from "@/lib/wizard/cac-context";

export function PreviewStep({ business }: { business: Business }) {
  const { shareholders, witnesses, docsByPersonId } = useCacWizardState();
  const firstWitness = witnesses[0];

  return (
    <>
      <RegBackNav href="/registration/cac/documents" label="Back" />
      <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>Preview &amp; submit</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px" }}>
        Review everything before we send to CAC. Once submitted, changes require a formal amendment.
      </p>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Business</div>
          <Link className="prev-edit" href="/onboarding/3">
            Edit
          </Link>
        </div>
        <div className="prev-row"><span className="pk">Name</span><span className="pv">{business.name}</span></div>
        <div className="prev-row"><span className="pk">Type</span><span className="pv">{business.entityTypeLabel}</span></div>
        <div className="prev-row"><span className="pk">State</span><span className="pv">{business.state}</span></div>
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Shareholders</div>
          <Link className="prev-edit" href="/registration/cac/shareholders">
            Edit
          </Link>
        </div>
        {shareholders.map((sh) => (
          <div className="prev-row" key={sh.id}>
            <span className="pk">{sh.name}</span>
            <span className="pv">
              {sh.pct}% · {sh.role}
            </span>
          </div>
        ))}
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Witness</div>
          <Link className="prev-edit" href="/registration/cac/witness">
            Edit
          </Link>
        </div>
        {firstWitness ? (
          <>
            <div className="prev-row"><span className="pk">Name</span><span className="pv">{firstWitness.name}</span></div>
            <div className="prev-row"><span className="pk">Relationship</span><span className="pv">{firstWitness.relationship}</span></div>
          </>
        ) : (
          <div className="prev-row">
            <span className="pk">No witness added yet</span>
            <span className="pv" style={{ color: "var(--amber)" }}>
              Required
            </span>
          </div>
        )}
      </div>

      <div className="prev-block">
        <div className="prev-block-head">
          <div className="prev-block-title">Documents</div>
          <Link className="prev-edit" href="/registration/cac/documents">
            Edit
          </Link>
        </div>
        {[...shareholders, ...witnesses].map((person) => {
          const docs = docsByPersonId[person.id];
          const allDone = docs && docs.signature && docs.ninSlip && docs.passportPhoto;
          const firstName = person.name.split(" ")[0];
          return (
            <div className="prev-row" key={person.id}>
              <span className="pk">{firstName}&apos;s documents</span>
              <span className="pv" style={{ color: allDone ? "var(--ledger)" : "var(--amber)" }}>
                {allDone ? "✓ Uploaded" : "Pending"}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ background: "var(--ledger-soft)", borderRadius: 8, padding: 13, marginBottom: 20, fontSize: 12.5, color: "var(--ledger)", lineHeight: 1.5 }}>
        A Startora compliance reviewer will check everything before submission. You&apos;ll be notified immediately
        if anything is missing.
      </div>
      <Link className="btn btn-primary" href="/registration/cac/tracking">
        Submit to CAC →
      </Link>
      <Link className="btn btn-ghost" href="/registration/cac/documents">
        Back and complete
      </Link>
    </>
  );
}
