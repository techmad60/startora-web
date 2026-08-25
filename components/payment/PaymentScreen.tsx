"use client";

import Link from "next/link";
import { useState } from "react";
import type { PaymentMethod, Business, PayLineItem } from "@/lib/types";

const METHODS: { key: PaymentMethod; icon: string; label: string }[] = [
  { key: "card", icon: "💳", label: "Card" },
  { key: "transfer", icon: "🏦", label: "Transfer" },
  { key: "ussd", icon: "📱", label: "USSD" },
];

interface PaymentScreenProps {
  business: Business;
  paymentLineItems: PayLineItem[];
  paymentTotalLabel: string;
}

export function PaymentScreen({ business, paymentLineItems, paymentTotalLabel }: PaymentScreenProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="pay-success show">
        <div className="success-stamp">✓</div>
        <div className="success-title">Payment received</div>
        <div className="success-sub">
          {paymentTotalLabel} confirmed. Your filings are queued and will be reviewed by our compliance team within
          the hour.
        </div>
        <Link className="btn btn-primary" href="/registration/cac/shareholders" style={{ width: "100%" }}>
          Complete CAC registration →
        </Link>
        <Link className="btn btn-ghost" href="/payment/receipt" style={{ marginTop: 10, width: "100%" }}>
          View receipt
        </Link>
        <Link className="btn btn-ghost" href="/dashboard" style={{ marginTop: 10, width: "100%" }}>
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="pay-form">
      <Link className="back-nav" href="/compliance-map">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="pay-head">
        <h2>Review &amp; pay</h2>
        <p>{business.name} · 3 obligations approved</p>
      </div>

      {paymentLineItems.map((item) => (
        <div className="pay-item" key={item.id}>
          <div>
            <div className="pay-item-name">{item.name}</div>
            <div className="pay-item-meta">{item.meta}</div>
          </div>
          <div className="pay-item-price">{item.priceLabel}</div>
        </div>
      ))}

      <div className="pay-total">
        <div className="label">Total</div>
        <div className="amount">{paymentTotalLabel}</div>
      </div>

      <div className="pay-methods">
        <div className="pay-method-label">Pay with</div>
        <div className="method-opts">
          {METHODS.map((m) => (
            <div key={m.key} className={`method-opt${method === m.key ? " sel" : ""}`} onClick={() => setMethod(m.key)}>
              <div className="m-icon">{m.icon}</div>
              <div className="m-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {method === "card" && (
        <div>
          <div className="auth-field-group">
            <label className="auth-label">Card number</label>
            <input className="field" placeholder="0000 0000 0000 0000" style={{ marginBottom: 0 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="auth-field-group" style={{ flex: 1 }}>
              <label className="auth-label">Expiry</label>
              <input className="field" placeholder="MM / YY" style={{ marginBottom: 0 }} />
            </div>
            <div className="auth-field-group" style={{ flex: 1 }}>
              <label className="auth-label">CVV</label>
              <input className="field" placeholder="•••" style={{ marginBottom: 0 }} />
            </div>
          </div>
        </div>
      )}

      {method === "transfer" && (
        <div className="bank-details">
          <div className="bank-row"><span className="bk">Bank</span><span className="bv">Wema Bank</span></div>
          <div className="bank-row"><span className="bk">Account name</span><span className="bv">Startora Ltd</span></div>
          <div className="bank-row"><span className="bk">Account number</span><span className="bv">0123456789</span></div>
          <div className="bank-row"><span className="bk">Amount</span><span className="bv">{paymentTotalLabel}</span></div>
          <div className="bank-copy">Copy account number</div>
        </div>
      )}

      {method === "ussd" && (
        <div className="auth-field-group">
          <label className="auth-label">Bank USSD code</label>
          <input className="field" placeholder="e.g. *737#" style={{ marginBottom: 0 }} />
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 8 }}>
            Dial your bank&apos;s USSD code and follow the prompts to complete payment.
          </div>
        </div>
      )}

      <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setPaid(true)} type="button">
        Pay {paymentTotalLabel}
      </button>
      <div className="pay-secure">🔒 Secured by Paystack · end-to-end encrypted</div>
    </div>
  );
}
