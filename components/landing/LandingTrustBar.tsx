const STATS = [
  { num: "61+", label: "Nigerian businesses registered and kept compliant" },
  { num: "85%", label: "Of new clients come from a founder who was already satisfied" },
  { num: "25 mo.", label: "Spent solving compliance by hand before Startora became software" },
];

export function LandingTrustBar() {
  return (
    <section className="lp-trust-bar">
      <div className="lp-container lp-trust-grid">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="lp-trust-num">{s.num}</div>
            <div className="lp-trust-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
