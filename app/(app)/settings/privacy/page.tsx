import { AppShell } from "@/components/shell/AppShell";
import { PrivacySettingsBody } from "@/components/settings/PrivacySettingsBody";

export default function SettingsPrivacyPage() {
  return (
    <AppShell title="Privacy & Data">
      <PrivacySettingsBody />
    </AppShell>
  );
}
