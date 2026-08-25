import { TrackingTimeline } from "@/components/ui/TrackingTimeline";
import { getScumlTrackingSteps } from "@/lib/api";

export async function ScumlTrackingScreen() {
  const scumlTrackingSteps = await getScumlTrackingSteps();

  return (
    <TrackingTimeline
      backHref="/dashboard"
      backLabel="Back to home"
      icon="🏛️"
      title="SCUML submitted"
      reference="STR-SCUML-2026-00234"
      steps={scumlTrackingSteps}
      note="No action needed. Startora monitors and will notify you immediately when the certificate arrives."
    />
  );
}
