import type { Metadata } from "next";

import { PricingV2 } from "@/components/pricing/PricingV2";
import { getPaidReportPrice } from "@/lib/paid-report-price";
import { estateBandLines, estateFromPrice, getPriceTable, snapshotBandLines, snapshotFromPrice } from "@/lib/estate-prices";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent pricing for Datazag reports, alerts and cloud data shares.",
};

export default async function PricingPage() {
  const [paidPrice, table] = await Promise.all([getPaidReportPrice(), getPriceTable()]);
  return (
    <PricingV2 paidReportPrice={paidPrice?.display ?? null}
      estatePrice={estateFromPrice(table)} estateBands={estateBandLines(table)}
      snapshotPrice={snapshotFromPrice(table)} snapshotBands={snapshotBandLines(table)} />
  );
}
