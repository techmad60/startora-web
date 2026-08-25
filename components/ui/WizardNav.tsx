import Link from "next/link";

const BackArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const BackArrowSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/** Onboarding: back button + "Step N of 5" label. */
export function ObNav({ backHref, step, total = 5 }: { backHref: string; step: number; total?: number }) {
  return (
    <div className="ob-nav">
      <Link className="ob-back" href={backHref}>
        <BackArrow /> Back
      </Link>
      <div className="ob-step-label">
        Step {step} of {total}
      </div>
    </div>
  );
}

/** Onboarding: continuous percentage-fill progress bar. */
export function ObProgress({ step, total = 5 }: { step: number; total?: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="ob-progress">
      <div className="ob-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Registration wizard: simple "Back to X" link. */
export function RegBackNav({ href, label }: { href: string; label: string }) {
  return (
    <Link className="back-nav" href={href}>
      <BackArrowSmall /> {label}
    </Link>
  );
}

/** Registration wizard: discrete segmented progress bar. */
export function RegProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="reg-progress">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`reg-progress-seg${i === step - 1 ? " now" : i < step - 1 ? " done" : ""}`} />
      ))}
    </div>
  );
}
