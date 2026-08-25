"use client";

import { useState } from "react";
import { lookupChatResponse } from "@/mocks/chat-responses";

export interface ChatMessage {
  role: "me" | "ai";
  text: string;
}

export function useChatMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestionsUsed, setSuggestionsUsed] = useState(false);

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "me", text: trimmed }]);
    setSuggestionsUsed(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: lookupChatResponse(trimmed) }]);
    }, 800);
  }

  return { messages, send, suggestionsUsed };
}
