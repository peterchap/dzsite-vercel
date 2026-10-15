import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { TrackedLink } from "@/components/home/TrackedLink";
import { OBSERVATORY_URL } from "@/lib/observatory-figures";
import { ORGANIZATION_ID } from "@/lib/organization";
import { researchDate } from "@/lib/research";
import { FINDINGS, HEADLINES, PAGES, REPORT, REPORT_PDF, pageImage, reportUrl } from "./data";

/*
 * DATAZAG INSIGHTS — "Who Really Runs Business Email?" (The State of Email
 * Infrastructure 2026), published 15 October 2026.
 *
 * The report itself is the 22 page images and the PDF, rendered from the design
 * canvas. The HTML above them carries the findings as text, so they can be read,
 * quoted and indexed without opening the PDF. Figures come from ./data.ts.
 *
 * Replaces the embargoed preview at /review/email-infrastructure-2026-preview-…,
 * which now redirects here (lib/legacy-redirects.ts).
 */

export const dynamic = "force-static";

const TITLE = `${REPORT.title} The State of Email Infrastructure 2026`;
const DESCRIPTION =
  `Hosting companies and other named providers run ${HEADLINES.namedProviders} of corporate mail domains. ` +
  `Among the largest companies, Microsoft leads Google ${HEADLINES.microsoftToGoogleTop1000} in MX records. The keyhole effect, measured.`;

export function generateMetadata(): Metadata {
  return {
    title: `${REPORT.title} — Datazag Insights`,
    description: DESCRIPTION,
    alternates: { canonical: reportUrl() },
    robots: { index: true, follow: true },
    openGraph: { type: "article", url: reportUrl(), title: TITLE, description: DESCRIPTION, siteName: "Datazag" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

const textLink = "font-semibold text-cyan-200 underline-offset-4 hover:underline";

export default function BusinessEmailReportPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: REPORT.title,
    alternativeHeadline: REPORT.series,
    description: DESCRIPTION,
    datePublished: REPORT.publishedOn,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: reportUrl(),
    about: ["Email infrastructure", "Mailbox providers", "DMARC", "Email security gateways"],
    encoding: { "@type": "MediaObject", contentUrl: `${REPORT.siteUrl}${REPORT_PDF}`, encodingFormat: "application/pdf" },
  };

  return (
    <div className="relative bg-[#030619] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero */}
      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
            Datazag Insights · Research · {researchDate(REPORT.publishedOn)}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{REPORT.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
            {REPORT.series}. The keyhole effect: how the email infrastructure of the world&apos;s largest companies compares
            with the wider internet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              href={REPORT_PDF}
              download
              event="report_download"
              params={{ report: REPORT.slug, location: "hero" }}
              className="rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#030619] hover:bg-cyan-200"
            >
              Download the PDF
            </TrackedLink>
            <a
              href="#report"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/40"
            >
              Read it on this page
            </a>
          </div>
        </div>
      </section>

      {/* Findings, as text */}
      <section className="border-b border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What we found</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Who runs corporate email depends almost entirely on where you look. Enterprise studies see the world&apos;s
            largest companies. This report also measures the domains around them. We call the gap between those two
            pictures the keyhole effect.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {FINDINGS.map((f, i) => (
              <li key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <p className="font-mono text-sm font-semibold text-cyan-300">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg font-semibold leading-7 text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{f.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-sm leading-6 text-slate-300">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">About the data</p>
            <p>
              Every figure counts domains, not organizations, mailboxes or messages, and every share names its
              population. Internet-wide figures are from the Datazag Observatory snapshot of {REPORT.snapshot}.
            </p>
            <p className="mt-2">
              Company figures cover the 2,000 largest listed companies by number of employees, ranked using data from{" "}
              <a href="https://companiesmarketcap.com/" className={textLink}>
                CompaniesMarketCap.com
              </a>{" "}
              (downloaded 12 October 2026). All company figures are Datazag aggregates; no company-level results are
              published.
            </p>
            <p className="mt-2">
              Charts may be reused with Datazag attribution. Current figures are in the{" "}
              <TrackedLink href={OBSERVATORY_URL} event="observatory_link_click" params={{ location: "report" }} className={textLink}>
                Datazag Observatory
              </TrackedLink>
              , updated daily.
            </p>
          </div>
        </div>
      </section>

      {/* The report */}
      <section id="report" className="scroll-mt-24 py-14 md:py-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-6 px-4 sm:px-6">
          <h2 className="sr-only">The full report</h2>
          {PAGES.map((label, i) => (
            <figure key={label} className="overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40">
              <Image
                src={pageImage(i + 1)}
                alt={`Page ${i + 1}: ${label}`}
                width={1588}
                height={2246}
                sizes="(max-width: 860px) 100vw, 860px"
                priority={i < 2}
                className="h-auto w-full"
              />
            </figure>
          ))}
          <div className="mt-6 text-center">
            <TrackedLink
              href={REPORT_PDF}
              download
              event="report_download"
              params={{ report: REPORT.slug, location: "end" }}
              className="text-sm font-semibold text-cyan-200 underline-offset-4 hover:underline"
            >
              Download the full report as a PDF
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Next step */}
      <section className="border-t border-white/10 py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-white">Go beyond the snapshot</h2>
              <p className="mt-2 text-slate-300">
                The Observatory publishes the aggregate figures free, updated daily. Domain-level data is available as
                datasets for your own warehouse.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={OBSERVATORY_URL}
                event="observatory_link_click"
                params={{ location: "report_end" }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300 px-6 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
              >
                Explore the Observatory
              </TrackedLink>
              <Link
                href="/datasets"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                See the datasets
              </Link>
            </div>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            More research: <Link href="/insights" className={textLink}>Datazag Insights</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
