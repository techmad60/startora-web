import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getStartupDocGroups } from "@/lib/api";

export default async function StartupDocsPage() {
  const startupDocGroups = await getStartupDocGroups();

  return (
    <AppShell title="Startup Documents">
      <div className="body">
        <Link className="back-nav" href="/services">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>Startup documents</h2>
        <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 24px", lineHeight: 1.5 }}>
          Legal and financial documents for fundraising, team management, and investor due diligence. Adapted for
          Nigerian law.
        </p>

        {startupDocGroups.map((group) => (
          <div key={group.heading}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 16, fontFamily: "var(--font-plex-mono), monospace" }}>
              {group.heading}
            </div>
            <div style={{ display: "flex", flexDirection: "column", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
              {group.rows.map((row, i) => (
                <div
                  key={row.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 16px",
                    borderBottom: i < group.rows.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{row.name}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{row.meta}</div>
                  </div>
                  <Link href="/contact" className={`sdoc-btn${row.active ? " active" : ""}`} style={{ display: "inline-block" }}>
                    {row.active ? "View" : "Request"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
