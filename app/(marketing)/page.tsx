import type { Metadata } from "next";

import HomepageAtmosphereConcept from "@/components/sections/blocks/HomepageAtmosphereConcept";

export const metadata: Metadata = {
  title: "Datazag — Predictive Domain & Infrastructure Intelligence",
  description:
    "Datazag observes domains, DNS, certificates, hosting and internet infrastructure changes to detect emerging impersonation and attack infrastructure before campaigns reach users.",
};

export default function HomePage() {
  return <HomepageAtmosphereConcept />;
}
