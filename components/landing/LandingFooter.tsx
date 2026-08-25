import Link from "next/link";
import { RegisterCtaButton } from "@/components/landing/RegisterCtaButton";

export function LandingFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <div className="lp-wordmark">
              START<span>ORA</span>
            </div>
            <p>The operating system for legal business in Nigeria. Get legal once. Stay legal forever.</p>
          </div>
          <div className="lp-footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="lp-footer-col">
            <h4>Company</h4>
            <a href="#faq">FAQ</a>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="lp-footer-col">
            <h4>Legal</h4>
            <div>Privacy policy</div>
            <div>Terms of service</div>
          </div>
          <div className="lp-footer-col">
            <h4>Get started</h4>
            <RegisterCtaButton className="lp-footer-cta-link">Sign in</RegisterCtaButton>
            <RegisterCtaButton className="lp-footer-cta-link">Create account</RegisterCtaButton>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <div>© 2026 Startora. All rights reserved.</div>
          <div>Lagos, Nigeria</div>
        </div>
      </div>
    </footer>
  );
}
