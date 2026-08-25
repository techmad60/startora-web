const ROWS = [
  { label: "Filing speed", agents: "3–7 business days", lawyers: "1–3 weeks", startora: "24 hours*" },
  { label: "Cost structure", agents: "Opaque, variable", lawyers: "Very high (retainer)", startora: "Transparent, fixed" },
  { label: "Post-filing support", agents: "None", lawyers: "On request, billed", startora: "Continuous" },
  { label: "Compliance tracking", agents: "None", lawyers: "None", startora: "Real-time, automated" },
  { label: "Scalability", agents: "1 client at a time", lawyers: "Limited by headcount", startora: "Unlimited" },
];

export function LandingCompetitive() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">Why not just use an agent</div>
        <h2 className="lp-h2">The competition isn&apos;t other software. It&apos;s a broken system.</h2>
        <p className="lp-sub">Startora doesn&apos;t compete with other platforms — it replaces agents and lawyers entirely.</p>

        <div style={{ overflowX: "auto" }}>
          <table className="lp-comp-table">
            <thead>
              <tr>
                <th></th>
                <th>Traditional agents</th>
                <th>Law firms</th>
                <th className="startora-col">Startora</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td>{r.agents}</td>
                  <td>{r.lawyers}</td>
                  <td className="startora-col">{r.startora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 14 }}>
          *Startora files instantly upon submission. Final approval timelines are subject to government
          processing schedules, which vary by agency.
        </p>
      </div>
    </section>
  );
}
