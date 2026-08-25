import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { ShareProfileButton } from "@/components/business/ShareProfileButton";
import { getBusiness, getDefaultShareholders, getComplianceScore, getDocuments } from "@/lib/api";

export default async function BusinessProfilePage() {
  const [business, shareholders, complianceScore, documents] = await Promise.all([
    getBusiness(),
    getDefaultShareholders(),
    getComplianceScore(),
    getDocuments(),
  ]);

  return (
    <AppShell title={business.name} hideTabBar>
      <div className="bp-header">
        <div className="bp-wordmark">STARTORA · VERIFIED BUSINESS</div>
        <div className="bp-logo">CK</div>
        <div className="bp-name">{business.name}</div>
        <div className="bp-rc">{business.rcNumber} · Registered Jun 18, 2026</div>
        <div className="bp-badges">
          <span className="bp-badge verified">✓ CAC Registered</span>
          <span className="bp-badge">{business.state}, Nigeria</span>
          <span className="bp-badge">Food &amp; Beverage</span>
        </div>
      </div>

      <div className="bp-body">
        <div className="bp-section-title">Key metrics</div>
        <div className="bp-metric-row">
          <div className="bp-metric">
            <div className="bp-metric-val">{complianceScore}</div>
            <div className="bp-metric-label">Compliance score / 100</div>
          </div>
          <div className="bp-metric">
            <div className="bp-metric-val">3/5</div>
            <div className="bp-metric-label">Obligations complete</div>
          </div>
          <div className="bp-metric">
            <div className="bp-metric-val">1 yr</div>
            <div className="bp-metric-label">In operation</div>
          </div>
        </div>

        <div className="bp-section-title">Business owners</div>
        {shareholders.map((sh) => (
          <div className="bp-owner-row" key={sh.id}>
            <div className="bp-owner-av">{sh.initials}</div>
            <div>
              <div className="bp-owner-name">{sh.name}</div>
              <div className="bp-owner-role">{sh.role}</div>
            </div>
            <div className="bp-owner-pct">{sh.pct}%</div>
          </div>
        ))}

        <div className="bp-section-title">Compliance status</div>
        <div>
          <span className="compliance-chip ok">✓ CAC Registered</span>
          <span className="compliance-chip ok">✓ NDPR Compliant</span>
          <span className="compliance-chip pending">⏳ NAFDAC Pending</span>
          <span className="compliance-chip pending">⏳ Trademark Pending</span>
          <span className="compliance-chip ok">✓ Annual Returns Active</span>
        </div>

        <div className="bp-section-title">Revenue</div>
        <div className="bp-revenue">
          <div className="bp-revenue-label">Est. annual revenue</div>
          <div className="bp-revenue-val">₦4,200,000</div>
          <div className="bp-revenue-note">Pulled from connected business account · Wema Bank · Jun 2026</div>
        </div>

        <div className="bp-section-title">Documents obtained</div>
        {documents.slice(0, 3).map((d) => (
          <div className="bp-doc-row" key={d.id}>
            <div className="bp-doc-icon">PDF</div>
            <div className="bp-doc-name">{d.name}</div>
            <div className="bp-doc-action">View</div>
          </div>
        ))}

        <div className="bp-section-title">Featured documents</div>
        <div className="bp-doc-row">
          <div className="bp-doc-icon" style={{ background: "var(--ledger-soft)", color: "var(--ledger)", borderColor: "var(--ledger)" }}>
            PPT
          </div>
          <div>
            <div className="bp-doc-name">Pitch Deck — Series A</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>Updated Jun 2026 · For investor use</div>
          </div>
          <div className="bp-doc-action">Request</div>
        </div>
        <div className="bp-doc-row">
          <div className="bp-doc-icon" style={{ background: "var(--amber-soft)", color: "var(--amber)", borderColor: "var(--amber)" }}>
            XLS
          </div>
          <div>
            <div className="bp-doc-name">Financial Model</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>3-year projections · Q2 2026</div>
          </div>
          <div className="bp-doc-action">Request</div>
        </div>
        <div className="bp-doc-row">
          <div className="bp-doc-icon">DOC</div>
          <div>
            <div className="bp-doc-name">Cap Table</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>Current ownership structure</div>
          </div>
          <div className="bp-doc-action">Request</div>
        </div>

        <div className="powered-by" style={{ marginTop: 24 }}>
          Verified by <strong>Startora</strong> · Nigeria&apos;s legal compliance infrastructure
        </div>
      </div>

      <div className="share-bar">
        <ShareProfileButton businessName={business.name} />
        <Link className="share-btn share-btn-ghost" href="/profile">
          ← My profile
        </Link>
      </div>
    </AppShell>
  );
}
