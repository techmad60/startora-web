import Link from "next/link";
import { HealthRing } from "@/components/ui/HealthRing";
import type { Business, Founder, Obligation, Deadline } from "@/lib/types";

export function BusinessSwitcherCard({ business, founder }: { business: Business; founder: Founder }) {
  const firstName = founder.fullName.split(" ")[0];
  return (
    <div className="card-biz">
      <div className="card-label">Good morning, {firstName}</div>
      <div className="biz-list">
        <Link href="/business/chiamakas-kitchen" className="biz-item active-biz">
          <div className="biz-left">
            <div className="biz-dot">CK</div>
            <div>
              <div className="biz-name">{business.name}</div>
              <div className="biz-status">2 things need your attention</div>
            </div>
          </div>
          <div className="biz-arrow">→</div>
        </Link>
        <div className="biz-item">
          <div className="biz-left">
            <div className="biz-dot">DF</div>
            <div>
              <div className="biz-name">Deluxe Fabrics Ltd</div>
              <div className="biz-status">All compliant</div>
            </div>
          </div>
          <div className="biz-arrow">→</div>
        </div>
      </div>
      <Link href="/onboarding/1" className="biz-add">
        <div className="biz-add-icon">+</div>
        Register a new business
      </Link>
    </div>
  );
}

export function HealthCard({ complianceScore }: { complianceScore: number }) {
  const segments: ("done" | "warn" | "pending")[] = ["done", "done", "done", "warn", "pending"];
  return (
    <Link href="/health-score" className="health-card">
      <div className="health-card-head">
        <h3>Compliance health</h3>
        <span className="see-all-pill">
          Details{" "}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
      <div className="health-score-wrap">
        <HealthRing score={complianceScore} />
        <div className="health-summary">
          <div className="health-summary-text">3 of 5 obligations filed. 2 still need action to reach full cover.</div>
          <div className="health-bar-row">
            {segments.map((s, i) => (
              <div key={i} className={`health-bar-seg ${s}`} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ObligationsCard({ obligations }: { obligations: Obligation[] }) {
  return (
    <div className="card-white">
      <div className="card-head">
        <h3>Pending obligations</h3>
        <Link className="see-all-pill" href="/compliance-map">
          See all{" "}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
      {obligations.map((o) => (
        <div className="obl-row" key={o.id}>
          <div className="obl-num">{o.number}</div>
          <div className="obl-info">
            <div className="obl-name">{o.name}</div>
            <div className="obl-meta">{o.meta}</div>
          </div>
          <div className={`obl-badge ${o.badge === "action" ? "req" : "rec"}`}>{o.badgeLabel}</div>
        </div>
      ))}
    </div>
  );
}

export function DeadlinesCard({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="card-white">
      <div className="card-head">
        <h3>Deadlines &amp; renewals</h3>
        <Link className="see-all-pill" href="/deadlines">
          See all{" "}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
      {deadlines.map((d) => (
        <div className="dl2-row" key={d.id}>
          <div className="dl2-info">
            <div className="dl2-title">{d.title}</div>
            <div className="dl2-sub">{d.sub}</div>
          </div>
          <div className={`dl2-chip ${d.urgency}`}>{d.dateLabel}</div>
        </div>
      ))}
    </div>
  );
}
