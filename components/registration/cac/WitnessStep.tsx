"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useCacWizardActions, useCacWizardState } from "@/lib/wizard/cac-context";
import type { Witness } from "@/lib/types";

const RELATIONSHIPS = ["Spouse", "Parent", "Sibling", "Friend", "Other"] as const;

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const emptyForm = { name: "", relationship: "Spouse" as string, phone: "", nin: "" };

export function WitnessStep() {
  const { witnesses } = useCacWizardState();
  const { addWitness } = useCacWizardActions();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function submit() {
    if (!form.name.trim()) return;
    const witness: Witness = {
      id: `wit-${Date.now()}`,
      name: form.name.trim(),
      initials: initialsOf(form.name),
      relationship: form.relationship,
      phone: form.phone || "—",
      nin: form.nin || "—",
    };
    addWitness(witness);
    setForm(emptyForm);
    setModalOpen(false);
  }

  return (
    <>
      <RegBackNav href="/registration/cac/shareholders" label="Back" />
      <RegProgress step={2} total={3} />
      <div className="reg-step-label">Step 2 of 3 — Witness</div>
      <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Witness</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5 }}>
        CAC requires at least one witness. A witness can be a spouse, sibling, parent, or trusted person — not a
        shareholder in this business.
      </p>

      <div id="wit-list">
        {witnesses.map((w) => (
          <div className="sh-card" key={w.id}>
            <div className="sh-card-head">
              <div className="sh-card-info">
                <div className="sh-avatar">{w.initials}</div>
                <div>
                  <div className="sh-name">{w.name}</div>
                  <div className="sh-role">{w.relationship}</div>
                </div>
              </div>
            </div>
            <div className="sh-detail">
              NIN: {w.nin} &nbsp;·&nbsp; {w.phone}
            </div>
          </div>
        ))}
        <button className="add-strip" type="button" onClick={() => setModalOpen(true)}>
          <div className="add-strip-icon">+</div> Add a witness
        </button>
      </div>

      <Link className="btn btn-primary" href="/registration/cac/documents" style={{ marginTop: 24 }}>
        Continue to Documents →
      </Link>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Witness">
        <div
          style={{
            background: "var(--ledger-soft)",
            borderRadius: 8,
            padding: "11px 13px",
            marginBottom: 18,
            fontSize: 12.5,
            color: "var(--ledger)",
            lineHeight: 1.5,
          }}
        >
          A witness can be your spouse, parent, sibling or a trusted friend. They must be over 18 and not a
          shareholder.
        </div>
        <div className="field-group">
          <label className="field-label">Full legal name</label>
          <input
            className="field"
            placeholder="e.g. Chidi Okonkwo"
            style={{ marginBottom: 0 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Relationship to director</label>
          <div className="rel-chips">
            {RELATIONSHIPS.map((r) => (
              <div
                key={r}
                className={`rel-chip${form.relationship === r ? " sel" : ""}`}
                onClick={() => setForm({ ...form, relationship: r })}
              >
                {r}
              </div>
            ))}
          </div>
        </div>
        <div className="field-group">
          <label className="field-label">Phone number</label>
          <input
            className="field"
            placeholder="+234 810 000 0000"
            style={{ marginBottom: 0 }}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="field-label">NIN</label>
          <input
            className="field"
            placeholder="11-digit NIN"
            style={{ marginBottom: 0 }}
            value={form.nin}
            onChange={(e) => setForm({ ...form, nin: e.target.value })}
          />
        </div>
        <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={submit} type="button">
          Add Witness
        </button>
      </Modal>
    </>
  );
}
