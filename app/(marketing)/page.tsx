import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import { buildMetadata } from "@/sanity/seo";
import type { PageDoc } from "@/sanity/types";
import { PageShell } from "@/components/layout/PageShell";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import HeroAttackTimeline from "@/components/sections/blocks/HeroAttackTimeline";
import { draftMode } from "next/headers";
import HomepageAtmosphereConcept from "@/components/sections/blocks/HomepageAtmosphereConcept";

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
  const page = await fetcher<PageDoc>(pageBySlugQuery, { slug: "home" });

  if (!page) return <HomepageAtmosphereConcept />;

  const hasHero = !!page.hero;
  const hasSections = Array.isArray(page.sections) && page.sections.length > 0;

  return (
    <PageShell>
      {hasHero ? <HeroAttackTimeline {...(page.hero as any)} /> : null}
      {hasSections ? <SectionRenderer sections={page.sections} /> : null}
      {!hasHero && !hasSections ? <HomepageAtmosphereConcept /> : null}
    </PageShell>
  );
}
