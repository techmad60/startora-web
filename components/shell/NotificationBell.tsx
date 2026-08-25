import Link from "next/link";

export function NotificationBell({ hasUnread }: { hasUnread: boolean }) {
  return (
    <Link href="/notifications" className="tb-bell" aria-label="Notifications">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
      {hasUnread && <div className="bell-badge" />}
    </Link>
  );
}
