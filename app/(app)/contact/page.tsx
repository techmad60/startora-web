import { AppShell } from "@/components/shell/AppShell";
import { ContactBody } from "@/components/contact/ContactBody";
import { getFounder, getBusiness } from "@/lib/api";

export default async function ContactPage() {
  const [founder, business] = await Promise.all([getFounder(), getBusiness()]);

  return (
    <AppShell title="Contact">
      <ContactBody founder={founder} business={business} />
    </AppShell>
  );
}
