import type { ReactNode } from "react";
import { DesktopTopbar } from "@/components/shell/DesktopTopbar";
import { MobileTopbar } from "@/components/shell/MobileTopbar";
import { Sidebar } from "@/components/shell/Sidebar";
import { TabBar } from "@/components/shell/TabBar";
import { getFounder, getNotifications } from "@/lib/api";

interface AppShellProps {
  title: string;
  children: ReactNode;
  /**
   * Denser desktop-only rendering (multi-column grids, tables), shown
   * at 1024px+ via the `.desk-only` CSS rule already defined in
   * globals.css. If omitted, `children` renders at every width.
   */
  desktopContent?: ReactNode;
  /** Hide the mobile bottom tab bar (used by e.g. the AI chat split view). */
  hideTabBar?: boolean;
}

/**
 * Does not inject a `.body` wrapper — pages provide their own. Source
 * pages are split roughly two ways: most (compliance-map, payment,
 * etc.) use `.body` directly, but some (dashboard) have their own
 * self-contained wrapper class (`.dash-body`) that already includes
 * padding and is used standalone, never nested inside `.body`. An
 * earlier version of this component always added `.body`, which
 * double-padded dashboard (`.body`'s 22px + `.dash-body`'s own 16px
 * on top of it). Each page now applies whichever wrapper source
 * actually uses for that screen.
 *
 * Async Server Component — fetches the data every page's chrome needs
 * (founder name/initials, unread-notification state) exactly once
 * here via lib/api.ts, instead of Sidebar/MobileTopbar/NotificationBell
 * each importing it separately. Because this is now a Server
 * Component, it cannot be rendered directly from inside a "use client"
 * page — those pages (settings sub-pages, referral, contact, etc.)
 * keep their own thin async page.tsx that renders AppShell, with the
 * actual interactive bit split into a separate Client Component
 * passed in as `children`.
 */
export async function AppShell({ title, children, desktopContent, hideTabBar }: AppShellProps) {
  const founder = await getFounder();
  const notifications = await getNotifications();
  const hasUnread = notifications.some((n) => n.unread);

  return (
    <>
      <Sidebar founder={founder} />
      <div className="r-shell">
        <DesktopTopbar title={title} />
        <div className="phone-shell">
          {desktopContent && <div className="desk-only">{desktopContent}</div>}
          <div className={desktopContent ? "mob-hide" : undefined}>
            <MobileTopbar founder={founder} hasUnread={hasUnread} />
            {children}
            {!hideTabBar && <TabBar />}
          </div>
        </div>
      </div>
    </>
  );
}
