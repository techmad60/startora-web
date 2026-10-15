const TESTIMONIAL_SLOTS = [
  {
    name: "Joshua Nwamba",
    business: "The Market Guru",
    quote: "I was under pressure to register my business when I came across Startora. I thought the process would take weeks, but to my surprise, my certificate was ready within just 24 hours. Startora made the entire process incredibly smooth and stress-free.",
  },
  {
    name: "Caleb",
    business: "Jacmate Ltd.",
    quote: "Before discovering Startora, I had worked with an agency that collected my money but failed to deliver, leaving me waiting for months. My experience made me skeptical, but I now understand the value of finding a service provider you can trust.",
  },
  {
    name: "Cynthia Chiemerie",
    business: "Krowned Ltd.",
    quote: "I was amazed when I heard about Startora. I had always wished there was a platform where I could track all my business compliance obligations in one place and avoid hefty fines. Discovering Startora felt like finding a solution to a problem I had wanted solved for a long time.",
  },
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
