import type { FaqEntry } from "@/components/seo/FaqSection";

/**
 * The /docs FAQ. One list, read by DocsClient (the visible answers) and by
 * app/(marketing)/docs/page.tsx (the FAQPage markup), so the two cannot differ.
 */
export const DOCS_FAQ: FaqEntry[] = [
  {
    question: "How fresh is the data?",
    answer:
      "Certificate Transparency is consumed continuously, so newly issued certificates are observed as they are logged. DNS and hosting records are re-resolved on a rolling schedule; the refresh cadence for each field is documented on the dataset page that ships it.",
  },
  {
    question: "How do I get data in bulk?",
    answer:
      "Use the datasets. They are tables in your own warehouse. The datasets section shows where each one is available.",
  },
];
