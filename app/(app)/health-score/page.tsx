import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getComplianceScore, getBusiness } from "@/lib/api";

const CIRCUMFERENCE = 2 * Math.PI * 28;

export default async function HealthScorePage() {
  const [complianceScore, business] = await Promise.all([getComplianceScore(), getBusiness()]);
  const offset = CIRCUMFERENCE * (1 - complianceScore / 100);

  return (
    <AppShell title="Compliance Health">
      <div className="body">
        <Link className="back-nav" href="/dashboard">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <div className="hd-hero">
          <div className="hd-ring">
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={6} />
              <circle
                cx="36"
                cy="36"
                r="28"
                fill="none"
                stroke="white"
                strokeWidth={6}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="hd-ring-num">
              {complianceScore}
              <span>/ 100</span>
            </div>
          </div>
          <div className="hd-text">
            <div className="hd-label">{business.name}</div>
            <div className="hd-title">Partially covered — 2 obligations need action</div>
          </div>
        </div>

        <div className="dash-section-title">Completed — 45 pts</div>
        <HdRow name="CAC Business Registration" meta="Approved Jun 18, 2026 · RC BN-2026-481923" pts="+20 pts" state="done" />
        <HdRow name="NDPR Compliance" meta="Privacy policy on file · generated Jun 22" pts="+15 pts" state="done" />
        <HdRow name="Annual Returns" meta="Auto-tracking active · next due Feb 2027" pts="+10 pts" state="done" />

        <div className="dash-section-title">In progress — 10 pts</div>
        <HdRow name="NAFDAC Registration" meta="Submitted · awaiting government approval" pts="+10 pts pending" state="warn" />

        <div className="dash-section-title">Not yet done — 35 pts</div>
        <HdRow name="Trademark Registration" meta="Waiting on your name confirmation" pts="+25 pts" state="none" />
        <HdRow name="Post-Incorporation Setup" meta="Directors, registered office, share structure" pts="+10 pts" state="none" />

        <Link className="btn btn-primary" href="/compliance-map" style={{ marginTop: 20 }}>
          Complete remaining obligations
        </Link>
      </div>
    </AppShell>
  );
}

function HdRow({ name, meta, pts, state }: { name: string; meta: string; pts: string; state: "done" | "warn" | "none" }) {
  return (
    <div className="hd-row">
      <div className={`hd-status-dot ${state}`} />
      <div className="hd-info">
        <div className="hd-name">{name}</div>
        <div className="hd-meta">{meta}</div>
      </div>
      <div className={`hd-pts ${state === "none" ? "" : state}`}>{pts}</div>
    </div>
  );
}
