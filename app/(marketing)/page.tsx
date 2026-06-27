import type { Metadata } from "next";

import HomepageAtmosphereConcept, { type HomepageAtmosphereContent } from "@/components/sections/blocks/HomepageAtmosphereConcept";
import { sanityFetch } from "@/sanity/fetch";
import { homepageAtmosphereQuery } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Datazag — Predictive Domain & Infrastructure Intelligence",
  description:
    "Datazag observes domains, DNS, certificates, hosting and internet infrastructure changes to detect emerging impersonation and attack infrastructure before campaigns reach users.",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await sanityFetch<any | null>(homepageAtmosphereQuery, {});
  const seo = content?.seo;

  return {
    title: seo?.metaTitle || fallbackMetadata.title,
    description: seo?.metaDescription || fallbackMetadata.description,
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || String(fallbackMetadata.title),
      description: seo?.ogDescription || seo?.metaDescription || String(fallbackMetadata.description),
    },
  };
}

export default async function HomePage() {
  const content = await sanityFetch<Partial<HomepageAtmosphereContent> | null>(homepageAtmosphereQuery, {});

  return <HomepageAtmosphereConcept content={content} />;
}
