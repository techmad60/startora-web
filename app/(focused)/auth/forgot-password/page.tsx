"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flow-screen">
      <div className="flow-topnav">
        <Link className="flow-back" href="/auth/sign-in">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back to sign in
        </Link>
        <div />
      </div>
      <div className="flow-body">
        <div className="flow-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        {!sent ? (
          <div className="forgot-form">
            <div className="flow-title">Reset your password</div>
            <div className="flow-sub">Enter the email you registered with. We&apos;ll send a reset link immediately.</div>
            <div className="auth-field-group">
              <label className="auth-label">Email address</label>
              <input className="field" placeholder="chiamaka@kitchenng.com" style={{ marginBottom: 0 }} />
            </div>
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setSent(true)} type="button">
              Send reset link
            </button>
          </div>
        ) : (
          <div className="forgot-success show">
            <div className="forgot-success-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={2} strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 19, fontWeight: 500, marginBottom: 8 }}>Check your email</div>
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 24 }}>
              We sent a reset link to
              <br />
              <strong>chiamaka@kitchenng.com</strong>
              <br />
              <br />
              It expires in 15 minutes.
            </div>
            <Link className="btn btn-primary" href="/auth/sign-in">
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
