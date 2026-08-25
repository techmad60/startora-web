import { AppShell } from "@/components/shell/AppShell";
import { FilingDetail } from "@/components/filing/FilingDetail";

export default async function FilingDetailPage({ params }: { params: Promise<{ filingId: string }> }) {
  const { filingId } = await params;
  return (
    <AppShell title="Filing Detail">
      <div className="body">
        <FilingDetail filingId={filingId} />
      </div>
    </AppShell>
  );
}
