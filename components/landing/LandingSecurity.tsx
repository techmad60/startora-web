const POINTS = [
  {
    title: "Private AI infrastructure",
    body: "Your business data is never sent to a public AI endpoint. Every model runs in an isolated, private environment built for this specifically.",
  },
  {
    title: "Encrypted, isolated by design",
    body: "Every interaction is encrypted in transit and at rest. Each founder's compliance session is isolated from every other client.",
  },
  {
    title: "A human reviews every filing",
    body: "Every submission passes through a compliance reviewer before it's sent to a government portal — automation with human oversight, not instead of it.",
  },
];

export function LandingSecurity() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">Security</div>
        <h2 className="lp-h2">Your business data is not the product.</h2>
        <div className="lp-security-grid">
          {POINTS.map((p) => (
            <div className="lp-sec-card" key={p.title}>
              <div className="lp-sec-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ledger)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
