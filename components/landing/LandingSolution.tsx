const STEPS = [
  {
    num: "01",
    title: "Answer a few questions",
    body: "Tell Startora about your business — sector, size, operating model. Takes under five minutes.",
  },
  {
    num: "02",
    title: "AI maps your requirements",
    body: "Startora's engine identifies exactly which registrations and licences your business needs — nothing more, nothing missed.",
  },
  {
    num: "03",
    title: "Autonomous filing",
    body: "Every document is generated and filed in one flow. A human compliance reviewer checks it before it's submitted. No middlemen.",
  },
  {
    num: "04",
    title: "A compliance profile, for life",
    body: "Every obligation and deadline is tracked automatically. Startora alerts you before anything is due.",
  },
];

export function LandingSolution() {
  return (
    <section className="lp-section" id="how-it-works">
      <div className="lp-container">
        <div className="lp-eyebrow">The solution</div>
        <h2 className="lp-h2">One platform. Every obligation. Forever.</h2>
        <p className="lp-sub">
          Startora replaces the entire agent-and-lawyer chain with a single flow — from the first filing to
          every renewal after it.
        </p>
        <div className="lp-steps">
          {STEPS.map((s) => (
            <div className="lp-step" key={s.num}>
              <div className="lp-step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
