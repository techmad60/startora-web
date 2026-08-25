"use client";

import Link from "next/link";
import { useState } from "react";

export function SignInScreen() {
  const [view, setView] = useState<"signin" | "create">("signin");

  return (
    <div className="auth-bg">
      <div className="auth-brand-top">STARTORA</div>
      <div className="auth-tagline">
        Get legal once.
        <br />
        Stay legal forever.
      </div>

      <div className="auth-card">
        <span className="auth-wordmark">
          START<span>ORA</span>
        </span>
        <div className="auth-toggle">
          <div className={view === "signin" ? "on" : ""} onClick={() => setView("signin")}>
            Sign in
          </div>
          <div className={view === "create" ? "on" : ""} onClick={() => setView("create")}>
            Create account
          </div>
        </div>

        {view === "signin" ? (
          <div className="auth-view active" id="auth-signin">
            <div className="field-group">
              <label className="field-label">Email or phone</label>
              <input className="field" placeholder="chiamaka@email.com" style={{ marginBottom: 0 }} />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field" type="password" placeholder="••••••••" style={{ marginBottom: 0 }} />
            </div>
            <div style={{ textAlign: "right", margin: "8px 0 16px" }}>
              <Link href="/auth/forgot-password" style={{ fontSize: 12.5, color: "var(--ledger)", cursor: "pointer" }}>
                Forgot password?
              </Link>
            </div>
            <Link className="btn btn-primary" href="/dashboard" style={{ background: "var(--ledger)" }}>
              Sign in
            </Link>
            <Link
              className="btn-google"
              href="/dashboard"
              style={{
                marginTop: 10,
                width: "100%",
                padding: 11,
                border: "1.5px solid var(--line)",
                borderRadius: 8,
                background: "#fff",
                fontFamily: 'var(--font-plex-sans), sans-serif',
                fontSize: 13.5,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Link>
            <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>
              No account?{" "}
              <span style={{ color: "var(--ledger)", cursor: "pointer", fontWeight: 500 }} onClick={() => setView("create")}>
                Create one
              </span>
            </div>
          </div>
        ) : (
          <div className="auth-view active" id="auth-create">
            <div className="field-group">
              <label className="field-label">Full name</label>
              <input className="field" placeholder="Chiamaka Okonkwo" style={{ marginBottom: 0 }} />
            </div>
            <div className="field-group">
              <label className="field-label">Email address</label>
              <input className="field" placeholder="you@email.com" style={{ marginBottom: 0 }} />
            </div>
            <div className="field-group">
              <label className="field-label">Phone number (WhatsApp)</label>
              <input className="field" placeholder="+234 810 000 0000" style={{ marginBottom: 0 }} />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field" type="password" placeholder="Min. 8 characters" style={{ marginBottom: 0 }} />
            </div>
            <Link className="btn btn-primary" href="/auth/referral-code" style={{ marginTop: 16, background: "var(--ledger)" }}>
              Create account
            </Link>
            <div style={{ textAlign: "center", fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14 }}>
              Already have an account?{" "}
              <span style={{ color: "var(--ledger)", cursor: "pointer", fontWeight: 500 }} onClick={() => setView("signin")}>
                Sign in
              </span>
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.4)", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
        By continuing you agree to Startora&apos;s
        <br />
        Terms of Service and Privacy Policy
      </div>
    </div>
  );
}
