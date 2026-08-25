"use client";

import { useState } from "react";
import Link from "next/link";
import { Toggle } from "@/components/ui/Toggle";
import type { Founder } from "@/lib/types";

function buildSections(founder: Founder) {
  return [
    {
      label: "Filing updates",
      rows: [
        { key: "approvals", label: "Filing approvals", sub: "When CAC, NAFDAC or SCUML approve a filing", defaultOn: true },
        { key: "rejections", label: "Filing rejections", sub: "If a government portal rejects a submission", defaultOn: true },
        { key: "messages", label: "Compliance team messages", sub: "When a reviewer sends you a message", defaultOn: true },
      ],
    },
    {
      label: "Reminders",
      rows: [
        { key: "deadlines", label: "Deadline reminders", sub: "Annual returns, renewals, policy reviews", defaultOn: true },
        { key: "advance7", label: "7-day advance notice", sub: "For all upcoming deadlines", defaultOn: true },
      ],
    },
    {
      label: "Channels",
      rows: [
        { key: "push", label: "Push notifications", sub: "In-app alerts", defaultOn: true },
        { key: "email", label: "Email alerts", sub: founder.email, defaultOn: true },
        { key: "whatsapp", label: "WhatsApp alerts", sub: founder.phone, defaultOn: true },
        { key: "regulatory", label: "Regulatory updates", sub: "When Nigerian laws affecting you change", defaultOn: false },
      ],
    },
  ];
}

export function NotificationSettingsBody({ founder }: { founder: Founder }) {
  const sections = buildSections(founder);
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    sections.forEach((s) => s.rows.forEach((r) => (init[r.key] = r.defaultOn)));
    return init;
  });

  return (
    <div className="body">
      <Link className="back-nav" href="/profile">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>Notification preferences</h2>
      <p className="settings-note">Choose what Startora alerts you about and how.</p>

      {sections.map((section) => (
        <div className="settings-section" key={section.label}>
          <div className="settings-label">{section.label}</div>
          {section.rows.map((row) => (
            <div className="settings-row" key={row.key}>
              <div>
                <div className="settings-row-label">{row.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{row.sub}</div>
              </div>
              <Toggle on={state[row.key] ?? row.defaultOn} onChange={() => setState((s) => ({ ...s, [row.key]: !s[row.key] }))} />
            </div>
          ))}
        </div>
      ))}

      <Link className="btn btn-primary" href="/profile">
        Save preferences
      </Link>
    </div>
  );
}
