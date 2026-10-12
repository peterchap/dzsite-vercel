import type { Metadata } from "next";
import Image from "next/image";

/**
 * REVIEW DRAFT — "Who Really Runs Business Email?" (Datazag Insights, October 2026).
 *
 * A hidden page for pre-publication review, starting with Forbes Media's consent to
 * the use of Forbes Global 2000 (2026) data. It is deliberately invisible:
 *   - the path carries a random token and nothing on the site links to it;
 *   - it is NOT in app/sitemap.ts, NOT in lib/research.ts (the /insights listing),
 *     and NOT in app/robots.ts (a Disallow line would publish the path);
 *   - robots metadata says noindex/nofollow, and next.config.ts sends
 *     X-Robots-Tag on everything under /review/ (the page images and the PDF too).
 *
 * The report itself is the designed publication, rendered to page images plus the
 * PDF in public/review/<slug>/. Figures are not typed here (checkCorpusDrift).
 * At formal publication this route is deleted and the report moves to /insights.
 */

const SLUG = "email-infrastructure-2026-d342801380";
const BASE = `/review/${SLUG}`;
const PDF = `${BASE}/who-really-runs-business-email-datazag-2026.pdf`;

const PAGES = [
  "Cover",
  "At a glance",
  "Executive summary and contents",
  "How to read this research",
  "What we found, and why it matters",
  "Chapter 01: Microsoft dominates big business. The wider internet tells another story.",
  "Chapter 01: two views of email infrastructure, and the evidence behind the gateway",
  "Chapter 01: why the Top 1000 leans to Microsoft, and the next 1,000",
  "Chapter 02: there is no single global email market",
  "Chapter 02: the full country comparison",
  "Chapter 02: the same split across corporate mail domains",
  "Chapter 03: the overlooked giants of business email",
  "Chapter 03: the mechanism is the bundle",
  "Chapter 04: why enterprise email security looks different",
  "Chapter 05: DMARC adoption is not DMARC protection",
  "Chapter 05: case study, how provider defaults shape security outcomes",
  "Chapter 05: why the gap matters",
  "Chapter 06: the millions of mail domains hiding in plain sight",
  "Chapter 06: own-domain MX is not the same as self-hosting",
  "Chapter 06: the tail is concentrated enough to name",
  "Chapter 07: what it means",
  "Research populations and methodology",
  "What this measures and what it does not, and sources",
  "From internet-wide measurements to intelligence you can use",
];

export const metadata: Metadata = {
  title: "Review draft: Who Really Runs Business Email? — Datazag Insights",
  description: "Confidential pre-publication review draft. Not for distribution.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ReviewDraftPage() {
  return (
    <div className="relative bg-[#030619] text-white">
      <div className="border-b border-amber-300/30 bg-amber-300/[0.12]">
        <p className="mx-auto max-w-5xl px-4 py-3 text-sm leading-6 text-amber-100 sm:px-6 lg:px-8">
          <strong className="font-semibold">Confidential review draft.</strong> This page is not published or indexed. Please do not
          share the link.
        </p>
      </div>

      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Datazag Insights · Review draft · October 2026
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Who Really Runs Business Email?</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            The State of Email Infrastructure 2026. The keyhole effect: how the email infrastructure of the world&apos;s largest
            companies compares with the wider internet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PDF}
              download
              className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#030619] hover:bg-cyan-200"
            >
              Download the PDF
            </a>
            <a
              href="#report"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/40"
            >
              Read it on this page
            </a>
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              How this report uses the Forbes Global 2000
            </p>
            <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-300">
              <li>
                The Forbes Global 2000 list (2026) supplies the company sample: rank, name, country, industry and listed website.
              </li>
              <li>
                Each company&apos;s mail records were then read by Datazag from public DNS. All mail measurements are
                Datazag&apos;s own observations.
              </li>
              <li>
                Only aggregates are published, by rank band and by country of headquarters. No company-level result is named or
                published.
              </li>
              <li>
                Forbes is credited in the text and in a citation: &ldquo;Based on data analyzed from the Forbes Global 2000 list
                (2026)&rdquo; and &ldquo;Forbes Media LLC. (2026). &lsquo;The Global 2000.&rsquo; Forbes.com.&rdquo; See pages 3
                and 23.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="report" className="py-14 md:py-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-4 sm:px-6">
          {PAGES.map((label, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <figure key={n} className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40">
                <Image
                  src={`${BASE}/page-${n}.webp`}
                  alt={`Page ${i + 1}: ${label}`}
                  width={1588}
                  height={2246}
                  sizes="(max-width: 860px) 100vw, 860px"
                  priority={i < 2}
                  className="h-auto w-full"
                />
              </figure>
            );
          })}
          <div className="mt-6 text-center">
            <a href={PDF} download className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Download the full report as a PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
