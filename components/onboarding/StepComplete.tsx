"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STATUS_SEQUENCE = [
  { pct: 20, label: "Analysing profile", text: "Checking CAC requirements for food businesses in Lagos State..." },
  { pct: 45, label: "Cross-referencing regulations", text: "Matching your activities against NAFDAC product categories..." },
  { pct: 70, label: "Mapping obligations", text: "Checking NDPR data-handling requirements for your sector..." },
  { pct: 100, label: "Done", text: "Compliance map ready." },
] as const;

/**
 * Source markup for this screen (progress bar, rotating status text,
 * three-dot loader) was fully built but wired to `runOBCLight()`,
 * which was called but never defined anywhere — so in the live
 * prototype the bar sits frozen at 0%. This reconstructs the animation
 * the markup was clearly built for.
 */
export function StepComplete() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= STATUS_SEQUENCE.length - 1) return;
    const timer = setTimeout(() => setStepIndex((i) => i + 1), 900);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const current = STATUS_SEQUENCE[stepIndex] ?? STATUS_SEQUENCE[0];

  return (
    <div className="obc-screen">
      <div className="obc-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>
      <div className="obc-title">Mapping your obligations</div>
      <div className="obc-sub">
        Startora&apos;s AI is reading your business profile and cross-referencing Nigerian regulatory frameworks.
      </div>

      <div className="obc-status-card">
        <div className="obc-dots">
          <div className="obc-dot" />
          <div className="obc-dot" />
          <div className="obc-dot" />
        </div>
        <div className="obc-status-text">{current.text}</div>
      </div>

      <div className="obc-prog-wrap">
        <div className="obc-prog-labels">
          <span>{current.label}</span>
          <span>{current.pct}%</span>
        </div>
        <div className="obc-bar">
          <div className="obc-bar-fill" style={{ width: `${current.pct}%`, transition: "width .6s ease" }} />
        </div>
      </div>

      <div className="obc-tags" style={{ marginTop: 10 }}>
        Checking NAFDAC scope · NDPR obligations · Trademark window
      </div>

      <Link className="btn btn-primary" href="/onboarding/done" style={{ width: "100%", marginTop: 8 }}>
        See your compliance map
      </Link>
    </div>
  );
}
