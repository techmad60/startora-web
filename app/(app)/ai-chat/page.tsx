import { AppShell } from "@/components/shell/AppShell";
import { MobileAiChat } from "@/components/ai/MobileAiChat";
import { DesktopAiChat } from "@/components/ai/DesktopAiChat";
import { getBusiness, getFounder, getComplianceScore, getSuggestedQuestions, getQuickTopics } from "@/lib/api";

export default async function AiChatPage() {
  const [business, founder, complianceScore, suggestedQuestions, quickTopics] = await Promise.all([
    getBusiness(),
    getFounder(),
    getComplianceScore(),
    getSuggestedQuestions(),
    getQuickTopics(),
  ]);

  return (
    <AppShell
      title="Ask Startora"
      desktopContent={
        <DesktopAiChat
          business={business}
          founder={founder}
          complianceScore={complianceScore}
          suggestedQuestions={suggestedQuestions}
          quickTopics={quickTopics}
        />
      }
      hideTabBar
    >
      <MobileAiChat business={business} founder={founder} suggestedQuestions={suggestedQuestions} />
    </AppShell>
  );
}
