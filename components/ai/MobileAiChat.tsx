"use client";

import { useState } from "react";
import Link from "next/link";
import { useChatMessages } from "@/lib/useChatMessages";
import type { Business, Founder } from "@/lib/types";

interface MobileAiChatProps {
  business: Business;
  founder: Founder;
  suggestedQuestions: string[];
}

export function MobileAiChat({ business, founder, suggestedQuestions }: MobileAiChatProps) {
  const { messages, send, suggestionsUsed } = useChatMessages();
  const [input, setInput] = useState("");

  function submit() {
    send(input);
    setInput("");
  }

  return (
    <div className="ai-chat-screen">
      <div className="ai-chat-head">
        <div>
          <div className="ai-chat-title">Ask Startora</div>
          <div className="ai-chat-sub">Compliance advisor · {business.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/ai-voice" style={{ cursor: "pointer", opacity: 0.7 }}>
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="5" width="3" height="8" rx="1.5" fill="var(--ledger)" />
              <rect x="4.5" y="2" width="3" height="14" rx="1.5" fill="var(--ledger)" />
              <rect x="9" y="0" width="3" height="18" rx="1.5" fill="var(--ledger)" />
              <rect x="13.5" y="2" width="3" height="14" rx="1.5" fill="var(--ledger)" />
              <rect x="18" y="5" width="2" height="8" rx="1" fill="var(--ledger)" />
            </svg>
          </Link>
          <Link className="ai-close" href="/dashboard">
            ✕
          </Link>
        </div>
      </div>

      <div className="ai-messages">
        <div className="ai-msg ai">
          <div className="ai-bubble">
            Good morning {founder.fullName.split(" ")[0]}. {business.name} has 2 things needing attention. What do
            you want to
            understand?
          </div>
          <div className="ai-msg-time">9:41 AM</div>
          {!suggestionsUsed && (
            <div className="ai-suggestions">
              {suggestedQuestions.map((q) => (
                <div className="ai-chip" key={q} onClick={() => send(q)}>
                  {q}
                </div>
              ))}
            </div>
          )}
        </div>

        {messages.map((m, i) => (
          <div className={`ai-msg ${m.role}`} key={i}>
            <div className="ai-bubble">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="ai-input-row">
        <input
          className="ai-input"
          placeholder="Ask a compliance question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="ai-send" onClick={submit} type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
