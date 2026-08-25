import Link from "next/link";
import { FilingProgressDots } from "@/components/ui/FilingProgress";
import type { Business, Filing } from "@/lib/types";
import type { FilingMessage } from "@/mocks/filings";

interface DesktopFilingStatusProps {
  business: Business;
  cac: Filing;
  nafdac: Filing;
  trademark: Filing;
  trademarkMessage?: FilingMessage;
}

export function DesktopFilingStatus({ business, cac, nafdac, trademark, trademarkMessage }: DesktopFilingStatusProps) {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 500 }}>Filing status</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>
          3 of 5 obligations submitted. We&apos;ll notify you the moment anything changes.
        </div>
      </div>

      <div className="fl2-card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="fl2-name">{cac.name}</div>
            <div className="fl2-ref">REF · {cac.reference} · {cac.refLabel ?? business.name}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="fl2-stamp">APPROVED</span>
            <span className="pill green">Approved</span>
          </div>
        </div>
        <FilingProgressDots steps={cac.steps} labelVariant="step" />
        <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-soft)" }}>
          Approved Jun 18, 2026 · Certificate issued · Available in Documents
        </div>
      </div>

      <div className="fl2-card" style={{ marginBottom: 16, borderColor: "var(--amber)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="fl2-name">{nafdac.name}</div>
            <div className="fl2-ref">REF · {nafdac.reference} · {nafdac.refLabel ?? business.name}</div>
          </div>
          <span className="pill amber">Action needed</span>
        </div>
        <FilingProgressDots steps={nafdac.steps} labelVariant="step" />
        <div className="fl2-msg" style={{ marginTop: 14 }}>
          <div className="fl2-msg-from">Action required</div>
          <div className="fl2-msg-text">Product label upload required before we can proceed. Upload your label artwork to continue.</div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Link href="/registration/nafdac/3" className="btn btn-primary" style={{ width: "auto", padding: "9px 18px" }}>
            Upload product label
          </Link>
          <Link href="/contact" className="btn btn-ghost" style={{ width: "auto", padding: "9px 18px" }}>
            Message compliance team
          </Link>
        </div>
      </div>

      <div className="fl2-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div className="fl2-name">{trademark.name}</div>
            <div className="fl2-ref">REF · {trademark.reference} · {trademark.refLabel ?? business.name}</div>
          </div>
          <span className="pill green">In progress</span>
        </div>
        <FilingProgressDots steps={trademark.steps} labelVariant="step" />
        <div className="fl2-msg" style={{ marginTop: 14 }}>
          <div className="fl2-msg-from">{trademarkMessage?.fromLabel ?? "Compliance team"}</div>
          <div className="fl2-msg-text">{trademarkMessage?.text}</div>
        </div>
        <div className="fl2-reply" style={{ marginTop: 12 }}>
          <input type="text" placeholder="Type your reply…" />
          <button className="fl2-send" type="button">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
