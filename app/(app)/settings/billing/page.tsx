import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getPaymentTotalLabel, getBusiness } from "@/lib/api";

export default async function SettingsBillingPage() {
  const [paymentTotalLabel, business] = await Promise.all([getPaymentTotalLabel(), getBusiness()]);

  return (
    <AppShell title="Billing History">
      <div className="body">
        <Link className="back-nav" href="/profile">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>Billing history</h2>
        <p className="settings-note">All payments made through Startora for {business.name}.</p>

        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>2026</div>

        <div className="billing-row">
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>CAC + NAFDAC + NDPR</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>Jun 22, 2026 · Mastercard ••4829</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="billing-amount">{paymentTotalLabel}</div>
            <div className="billing-status paid" style={{ marginTop: 4 }}>
              Paid
            </div>
          </div>
        </div>

        <div style={{ background: "var(--paper-raised)", border: "1px solid var(--line)", borderRadius: 10, padding: 16, marginTop: 20, textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Total spent on Startora</div>
          <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 28, fontWeight: 500, color: "var(--ledger)" }}>{paymentTotalLabel}</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>All filings and compliance services · 2026</div>
        </div>

        <Link className="btn btn-ghost" href="/payment/receipt" style={{ marginTop: 20 }}>
          View receipts
        </Link>
      </div>
    </AppShell>
  );
}
