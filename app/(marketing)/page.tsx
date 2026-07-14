import type { Metadata } from "next";

import StoryPage, { type StoryContent } from "@/components/story/StoryPage";
import { sanityFetch } from "@/sanity/fetch";
import { homepageAtmosphereQuery } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Datazag — Your threat feeds see attacks. We see them being built.",
  description:
    "Datazag maps malicious infrastructure at certificate issuance — surfacing whole campaigns before the first domain attacks — and delivers scored, annotated intelligence into your SIEM, warehouse and controls.",
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
  const content = await sanityFetch<Partial<StoryContent> | null>(homepageAtmosphereQuery, {});

  return <StoryPage content={content} />;
}
