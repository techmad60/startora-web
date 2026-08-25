"use client";

import { useState } from "react";
import Link from "next/link";
import type { AppNotification, MessageThread } from "@/lib/types";

const ICONS: Record<string, string> = { action: "⚠️", update: "✅", deadline: "📅" };

interface NotificationsScreenProps {
  notifications: AppNotification[];
  messageThreads: MessageThread[];
}

export function NotificationsScreen({ notifications, messageThreads }: NotificationsScreenProps) {
  const [tab, setTab] = useState<"updates" | "messages">("updates");
  const unreadUpdates = notifications.filter((n) => n.unread).length;
  const unreadMessages = messageThreads.filter((m) => m.unread).length;

  return (
    <div className="body">
      <Link className="back-nav" href="/dashboard">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 14px" }}>Notifications</h2>

      <div className="notif-tabs">
        <div className={`notif-tab${tab === "updates" ? " on" : ""}`} onClick={() => setTab("updates")}>
          Updates{" "}
          <span style={{ background: "var(--stamp)", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, marginLeft: 4, display: "inline-block" }}>
            {unreadUpdates}
          </span>
        </div>
        <div className={`notif-tab${tab === "messages" ? " on" : ""}`} onClick={() => setTab("messages")}>
          Messages{" "}
          <span style={{ background: "var(--ledger)", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, marginLeft: 4, display: "inline-block" }}>
            {unreadMessages}
          </span>
        </div>
      </div>

      {tab === "updates" && (
        <div className="notif-view active">
          {notifications.map((n) => (
            <Link href={n.href} className={`notif-row${n.unread ? " unread" : ""}`} key={n.id}>
              <div className={`notif-dot${n.unread ? " unread" : ""}`} />
              <div className={`notif-icon ${n.kind}`}>{ICONS[n.kind]}</div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-desc">{n.desc}</div>
                <div className="notif-time">{n.time}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {tab === "messages" && (
        <div className="notif-view active">
          {messageThreads.map((m) => (
            <Link href={m.href} className="msg-thread" key={m.id}>
              <div className="msg-av">{m.senderInitials}</div>
              <div style={{ flex: 1 }}>
                <div className="msg-filing">{m.filingLabel}</div>
                <div className={`msg-preview${m.unread ? "" : " read"}`}>{m.preview}</div>
                <div className="msg-time">{m.time}</div>
              </div>
              {m.unread && <div className="msg-unread" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
