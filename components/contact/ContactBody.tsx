"use client";

import { useState } from "react";
import Link from "next/link";
import type { Founder, Business } from "@/lib/types";

export function ContactBody({ founder, business }: { founder: Founder; business: Business }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="body">
      <Link className="back-nav" href="/services">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      {sent ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--ledger-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={2} strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 19, fontWeight: 500, marginBottom: 8 }}>Message sent</div>
          <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 24 }}>
            A compliance specialist will get back to you within 24 hours.
          </div>
          <Link className="btn btn-primary" href="/dashboard">
            Back to home
          </Link>
        </div>
      ) : (
        <>
          <div className="docs-head">
            <h2>Talk to our team</h2>
            <p>Tell us what you need. A compliance specialist will get back to you within 24 hours.</p>
          </div>

          <div className="cf-field-group">
            <label className="cf-label">Your name</label>
            <input className="field" defaultValue={founder.fullName} readOnly />
          </div>
          <div className="cf-field-group">
            <label className="cf-label">Email address</label>
            <input className="field" defaultValue={founder.email} readOnly />
          </div>
          <div className="cf-field-group">
            <label className="cf-label">Business</label>
            <input className="field" defaultValue={business.name} readOnly />
          </div>
          <div className="cf-field-group">
            <label className="cf-label">What do you need help with?</label>
            <textarea
              className="field cf-textarea"
              placeholder="Describe your situation. The more detail you give, the faster we can help."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" style={{ marginTop: 4 }} onClick={() => setSent(true)} type="button">
            Send to compliance team
          </button>
          <div className="ob-foot">We don&apos;t do bots. A real person will read this and respond.</div>
        </>
      )}
    </div>
  );
}
