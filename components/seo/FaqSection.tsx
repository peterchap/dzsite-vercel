import { copyText, resolveCopyCards, type MarketingCopySection } from "@/lib/marketing-copy";
import type { CopySection } from "@/sanity/seedMarketingCopy";

export type FaqEntry = { question: string; answer: string };

/**
 * schema.org FAQPage for a list of questions.
 *
 * WHAT IT IS FOR (2026-10-01): since August 2023 Google shows FAQ rich results
 * only for government and health sites, so this changes nothing on Google's
 * results page. It is for answer engines and Bing, which read machine-readable
 * Q&A. The visible text below is what those engines quote, which is why the
 * markup is always built from the SAME entries the page renders — the two can
 * never say different things.
 */
export function faqPageJsonLd(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: { "@type": "Answer", text: e.answer },
    })),
  };
}

export function FaqJsonLd({ entries }: { entries: FaqEntry[] }) {
  if (entries.length === 0) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(entries)) }} />;
}

/**
 * A page's questions and answers, from its copy.ts `faq` section (CMS-editable
 * like every other section: item title = question, item text = answer).
 *
 * WRITING RULE: each answer restates something the site already establishes.
 * No figure that changes (the corpus size moves daily), and no claim the claim
 * guard would refuse anywhere else — an answer engine quotes these verbatim.
 */
export function FaqSection({
  section,
  fallback,
}: {
  section: MarketingCopySection | undefined;
  fallback: CopySection;
}) {
  const cards = resolveCopyCards(fallback.items ?? [], section);
  const entries: FaqEntry[] = cards
    .filter((c) => c.title && c.text)
    .map((c) => ({ question: c.title as string, answer: c.text as string }));
  if (entries.length === 0) return null;

  return (
    <section id="faq" className="border-t border-white/10 py-20 md:py-28">
      <FaqJsonLd entries={entries} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/70">
            {copyText(section?.eyebrow, fallback.eyebrow ?? "Questions")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {copyText(section?.title, fallback.title ?? "Frequently asked questions")}
          </h2>
        </div>
        <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {entries.map((e) => (
            <div key={e.question} className="py-6">
              <dt className="text-lg font-semibold text-white">{e.question}</dt>
              <dd className="mt-3 text-base leading-7 text-slate-300">{e.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
