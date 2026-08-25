import Link from "next/link";
import { HealthRing } from "@/components/ui/HealthRing";
import { FilingProgressDots, FilingStatusStamp } from "@/components/ui/FilingProgress";
import type { Business, Founder, Filing, Deadline } from "@/lib/types";

interface DesktopDashboardProps {
  business: Business;
  founder: Founder;
  complianceScore: number;
  filings: Filing[];
  deadlines: Deadline[];
}

export function DesktopDashboard({ business, founder, complianceScore, filings, deadlines }: DesktopDashboardProps) {
  const firstName = founder.fullName.split(" ")[0];

  return (
    <>
      <div style={{ marginBottom: 26 }}>
        <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 24, fontWeight: 500 }}>Good morning, {firstName}.</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 3 }}>
          {business.name} · {business.rcNumber} · {business.state}, Nigeria
        </div>
      </div>

      <div className="d-stat-row">
        <div className="d-stat-card">
          <div className="d-stat-val" style={{ color: "var(--ledger)" }}>{complianceScore}</div>
          <div className="d-stat-lbl">Compliance score</div>
          <div className="d-badge" style={{ background: "var(--ledger-soft)", color: "var(--ledger)" }}>out of 100</div>
        </div>
        <div className="d-stat-card">
          <div className="d-stat-val">{filings.length}</div>
          <div className="d-stat-lbl">Active filings</div>
          <div className="d-badge" style={{ background: "#FDF6E3", color: "var(--amber)" }}>1 needs action</div>
        </div>
        <div className="d-stat-card">
          <div className="d-stat-val">5</div>
          <div className="d-stat-lbl">Documents</div>
          <div className="d-badge" style={{ background: "var(--ledger-soft)", color: "var(--ledger)" }}>All current</div>
        </div>
        <div className="d-stat-card">
          <div className="d-stat-val" style={{ color: "var(--stamp)" }}>1</div>
          <div className="d-stat-lbl">Overdue</div>
          <div className="d-badge" style={{ background: "rgba(162,59,46,.1)", color: "var(--stamp)" }}>Annual returns</div>
        </div>
      </div>

      <div className="d-layout">
        <div>
          <div className="d-filing-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 16, fontWeight: 500 }}>Active filings</div>
              <Link href="/filing-status" style={{ fontSize: 13, color: "var(--ledger)", fontWeight: 500, textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div className="d-filing-head">
              <span>Filing</span>
              <span>Reference</span>
              <span>Progress</span>
              <span>Status</span>
              <span>Updated</span>
            </div>
            {filings.map((f) => (
              <Link href={`/filing-status/${f.id}`} className="d-filing-row" key={f.id}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</div>
                  {f.refLabel && <div className="fl2-ref">{f.refLabel}</div>}
                </div>
                <div className="fl2-ref">{f.reference}</div>
                <FilingProgressDots steps={f.steps} />
                <div>
                  <FilingStatusStamp status={f.status} statusLabel={f.statusLabel} />
                </div>
                <div className="fl2-ref">{f.updatedAt}</div>
              </Link>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <Link href="/services" className="card-sm" style={{ cursor: "pointer" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Start SCUML</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Free · Required for your sector</div>
            </Link>
            <Link href="/docs" className="card-sm" style={{ cursor: "pointer" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Download CAC cert</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Issued Jun 18, 2026</div>
            </Link>
            <Link href="/ai-chat" className="card-sm" style={{ cursor: "pointer" }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Ask Startora AI</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Compliance questions answered</div>
            </Link>
          </div>
        </div>

        <div className="d-right-panel">
          <div className="card-white">
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Compliance health</div>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <HealthRing score={complianceScore} size="large" />
            </div>
            {[
              ["CAC Registration", "✓ 20pts", "var(--ledger)"],
              ["NDPR Compliance", "✓ 15pts", "var(--ledger)"],
              ["Annual Returns", "✓ 10pts", "var(--ledger)"],
              ["Trademark", "— 25pts", "var(--ink-soft)"],
              ["NAFDAC", "⏳ 10pts", "var(--amber)"],
            ].map(([label, val, color], i, arr) => (
              <div
                key={label}
                style={{
                  fontSize: 13,
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <span>{label}</span>
                <span style={{ color, fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>
          <div className="card-white">
            <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 16, fontWeight: 500, marginBottom: 14 }}>Deadlines</div>
            {deadlines.map((d, i) => (
              <div
                key={d.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < deadlines.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{d.title}</div>
                  <div style={{ fontSize: 11.5, color: d.urgency === "due" ? "var(--amber)" : "var(--ink-soft)", marginTop: 2 }}>{d.sub}</div>
                </div>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    background: d.urgency === "due" ? "#FDF6E3" : "var(--ledger-soft)",
                    color: d.urgency === "due" ? "var(--amber)" : "var(--ledger)",
                    padding: "3px 9px",
                    borderRadius: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.dateLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
