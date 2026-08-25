"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { RegBackNav, RegProgress } from "@/components/ui/WizardNav";
import { useCacWizardActions, useCacWizardState } from "@/lib/wizard/cac-context";
import type { Shareholder } from "@/lib/types";

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const emptyForm = { name: "", email: "", phone: "", address: "", nin: "", pct: "" };

export function ShareholdersStep() {
  const { shareholders } = useCacWizardState();
  const { addShareholder } = useCacWizardActions();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function submit() {
    if (!form.name.trim()) return;
    const shareholder: Shareholder = {
      id: `sh-${Date.now()}`,
      name: form.name.trim(),
      initials: initialsOf(form.name),
      role: "Shareholder",
      pct: Number(form.pct) || 0,
      nin: form.nin || "—",
      address: form.address || "—",
    };
    addShareholder(shareholder);
    setForm(emptyForm);
    setModalOpen(false);
  }

  return (
    <>
      <RegBackNav href="/payment" label="Back to payment" />
      <RegProgress step={1} total={3} />
      <div className="reg-step-label">Step 1 of 3 — Shareholders</div>
      <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Shareholders</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5 }}>
        Every person who owns shares must be listed. The first shareholder is prefilled from your profile.
      </p>

      <div id="sh-list">
        {shareholders.map((sh) => (
          <div className="sh-card" key={sh.id}>
            <div className="sh-card-head">
              <div className="sh-card-info">
                <div className="sh-avatar">{sh.initials}</div>
                <div>
                  <div className="sh-name">{sh.name}</div>
                  <div className="sh-role">{sh.role}</div>
                </div>
              </div>
              <div className="sh-pct">{sh.pct}%</div>
            </div>
            <div className="sh-detail">
              NIN: {sh.nin} &nbsp;·&nbsp; {sh.address}
            </div>
            <button className="sh-edit" type="button">
              Edit details
            </button>
          </div>
        ))}
        <button className="add-strip" type="button" onClick={() => setModalOpen(true)}>
          <div className="add-strip-icon">+</div> Add another shareholder
        </button>
      </div>

      <Link className="btn btn-primary" href="/registration/cac/witness" style={{ marginTop: 24 }}>
        Continue to Witness →
      </Link>
      <div style={{ textAlign: "center", fontSize: 12, color: "var(--ink-soft)", marginTop: 12 }}>
        All shares must add up to 100%
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Shareholder">
        <div className="field-group">
          <label className="field-label">Full legal name</label>
          <input
            className="field"
            placeholder="e.g. Emeka Okafor"
            style={{ marginBottom: 0 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Email address</label>
          <input
            className="field"
            placeholder="emeka@email.com"
            style={{ marginBottom: 0 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
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
          <label className="field-label">Residential address</label>
          <input
            className="field"
            placeholder="Street, City, State"
            style={{ marginBottom: 0 }}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="field-label">NIN or BVN</label>
          <input
            className="field"
            placeholder="11-digit NIN"
            style={{ marginBottom: 0 }}
            value={form.nin}
            onChange={(e) => setForm({ ...form, nin: e.target.value })}
          />
        </div>
        <div className="field-group">
          <label className="field-label">Percentage ownership</label>
          <div className="pct-wrap">
            <input
              className="field"
              type="number"
              placeholder="e.g. 30"
              min={1}
              max={99}
              style={{ marginBottom: 0 }}
              value={form.pct}
              onChange={(e) => setForm({ ...form, pct: e.target.value })}
            />
            <span className="pct-sym">%</span>
          </div>
        </div>
        <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={submit} type="button">
          Add Shareholder
        </button>
      </Modal>
    </>
  );
}
