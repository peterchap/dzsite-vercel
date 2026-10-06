import type { Metadata } from "next";

import { PricingV2 } from "@/components/pricing/PricingV2";
import { getPaidReportPrice } from "@/lib/paid-report-price";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent pricing for Datazag reports, alerts and cloud data shares.",
};

export default async function PricingPage() {
  const paidPrice = await getPaidReportPrice();
  return <PricingV2 paidReportPrice={paidPrice?.display ?? null} />;
}
