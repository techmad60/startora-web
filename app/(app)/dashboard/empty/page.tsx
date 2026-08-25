import { AppShell } from "@/components/shell/AppShell";
import { EmptyDashboardBody } from "@/components/dashboard/EmptyDashboardBody";
import { getFounder } from "@/lib/api";

export default async function DashboardEmptyPage() {
  const founder = await getFounder();

  return (
    <AppShell title="Dashboard">
      <EmptyDashboardBody founder={founder} />
    </AppShell>
  );
}
