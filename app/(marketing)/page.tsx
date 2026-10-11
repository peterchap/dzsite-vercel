import type { Metadata } from "next";

import HomePageContent from "@/components/home/HomePage";

// 2026-10-07 demand-generation restructure: the homepage copy lives in code
// (components/home/copy.ts), so its metadata does too. The Sanity homepageAtmosphere
// doc no longer drives this page; its SEO fields carried the previous positioning.
const TITLE = "Datazag — Internet infrastructure intelligence you can act on";
const DESCRIPTION =
  "Pre-compromise intelligence on domains, DNS, certificates and routing for MSSPs, email platforms, insurers and data teams. Start with a free report.";

export async function generateMetadata(): Promise<Metadata> {
  // The layout's canonical "./" resolves to "/index" on the root route, so the
  // homepage states its own. The share card is a route (app/og/home), not a
  // root opengraph-image file, which every other page would inherit.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";
  const home = new URL("/", siteUrl).toString();
  const image = { url: new URL("/og/home", siteUrl).toString(), width: 1200, height: 630 };
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: home },
    openGraph: { type: "website", url: home, siteName: "Datazag", title: TITLE, description: DESCRIPTION, images: [image] },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [image.url] },
  };
}

export default async function HomePage() {
  return <HomePageContent />;
}
