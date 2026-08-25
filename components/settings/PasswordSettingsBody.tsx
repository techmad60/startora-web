"use client";

import { useState } from "react";
import Link from "next/link";

function strengthPercent(pw: string): number {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score += 40;
  if (/[0-9]/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;
  if (/[A-Z]/.test(pw)) score += 20;
  return Math.min(score, 100);
}

export function PasswordSettingsBody() {
  const [newPw, setNewPw] = useState("");

  return (
    <div className="body">
      <Link className="back-nav" href="/profile">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Change password</h2>
      <p className="settings-note">Use a strong password with at least 8 characters, a number, and a symbol.</p>

      <div className="settings-field-group">
        <label>Current password</label>
        <input className="field" type="password" placeholder="••••••••" style={{ marginBottom: 0 }} />
      </div>
      <div className="settings-field-group">
        <label>New password</label>
        <input
          className="field"
          type="password"
          placeholder="Min. 8 characters"
          style={{ marginBottom: 4 }}
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
        />
        <div className="password-strength">
          <div className="password-strength-bar" style={{ width: `${strengthPercent(newPw)}%` }} />
        </div>
      </div>
      <div className="settings-field-group">
        <label>Confirm new password</label>
        <input className="field" type="password" placeholder="Repeat new password" style={{ marginBottom: 0 }} />
      </div>
      <Link className="btn btn-primary" href="/profile" style={{ marginTop: 8 }}>
        Update password
      </Link>
      <Link className="btn btn-ghost" href="/profile">
        Cancel
      </Link>
    </div>
  );
}
