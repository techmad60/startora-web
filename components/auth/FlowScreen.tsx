import type { ReactNode } from "react";
import Link from "next/link";

interface FlowScreenProps {
  backHref: string;
  backLabel?: string;
  /** 1-4, which dot is active. Omit for screens without the step indicator (forgot/reset password). */
  activeDot?: 1 | 2 | 3 | 4;
  icon: ReactNode;
  title: string;
  sub: ReactNode;
  children: ReactNode;
}

export function FlowScreen({ backHref, backLabel = "Back", activeDot, icon, title, sub, children }: FlowScreenProps) {
  return (
    <div className="flow-screen">
      <div className="flow-topnav">
        <Link className="flow-back" href={backHref}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          {backLabel}
        </Link>
        {activeDot && (
          <div className="flow-step-dots">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className={`flow-dot${d === activeDot ? " on" : ""}`} />
            ))}
          </div>
        )}
      </div>
      <div className="flow-body">
        <div className="flow-icon">{icon}</div>
        <div className="flow-title">{title}</div>
        <div className="flow-sub">{sub}</div>
        {children}
      </div>
    </div>
  );
}
