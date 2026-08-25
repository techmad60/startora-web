import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { getPaymentLineItems, getPaymentTotalLabel, getBusiness } from "@/lib/api";

export default async function PaymentReceiptPage() {
  const [paymentLineItems, paymentTotalLabel, business] = await Promise.all([
    getPaymentLineItems(),
    getPaymentTotalLabel(),
    getBusiness(),
  ]);

  return (
    <AppShell title="Receipt">
      <div className="body">
        <Link className="back-nav" href="/dashboard">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back to home
        </Link>

        <div className="receipt-head">
          <div className="receipt-stamp">✓</div>
          <div className="receipt-amount">{paymentTotalLabel}</div>
          <div className="receipt-date">Paid · Jun 22, 2026 · 2:30 PM</div>
        </div>

        <div className="receipt-row">
          <span className="rl">Transaction ID</span>
          <span className="rv" style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11.5 }}>
            STR-TXN-2026-004821
          </span>
        </div>
        <div className="receipt-row">
          <span className="rl">Payment method</span>
          <span className="rv">Mastercard •••• 4829</span>
        </div>
        <div className="receipt-row">
          <span className="rl">Business</span>
          <span className="rv">{business.name}</span>
        </div>

        <div className="dash-section-title" style={{ marginTop: 18 }}>
          Services paid for
        </div>
        {paymentLineItems.map((item) => (
          <div className="receipt-row" key={item.id}>
            <span className="rl">{item.name}</span>
            <span className="rv">{item.priceLabel}</span>
          </div>
        ))}

        <div className="receipt-txid">All filings are now queued. A compliance team member will review and submit within the hour.</div>

        <Link className="btn btn-primary" href="/filing-status" style={{ marginTop: 20 }}>
          Track your filings
        </Link>
        <button className="btn btn-ghost" style={{ marginTop: 10 }} type="button">
          Download receipt
        </button>
      </div>
    </AppShell>
  );
}
