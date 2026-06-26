import type { Metadata } from "next";

import HomepageAtmosphereConcept from "@/components/sections/blocks/HomepageAtmosphereConcept";

export const metadata: Metadata = {
  title: "Homepage Concept — Datazag",
  description:
    "A concept page exploring Datazag as an attack infrastructure intelligence platform that observes the changing internet and turns early signals into actionable intelligence.",
};

export default function InternetNeverStandsStillPage() {
  return <HomepageAtmosphereConcept />;
}
