"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Founder } from "@/lib/types";

const TOUR_SEEN_KEY = "startora.seenWelcomeTour.v1";

const STEPS = [
  {
    title: "Answer a few questions",
    sub: "Tell Startora about your business — sector, size, operating model. Takes under five minutes.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    title: "Startora maps your requirements",
    sub: "The exact registrations and licences your business needs — nothing more, nothing missed.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Autonomous filing",
    sub: "Every document generated and filed in one flow. A human reviewer checks it before it's submitted.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  },
  {
    title: "A compliance profile, for life",
    sub: "Every obligation and deadline tracked automatically. Startora alerts you before anything is due.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function EmptyDashboardBody({ founder }: { founder: Founder }) {
  const firstName = founder.fullName.split(" ")[0];
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(TOUR_SEEN_KEY)) {
        setShowTour(true);
      }
    } catch {
      // localStorage unavailable — skip the tour rather than break the page
    }
  }, []);

  function dismissTour() {
    setShowTour(false);
    try {
      window.localStorage.setItem(TOUR_SEEN_KEY, "1");
    } catch {
      // no-op if storage is unavailable
    }
  }

  const tourModal = (
    <div className="lp-modal-overlay" onClick={dismissTour}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div className="lp-modal-icon">✦</div>
        <h3>Welcome to Startora, {firstName}.</h3>
        <p style={{ marginBottom: 22 }}>Here&apos;s exactly what happens once you register your first business.</p>
        <div style={{ marginBottom: 26 }}>
          {STEPS.map((step, i) => (
            <div className="ed-step-row" key={step.title} style={{ paddingTop: i === 0 ? 0 : 14, paddingBottom: 14, borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
              <div className="ed-step-icon">{step.icon}</div>
              <div>
                <div className="ed-step-title">{step.title}</div>
                <div className="ed-step-sub">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={dismissTour} type="button">
          Got it — let&apos;s go
        </button>
      </div>
    </div>
  );

  return (
    <div className="ed-body">
      <div className="ed-hero">
        <div className="ed-hero-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
          </svg>
        </div>
        <h1>Welcome, {firstName}.</h1>
        <p>You haven&apos;t registered a business yet. Here&apos;s what happens the moment you do.</p>
      </div>

      <Link className="ed-cta-card" href="/onboarding/1">
        <div className="ed-cta-top">
          <div className="ed-cta-title">Register your business</div>
          <div className="ed-cta-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
        <div className="ed-cta-sub">Takes about 5 minutes to get started</div>
      </Link>

      <div className="ed-steps-label">What happens next</div>
      {STEPS.map((step) => (
        <div className="ed-step-row" key={step.title}>
          <div className="ed-step-icon">{step.icon}</div>
          <div>
            <div className="ed-step-title">{step.title}</div>
            <div className="ed-step-sub">{step.sub}</div>
          </div>
        </div>
      ))}

      <Link className="ed-secondary-link" href="/dashboard">
        Explore Startora first
      </Link>

      {showTour && createPortal(tourModal, document.body)}
    </div>
  );
}
