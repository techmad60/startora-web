import Link from "next/link";
import { AiMicButton } from "@/components/shell/AiMicButton";
import { NotificationBell } from "@/components/shell/NotificationBell";
import type { Founder } from "@/lib/types";

export function MobileTopbar({ founder, hasUnread }: { founder: Founder; hasUnread: boolean }) {
  return (
    <div className="topbar">
      <div className="wordmark">
        START<span>ORA</span>
      </div>
      <div className="topbar-right">
        <AiMicButton />
        <NotificationBell hasUnread={hasUnread} />
        <Link href="/profile" className="avatar">
          {founder.initials}
        </Link>
      </div>
    </div>
  );
}
