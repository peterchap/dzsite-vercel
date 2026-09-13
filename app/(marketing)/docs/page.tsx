import { DocsClient } from "@/components/docs/DocsClient";
import { getDatasets } from "@/lib/datasets/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Infrastructure Intelligence API — Datazag",
    description:
        "Developer documentation for every Datazag delivery route: the Intelligence API, alert webhooks, reports and cloud datasets. DNS state, mail and authentication posture, hosting and network placement for any domain.",
};

export default async function DocsPage() {
    // The datasets section lists what is actually published rather than a
    // hand-maintained copy of it — the same source /datasets renders from, so
    // the two can never disagree about what ships.
    const datasets = await getDatasets().catch(() => []);

    return <DocsClient datasets={datasets} />;
}
