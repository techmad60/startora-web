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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const strength = strengthPercent(password);

  return (
    <div className="flow-screen">
      <div className="flow-topnav">
        <Link className="flow-back" href="/auth/forgot-password">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
      </div>
      <div className="flow-body">
        <div className="flow-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <div className="flow-title">Set a new password</div>
        <div className="flow-sub">Choose something strong — at least 8 characters with a number and a symbol.</div>
        <div className="field-group">
          <label className="field-label">New password</label>
          <input
            className="field"
            type="password"
            placeholder="Min. 8 characters"
            style={{ marginBottom: 0 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-strength" style={{ marginTop: 6 }}>
            <div className="password-strength-bar" style={{ width: `${strength}%` }} />
          </div>
        </div>
        <div className="field-group" style={{ marginTop: 8 }}>
          <label className="field-label">Confirm new password</label>
          <input className="field" type="password" placeholder="Repeat new password" style={{ marginBottom: 0 }} />
        </div>
        <Link className="btn btn-primary" href="/auth/sign-in" style={{ marginTop: 16 }}>
          Set password &amp; sign in
        </Link>
      </div>
    </div>
  );
}
