import Link from "next/link";
import { notFound } from "next/navigation";
import { getFilingById, getFilingDocs, getFilingMessages } from "@/lib/api";

export async function FilingDetail({ filingId }: { filingId: string }) {
  const filing = await getFilingById(filingId);
  if (!filing) notFound();

  const [docs, messages] = await Promise.all([getFilingDocs(filing.id), getFilingMessages(filing.id)]);

  return (
    <>
      <Link className="fd-back" href="/filing-status">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to filings
      </Link>

      <div className="fd-title">{filing.name}</div>
      <span className="fd-ref">REF · {filing.reference}</span>

      <div className="fd-rail">
        {filing.steps.map((step) => {
          const on = step.state === "done" || step.state === "active";
          return (
            <div className="fd-step" key={step.key}>
              <div className={`fd-line ${on ? "on" : ""}`} />
              <div className={`fd-dot ${on ? "on" : ""}`}>{step.state === "done" ? "✓" : ""}</div>
              <div className={`fd-label ${on ? "on" : ""}`}>{step.label}</div>
            </div>
          );
        })}
      </div>

      {docs.length > 0 && (
        <>
          <div className="fd-section-title" style={{ marginTop: 4 }}>
            Documents
          </div>
          {docs.map((doc) => (
            <div className="fd-doc-row" key={doc.name}>
              <div className="fd-doc-icon">{doc.icon}</div>
              <div className="fd-doc-name">{doc.name}</div>
              <div className="fd-doc-action">{doc.action}</div>
            </div>
          ))}
        </>
      )}

      <div className="fd-thread" style={{ marginTop: 22 }}>
        <div className="fd-section-title">Communication</div>
        {messages.map((m, i) => (
          <div className={`fd-msg ${m.from}`} key={i}>
            {m.fromLabel && <div className="fd-msg-from">{m.fromLabel}</div>}
            <div className="fd-msg-bubble">{m.text}</div>
            <div className="fd-msg-time">{m.time}</div>
          </div>
        ))}
      </div>
      <div className="fd-reply-row">
        <input placeholder="Type a message…" />
        <button className="fd-send" type="button">
          Send
        </button>
      </div>
    </>
  );
}
