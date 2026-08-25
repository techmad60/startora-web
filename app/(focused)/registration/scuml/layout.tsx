import type { ReactNode } from "react";
import { RegistrationShell } from "@/components/shell/RegistrationShell";
import { ScumlWizardProvider } from "@/lib/wizard/scuml-context";

export default function ScumlLayout({ children }: { children: ReactNode }) {
  return (
    <ScumlWizardProvider>
      <RegistrationShell>{children}</RegistrationShell>
    </ScumlWizardProvider>
  );
}
