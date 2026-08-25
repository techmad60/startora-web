import { AppShell } from "@/components/shell/AppShell";
import { DocsScreen } from "@/components/docs/DocsScreen";
import { getCertificateDocs, getCorporateDocs } from "@/lib/api";

export default async function DocsPage() {
  const [certificateDocs, corporateDocs] = await Promise.all([getCertificateDocs(), getCorporateDocs()]);

  return (
    <AppShell title="Documents">
      <DocsScreen certificateDocs={certificateDocs} corporateDocs={corporateDocs} />
    </AppShell>
  );
}
