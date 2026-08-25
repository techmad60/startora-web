import Link from "next/link";

export function DesktopTopbar({ title }: { title: string }) {
  return (
    <header className="r-topbar">
      <div className="r-topbar-title">{title}</div>
      <div className="r-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5B6066" strokeWidth={2} strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input placeholder="Search filings, documents, obligations…" />
      </div>
      <Link href="/notifications" className="r-bell">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        <div className="r-bell-dot" />
      </Link>
      <Link href="/compliance-map" className="r-desk-cta">
        + New filing
      </Link>
    </header>
  );
}
