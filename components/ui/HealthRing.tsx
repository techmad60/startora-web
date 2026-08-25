const CIRCUMFERENCE_64 = 2 * Math.PI * 26; // r=26 (small ring, dashboard card)
const CIRCUMFERENCE_120 = 2 * Math.PI * 50; // r=50 (large ring, desktop panel / health-score page)

export function HealthRing({ score, size = "small" }: { score: number; size?: "small" | "large" }) {
  if (size === "large") {
    const offset = CIRCUMFERENCE_120 * (1 - score / 100);
    return (
      <svg viewBox="0 0 120 120" width="100" height="100">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#E3E1DA" strokeWidth={10} />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#1B4332"
          strokeWidth={10}
          strokeDasharray={CIRCUMFERENCE_120}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="56" textAnchor="middle" fontFamily="var(--font-fraunces), serif" fontSize="22" fill="#14171C">
          {score}
        </text>
        <text x="60" y="70" textAnchor="middle" fontFamily="var(--font-plex-mono), monospace" fontSize="9" fill="#5B6066">
          /100
        </text>
      </svg>
    );
  }

  const offset = CIRCUMFERENCE_64 * (1 - score / 100);
  return (
    <div className="health-ring">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#E3E1DA" strokeWidth={6} />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="#1B4332"
          strokeWidth={6}
          strokeDasharray={CIRCUMFERENCE_64}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="health-ring-num">
        {score}
        <span>/ 100</span>
      </div>
    </div>
  );
}
