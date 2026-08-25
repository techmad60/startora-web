import Link from "next/link";
import { getComplianceSteps, getBusiness } from "@/lib/api";

export async function StepDone() {
  const [complianceSteps, business] = await Promise.all([getComplianceSteps(), getBusiness()]);

  return (
    <div className="ob-done-screen">
      <div className="ob-done-ring">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="ob-done-title">You&apos;re ready to go legal.</div>
      <div className="ob-done-sub">
        Startora has mapped every obligation for {business.name} based on your sector, location, and business
        activities.
      </div>

      <div className="ob-done-card">
        {complianceSteps.map((step) => (
          <div className="ob-done-row" key={step.id}>
            <div>
              <div className="ob-done-name">{step.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{step.price}</div>
            </div>
            <div className={`ob-done-badge ${step.tagVariant === "required" ? "req" : "rec"}`}>{step.tag}</div>
          </div>
        ))}
      </div>

      <div className="ob-done-note">
        Startora files everything. A qualified compliance lawyer reviews every submission before it leaves the
        platform. You see and approve each one.
      </div>

      <Link className="btn btn-primary" href="/compliance-map" style={{ width: "100%" }}>
        Start with Step 1 — CAC Registration
      </Link>
      <Link className="btn btn-ghost" href="/dashboard" style={{ width: "100%", marginTop: 10 }}>
        Go to my dashboard
      </Link>
    </div>
  );
}
