import Link from "next/link";
import type { ComplianceStep } from "@/lib/types";

export function DesktopComplianceMap({ complianceSteps }: { complianceSteps: ComplianceStep[] }) {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 24, fontWeight: 500 }}>Compliance roadmap</div>
        <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>
          Work through each step in order. Step 1 unlocks everything else.
        </div>
      </div>
      <div className="info-box" style={{ marginBottom: 24 }}>
        <strong>CAC Registration approved</strong> — Steps 2–5 are now unlocked. Startora recommends filing NAFDAC
        next given your food business profile.
      </div>
      <div className="d-map-row">
        {complianceSteps.map((step, i) => {
          const done = step.status === "done";
          return (
            <span key={step.id} style={{ display: "contents" }}>
              <div className="d-map-step">
                <div className="d-map-num">{step.order}</div>
                <div className="ob-card" style={{ position: "relative", ...(done ? { borderColor: "var(--ledger)", borderWidth: 1.5 } : {}) }}>
                  {done && (
                    <span className="fl2-stamp" style={{ position: "absolute", top: 14, right: 14 }}>
                      DONE
                    </span>
                  )}
                  <span
                    className={`ob-tag ${step.tagVariant === "required" ? "tag-required" : "tag-recommended"}`}
                    style={{ marginBottom: 8, display: "inline-block" }}
                  >
                    {step.tag}
                  </span>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{step.name}</div>
                  <div className="ob-why">{step.why}</div>
                  <div className="ob-price" style={{ marginBottom: 12 }}>{step.price}</div>
                  <Link
                    href={step.ctaHref}
                    className="unlock-btn"
                    style={
                      done
                        ? { marginTop: 0, background: "var(--ledger-soft)", color: "var(--ledger)", borderColor: "var(--ledger-soft)" }
                        : { marginTop: 0 }
                    }
                  >
                    {step.ctaLabel}
                  </Link>
                </div>
              </div>
              {i < complianceSteps.length - 1 && (
                <div className="d-map-connector">
                  <div className={`d-map-connector-line${done ? " done" : ""}`} />
                </div>
              )}
            </span>
          );
        })}
      </div>
    </>
  );
}
