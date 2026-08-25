import { TrackingTimeline } from "@/components/ui/TrackingTimeline";
import { getCacTrackingSteps } from "@/lib/api";

export async function TrackingStep() {
  const cacTrackingSteps = await getCacTrackingSteps();

  return (
    <TrackingTimeline
      backHref="/dashboard"
      backLabel="Back to home"
      icon="📋"
      title="Registration submitted"
      reference="STR-CAC-2026-00891"
      steps={cacTrackingSteps}
      note="Startora will notify you the moment CAC approves. Nothing to do right now."
    />
  );
}
