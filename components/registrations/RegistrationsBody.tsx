"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { LicenceGroup, LicenceSector } from "@/mocks/registrations";

const ICONS: Record<LicenceSector, ReactNode> = {
  basic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  energy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  health: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  finance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  food: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  all: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
};

interface RegistrationsBodyProps {
  licenceSections: Record<Exclude<LicenceSector, "all">, LicenceGroup[]>;
  sectorTabs: { value: LicenceSector; label: string }[];
}

export function RegistrationsBody({ licenceSections, sectorTabs }: RegistrationsBodyProps) {
  const [active, setActive] = useState<LicenceSector>("basic");
  const sectorsToShow: Exclude<LicenceSector, "all">[] =
    active === "all" ? ["basic", "energy", "health", "finance", "food"] : [active];

  return (
    <div className="body">
      <Link className="back-nav" href="/services">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 4px" }}>All registrations</h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        Every licence and compliance document your business may need — by sector. Startora handles the filing end
        to end.
      </p>

      <div className="sector-scroll">
        {sectorTabs.map((tab) => (
          <div key={tab.value} className={`sector-pill${active === tab.value ? " on" : ""}`} onClick={() => setActive(tab.value)}>
            <div className="sector-icon" style={{ stroke: active === tab.value ? "var(--ledger)" : "var(--ink-soft)" }}>
              {ICONS[tab.value]}
            </div>
            <div className="sector-label">{tab.label}</div>
          </div>
        ))}
      </div>

      {sectorsToShow.map((sector) => (
        <div className="licence-section active" key={sector}>
          {licenceSections[sector].map((group) => (
            <div key={group.heading}>
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-soft)", margin: "20px 0 10px", fontFamily: "var(--font-plex-mono), monospace" }}>
                {group.heading}
              </div>
              {group.items.map((item) => (
                <div className="licence-row" key={item.name}>
                  <div className="licence-info">
                    <div className="licence-name">{item.name}</div>
                    <div className="licence-body">{item.body}</div>
                  </div>
                  <div className={`licence-badge ${item.badge}`}>{item.badge === "active" ? "Active" : "Add"}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
