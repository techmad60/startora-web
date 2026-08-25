import { RegisterCtaButton } from "@/components/landing/RegisterCtaButton";

export function LandingFinalCta() {
  return (
    <section className="lp-section dark">
      <div className="lp-container lp-final-cta">
        <h2>Get legal once. Stay legal forever.</h2>
        <p>Join the founders who stopped guessing what their business needs and started tracking it.</p>
        <div className="lp-final-actions">
          <RegisterCtaButton className="lp-btn lp-btn-on-dark lp-btn-lg">Register your business →</RegisterCtaButton>
          <RegisterCtaButton className="lp-btn lp-btn-ghost lp-btn-lg" style={{ borderColor: "rgba(255,255,255,.3)", color: "#fff" }}>
            Sign in
          </RegisterCtaButton>
        </div>
      </div>
    </section>
  );
}
