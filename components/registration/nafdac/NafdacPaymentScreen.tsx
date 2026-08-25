"use client";

import { useState } from "react";
import Link from "next/link";
import { RegBackNav } from "@/components/ui/WizardNav";
import type { PaymentMethod, Business } from "@/lib/types";
import { useNafdacWizardState } from "@/lib/wizard/nafdac-context";

const METHODS: { key: PaymentMethod; icon: string; label: string }[] = [
  { key: "card", icon: "💳", label: "Card" },
  { key: "transfer", icon: "🏦", label: "Transfer" },
  { key: "ussd", icon: "📱", label: "USSD" },
];

export function NafdacPaymentScreen({ business }: { business: Business }) {
  const { productName } = useNafdacWizardState();
  const [method, setMethod] = useState<PaymentMethod>("card");

  return (
    <>
      <RegBackNav href="/registration/nafdac/5" label="Back" />
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>
        Pay NAFDAC fee
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px" }}>
        {business.name} · {productName || "Your product"}
      </p>

      <div className="pay-item">
        <div>
          <div className="pay-item-name">NAFDAC Food Registration</div>
          <div className="pay-item-meta">Product: {productName || "—"} · Lagos facility</div>
        </div>
        <div className="pay-item-price">₦50,000</div>
      </div>
      <div className="pay-item">
        <div>
          <div className="pay-item-name">Startora filing &amp; management fee</div>
          <div className="pay-item-meta">Includes document prep, submission, and tracking</div>
        </div>
        <div className="pay-item-price">₦50,000</div>
      </div>
      <div className="pay-total">
        <div style={{ fontSize: 12.5, fontWeight: 500 }}>Total</div>
        <div className="amount">₦100,000</div>
      </div>

      <div style={{ background: "var(--ledger-soft)", borderRadius: 8, padding: 12, margin: "18px 0", fontSize: 12.5, color: "var(--ledger)", lineHeight: 1.5 }}>
        The ₦50,000 NAFDAC government fee is paid directly to NAFDAC via Remita. Startora handles the submission on
        your behalf.
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>
          Pay with
        </div>
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
          <div className="field-group">
            <label className="field-label">Card number</label>
            <input className="field" placeholder="0000 0000 0000 0000" style={{ marginBottom: 0, fontFamily: "var(--font-plex-mono), monospace" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="field-group" style={{ flex: 1 }}>
              <label className="field-label">Expiry</label>
              <input className="field" placeholder="MM/YY" style={{ marginBottom: 0 }} />
            </div>
            <div className="field-group" style={{ flex: 1 }}>
              <label className="field-label">CVV</label>
              <input className="field" placeholder="•••" style={{ marginBottom: 0 }} />
            </div>
          </div>
        </div>
      )}

      <Link href="/registration/nafdac/success" className="btn btn-primary" style={{ marginTop: 16 }}>
        Pay ₦100,000
      </Link>
      <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--ink-soft)", marginTop: 10 }}>
        🔒 Secured by Paystack
      </div>
    </>
  );
}
