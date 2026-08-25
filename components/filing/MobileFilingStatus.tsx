import Link from "next/link";
import { FilingProgressDots } from "@/components/ui/FilingProgress";
import type { Filing } from "@/lib/types";
import type { FilingMessage } from "@/mocks/filings";

interface MobileFilingStatusProps {
  cac: Filing;
  nafdac: Filing;
  trademark: Filing;
  trademarkMessage?: FilingMessage;
}

export function MobileFilingStatus({ cac, nafdac, trademark, trademarkMessage }: MobileFilingStatusProps) {
  return (
    <div className="body">
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 500, margin: "0 0 4px" }}>Filing status</h2>
      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", margin: "0 0 22px", lineHeight: 1.5 }}>
        3 of 5 obligations submitted. We&apos;ll notify you the moment anything changes.
      </p>

      <div className="fl2-card">
        <div className="fl2-top">
          <div>
            <div className="fl2-name">{cac.name}</div>
            <div className="fl2-ref">REF · {cac.reference}</div>
          </div>
          <div className="fl2-stamp">APPROVED</div>
        </div>
        <div className="fl2-prog">
          <FilingProgressDots steps={cac.steps} labelVariant="card" />
        </div>
      </div>

      <Link href={`/filing-status/${nafdac.id}`} className="fl2-card" style={{ cursor: "pointer" }}>
        <div className="fl2-top">
          <div>
            <div className="fl2-name">{nafdac.name}</div>
            <div className="fl2-ref">REF · {nafdac.reference}</div>
          </div>
        </div>
        <div className="fl2-prog">
          <FilingProgressDots steps={nafdac.steps} labelVariant="card" />
        </div>
        <div className="fl2-note">Submitted to NAFDAC on Jun 24. Government processing typically takes 5–10 business days.</div>
      </Link>

      <div className="fl2-card">
        <Link href={`/filing-status/${trademark.id}`} style={{ display: "block", cursor: "pointer" }}>
          <div className="fl2-top">
            <div>
              <div className="fl2-name">{trademark.name}</div>
              <div className="fl2-ref">REF · {trademark.reference}</div>
            </div>
          </div>
          <div className="fl2-prog">
            <FilingProgressDots steps={trademark.steps} labelVariant="card" />
          </div>
          <div className="fl2-msg">
            <div className="fl2-msg-from">{trademarkMessage?.fromLabel ?? "Compliance team"}</div>
            <div className="fl2-msg-text">{trademarkMessage?.text}</div>
          </div>
        </Link>
        <div className="fl2-reply">
          <input type="text" placeholder="Type your reply…" />
          <button className="fl2-send" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
