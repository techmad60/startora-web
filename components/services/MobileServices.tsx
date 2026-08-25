import Link from "next/link";
import type { RegistrationEntry, StartupDocSummaryEntry } from "@/mocks/services";

interface MobileServicesProps {
  myRegistrations: RegistrationEntry[];
  startupDocs: StartupDocSummaryEntry[];
}

export function MobileServices({ myRegistrations, startupDocs }: MobileServicesProps) {
  return (
    <div className="dash-body">
      <Link className="back-nav" href="/dashboard">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <div className="card-white">
        <div className="card-head">
          <h3>Registrations</h3>
          <Link className="see-all-pill" href="/registrations">
            See all{" "}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
        {myRegistrations.map((r) => (
          <div className="svc-row" key={r.id}>
            <div>
              <div className="svc-name">{r.name}</div>
              <div className="svc-meta">{r.meta}</div>
            </div>
            <div className={`svc-state ${r.state}`}>{r.state === "active" ? "Active" : "Add"}</div>
          </div>
        ))}
      </div>

      <div className="card-white">
        <div className="card-head">
          <h3>Startup documents</h3>
          <Link className="see-all-pill" href="/docs/startup">
            See all{" "}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
        {startupDocs.map((d) => (
          <div className="doc-row" key={d.id}>
            <div className="doc-icon">{d.icon}</div>
            <div className="doc-info">
              <div className="doc-name">{d.name}</div>
              <div className="doc-meta">{d.meta}</div>
            </div>
            <div className="doc-action">Get</div>
          </div>
        ))}
      </div>

      <div className="card-contact">
        <div className="contact-icon">?</div>
        <div className="contact-text">
          <div className="contact-title">Can&apos;t find what you need?</div>
          <div className="contact-sub">Our compliance team handles anything the platform doesn&apos;t cover yet.</div>
        </div>
        <Link className="contact-btn" href="/contact">
          Talk to us
        </Link>
      </div>
    </div>
  );
}
