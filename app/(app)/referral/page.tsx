import { AppShell } from "@/components/shell/AppShell";
import { ReferralBody } from "@/components/referral/ReferralBody";
import { getReferralLink, getReferrals } from "@/lib/api";

export default async function ReferralPage() {
  const [referralLink, referrals] = await Promise.all([getReferralLink(), getReferrals()]);

  return (
    <AppShell title="Refer a Founder">
      <ReferralBody referralLink={referralLink} referrals={referrals} />
    </AppShell>
  );
}
