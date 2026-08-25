"use client";

export function ShareProfileButton({ businessName }: { businessName: string }) {
  async function shareProfile() {
    const shareData = { title: `${businessName} — Startora`, url: typeof window !== "undefined" ? window.location.href : "" };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — no-op
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied!");
    }
  }

  return (
    <button className="share-btn share-btn-primary" onClick={shareProfile} type="button">
      Share profile
    </button>
  );
}
