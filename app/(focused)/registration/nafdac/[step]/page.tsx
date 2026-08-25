import { notFound } from "next/navigation";
import { NafdacStepOne } from "@/components/registration/nafdac/NafdacStepOne";
import { NafdacStepTwo } from "@/components/registration/nafdac/NafdacStepTwo";
import { NafdacStepThree } from "@/components/registration/nafdac/NafdacStepThree";
import { NafdacStepFour } from "@/components/registration/nafdac/NafdacStepFour";
import { NafdacStepFive } from "@/components/registration/nafdac/NafdacStepFive";
import { getBusiness } from "@/lib/api";

const STEPS = ["1", "2", "3", "4", "5"] as const;

export function generateStaticParams() {
  return STEPS.map((step) => ({ step }));
}

export default async function NafdacStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  switch (step) {
    case "1":
      return <NafdacStepOne business={await getBusiness()} />;
    case "2":
      return <NafdacStepTwo />;
    case "3":
      return <NafdacStepThree />;
    case "4":
      return <NafdacStepFour />;
    case "5":
      return <NafdacStepFive />;
    default:
      notFound();
  }
}
