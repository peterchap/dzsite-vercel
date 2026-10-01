import { DocsClient } from "@/components/docs/DocsClient";
import { DOCS_FAQ } from "@/components/docs/faq";
import { FaqJsonLd } from "@/components/seo/FaqSection";
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
    const datasets = await getDatasets().catch(() => []);

    return (
        <>
            <FaqJsonLd entries={DOCS_FAQ} />
            <DocsClient datasets={datasets} />
        </>
    );
}
