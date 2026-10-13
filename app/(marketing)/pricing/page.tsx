import type { Metadata } from "next";

import { PricingV2 } from "@/components/pricing/PricingV2";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent pricing for Datazag reports, monitoring, alerts and cloud data shares, with plain scope units.",
};

// Re-rendered hourly, so a founding offer hides after its deadline without a deploy.
export const revalidate = 3600;

// Every price comes from the shared pricing config (lib/pricing.ts), read in PricingV2.
export default function PricingPage() {
  return <PricingV2 />;
}
