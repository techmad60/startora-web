"use client";

import { useState } from "react";
import Link from "next/link";
import type { Sector, ServiceSectorGroup } from "@/mocks/services";

const TABS: { value: Sector; label: string }[] = [
  { value: "all", label: "All" },
  { value: "basic", label: "Basic" },
  { value: "food", label: "Food & Health" },
  { value: "finance", label: "Finance" },
  { value: "energy", label: "Energy" },
];

export function DesktopServices({ serviceSectors }: { serviceSectors: ServiceSectorGroup[] }) {
  const [active, setActive] = useState<Sector>("all");
  const groups = active === "all" ? serviceSectors : serviceSectors.filter((g) => g.sector === active);

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 500 }}>Services &amp; Registrations</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>Every licence available through Startora, by sector.</div>
      </div>
      <div className="sector-tabs" style={{ marginBottom: 24 }}>
        {TABS.map((t) => (
          <button key={t.value} className={`sector-tab${active === t.value ? " on" : ""}`} onClick={() => setActive(t.value)} type="button">
            {t.label}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <div key={group.sector} style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", margin: "20px 0 12px", fontFamily: "var(--font-plex-mono), monospace" }}>
            {group.label}
          </div>
          <div className="d-svc-grid">
            {group.items.map((item) => (
              <div className="svc-card" key={item.id}>
                <div className="svc-name">{item.name}</div>
                <div className="svc-body">{item.body}</div>
                <div className="svc-foot">
                  <span className="svc-price">{item.priceLabel}</span>
                  {item.action.kind === "active" ? (
                    <span className="svc-active">Active</span>
                  ) : (
                    <Link href={item.action.href} className="svc-add">
                      {item.action.kind === "enquire" ? "Enquire" : "Start"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
