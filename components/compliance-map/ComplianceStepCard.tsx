import Link from "next/link";
import type { ComplianceStep } from "@/lib/types";

export function ComplianceStepCard({ step, isLast }: { step: ComplianceStep; isLast: boolean }) {
  const locked = step.status === "locked";
  const done = step.status === "done";

  return (
    <div className={`ob-step-wrapper${locked ? " locked" : ""}`} id={step.id}>
      <div className="ob-step-left">
        <div className="ob-step-num">{step.order}</div>
        {!isLast && <div className="ob-step-line" />}
      </div>
      <div className="ob-step-body">
        <div className="ob-card" style={done ? { borderColor: "var(--ledger)", borderWidth: 1.5 } : undefined}>
          <div className="ob-card-top">
            <div className="ob-name">{step.name}</div>
            <div className={`ob-tag ${step.tagVariant === "required" ? "tag-required" : "tag-recommended"}`}>{step.tag}</div>
          </div>
          <div className="ob-why">{step.why}</div>
          <div className="ob-price">{step.price}</div>
        </div>
        {done ? (
          <div className="map-step-done">✓ Step {step.order} approved — steps below are now unlocked</div>
        ) : locked ? (
          <div className="ob-lock-msg">🔒 Unlocks after Step 1</div>
        ) : null}
        <Link
          href={step.ctaHref}
          className={done ? "btn btn-primary" : "unlock-btn"}
          style={
            done
              ? { marginTop: 10 }
              : undefined
          }
        >
          {step.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
