import { AppShell } from "@/components/shell/AppShell";
import { NotificationSettingsBody } from "@/components/settings/NotificationSettingsBody";
import { getFounder } from "@/lib/api";

export default async function SettingsNotificationsPage() {
  const founder = await getFounder();

  return (
    <AppShell title="Notification Preferences">
      <NotificationSettingsBody founder={founder} />
    </AppShell>
  );
}
