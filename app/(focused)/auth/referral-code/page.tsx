import Link from "next/link";
import { FlowScreen } from "@/components/auth/FlowScreen";

export default function ReferralCodePage() {
  return (
    <FlowScreen
      backHref="/auth/sign-in"
      activeDot={1}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      }
      title="Got a referral code?"
      sub="If a founder sent you to Startora, enter their code. You'll both get a discount on your first service."
    >
      <div className="auth-field-group">
        <label className="auth-label">Referral code</label>
        <input className="field" placeholder="e.g. CHIAMAKA-REF" style={{ marginBottom: 0, letterSpacing: ".1em", fontFamily: "var(--font-plex-mono), monospace" }} />
      </div>
      <Link className="btn btn-primary" href="/auth/whatsapp-verify" style={{ marginTop: 8 }}>
        Apply code &amp; continue
      </Link>
      <Link className="skip-link" href="/auth/whatsapp-verify">
        Skip — I don&apos;t have a code
      </Link>
    </FlowScreen>
  );
}
