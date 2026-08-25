import Link from "next/link";
import { RegBackNav } from "@/components/ui/WizardNav";
import { RegistrationShell } from "@/components/shell/RegistrationShell";
import { getBusiness } from "@/lib/api";

export default async function TrademarkPage() {
  const business = await getBusiness();

  return (
    <RegistrationShell>
      <RegBackNav href="/compliance-map" label="Back" />
      <div className="reg-eyebrow">Trademark Registration</div>
      <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 21, fontWeight: 500, margin: "0 0 6px" }}>
        Protect your brand name
      </h2>
      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "0 0 18px", lineHeight: 1.5 }}>
        Your CAC registration does not protect &quot;{business.name}&quot;. A trademark is the only legal way to own
        your brand name and stop competitors from using it.
      </p>
      <div className="info-box">
        This flow is coming soon. A Startora compliance specialist will reach out to guide you through the process
        manually.
      </div>
      <div className="ob-card">
        <div className="ob-card-top">
          <div className="ob-name">What you&apos;ll need</div>
        </div>
        <div className="ob-why">
          Business name, logo (if applicable), and a description of your goods or services. Startora identifies your
          trademark class from your business profile.
        </div>
      </div>
      <div className="ob-card">
        <div className="ob-card-top">
          <div className="ob-name">Timeline &amp; cost</div>
        </div>
        <div className="ob-why">₦60,000 total. 6–9 months from application to approval on the Nigerian Trademarks Registry.</div>
      </div>
      <Link className="btn btn-primary" href="/contact" style={{ marginTop: 8 }}>
        Talk to compliance team
      </Link>
    </RegistrationShell>
  );
}
