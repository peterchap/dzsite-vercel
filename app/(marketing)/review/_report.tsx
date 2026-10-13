import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Shared body for the hidden pre-publication pages of "Who Really Runs Business
 * Email?" (Datazag Insights, October 2026). Each review link is its own route with
 * its own random token, so one link can be withdrawn without touching the others;
 * they all read the same page images and PDF from public/review/<ASSETS>/.
 *
 * Hidden by design: random-token paths, linked from nowhere; not in app/sitemap.ts,
 * not in lib/research.ts (the /insights listing), not in app/robots.ts (a Disallow
 * line would publish the paths). Robots metadata is noindex, and next.config.ts
 * sends X-Robots-Tag on everything under /review/, the images and PDF included.
 *
 * The underscore keeps this file out of routing. Figures are not typed here
 * (checkCorpusDrift): the report itself is in the page images and the PDF.
 * At formal publication, delete app/(marketing)/review/ and public/review/.
 */

const ASSETS = "/review/report-email-2026-4aecad8499";
export const REPORT_PDF = `${ASSETS}/who-really-runs-business-email-datazag-2026.pdf`;

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

/** Metadata every review link shares: never indexed, never followed, never cached. */
export function reviewMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
  };
}

type Props = {
  /** Text in the amber band at the top of the page. */
  banner: ReactNode;
  /** Small label above the title. */
  eyebrow: string;
  /** Optional panel under the buttons (e.g. how a data source is used). */
  children?: ReactNode;
};

export function ReviewReport({ banner, eyebrow, children }: Props) {
  return (
    <div className="relative bg-[#030619] text-white">
      <div className="border-b border-amber-300/30 bg-amber-300/[0.12]">
        <p className="mx-auto max-w-5xl px-4 py-3 text-sm leading-6 text-amber-100 sm:px-6 lg:px-8">{banner}</p>
      </div>

      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Who Really Runs Business Email?</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            The State of Email Infrastructure 2026. The keyhole effect: how the email infrastructure of the world&apos;s largest
            companies compares with the wider internet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={REPORT_PDF}
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
          {children}
        </div>
      </section>

      <section id="report" className="py-14 md:py-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-4 sm:px-6">
          {PAGES.map((label, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <figure key={n} className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40">
                <Image
                  src={`${ASSETS}/page-${n}.webp`}
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
            <a href={REPORT_PDF} download className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline">
              Download the full report as a PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
