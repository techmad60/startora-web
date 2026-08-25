"use client";

import Link from "next/link";
import { ObNav, ObProgress } from "@/components/ui/WizardNav";
import { useOnboardingActions, useOnboardingState } from "@/lib/wizard/onboarding-context";
import type { OnboardingState } from "@/lib/types";

const OPERATING_LENGTHS: OnboardingState["operatingLength"][] = [
  "Just starting",
  "Under 1 year",
  "1–3 years",
  "3+ years",
];

/**
 * Ports `detectBizType()` from the source app.js verbatim (keyword
 * matching against the free-text description). It was one of the few
 * onboarding interactions that was actually implemented in the source.
 */
function detectBizType(description: string): string | null {
  if (description.length < 20) return null;
  const t = description.toLowerCase();
  if (/food|cook|catering|restaurant|meal|jollof|spice|kitchen/.test(t))
    return "Food Manufacturing & Distribution · NAFDAC registration required";
  if (/tech|software|app|digital|code|platform|saas/.test(t))
    return "Technology & Software · NDPR compliance required";
  if (/fashion|cloth|fabric|sew|tailor|design|wear/.test(t))
    return "Fashion & Retail · Trademark registration recommended";
  if (/health|medic|pharma|drug|clinic|hospital/.test(t))
    return "Healthcare · NAFDAC + PCN licences likely required";
  if (/real estate|property|land|house|rent|lease/.test(t))
    return "Real Estate · SCUML registration required";
  if (/finance|loan|invest|money|payment|fintech/.test(t))
    return "Financial Services · CBN licence likely required";
  return "General Trade & Services · Business Name or Private Limited recommended";
}

export function StepOne() {
  const state = useOnboardingState();
  const { patch } = useOnboardingActions();
  const detected = detectBizType(state.businessDescription);

  return (
    <div className="ob-screen">
      <ObNav backHref="/auth/sign-in" step={1} />
      <ObProgress step={1} />
      <div className="ob-content">
        <div className="ob-heading">Tell us about your business</div>
        <div className="ob-sub">
          Describe what you do in plain language. We&apos;ll figure out your business type and compliance needs from
          there.
        </div>

        <div className="ob-field">
          <label>Business name</label>
          <input
            placeholder="e.g. Chiamaka's Kitchen"
            autoComplete="off"
            value={state.businessName}
            onChange={(e) => patch({ businessName: e.target.value })}
          />
        </div>

        <div className="ob-field">
          <label>What does your business do?</label>
          <textarea
            placeholder="Describe in plain language what your business makes, sells, or provides and who your customers are."
            value={state.businessDescription}
            onChange={(e) => patch({ businessDescription: e.target.value })}
          />
          {detected && (
            <div className="ob-detect show">
              <strong>Startora detects:</strong> {detected}
            </div>
          )}
        </div>

        <div className="ob-field">
          <label>How long have you been operating?</label>
          <div className="ob-chips">
            {OPERATING_LENGTHS.map((option) => (
              <div
                key={option}
                className={`ob-chip${state.operatingLength === option ? " on" : ""}`}
                onClick={() => patch({ operatingLength: option })}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="ob-cta">
          <Link className="btn btn-primary" href="/onboarding/2">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
