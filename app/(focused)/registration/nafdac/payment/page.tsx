import { NafdacPaymentScreen } from "@/components/registration/nafdac/NafdacPaymentScreen";
import { getBusiness } from "@/lib/api";

export default async function NafdacPaymentPage() {
  const business = await getBusiness();
  return <NafdacPaymentScreen business={business} />;
}
