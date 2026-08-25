"use client";

import Link from "next/link";
import { ObNav, ObProgress } from "@/components/ui/WizardNav";
import { useOnboardingActions, useOnboardingState } from "@/lib/wizard/onboarding-context";

export function StepThree() {
  const state = useOnboardingState();
  const { patch } = useOnboardingActions();

  return (
    <div className="ob-screen">
      <ObNav backHref="/onboarding/2" step={3} />
      <ObProgress step={3} />
      <div className="ob-content">
        <div className="ob-heading">Where you operate</div>
        <div className="ob-sub">
          Your registered business address. This appears on your CAC certificate and all official documents.
        </div>

        <div className="ob-field">
          <label>Street address</label>
          <input
            placeholder="e.g. 12 Adeniyi Jones Avenue"
            value={state.street}
            onChange={(e) => patch({ street: e.target.value })}
          />
        </div>
        <div className="ob-row">
          <div className="ob-field">
            <label>City</label>
            <input placeholder="e.g. Ikeja" value={state.city} onChange={(e) => patch({ city: e.target.value })} />
          </div>
          <div className="ob-field">
            <label>State</label>
            <input placeholder="e.g. Lagos" value={state.state} onChange={(e) => patch({ state: e.target.value })} />
          </div>
        </div>
        <div className="ob-field">
          <label>Local Government Area (LGA)</label>
          <input placeholder="e.g. Ikeja LGA" value={state.lga} onChange={(e) => patch({ lga: e.target.value })} />
        </div>

        <div className="ob-cta">
          <Link className="btn btn-primary" href="/onboarding/4">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
