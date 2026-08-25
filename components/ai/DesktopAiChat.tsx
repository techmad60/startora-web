"use client";

import { useState } from "react";
import { useChatMessages } from "@/lib/useChatMessages";
import type { Business, Founder } from "@/lib/types";

interface DesktopAiChatProps {
  business: Business;
  founder: Founder;
  complianceScore: number;
  suggestedQuestions: string[];
  quickTopics: string[];
}

export function DesktopAiChat({ business, founder, complianceScore, suggestedQuestions, quickTopics }: DesktopAiChatProps) {
  const { messages, send, suggestionsUsed } = useChatMessages();
  const [input, setInput] = useState("");

  function submit() {
    send(input);
    setInput("");
  }

  return (
    <div style={{ height: "calc(100vh - 60px)" }}>
      <div className="d-ai-wrap">
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 18, fontWeight: 500 }}>Ask Startora</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 2 }}>Compliance advisor · {business.name}</div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ alignSelf: "flex-start", maxWidth: "75%" }}>
              <div className="fl2-note" style={{ borderRadius: 12, borderBottomLeftRadius: 3, padding: "12px 15px", fontSize: 13.5, lineHeight: 1.6 }}>
                Good morning {founder.fullName.split(" ")[0]}. {business.name} has 2 things needing attention — an
                overdue Annual
                Return and a NAFDAC label upload. What do you want to understand?
              </div>
              {!suggestionsUsed && (
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>
                  {suggestedQuestions.slice(0, 3).map((q) => (
                    <div className="ai-chip" key={q} onClick={() => send(q)}>
                      {q}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "me" ? "flex-end" : "flex-start", maxWidth: "75%" }}>
                <div
                  style={
                    m.role === "me"
                      ? { background: "var(--ledger)", color: "#fff", padding: "12px 15px", borderRadius: 12, borderBottomRightRadius: 3, fontSize: 13.5, lineHeight: 1.6 }
                      : { padding: "12px 15px", borderRadius: 12, borderBottomLeftRadius: 3, fontSize: 13.5, lineHeight: 1.6, background: "var(--ledger-soft)" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "14px 24px", borderTop: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <input
              className="field"
              placeholder="Ask a compliance question…"
              style={{ flex: 1, marginBottom: 0 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button
              onClick={submit}
              type="button"
              style={{ width: 42, height: 42, borderRadius: 10, background: "var(--ledger)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        <div className="d-ai-context">
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 12, fontFamily: "var(--font-plex-mono), monospace" }}>
            Business context
          </div>
          <div className="card-sm" style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 3 }}>Business</div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{business.name}</div>
          </div>
          <div className="card-sm" style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 3 }}>Compliance score</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ledger)" }}>{complianceScore} / 100</div>
          </div>
          <div className="card-sm" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 3 }}>Active filings</div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>3 filings · 1 action needed</div>
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10, fontFamily: "var(--font-plex-mono), monospace" }}>
            Quick topics
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {quickTopics.map((t) => (
              <div className="ai-chip" key={t} style={{ fontSize: 12.5 }} onClick={() => send(t)}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
