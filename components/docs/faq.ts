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
    question: "Do you support subdomains?",
    answer:
      "Yes, full hostnames work. The response describes the host you ask about, with signals from its parent domain where they apply.",
  },
  {
    question: "Is batch processing available?",
    answer:
      "Yes. For large volumes, use the datasets: the same data as tables in your own warehouse. The datasets section shows where each one is available.",
  },
  {
    question: "What sets the 'is_mailable' flag?",
    answer:
      "It's a synthesis of MX record validity, SPF/DMARC health, and the absence of malicious flags or disposable provider associations.",
  },
];
