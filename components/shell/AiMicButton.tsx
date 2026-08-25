import Link from "next/link";

export function AiMicButton() {
  return (
    <Link
      href="/ai-voice"
      className="ai-mic-btn"
      style={{
        cursor: "pointer",
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1.5px solid var(--line)",
        background: "var(--paper-raised)",
        marginRight: 2,
      }}
      aria-label="Ask Startora"
    >
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="5" width="3" height="8" rx="1.5" fill="var(--ledger)" />
        <rect x="4.5" y="2" width="3" height="14" rx="1.5" fill="var(--ledger)" />
        <rect x="9" y="0" width="3" height="18" rx="1.5" fill="var(--ledger)" />
        <rect x="13.5" y="2" width="3" height="14" rx="1.5" fill="var(--ledger)" />
        <rect x="18" y="5" width="2" height="8" rx="1" fill="var(--ledger)" />
      </svg>
    </Link>
  );
}
