import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";

export default function DeadlinesPage() {
  return (
    <AppShell title="Deadlines">
      <div className="body">
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>Deadlines</h2>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 24px" }}>
          Startora alerts you 30 days before each one is due.
        </p>

        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--stamp)", marginBottom: 12, fontFamily: "var(--font-plex-mono), monospace" }}>
          ⚠ Overdue
        </div>
        <div style={{ border: "1.5px solid var(--stamp)", borderRadius: 12, padding: 16, marginBottom: 20, background: "rgba(162,59,46,.04)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>CAC Annual Returns — 2025</div>
          <div style={{ fontSize: 12, color: "var(--stamp)", marginBottom: 14 }}>
            Was due Feb 28, 2025 · ₦10,000 penalty accruing per year
          </div>
          <Link href="/filing-status" className="btn btn-primary" style={{ fontSize: 13, padding: 10 }}>
            File now
          </Link>
        </div>

        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--amber)", marginBottom: 12, fontFamily: "var(--font-plex-mono), monospace" }}>
          Due within 60 days
        </div>
        <div style={{ border: "1.5px solid rgba(154,107,23,.3)", borderRadius: 12, padding: 16, marginBottom: 12, background: "rgba(154,107,23,.04)" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>NAFDAC — Product label upload</div>
          <div style={{ fontSize: 12, color: "var(--amber)", marginBottom: 14 }}>Due Aug 20, 2026 · 24 days remaining</div>
          <Link href="/registration/nafdac/3" className="btn btn-primary" style={{ fontSize: 13, padding: 10, background: "var(--amber)", borderColor: "var(--amber)" }}>
            Upload documents
          </Link>
        </div>

        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", margin: "24px 0 12px", fontFamily: "var(--font-plex-mono), monospace" }}>
          Upcoming
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>CAC Annual Returns — 2026</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 3 }}>Due Feb 28, 2027 · Auto-filed by Startora</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--ledger)", fontWeight: 600, fontFamily: "var(--font-plex-mono), monospace" }}>7 months</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>NDPR Privacy Policy — Annual review</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 3 }}>Due Dec 15, 2026 · Startora notifies in November</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--ledger)", fontWeight: 600, fontFamily: "var(--font-plex-mono), monospace" }}>5 months</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0" }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>Trademark — Class filing window</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 3 }}>Due Mar 1, 2027</div>
            </div>
            <Link href="/registration/trademark" className="btn btn-ghost" style={{ width: "auto", display: "inline-block", fontSize: 12, padding: "7px 12px" }}>
              Start
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
