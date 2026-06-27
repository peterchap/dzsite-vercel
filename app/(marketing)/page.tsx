import type { Metadata } from "next";

import HomepageAtmosphereConcept, { type HomepageAtmosphereContent } from "@/components/sections/blocks/HomepageAtmosphereConcept";
import { sanityFetch } from "@/sanity/fetch";
import { homepageAtmosphereQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Datazag — Predictive Domain & Infrastructure Intelligence",
  description:
    "Datazag observes domains, DNS, certificates, hosting and internet infrastructure changes to detect emerging impersonation and attack infrastructure before campaigns reach users.",
};

export default async function HomePage() {
  const content = await sanityFetch<Partial<HomepageAtmosphereContent> | null>(homepageAtmosphereQuery, {});

  return <HomepageAtmosphereConcept content={content} />;
}
