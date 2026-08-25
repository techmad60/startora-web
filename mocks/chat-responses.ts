export const chatResponses: Record<string, string> = {
  "why do i need nafdac?":
    "Because you manufacture and sell packaged food, every product distributed in Nigeria must be NAFDAC-registered before it can legally be sold. Penalties include product seizure and fines up to ₦500,000.",
  "what happens if i miss annual returns?":
    "Missing CAC Annual Returns triggers a ₦10,000 annual penalty, and your company can be struck off the register after 3 consecutive years. Your 2025 returns are currently overdue.",
  "explain my compliance score":
    "Your score of 65/100 reflects: CAC (20pts), NDPR (15pts), Annual Returns (10pts). You are losing 25pts because trademark is not filed, and 10pts because NAFDAC is still in progress.",
};

export const chatFallback =
  "I have checked the applicable Nigerian regulatory frameworks for Chiamaka's Kitchen. Our compliance team can provide a definitive answer on this — message them through the filings page.";

export function lookupChatResponse(question: string): string {
  const key = question.toLowerCase().replace(/[^a-z0-9 ?]/g, "");
  return chatResponses[key] ?? chatFallback;
}

export const suggestedQuestions = [
  "Why do I need NAFDAC?",
  "What happens if I miss annual returns?",
  "Do I qualify for SCUML?",
  "Explain my compliance score",
];

export const quickTopics = ["Annual returns deadline", "NAFDAC requirements", "SCUML eligibility check", "Trademark protection"];
