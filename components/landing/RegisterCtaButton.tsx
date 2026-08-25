"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { ReactNode, CSSProperties } from "react";

export function RegisterCtaButton({
  className,
  style,
  children,
}: {
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const modal = (
    <div className="lp-modal-overlay" onClick={() => setOpen(false)}>
      <div className="lp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lp-modal-icon">i</div>
        <h3>We&apos;re putting the final pieces together</h3>
        <p>
          The platform you&apos;re about to enter is fully built and designed. We&apos;re in the last stretch of
          connecting it to <u>our live backend systems</u> — right now you&apos;re interacting with demo data, so
          a few actions may take a couple of seconds longer than usual. That&apos;ll be seamless very soon.
        </p>
        <button className="lp-btn lp-btn-primary" onClick={() => router.push("/auth/sign-in")} type="button">
          Continue <span className="lp-modal-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button className={className} style={style} onClick={() => setOpen(true)} type="button">
        {children}
      </button>
      {open && createPortal(modal, document.body)}
    </>
  );
}
