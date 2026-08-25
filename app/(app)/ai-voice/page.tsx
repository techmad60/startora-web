import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";

export default function AiVoicePage() {
  return (
    <AppShell title="Ask Startora" hideTabBar>
      <div className="ai-voice-screen">
        <div className="ai-mic-big">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="11" rx="3" />
            <path d="M19 10a7 7 0 01-14 0" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="8" y1="22" x2="16" y2="22" />
          </svg>
        </div>
        <div className="ai-voice-label">Ask Startora</div>
        <div className="ai-voice-sub">
          Hold and speak your compliance question.
          <br />
          Release to get your answer.
        </div>
        <div className="ai-wave">
          {Array.from({ length: 7 }, (_, i) => (
            <div className="ai-bar" key={i} />
          ))}
        </div>
        <Link className="ai-stop-btn" href="/ai-chat">
          Done — see response
        </Link>
        <Link href="/ai-chat" style={{ marginTop: 16, fontSize: 12, opacity: 0.6, cursor: "pointer", color: "inherit" }}>
          Switch to text instead
        </Link>
        <Link href="/dashboard" style={{ marginTop: 28, display: "block" }}>
          <span className="back-nav" style={{ color: "rgba(255,255,255,.6)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
          </span>
        </Link>
      </div>
    </AppShell>
  );
}
