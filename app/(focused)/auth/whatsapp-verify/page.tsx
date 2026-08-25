import Link from "next/link";
import { FlowScreen } from "@/components/auth/FlowScreen";
import { OtpInput } from "@/components/auth/OtpInput";

export default function WhatsappVerifyPage() {
  return (
    <FlowScreen
      backHref="/auth/referral-code"
      activeDot={2}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      }
      title="Check your WhatsApp"
      sub={
        <>
          We sent a 6-digit code to your WhatsApp at
          <br />
          <strong>+234 810 ••• 7730</strong>
        </>
      }
    >
      <OtpInput />
      <div className="resend-link">
        Didn&apos;t get it? <span>Resend code</span>
      </div>
      <Link className="btn btn-primary" href="/auth/email-verify">
        Verify and continue
      </Link>
    </FlowScreen>
  );
}
