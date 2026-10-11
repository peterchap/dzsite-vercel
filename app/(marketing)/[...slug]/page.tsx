import type { Metadata } from "next";
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

/**
 * Slugs that must not be indexed while the page behind them is a skeleton.
 * Empty today. /enterprise was the one entry; it was dropped on 2026-10-11 and
 * now 301s to /datasets (lib/legacy-redirects.ts). Keep app/sitemap.ts in step.
 */
const NOINDEX_SLUGS = new Set<string>();

export async function generateMetadata(
    props:
        | { params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> }
        | Promise<{ params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> }>
): Promise<Metadata> {
    const resolvedProps = await props as { params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> };
    const rawParams = resolvedProps.params;
    const params = await rawParams as { slug?: string | string[] };
    const slug = Array.isArray(params?.slug) ? params.slug.join("/") : params?.slug;
    const preview = (await draftMode()).isEnabled;
    const fetcher = preview ? sanityPreviewFetch : sanityFetch;
    const [site, page] = await Promise.all([
        fetcher<any>(siteSettingsQuery, {} as any),
        slug ? fetcher<PageDoc>(pageBySlugQuery, { slug }) : Promise.resolve(null),
    ]);

    // The canonical must be THIS page's path. Passing "/" here published
    // `canonical: <site root>` on every CMS-driven page — /enterprise,
    // /cyber-risk-underwriting and the rest all claimed to be the homepage.
    const pathname = slug ? `/${slug.replace(/^\/+/, "")}` : "/";

    return buildMetadata({
        site,
        page: page ?? { title: "Home" },
        pathname,
        robots: slug && NOINDEX_SLUGS.has(slug) ? { index: false, follow: true } : undefined,
    });
}

export default async function PageBySlug(
    props:
        | { params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> }
        | Promise<{ params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> }>
) {
    const resolvedProps = await props as { params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> };
    const rawParams = resolvedProps.params;
    const params = await rawParams as { slug?: string | string[] };
    const slug = Array.isArray(params?.slug) ? params.slug.join("/") : params?.slug;
    if (!slug) return notFound();
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
                <div className="mx-auto max-w-3xl px-6 py-16 text-center text-slate-400">
                    No content found yet. Add a hero or sections in Studio.
                </div>
            ) : null}
        </PageShell>
    );
}
