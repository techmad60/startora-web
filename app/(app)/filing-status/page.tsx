import { AppShell } from "@/components/shell/AppShell";
import { MobileFilingStatus } from "@/components/filing/MobileFilingStatus";
import { DesktopFilingStatus } from "@/components/filing/DesktopFilingStatus";
import { getBusiness, getFilingById, getFilingMessages } from "@/lib/api";

export default async function FilingStatusPage() {
  const [business, cac, nafdac, trademark] = await Promise.all([
    getBusiness(),
    getFilingById("STR-2026-04471"),
    getFilingById("STR-2026-04472"),
    getFilingById("STR-2026-04473"),
  ]);

  if (!cac || !nafdac || !trademark) return null;

  const trademarkMessages = await getFilingMessages(trademark.id);
  const trademarkMessage = trademarkMessages[0];

  return (
    <AppShell
      title="Filing Status"
      desktopContent={
        <DesktopFilingStatus business={business} cac={cac} nafdac={nafdac} trademark={trademark} trademarkMessage={trademarkMessage} />
      }
    >
      <MobileFilingStatus cac={cac} nafdac={nafdac} trademark={trademark} trademarkMessage={trademarkMessage} />
    </AppShell>
  );
}
