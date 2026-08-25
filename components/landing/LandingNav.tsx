"use client";

import { useState } from "react";
import { RegisterCtaButton } from "@/components/landing/RegisterCtaButton";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="lp-nav">
      <div className="lp-nav-inner">
        <div className="lp-wordmark">
          START<span>ORA</span>
        </div>
        <div className="lp-nav-links">
          {NAV_LINKS.map((link) => (
            <a className="lp-nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="lp-nav-actions">
          <RegisterCtaButton className="lp-nav-signin">Sign in</RegisterCtaButton>
          <RegisterCtaButton className="lp-btn lp-btn-primary">Get started</RegisterCtaButton>
          <button className="lp-nav-mobile-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lp-nav-mobile-panel">
          {NAV_LINKS.map((link) => (
            <a className="lp-nav-mobile-link" href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
