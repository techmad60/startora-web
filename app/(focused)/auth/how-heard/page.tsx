"use client";

import { useState } from "react";
import Link from "next/link";
import { FlowScreen } from "@/components/auth/FlowScreen";

const OPTIONS = [
  "Referred by another founder",
  "Instagram or TikTok",
  "Google Search",
  "Tech hub or accelerator",
  "LinkedIn",
  "Other",
];

export default function HowHeardPage() {
  const [selected, setSelected] = useState(OPTIONS[0]);

  return (
    <FlowScreen
      backHref="/auth/email-verify"
      activeDot={4}
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      }
      title="Last thing — how did you find us?"
      sub="This helps us understand where founders come from."
    >
      <div className="how-chip-row">
        {OPTIONS.map((opt) => (
          <div key={opt} className={`how-chip${selected === opt ? " sel" : ""}`} onClick={() => setSelected(opt)}>
            {opt}
          </div>
        ))}
      </div>
      <Link className="btn btn-primary" href="/dashboard/empty">
        Go to my dashboard
      </Link>
    </FlowScreen>
  );
}
