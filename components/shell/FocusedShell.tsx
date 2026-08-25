import type { ReactNode } from "react";

/**
 * Bare focused shell for auth + onboarding. Just `.phone-shell` — no
 * injected wrapper class. Every screen that renders inside this
 * (`.auth-bg`, `.ob-screen`, `.obc-screen`, `.ob-done-screen`) is
 * already a self-contained, self-padded root element in source; none
 * of them are ever wrapped in `.body`. An earlier version of this
 * component wrapped children in `.body` (which has its own 22px
 * horizontal padding), stacking on top of each screen's own padding
 * and insetting everything — including auth-bg's full-bleed
 * background — from the true screen edges. Registration wizards are
 * different (they do use `.topbar` + `.body` in source) — that's
 * RegistrationShell, not this one.
 */
export function FocusedShell({ children }: { children: ReactNode }) {
  return (
    <div className="focused-shell">
      <div className="phone-shell">{children}</div>
    </div>
  );
}
