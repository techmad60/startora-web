import { LandingNav } from "@/components/landing/LandingNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingTrustBar } from "@/components/landing/LandingTrustBar";
import { LandingProblem } from "@/components/landing/LandingProblem";
import { LandingSolution } from "@/components/landing/LandingSolution";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { LandingWhoFor } from "@/components/landing/LandingWhoFor";
import { LandingBeforeAfter } from "@/components/landing/LandingBeforeAfter";
import { LandingCompetitive } from "@/components/landing/LandingCompetitive";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingCredibility } from "@/components/landing/LandingCredibility";
import { LandingSecurity } from "@/components/landing/LandingSecurity";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="lp">
      <LandingNav />
      <LandingHero />
      <LandingTrustBar />
      <LandingProblem />
      <LandingSolution />
      <LandingFeatures />
      <LandingShowcase />
      <LandingWhoFor />
      <LandingBeforeAfter />
      <LandingCompetitive />
      <LandingPricing />
      <LandingTestimonials />
      <LandingCredibility />
      <LandingSecurity />
      <LandingFaq />
      <LandingFinalCta />
      <LandingFooter />
    </div>
  );
}
