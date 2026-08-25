import { notFound } from "next/navigation";
import { ScumlStepOne } from "@/components/registration/scuml/ScumlStepOne";
import { ScumlStepTwo } from "@/components/registration/scuml/ScumlStepTwo";
import { ScumlStepThree } from "@/components/registration/scuml/ScumlStepThree";
import { getBusiness } from "@/lib/api";

const STEPS = ["1", "2", "3"] as const;

export function generateStaticParams() {
  return STEPS.map((step) => ({ step }));
}

export default async function ScumlStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  switch (step) {
    case "1":
      return <ScumlStepOne />;
    case "2":
      return <ScumlStepTwo />;
    case "3":
      return <ScumlStepThree business={await getBusiness()} />;
    default:
      notFound();
  }
}
