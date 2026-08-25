import { AppShell } from "@/components/shell/AppShell";
import { PaymentScreen } from "@/components/payment/PaymentScreen";
import { getBusiness, getPaymentLineItems, getPaymentTotalLabel } from "@/lib/api";

export default async function PaymentPage() {
  const [business, paymentLineItems, paymentTotalLabel] = await Promise.all([
    getBusiness(),
    getPaymentLineItems(),
    getPaymentTotalLabel(),
  ]);

  return (
    <AppShell title="Review & Pay">
      <div className="body">
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <PaymentScreen business={business} paymentLineItems={paymentLineItems} paymentTotalLabel={paymentTotalLabel} />
        </div>
      </div>
    </AppShell>
  );
}
