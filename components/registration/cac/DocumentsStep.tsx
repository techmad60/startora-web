"use client";

import Link from "next/link";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useCacWizardActions, useCacWizardState } from "@/lib/wizard/cac-context";
import type { PersonDocs } from "@/lib/types";

const DOC_SLOTS: { key: keyof PersonDocs; icon: string; label: string }[] = [
  { key: "signature", icon: "✍️", label: "Signature" },
  { key: "ninSlip", icon: "🪪", label: "NIN Slip" },
  { key: "passportPhoto", icon: "📷", label: "Passport Photo" },
];

const DEFAULT_DOCS: PersonDocs = { signature: false, ninSlip: false, passportPhoto: false };

export function DocumentsStep() {
  const { shareholders, witnesses, docsByPersonId } = useCacWizardState();
  const { setPersonDocs } = useCacWizardActions();

  const people = [
    ...shareholders.map((p) => ({ id: p.id, name: p.name, initials: p.initials, roleLabel: p.role })),
    ...witnesses.map((p) => ({ id: p.id, name: p.name, initials: p.initials, roleLabel: `Witness · ${p.relationship}` })),
  ];

  function toggleSlot(personId: string, key: keyof PersonDocs) {
    const current = docsByPersonId[personId] ?? DEFAULT_DOCS;
    setPersonDocs(personId, { ...current, [key]: !current[key] });
  }

  return (
    <>
      <RegBackNav href="/registration/cac/witness" label="Back" />
      <RegProgress step={3} total={3} />
      <div className="reg-step-label">Step 3 of 3 — Documents</div>
      <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Documents</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5 }}>
        Upload a signature, NIN slip, and passport photo for each shareholder and witness.
      </p>

      {people.map((person, i) => {
        const docs = docsByPersonId[person.id] ?? DEFAULT_DOCS;
        return (
          <div className="doc-person-block" key={person.id}>
            <div className="doc-person-head">
              <div className="doc-person-av" style={i % 2 === 1 ? { background: "var(--amber)" } : undefined}>
                {person.initials}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{person.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginLeft: 4 }}>· {person.roleLabel}</div>
            </div>
            <div className="upload-row">
              {DOC_SLOTS.map((slot) => (
                <div
                  key={slot.key}
                  className={`upload-item${docs[slot.key] ? " uploaded" : ""}`}
                  onClick={() => toggleSlot(person.id, slot.key)}
                >
                  <div className="upload-item-icon">{slot.icon}</div>
                  <div className="upload-item-label">{slot.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ background: "var(--ledger-soft)", borderRadius: 8, padding: "11px 13px", marginBottom: 20, fontSize: 12.5, color: "var(--ledger)" }}>
        Tap any slot to mark as uploaded. All files are encrypted and stored securely.
      </div>
      <Link className="btn btn-primary" href="/registration/cac/preview">
        Continue to Preview →
      </Link>
    </>
  );
}
