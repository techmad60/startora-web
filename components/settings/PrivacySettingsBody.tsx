"use client";

import { useState } from "react";
import Link from "next/link";
import { Toggle } from "@/components/ui/Toggle";

export function PrivacySettingsBody() {
  const [anonymised, setAnonymised] = useState(true);
  const [personalised, setPersonalised] = useState(true);

  return (
    <div className="body">
      <Link className="back-nav" href="/profile">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Privacy &amp; data</h2>
      <p className="settings-note">Startora stores only what&apos;s required for your compliance filings. We never sell your data.</p>

      <div className="settings-section">
        <div className="settings-label">Data sharing</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Share anonymised usage data</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Helps us improve the platform</div>
          </div>
          <Toggle on={anonymised} onChange={() => setAnonymised((v) => !v)} />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Personalised recommendations</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Service suggestions based on your profile</div>
          </div>
          <Toggle on={personalised} onChange={() => setPersonalised((v) => !v)} />
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-label">Your data</div>
        <Link className="settings-row" href="/docs" style={{ cursor: "pointer" }}>
          <div className="settings-row-label">Download all my documents</div>
          <div style={{ color: "#C9C6BC" }}>›</div>
        </Link>
        <div className="settings-row" style={{ cursor: "pointer" }}>
          <div className="settings-row-label">Request data export</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="settings-row-val">CSV + PDF</div>
            <span style={{ color: "#C9C6BC" }}>›</span>
          </div>
        </div>
      </div>

      <div className="danger-zone">
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--stamp)", marginBottom: 12 }}>
          Danger zone
        </div>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 16 }}>
          Deleting your account removes all your data from Startora permanently. Your CAC and government
          registrations are not affected — they exist on government systems independently.
        </p>
        <button className="danger-btn" type="button">
          Delete my account
        </button>
      </div>
    </div>
  );
}
