"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { ObNav, ObProgress } from "@/components/ui/WizardNav";
import { useOnboardingActions, useOnboardingState } from "@/lib/wizard/onboarding-context";

export function StepFour() {
  const state = useOnboardingState();
  const { patch } = useOnboardingActions();
  const [draft, setDraft] = useState("");

  function addActivity(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || !draft.trim()) return;
    e.preventDefault();
    patch({ activities: [...state.activities, draft.trim()] });
    setDraft("");
  }

  function removeActivity(index: number) {
    patch({ activities: state.activities.filter((_, i) => i !== index) });
  }

  return (
    <div className="ob-screen">
      <ObNav backHref="/onboarding/3" step={4} />
      <ObProgress step={4} />
      <div className="ob-content">
        <div className="ob-heading">What does your business do?</div>
        <div className="ob-sub">
          Type each activity your business performs and press Enter. Startora uses this to map your exact compliance
          obligations — be specific.
        </div>

        <div className="ob-field" style={{ marginTop: 4 }}>
          <div className="ob-activity-wrap">
            <div className="ob-pills" id="activity-pills-list">
              {state.activities.map((activity, i) => (
                <div className="ob-pill" key={`${activity}-${i}`}>
                  {activity} <span className="ob-pill-rm" onClick={() => removeActivity(i)}>×</span>
                </div>
              ))}
            </div>
            <input
              className="ob-activity-input"
              id="activity-input"
              placeholder="Add an activity and press Enter…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={addActivity}
            />
          </div>
          <div className="ob-hint">
            Examples: Catering · Logistics · Event management · Consulting · Software development · Import/export
          </div>
        </div>

        <div style={{ background: "var(--ledger-soft)", borderRadius: 8, padding: "12px 14px", marginTop: 8, fontSize: 12.5, color: "var(--ledger)", lineHeight: 1.55 }}>
          The more specific you are, the more accurate your compliance map will be. You can always update this later.
        </div>

        <div className="ob-cta">
          <Link className="btn btn-primary" href="/onboarding/5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
