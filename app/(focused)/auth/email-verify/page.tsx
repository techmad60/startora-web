import Link from "next/link";
import { FlowScreen } from "@/components/auth/FlowScreen";
import { OtpInput } from "@/components/auth/OtpInput";

export default function EmailVerifyPage() {
  return (
    <FlowScreen
      backHref="/auth/whatsapp-verify"
      activeDot={3}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      }
      title="Confirm your email"
      sub={
        <>
          We sent a 6-digit code to
          <br />
          <strong>chiamaka@kitchenng.com</strong>
        </>
      }
    >
      <OtpInput />
      <div className="resend-link">
        Didn&apos;t receive it? <span>Resend email</span>
      </div>
      <Link className="btn btn-primary" href="/auth/how-heard">
        Verify and continue
      </Link>
    </FlowScreen>
  );
}
