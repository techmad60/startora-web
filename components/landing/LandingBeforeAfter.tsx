const BEFORE = [
  "An agent who disappears after the certificate",
  "Compliance questions scattered across WhatsApp threads",
  "Documents saved across emails, phones, and folders",
  "Deadlines you find out about after they've passed",
  "No idea what obligation applies to your business next",
];

const AFTER = [
  "One platform that files and tracks everything",
  "A compliance advisor available inside the app",
  "Every document in one place, organized automatically",
  "Alerts before a deadline, not after",
  "A live profile that tells you exactly what's next",
];

export function LandingBeforeAfter() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">The difference</div>
        <h2 className="lp-h2">What running compliance actually feels like, before and after.</h2>
        <div className="lp-compare">
          <div className="lp-compare-col before">
            <div className="lp-compare-label">Without Startora</div>
            {BEFORE.map((item) => (
              <div className="lp-compare-row" key={item}>
                <span>✕</span>
                {item}
              </div>
            ))}
          </div>
          <div className="lp-compare-col after">
            <div className="lp-compare-label">With Startora</div>
            {AFTER.map((item) => (
              <div className="lp-compare-row" key={item}>
                <span>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
