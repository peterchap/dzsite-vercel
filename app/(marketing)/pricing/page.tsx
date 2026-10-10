import type { Metadata } from "next";

import { PricingV2 } from "@/components/pricing/PricingV2";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent pricing for Datazag reports, monitoring, alerts and cloud data shares, with plain scope units.",
};

// Every price comes from the shared pricing config (lib/pricing.ts), read in PricingV2.
export default function PricingPage() {
  return <PricingV2 />;
}
