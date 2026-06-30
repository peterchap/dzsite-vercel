import type { Metadata } from "next";

import StoryPage, { type StoryContent } from "@/components/story/StoryPage";
import { sanityFetch } from "@/sanity/fetch";
import { homepageAtmosphereQuery } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Datazag — Detect Malicious Infrastructure Before Blacklists",
  description:
    "Datazag delivers annotated internet infrastructure intelligence within 10 seconds of staging, helping MSSPs and enterprise teams stop threats before they go live.",
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
