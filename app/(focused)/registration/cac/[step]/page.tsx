import { notFound } from "next/navigation";
import { ShareholdersStep } from "@/components/registration/cac/ShareholdersStep";
import { WitnessStep } from "@/components/registration/cac/WitnessStep";
import { DocumentsStep } from "@/components/registration/cac/DocumentsStep";
import { PreviewStep } from "@/components/registration/cac/PreviewStep";
import { TrackingStep } from "@/components/registration/cac/TrackingStep";
import { CAC_STEPS, type CacStep } from "@/lib/types";
import { getBusiness } from "@/lib/api";

export function generateStaticParams() {
  return CAC_STEPS.map((step) => ({ step }));
}

export default async function CacStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;

  switch (step as CacStep) {
    case "shareholders":
      return <ShareholdersStep />;
    case "witness":
      return <WitnessStep />;
    case "documents":
      return <DocumentsStep />;
    case "preview":
      return <PreviewStep business={await getBusiness()} />;
    case "tracking":
      return <TrackingStep />;
    default:
      notFound();
  }
}
