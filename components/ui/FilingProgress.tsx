import type { FilingStepState } from "@/lib/types";

export function FilingProgressDots({
  steps,
  labelVariant = "step",
}: {
  steps: FilingStepState[];
  /** "step" -> desktop filing table (dashboard, filing-status). "card" -> mobile filing card. Matches which class pair source actually uses in each context. */
  labelVariant?: "step" | "card";
}) {
  const wrapClass = labelVariant === "step" ? "fl2-step-labels" : "fl2-labels";
  const itemClass = labelVariant === "step" ? "fl2-step-lbl" : "fl2-label";

  return (
    <div>
      <div className="fl2-prog-track">
        {steps.map((step, i) => (
          <span key={step.key} style={{ display: "contents" }}>
            <div className={`fl2-dot ${step.state === "done" ? "done" : step.state === "active" ? "active" : ""}`} />
            {i < steps.length - 1 && <div className={`fl2-line ${step.state === "done" ? "done" : ""}`} />}
          </span>
        ))}
      </div>
      <div className={wrapClass}>
        {steps.map((step) => (
          <div key={step.key} className={`${itemClass} ${step.state === "done" ? "done" : step.state === "active" ? "active" : ""}`}>
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilingStatusStamp({ status, statusLabel }: { status: string; statusLabel: string }) {
  if (status === "approved") {
    return <span className="fl2-stamp">{statusLabel.toUpperCase()}</span>;
  }
  if (status === "action_needed") {
    return (
      <span className="fl2-stamp" style={{ borderColor: "var(--amber)", color: "var(--amber)", fontSize: 9 }}>
        {statusLabel.toUpperCase()}
      </span>
    );
  }
  return <span className="pill green">{statusLabel}</span>;
}
