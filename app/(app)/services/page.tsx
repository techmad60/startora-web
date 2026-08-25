import { AppShell } from "@/components/shell/AppShell";
import { MobileServices } from "@/components/services/MobileServices";
import { DesktopServices } from "@/components/services/DesktopServices";
import { getServiceSectors, getMyRegistrations, getStartupDocsSummary } from "@/lib/api";

export default async function ServicesPage() {
  const [serviceSectors, myRegistrations, startupDocs] = await Promise.all([
    getServiceSectors(),
    getMyRegistrations(),
    getStartupDocsSummary(),
  ]);

  return (
    <AppShell title="Services & Registrations" desktopContent={<DesktopServices serviceSectors={serviceSectors} />}>
      <MobileServices myRegistrations={myRegistrations} startupDocs={startupDocs} />
    </AppShell>
  );
}
