import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getFounder, getBusiness } from "@/lib/api";

export default async function SettingsAccountPage() {
  const [founder, business] = await Promise.all([getFounder(), getBusiness()]);

  return (
    <AppShell title="Personal Details">
      <div className="body">
        <Link className="back-nav" href="/profile">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Personal details</h2>
        <p className="settings-note">Changes here update your Startora account and carry through to your compliance filings.</p>

        <div className="settings-field-group">
          <label>Full legal name</label>
          <input className="field" defaultValue={founder.fullName} style={{ marginBottom: 0 }} />
        </div>
        <div className="settings-field-group">
          <label>Email address</label>
          <input className="field" defaultValue={founder.email} style={{ marginBottom: 0 }} />
        </div>
        <div className="settings-field-group">
          <label>Phone number (WhatsApp)</label>
          <input className="field" defaultValue={founder.phone} style={{ marginBottom: 0 }} />
        </div>
        <div className="settings-field-group">
          <label>State of residence</label>
          <input className="field" defaultValue={`${business.state}, Nigeria`} style={{ marginBottom: 0 }} />
        </div>
        <Link className="btn btn-primary" href="/profile" style={{ marginTop: 8 }}>
          Save changes
        </Link>
        <Link className="btn btn-ghost" href="/profile">
          Cancel
        </Link>
      </div>
    </AppShell>
  );
}
