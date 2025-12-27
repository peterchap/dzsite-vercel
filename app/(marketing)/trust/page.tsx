import { sanityFetch } from "@/sanity/fetch";
import { pageBySlugQuery } from "@/sanity/queries";
import { PageShell } from "@/components/layout/PageShell";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trust | Datazag",
};

export default async function TrustPage() {
    const page = await sanityFetch<any>(pageBySlugQuery, { slug: "trust" });

    if (!page) {
        // Fallback or 404
        return notFound();
    }

    const hasHero = !!(page.hero && page.hero._type === "section.heroSplitCta");
    const hasSections = Array.isArray(page.sections) && page.sections.length > 0;

    return (
        <PageShell>
            {hasHero ? <HeroSplitCta {...(page.hero as any)} /> : null}
            {hasSections ? (
                <SectionRenderer sections={page.sections} />
            ) : null}
        </PageShell>
    );
}
