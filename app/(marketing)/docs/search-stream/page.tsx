import { SearchStreamDocs } from "@/components/docs/SearchStreamDocs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Phishing Search Stream API | Datazag",
    description: "Documentation for real-time phishing alerts and brand infringement webhooks.",
};

export default function SearchStreamDocsPage() {
    return <SearchStreamDocs />;
}
