import { AppShell } from "@/components/shell/AppShell";
import { PasswordSettingsBody } from "@/components/settings/PasswordSettingsBody";

export default function SettingsPasswordPage() {
  return (
    <AppShell title="Change Password">
      <PasswordSettingsBody />
    </AppShell>
  );
}
