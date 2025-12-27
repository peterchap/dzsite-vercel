import type { Metadata } from "next";
import { sanityFetch, sanityClient } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import { buildMetadata } from "@/sanity/seo";
import type { PageDoc } from "@/sanity/types";
import { PageShell } from "@/components/layout/PageShell";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import LegacyHomepage from "./legacy-home/page";

export async function generateMetadata(): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;
  const fetcher = preview ? sanityPreviewFetch : sanityFetch;
  const [site, page] = await Promise.all([
    fetcher<any>(siteSettingsQuery, {} as any),
    fetcher<PageDoc>(pageBySlugQuery, { slug: "home" }),
  ]);

  return buildMetadata({ site, page: page ?? { title: "Home" }, pathname: "/" });
}

export default async function HomePage() {
  const preview = (await draftMode()).isEnabled;
  const fetcher = preview ? sanityPreviewFetch : sanityFetch;
  const [page, allPages] = await Promise.all([
    fetcher<PageDoc>(pageBySlugQuery, { slug: "home" }),
    fetcher<any[]>(`*[_type == "page"]{_id, "slug": slug.current}`, {})
  ]);

  // If no page is found in Sanity, fall back to the legacy homepage content
  if (!page) {
    return (
      <PageShell>
        <LegacyHomepage />
      </PageShell>
    );
  }

  const hasHero = !!(page.hero && page.hero._type === "section.heroSplitCta");
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;

  return (
    <PageShell>
      {hasHero ? <HeroSplitCta {...(page.hero as any)} /> : null}
      {hasSections ? (
        <SectionRenderer sections={page.sections} />
      ) : null}
      {!hasHero && !hasSections ? (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center text-slate-500">
          No content found for Home yet. Add a hero or sections in Studio.
        </div>
      ) : null}
    </PageShell>
  );
}
