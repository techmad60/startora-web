"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReferralEntry } from "@/mocks/referral";

export function ReferralBody({ referralLink, referrals }: { referralLink: string; referrals: ReferralEntry[] }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`https://${referralLink}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="body">
      <Link className="back-nav" href="/profile">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <div className="ref-hero">
        <div className="ref-hero-eye">Refer a founder</div>
        <div className="ref-hero-title">Every founder you refer gets their first service at a discount.</div>
        <div className="ref-hero-sub">You earn ₦5,000 credit toward your next Startora service for every successful referral.</div>
        <div className="ref-link-box">
          <div className="ref-link">{referralLink}</div>
          <div className="ref-copy" onClick={copyLink} style={{ cursor: "pointer" }}>
            {copied ? "Copied!" : "Copy"}
          </div>
        </div>
      </div>

      <div className="ref-stats">
        <div className="ref-stat">
          <div className="ref-stat-num">2</div>
          <div className="ref-stat-label">Founders referred</div>
        </div>
        <div className="ref-stat">
          <div className="ref-stat-num">₦10k</div>
          <div className="ref-stat-label">Credit earned</div>
        </div>
        <div className="ref-stat">
          <div className="ref-stat-num">2</div>
          <div className="ref-stat-label">Registered</div>
        </div>
      </div>

      <div className="ref-list-title">Your referrals</div>
      {referrals.map((r) => (
        <div className="ref-row" key={r.name}>
          <div className="ref-dot">{r.initials}</div>
          <div className="ref-info">
            <div className="ref-name">{r.name}</div>
            <div className="ref-status">{r.status}</div>
          </div>
          <div className="ref-reward">+₦5,000</div>
        </div>
      ))}

      <div className="ref-share-row">
        <button
          className="ref-share-btn primary"
          type="button"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`https://${referralLink}`)}`, "_blank")}
        >
          Share via WhatsApp
        </button>
        <button className="ref-share-btn" type="button" onClick={copyLink}>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
