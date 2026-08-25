import type { ReactNode } from "react";
import { RegistrationShell } from "@/components/shell/RegistrationShell";
import { CacWizardProvider } from "@/lib/wizard/cac-context";
import { getDefaultShareholders } from "@/lib/api";

export default async function CacLayout({ children }: { children: ReactNode }) {
  const defaultShareholders = await getDefaultShareholders();

  return (
    <CacWizardProvider defaultShareholders={defaultShareholders}>
      <RegistrationShell>{children}</RegistrationShell>
    </CacWizardProvider>
  );
}
