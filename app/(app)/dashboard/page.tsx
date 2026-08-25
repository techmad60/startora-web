import { AppShell } from "@/components/shell/AppShell";
import { BusinessSwitcherCard, HealthCard, ObligationsCard, DeadlinesCard } from "@/components/dashboard/DashboardCards";
import { DesktopDashboard } from "@/components/dashboard/DesktopDashboard";
import { getBusiness, getFounder, getComplianceScore, getObligations, getDeadlines, getFilings } from "@/lib/api";

export default async function DashboardPage() {
  const [business, founder, complianceScore, obligations, deadlines, filings] = await Promise.all([
    getBusiness(),
    getFounder(),
    getComplianceScore(),
    getObligations(),
    getDeadlines(),
    getFilings(),
  ]);

  return (
    <AppShell
      title="Dashboard"
      desktopContent={
        <DesktopDashboard business={business} founder={founder} complianceScore={complianceScore} filings={filings} deadlines={deadlines} />
      }
    >
      <div className="dash-body">
        <BusinessSwitcherCard business={business} founder={founder} />
        <HealthCard complianceScore={complianceScore} />
        <ObligationsCard obligations={obligations} />
        <DeadlinesCard deadlines={deadlines} />
      </div>
    </AppShell>
  );
}
