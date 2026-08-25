import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getFounder, getBusiness } from "@/lib/api";

export default async function ProfilePage() {
  const [founder, business] = await Promise.all([getFounder(), getBusiness()]);

  return (
    <AppShell title="Profile">
      <div className="body">
      <Link className="back-nav" href="/dashboard">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="profile-hero">
        <div className="profile-avatar">{founder.initials}</div>
        <div className="profile-name">{founder.fullName}</div>
        <div className="profile-email">{founder.email}</div>
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Account</div>
        <ProfileRow href="/settings/account" label="Personal details" val="Name, email, phone" />
        <ProfileRow href="/settings/password" label="Password" val="Change" />
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Businesses</div>
        <ProfileRow href="/business/chiamakas-kitchen" label={business.name} val={business.rcNumber} />
        <ProfileRow href="/business/deluxe-fabrics" label="Deluxe Fabrics Ltd" val="RC-0048221" />
        <ProfileRow href="/onboarding/1" label="Register new business" val="" />
      </div>

      <div className="profile-section">
        <div className="profile-section-title">Settings</div>
        <ProfileRow href="/settings/notifications" label="Notifications" val="All alerts on" />
        <ProfileRow href="/settings/privacy" label="Privacy & data" val="Minimal sharing" />
        <ProfileRow href="/settings/billing" label="Billing history" val="₦300,000 paid" />
      </div>

      <div className="profile-section">
        <div className="profile-section-title">More</div>
        <ProfileRow href="/referral" label="Refer a founder" val="2 referrals · ₦10,000 earned" />
        <ProfileRow href="/health-score" label="Compliance health" val="65 / 100" />
      </div>

      <Link className="profile-signout" href="/auth/sign-in">
        Sign out
      </Link>
      </div>
    </AppShell>
  );
}

function ProfileRow({ href, label, val }: { href: string; label: string; val: string }) {
  return (
    <Link className="profile-row" href={href}>
      <div className="profile-row-label">{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div className="profile-row-val">{val}</div>
        <div className="profile-row-arrow">›</div>
      </div>
    </Link>
  );
}
