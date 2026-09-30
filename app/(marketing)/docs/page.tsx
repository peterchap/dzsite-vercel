import { DocsClient } from "@/components/docs/DocsClient";
import { getDatasets } from "@/lib/datasets/load";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Infrastructure Intelligence API — Datazag",
    description:
        "Developer docs for every Datazag delivery route: the API, alert webhooks, reports and cloud datasets. DNS, mail, hosting and network data for any domain.",
};

export default async function DocsPage() {
    // The datasets section lists what is actually published rather than a
    // hand-maintained copy of it — the same source /datasets renders from, so
    // the two can never disagree about what ships.
    const datasets = await getDatasets().catch(() => []);

    return <DocsClient datasets={datasets} />;
}
