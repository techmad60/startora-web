import type { ReactNode } from "react";
import { FocusedShell } from "@/components/shell/FocusedShell";
import { OnboardingProvider } from "@/lib/wizard/onboarding-context";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <FocusedShell>{children}</FocusedShell>
    </OnboardingProvider>
  );
}
