import { DocsClient } from "@/components/docs/DocsClient";
import { DOCS_FAQ } from "@/components/docs/faq";
import { FaqJsonLd } from "@/components/seo/FaqSection";
import { DATASET_CATALOG, isAvailable } from "@/lib/datasets/catalog";
import { getDatasets } from "@/lib/datasets/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Documentation — Datazag",
    description:
        "How Datazag data reaches you: reports on a domain or estate, and cloud datasets of DNS, mail, hosting and network data.",
};

export default async function DocsPage() {
    // The datasets section lists what is actually published rather than a
    // hand-maintained copy of it — the same source /datasets renders from, so
    // the two can never disagree about what ships.
    // Only datasets with a live route (lib/datasets/catalog.ts), so /docs and
    // /datasets can never disagree about what is available.
    const live = new Set(DATASET_CATALOG.filter(isAvailable).map((e) => e.slug));
    const datasets = (await getDatasets().catch(() => [])).filter((d) => live.has(d.slug));

    return (
        <>
            <FaqJsonLd entries={DOCS_FAQ} />
            <DocsClient datasets={datasets} />
        </>
    );
}
