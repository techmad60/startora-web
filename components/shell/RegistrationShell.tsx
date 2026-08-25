import type { ReactNode } from "react";
import { MobileTopbar } from "@/components/shell/MobileTopbar";
import { getFounder, getNotifications } from "@/lib/api";

export async function RegistrationShell({ children }: { children: ReactNode }) {
  const founder = await getFounder();
  const notifications = await getNotifications();
  const hasUnread = notifications.some((n) => n.unread);

  return (
    <div className="focused-shell">
      <div className="phone-shell">
        <MobileTopbar founder={founder} hasUnread={hasUnread} />
        <div className="body">{children}</div>
      </div>
    </div>
  );
}
