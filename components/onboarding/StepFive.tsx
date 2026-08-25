"use client";

import Link from "next/link";
import { ObNav, ObProgress } from "@/components/ui/WizardNav";
import { useOnboardingActions, useOnboardingState } from "@/lib/wizard/onboarding-context";
import type { EntityType } from "@/lib/types";

export function StepFive() {
  const state = useOnboardingState();
  const { patch } = useOnboardingActions();

  function select(type: EntityType) {
    patch({ entityType: type });
  }

  return (
    <div className="ob-screen">
      <ObNav backHref="/onboarding/4" step={5} />
      <ObProgress step={5} />
      <div className="ob-content">
        <div className="ob-heading">Choose your structure</div>
        <div className="ob-sub">This decision affects what you can do with your business long-term.</div>

        <div className="ob-warn">
          Most founders default to Business Name because it sounds familiar — then discover it blocks them from
          raising investment or winning enterprise contracts. Read both options before choosing.
        </div>

        <div className={`ob-entity-card${state.entityType === "BN" ? " sel" : ""}`} onClick={() => select("BN")}>
          <div className="ob-entity-head">
            <div>
              <div className="ob-entity-name">Business Name</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>Sole proprietorship · Enterprise</div>
            </div>
            <div className={`ob-entity-radio${state.entityType === "BN" ? " sel" : ""}`} />
          </div>
          <div className="ob-entity-facts">
            <div className="ob-entity-fact"><strong>Best for</strong> — Solo founders, freelancers, simple service businesses not planning to raise money</div>
            <div className="ob-entity-fact"><strong>Investors</strong> — Cannot issue shares or accept equity investment</div>
            <div className="ob-entity-fact"><strong>Liability</strong> — You and the business are legally the same. Business debts are your personal debts.</div>
            <div className="ob-entity-fact"><strong>Tax</strong> — Personal income tax applies once annual profit crosses ₦800,000</div>
            <div className="ob-entity-fact"><strong>Scope</strong> — Tied to one specific business name. Each new business line needs a separate registration.</div>
          </div>
        </div>

        <div className={`ob-entity-card${state.entityType === "LTD" ? " sel" : ""}`} onClick={() => select("LTD")}>
          <div className="ob-entity-head">
            <div>
              <div className="ob-entity-name">Private Limited Company</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>Ltd · RC number company</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div className="ob-entity-rec">Recommended</div>
              <div className={`ob-entity-radio${state.entityType === "LTD" ? " sel" : ""}`} />
            </div>
          </div>
          <div className="ob-entity-facts">
            <div className="ob-entity-fact"><strong>Best for</strong> — Founders with growth ambitions, teams, or anyone planning to raise money</div>
            <div className="ob-entity-fact"><strong>Investors</strong> — Up to 50 shareholders. Issue shares. Accept equity. Give co-founders a stake.</div>
            <div className="ob-entity-fact"><strong>Liability</strong> — The company is a separate legal entity. Your personal assets are protected.</div>
            <div className="ob-entity-fact"><strong>Tax</strong> — Company Income Tax at 30%. Drops to 20% if turnover is under ₦25M. Zero if you qualify as a small company under the Finance Act.</div>
            <div className="ob-entity-fact"><strong>Scope</strong> — One Private Limited company can run multiple business lines, products, and revenue streams without separate registrations.</div>
            <div className="ob-entity-fact"><strong>Prestige</strong> — Required by most banks, enterprise clients, and investors for due diligence and contracts</div>
          </div>
        </div>

        <div style={{ fontSize: 12, color: "var(--ink-soft)", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
          Same price either way. You can upgrade from Business Name to Ltd later — but it requires a new registration
          and a new RC number.
        </div>

        <div className="ob-cta" style={{ paddingTop: 0 }}>
          <Link className="btn btn-primary" href="/onboarding/complete">
            Confirm and continue
          </Link>
        </div>
      </div>
    </div>
  );
}
