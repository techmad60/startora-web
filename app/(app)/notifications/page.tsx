import { AppShell } from "@/components/shell/AppShell";
import { NotificationsScreen } from "@/components/notifications/NotificationsScreen";
import { getNotifications, getMessageThreads } from "@/lib/api";

export default async function NotificationsPage() {
  const [notifications, messageThreads] = await Promise.all([getNotifications(), getMessageThreads()]);

  return (
    <AppShell title="Notifications">
      <NotificationsScreen notifications={notifications} messageThreads={messageThreads} />
    </AppShell>
  );
}
