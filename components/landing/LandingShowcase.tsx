export function LandingShowcase() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">Inside the platform</div>
        <h2 className="lp-h2">See exactly where your business stands.</h2>
        <p className="lp-sub">Your dashboard, not a spreadsheet or a WhatsApp thread with an agent.</p>

        <div className="lp-showcase-grid">
          <div className="lp-mock-card">
            <div className="lp-mock-label">Pending obligations</div>

            <div className="lp-mock-obl-row">
              <div className="lp-mock-num">01</div>
              <div>
                <div className="lp-mock-obl-name">NAFDAC Product Registration</div>
                <div className="lp-mock-obl-meta">Product label upload required</div>
              </div>
              <div className="lp-mock-badge req">Action needed</div>
            </div>
            <div className="lp-mock-obl-row">
              <div className="lp-mock-num">02</div>
              <div>
                <div className="lp-mock-obl-name">Trademark Registration</div>
                <div className="lp-mock-obl-meta">Awaiting name confirmation</div>
              </div>
              <div className="lp-mock-badge pending">In progress</div>
            </div>
            <div className="lp-mock-obl-row">
              <div className="lp-mock-num">03</div>
              <div>
                <div className="lp-mock-obl-name">CAC Business Registration</div>
                <div className="lp-mock-obl-meta">Approved · certificate issued</div>
              </div>
              <div className="lp-mock-badge done">Complete</div>
            </div>
          </div>

          <div className="lp-mock-card">
            <div className="lp-mock-label">Ask Startora</div>
            <div className="lp-mock-chat-bubble">
              Your Annual Return is overdue. Want me to file it now, or explain what happens if it stays
              unfiled?
            </div>
            <div>
              <span className="lp-mock-chat-chip">File it now</span>
              <span className="lp-mock-chat-chip">What's the penalty?</span>
              <span className="lp-mock-chat-chip">Explain SCUML</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
