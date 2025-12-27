import { sanityFetch } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { pageBySlugQuery, siteSettingsQuery } from "@/sanity/queries";
import { buildMetadata } from "@/sanity/seo";
import type { PageDoc } from "@/sanity/types";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const slug = "use-cases";
    const preview = (await draftMode()).isEnabled;
    const fetcher = preview ? sanityPreviewFetch : sanityFetch;
    const [site, page] = await Promise.all([
        fetcher<any>(siteSettingsQuery, {} as any),
        fetcher<PageDoc>(pageBySlugQuery, { slug }),
    ]);

    return buildMetadata({ site, page: page ?? { title: "Use Cases" }, pathname: "/use-cases" });
}

export default async function UseCasesPage() {
    const slug = "use-cases";
    const preview = (await draftMode()).isEnabled;
    const fetcher = preview ? sanityPreviewFetch : sanityFetch;
    const page = await fetcher<PageDoc>(pageBySlugQuery, { slug });

    if (!page) return notFound();

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
                    No content found for Use Cases yet. Add a hero or sections in Studio.
                </div>
            ) : null}
        </PageShell>
    );
}
