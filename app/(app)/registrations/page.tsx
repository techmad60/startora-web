import { AppShell } from "@/components/shell/AppShell";
import { RegistrationsBody } from "@/components/registrations/RegistrationsBody";
import { getLicenceSections, getSectorTabs } from "@/lib/api";

export default async function RegistrationsPage() {
  const [licenceSections, sectorTabs] = await Promise.all([getLicenceSections(), getSectorTabs()]);

  return (
    <AppShell title="All Registrations">
      <RegistrationsBody licenceSections={licenceSections} sectorTabs={sectorTabs} />
    </AppShell>
  );
}
