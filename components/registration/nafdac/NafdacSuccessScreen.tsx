"use client";

import Link from "next/link";
import { useNafdacWizardState } from "@/lib/wizard/nafdac-context";

export function NafdacSuccessScreen() {
  const { productName } = useNafdacWizardState();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 500, textAlign: "center", padding: "40px 0" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--ledger-soft)", border: "2px solid var(--ledger)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 20 }}>
        ✓
      </div>
      <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
        Payment confirmed
      </div>
      <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: 28 }}>
        ₦100,000 received. Your NAFDAC application for {productName || "your product"} is now queued. Startora will
        submit to the NAFDAC e-portal and schedule your facility inspection.
      </div>
      <Link className="btn btn-primary" href="/filing-status" style={{ width: "100%" }}>
        Track your NAFDAC filing
      </Link>
      <Link className="btn btn-ghost" href="/dashboard" style={{ marginTop: 10, width: "100%" }}>
        Back to home
      </Link>
    </div>
  );
}
