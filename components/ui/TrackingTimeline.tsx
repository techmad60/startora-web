import Link from "next/link";
import type { TrackingStep } from "@/lib/types";

interface TrackingTimelineProps {
  backHref: string;
  backLabel: string;
  icon: string;
  title: string;
  reference: string;
  steps: TrackingStep[];
  note: string;
}

export function TrackingTimeline({ backHref, backLabel, icon, title, reference, steps, note }: TrackingTimelineProps) {
  return (
    <>
      <Link className="back-nav" href={backHref}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        {backLabel}
      </Link>

      <div className="track-hero">
        <div className="track-icon">{icon}</div>
        <div className="track-title">{title}</div>
        <div className="track-ref">REF · {reference}</div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ink-soft)", margin: "0 0 16px" }}>
        Filing progress
      </div>

      {steps.map((step, i) => (
        <div className="track-step" key={step.id}>
          <div className="track-left">
            <div className={`track-dot ${step.state === "done" ? "done" : step.state === "now" ? "now" : ""}`}>
              {step.state === "done" ? "✓" : ""}
            </div>
            {i < steps.length - 1 && <div className={`track-line ${step.state === "done" ? "done" : ""}`} />}
          </div>
          <div className="track-info">
            <div className="track-name">{step.name}</div>
            <div className="track-sub">{step.sub}</div>
            <div className="track-eta" style={step.state === "now" ? { color: "var(--ledger)" } : undefined}>
              {step.eta}
            </div>
          </div>
        </div>
      ))}

      <div style={{ background: "var(--ledger-soft)", borderRadius: 8, padding: 13, margin: "22px 0 20px", fontSize: 12.5, color: "var(--ledger)", lineHeight: 1.5 }}>
        {note}
      </div>
      <Link className="btn btn-primary" href="/dashboard">
        Back to home
      </Link>
      <Link className="btn btn-ghost" href="/filing-status" style={{ marginTop: 10 }}>
        View all filings
      </Link>
    </>
  );
}
