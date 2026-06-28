import type { Metadata } from "next";

import { PricingV2 } from "@/components/pricing/PricingV2";

export const metadata: Metadata = {
  title: "Pricing — Datazag",
  description:
    "Transparent pricing for Datazag reports, threat intelligence, API credits and cloud data shares.",
};

export default function PricingPage() {
  return <PricingV2 />;
}
