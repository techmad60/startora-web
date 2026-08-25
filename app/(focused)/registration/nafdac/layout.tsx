import type { ReactNode } from "react";
import { RegistrationShell } from "@/components/shell/RegistrationShell";
import { NafdacWizardProvider } from "@/lib/wizard/nafdac-context";

export default function NafdacLayout({ children }: { children: ReactNode }) {
  return (
    <NafdacWizardProvider>
      <RegistrationShell>{children}</RegistrationShell>
    </NafdacWizardProvider>
  );
}
