import { DocsClient } from "@/components/docs/DocsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Infrastructure Intelligence API — Datazag",
    description:
        "The query interface to the Datazag infrastructure graph: DNS state, mail and authentication posture, hosting and network placement, and a risk score for any domain. KYC, fraud and deliverability are use cases, not the product.",
};

export default function DocsPage() {
    return <DocsClient />;
}
