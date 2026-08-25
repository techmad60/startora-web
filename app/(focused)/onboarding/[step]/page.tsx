import { notFound } from "next/navigation";
import { StepOne } from "@/components/onboarding/StepOne";
import { StepTwo } from "@/components/onboarding/StepTwo";
import { StepThree } from "@/components/onboarding/StepThree";
import { StepFour } from "@/components/onboarding/StepFour";
import { StepFive } from "@/components/onboarding/StepFive";

const STEPS = ["1", "2", "3", "4", "5"] as const;

export function generateStaticParams() {
  return STEPS.map((step) => ({ step }));
}

export default async function OnboardingStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;

  switch (step) {
    case "1":
      return <StepOne />;
    case "2":
      return <StepTwo />;
    case "3":
      return <StepThree />;
    case "4":
      return <StepFour />;
    case "5":
      return <StepFive />;
    default:
      notFound();
  }
}
