const PROBLEMS = [
  {
    num: "01",
    title: "Agents stop at the certificate",
    body: "They collect a fee, hand you a certificate, and disappear. No warning about SCUML, no mention of annual returns, no roadmap for what comes next.",
  },
  {
    num: "02",
    title: "Lawyers are inaccessible at scale",
    body: "Real legal guidance exists — at a retainer cost most founders can't sustain. So advice becomes episodic instead of continuous.",
  },
  {
    num: "03",
    title: "Obligations hide until they don't",
    body: "SCUML, NDPR, trademark protection, NAFDAC — most founders don't know these apply to them until enforcement shows up at the door.",
  },
  {
    num: "04",
    title: "Nothing tracks what happens next",
    body: "Annual returns get missed. Filings go unnoticed. Penalties compound quietly while the founder is busy running the actual business.",
  },
];

export function LandingProblem() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">The problem</div>
        <h2 className="lp-h2">There is no operating system for running a legal business in Nigeria.</h2>
        <p className="lp-sub">
          Formalizing is only the first step. What happens after the certificate is where founders are left
          exposed.
        </p>
        <div className="lp-problem-list">
          {PROBLEMS.map((p) => (
            <div className="lp-problem-row" key={p.num}>
              <div className="lp-problem-num">{p.num}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
