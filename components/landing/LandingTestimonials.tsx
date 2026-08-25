// Swap the placeholder text below for real client quotes. Keep the
// name/business/quote shape — everything else (avatar initials, layout)
// pulls from that automatically.
const TESTIMONIAL_SLOTS = [
  { name: "[Client name]", business: "[Business name]", quote: "[Add a real client quote here — what did Startora actually do for them, in their words.]" },
  { name: "[Client name]", business: "[Business name]", quote: "[Add a real client quote here — what did Startora actually do for them, in their words.]" },
  { name: "[Client name]", business: "[Business name]", quote: "[Add a real client quote here — what did Startora actually do for them, in their words.]" },
];

function initials(name: string) {
  const clean = name.replace(/[\[\]]/g, "").trim();
  if (!clean) return "?";
  return clean
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function LandingTestimonials() {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-eyebrow">What clients say</div>
        <h2 className="lp-h2">Founders keep coming back because the platform actually delivers.</h2>
        <p className="lp-sub">85% of new clients arrive through a referral from someone Startora already helped.</p>
        <div className="lp-testimonial-grid">
          {TESTIMONIAL_SLOTS.map((t, i) => (
            <div className="lp-testimonial-card" key={i}>
              <span className="lp-testimonial-placeholder-tag">Replace with a real quote</span>
              <p className="lp-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="lp-testimonial-who">
                <div className="lp-testimonial-av">{initials(t.name)}</div>
                <div>
                  <div className="lp-testimonial-name">{t.name}</div>
                  <div className="lp-testimonial-biz">{t.business}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
