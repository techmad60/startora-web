"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How long does registration actually take?",
    a: "Startora submits your filing within 24 hours of you completing the flow. Final approval depends on the government agency — CAC and SCUML typically move faster than NAFDAC, which involves product inspection for regulated categories.",
  },
  {
    q: "What documents do I need to get started?",
    a: "Most founders start with just a valid ID and a proposed business name. Startora tells you exactly what else is required based on your specific business — you won't need to guess.",
  },
  {
    q: "My business is already registered. Can Startora still help?",
    a: "Yes. A large share of founders come to Startora after registering elsewhere, once they realize obligations like annual returns, SCUML, or trademark protection were never handled. Startora maps what's missing and helps you catch up.",
  },
  {
    q: "What happens after I pay for a filing?",
    a: "Your documents are prepared, checked by a human compliance reviewer, then submitted. You can track progress and message the compliance team directly from your dashboard the entire time.",
  },
  {
    q: "Is this a subscription, or do I pay per service?",
    a: "You pay per service — registration, trademark, SCUML, and so on. Some obligations, like annual returns, recur every year and Startora files them automatically when they're due.",
  },
  {
    q: "Can I talk to a real person if something's unclear?",
    a: "Yes. Every filing has a message thread with your compliance reviewer, and the in-app AI advisor can explain any obligation in plain terms before you need to escalate to a person.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="lp-section" id="faq">
      <div className="lp-container">
        <div className="lp-eyebrow">Questions</div>
        <h2 className="lp-h2">Everything founders ask before they start.</h2>
        <div className="lp-faq">
          {FAQS.map((item, i) => (
            <div className={`lp-faq-item${openIndex === i ? " open" : ""}`} key={item.q}>
              <div className="lp-faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {item.q}
                <span className="lp-faq-icon">+</span>
              </div>
              {openIndex === i && <div className="lp-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
