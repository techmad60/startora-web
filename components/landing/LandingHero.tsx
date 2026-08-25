import { RegisterCtaButton } from "@/components/landing/RegisterCtaButton";

export function LandingHero() {
  return (
    <section className="lp-hero">
      <div className="lp-hero-stampmark" />
      <div className="lp-container">
        <div className="lp-hero-content">
          <div className="lp-hero-tag">Legal compliance, done for you</div>
          <h1>
            Get legal once.
            <br />
            <em>Stay legal forever.</em>
          </h1>
          <p className="lp-hero-sub">
            Startora replaces agents, lawyers, and endless WhatsApp coordination with one platform that
            registers your business, files every obligation, and tracks your compliance for life.
          </p>
          <div className="lp-hero-ctas">
            <RegisterCtaButton className="lp-btn lp-btn-primary lp-btn-lg">Register your business →</RegisterCtaButton>
            <a className="lp-btn lp-btn-ghost lp-btn-lg" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="lp-hero-cert-row">
            <div className="lp-hero-cert-item">
              <div className="ck">✓</div>
              <span>Done in 24 hours</span>
            </div>
            <div className="lp-hero-cert-item">
              <div className="ck">✓</div>
              <span>Transparent, fixed pricing</span>
            </div>
            <div className="lp-hero-cert-item">
              <div className="ck">✓</div>
              <span>Tracked for life, automatically</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
