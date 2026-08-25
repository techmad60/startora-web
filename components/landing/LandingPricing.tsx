const PLANS = [
  { name: "Business registration", price: "₦50,000", note: "CAC business name filing", featured: false },
  { name: "Ltd company upgrade", price: "₦50,000", note: "Corporate structure conversion", featured: false },
  { name: "Trademark registration", price: "₦60,000", note: "Search, application & filing", featured: true },
  { name: "Annual returns", price: "₦20,000", note: "Filed automatically, every year", featured: false },
];

export function LandingPricing() {
  return (
    <section className="lp-section" id="pricing">
      <div className="lp-container">
        <div className="lp-eyebrow">Pricing</div>
        <h2 className="lp-h2">Transparent, fixed pricing. No retainers.</h2>
        <p className="lp-sub">Pay per service. No surprise invoices, no hourly billing, no opaque agent fees.</p>
        <div className="lp-price-grid">
          {PLANS.map((p) => (
            <div className={`lp-price-card${p.featured ? " featured" : ""}`} key={p.name}>
              <div className="lp-price-name">{p.name}</div>
              <div className="lp-price-amount">{p.price}</div>
              <div className="lp-price-note">{p.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
