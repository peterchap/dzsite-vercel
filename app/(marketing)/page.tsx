import type { Metadata } from "next";

import StoryPage, { type StoryContent } from "@/components/story/StoryPage";
import { sanityFetch } from "@/sanity/fetch";
import { homepageAtmosphereQuery } from "@/sanity/queries";

const fallbackMetadata: Metadata = {
  title: "Datazag — See more of the internet. Know what it means.",
  description:
    "Datazag measures live domains, global routing and mail infrastructure every day, and turns them into intelligence: what each domain is and what changed.",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await sanityFetch<any | null>(homepageAtmosphereQuery, {});
  const seo = content?.seo;

  // The layout's canonical "./" resolves to "/index" on the root route, so the
  // homepage states its own. The share card is a route (app/og/home), not a
  // root opengraph-image file, which every other page would inherit.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";
  const home = new URL("/", siteUrl).toString();
  const image = { url: new URL("/og/home", siteUrl).toString(), width: 1200, height: 630 };
  const title = seo?.ogTitle || seo?.metaTitle || String(fallbackMetadata.title);
  const description = seo?.ogDescription || seo?.metaDescription || String(fallbackMetadata.description);
  return {
    title: seo?.metaTitle || fallbackMetadata.title,
    description: seo?.metaDescription || fallbackMetadata.description,
    alternates: { canonical: home },
    openGraph: { type: "website", url: home, siteName: "Datazag", title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function HomePage() {
  const content = await sanityFetch<Partial<StoryContent> | null>(homepageAtmosphereQuery, {});

  return <StoryPage content={content} />;
}
