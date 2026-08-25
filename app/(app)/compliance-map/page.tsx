import { AppShell } from "@/components/shell/AppShell";
import { ComplianceStepCard } from "@/components/compliance-map/ComplianceStepCard";
import { DesktopComplianceMap } from "@/components/compliance-map/DesktopComplianceMap";
import { getComplianceSteps } from "@/lib/api";

export default async function ComplianceMapPage() {
  const complianceSteps = await getComplianceSteps();

  return (
    <AppShell title="Compliance Roadmap" desktopContent={<DesktopComplianceMap complianceSteps={complianceSteps} />}>
      <div className="body">
      <div className="ob-eyebrow" style={{ paddingLeft: 8 }}>
        Your compliance roadmap
      </div>
      <h2 style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 21, fontWeight: 500, margin: "0 0 4px", paddingLeft: 8 }}>
        Start here. Work through each step.
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 20px", lineHeight: 1.5, paddingLeft: 8 }}>
        Step 1 is the foundation. Every other registration depends on your CAC certificate being in place first.
      </p>

      {complianceSteps.map((step, i) => (
        <ComplianceStepCard key={step.id} step={step} isLast={i === complianceSteps.length - 1} />
      ))}

      <div style={{ textAlign: "center", fontSize: 12, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6, padding: "0 8px" }}>
        A qualified Nigerian compliance lawyer reviews every filing before it leaves Startora.
      </div>
      </div>
    </AppShell>
  );
}
