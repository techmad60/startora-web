import Link from "next/link";
import { FilingProgressDots } from "@/components/ui/FilingProgress";
import type { Filing } from "@/lib/types";

export function FilingCard({ filing, clickable }: { filing: Filing; clickable?: boolean }) {
  const inner = (
    <>
      <div className="fl2-top">
        <div>
          <div className="fl2-name">{filing.name}</div>
          <div className="fl2-ref">REF · {filing.reference}</div>
        </div>
        {filing.status === "approved" && <div className="fl2-stamp">APPROVED</div>}
      </div>
      <div className="fl2-prog">
        <FilingProgressDots steps={filing.steps} labelVariant="card" />
      </div>
    </>
  );

  if (!clickable) {
    return <div className="fl2-card">{inner}</div>;
  }

  return (
    <Link href={`/filing-status/${filing.id}`} className="fl2-card" style={{ cursor: "pointer" }}>
      {inner}
    </Link>
  );
}
