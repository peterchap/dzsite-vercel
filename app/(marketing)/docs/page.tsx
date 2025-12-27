import { DocsClient } from "@/components/docs/DocsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Documentation | Datazag",
    description: "Programmatic access to real-time domain risk, DNS infrastructure, and deliverability intelligence.",
};

export default function DocsPage() {
    return <DocsClient />;
}
