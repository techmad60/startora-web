const LAYERS = [
  {
    key: "registration",
    tag: "Registration — the foundation",
    title: "Get set up right, the first time.",
    items: [
      "CAC business name & Ltd company registration",
      "No errors, no rejections — done correctly from the start",
      "Post-incorporation setup: directors, share structure, registered office",
    ],
  },
  {
    key: "protection",
    tag: "Protection",
    title: "The shield",
    items: ["Trademark search, application & filing", "SCUML registration for applicable businesses", "NAFDAC registration for regulated products", "NDPR compliance documentation"],
  },
  {
    key: "compliance",
    tag: "Compliance",
    title: "The long game",
    items: ["Annual returns filed automatically every year", "Regulatory changes monitored in real time", "Never miss a deadline or face an avoidable fine"],
  },
];

export function LandingFeatures() {
  return (
    <section className="lp-section" id="features">
      <div className="lp-container">
        <div className="lp-eyebrow">Core features</div>
        <h2 className="lp-h2">Every legal layer, for the entire life of your business.</h2>
        <p className="lp-sub">Not a document marketplace. Not a lawyer directory. A compliance execution engine.</p>
        <div className="lp-layer-grid">
          {LAYERS.map((l) => (
            <div className={`lp-layer-card ${l.key}`} key={l.key}>
              <span className="lp-layer-tag">{l.tag}</span>
              <h3>{l.title}</h3>
              <ul className="lp-layer-list">
                {l.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
