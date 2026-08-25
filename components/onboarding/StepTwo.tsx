"use client";

import Link from "next/link";
import { ObNav, ObProgress } from "@/components/ui/WizardNav";
import { useOnboardingActions, useOnboardingState } from "@/lib/wizard/onboarding-context";

export function StepTwo() {
  const state = useOnboardingState();
  const { patch } = useOnboardingActions();

  return (
    <div className="ob-screen">
      <ObNav backHref="/onboarding/1" step={2} />
      <ObProgress step={2} />
      <div className="ob-content">
        <div className="ob-heading">About you</div>
        <div className="ob-sub">
          Your legal details go on the CAC registration. Use your name exactly as it appears on your government ID.
        </div>

        <div className="ob-field">
          <label>Full legal name</label>
          <input
            placeholder="As it appears on your ID"
            value={state.fullLegalName}
            onChange={(e) => patch({ fullLegalName: e.target.value })}
          />
        </div>
        <div className="ob-field">
          <label>Date of birth</label>
          <input type="date" value={state.dob} onChange={(e) => patch({ dob: e.target.value })} />
        </div>
        <div className="ob-field">
          <label>National Identification Number (NIN)</label>
          <input
            placeholder="11-digit NIN"
            maxLength={11}
            style={{ fontFamily: 'var(--font-plex-mono), monospace', letterSpacing: ".06em" }}
            value={state.nin}
            onChange={(e) => patch({ nin: e.target.value })}
          />
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 6 }}>
            Required by CAC for all directors and shareholders. Your NIN is verified against NIMC records.
          </div>
        </div>
        <div className="ob-row">
          <div className="ob-field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={state.email}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </div>
          <div className="ob-field">
            <label>Phone (WhatsApp)</label>
            <input
              type="tel"
              placeholder="+234 810 000 0000"
              value={state.phone}
              onChange={(e) => patch({ phone: e.target.value })}
            />
          </div>
        </div>
        <div className="ob-field">
          <label>Residential address</label>
          <input
            placeholder="Street, City, State"
            value={state.residentialAddress}
            onChange={(e) => patch({ residentialAddress: e.target.value })}
          />
        </div>

        <div className="ob-cta">
          <Link className="btn btn-primary" href="/onboarding/3">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
