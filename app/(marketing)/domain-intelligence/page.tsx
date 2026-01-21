import Link from "next/link"
import { Code, Database, Cloud, Server } from "lucide-react"
import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/fetch";
import { sanityPreviewFetch } from "@/sanity/preview";
import { pageBySlugQuery } from "@/sanity/queries";
import type { PageDoc } from "@/sanity/types";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { HeroSplitCta } from "@/components/sections/blocks/HeroSplitCta";

export const metadata = {
    title: 'Domain Intelligence API & Data Shares | Datazag',
    description: '310M enriched domains with risk scores, hosting intelligence, and real-time updates.',
}

export default async function DomainIntelligencePage() {
    const preview = (await draftMode()).isEnabled;
    const fetcher = preview ? sanityPreviewFetch : sanityFetch;
    const page = await fetcher<PageDoc>(pageBySlugQuery, { slug: "domain-intelligence" });

    return (
        <main className="flex flex-col">
            {/* Hero Section */}
            {page?.hero && page.hero._type === "section.heroSplitCta" ? (
                <HeroSplitCta {...(page.hero as any)} />
            ) : (
                <section className="bg-[#131326] px-6 py-24 sm:py-32 lg:px-8 text-center">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-sans">
                            Domain Intelligence API & Data Shares
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            310M enriched domains with risk scores, hosting intelligence, and real-time updates.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/docs"
                                className="rounded-md bg-[#1E1E38] px-6 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-[#2d2d50]"
                            >
                                View API Docs
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-md bg-[#56A8F5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#56A8F5]/90"
                            >
                                Start Free Trial
                            </Link>
                        </div>
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
                            <span>Available via:</span>
                            <span className="flex items-center gap-1"><Code className="h-4 w-4" /> API</span>
                            <span className="flex items-center gap-1"><Database className="h-4 w-4" /> Snowflake</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> AWS Data Exchange</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> Azure</span>
                            <span className="flex items-center gap-1"><Cloud className="h-4 w-4" /> Google Cloud</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Studio-managed sections for this page */}
            {Array.isArray(page?.sections) && page!.sections!.length > 0 ? (
                <SectionRenderer sections={page!.sections} />
            ) : null}
        </main>
    )
}
