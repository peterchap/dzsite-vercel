/**
 * RESEARCH ON THE MAIN SITE — the one list of published research pieces.
 *
 * Research pages are code (app/(marketing)/intelligence/<slug>), not Sanity
 * blog posts, so /blog could not see them: on 2026-10-01 the first post went
 * live and /blog still said "No articles published yet". Every surface that
 * lists research reads this array: /blog (the one listing; /intelligence
 * 301s there), the sitemap and llms.txt. Add a piece here in the same PR that adds its page.
 *
 * ONLY LIVE PIECES. An entry is a link a visitor can follow, so it goes in
 * when its page ships, never ahead of it.
 *
 * Mirrors the Observatory's registry (datazag-observatory src/lib/research.ts),
 * which lists the same pieces from its side. The rhythm both follow is
 * docs/research-cadence.md in that repo.
 */
export type ResearchKind = "Research" | "Case study" | "Guide";

export interface ResearchPiece {
  slug: string;
  /** The finding, with its number. */
  title: string;
  /** One or two sentences on what the piece shows. */
  summary: string;
  /** ISO date published. */
  publishedOn: string;
  kind: ResearchKind;
  /** Where the piece lives, when it is not /intelligence/<slug> (guides live under /resources). */
  href?: string;
}

export const RESEARCH: readonly ResearchPiece[] = [
  {
    slug: "dmarc-adoption-vs-protection",
    title: "25.3% of domains publish DMARC. Only 13.1% enforce it.",
    summary:
      "A census of resolving, unparked domains: about half of DMARC publishers only report spoofing. Among domains that run mail, report-only outnumbers enforcement two to one.",
    publishedOn: "2026-10-15",
    kind: "Research",
  },
  {
    slug: "machine-clicks",
    title: "Classify machine clicks in your own traffic",
    summary:
      "Security products open links before people do. Four signals separate those requests from human clicks, and the hidden link confirms them.",
    publishedOn: "2026-10-02",
    kind: "Guide",
    href: "/resources/machine-clicks",
  },
  {
    slug: "corporate-domain-stack",
    title: "One company runs the nameservers, website and mail for 1 in 5 corporate domains",
    summary:
      "The correlated exposure is the registrar-and-hosting bundle, not the CDN. It is national: two in five corporate domains in Germany and France.",
    publishedOn: "2026-10-01",
    kind: "Research",
  },
  {
    slug: "one-signal-150-domains",
    title: "One signal, 150 domains",
    summary:
      "One certificate led to a 150-domain malicious hosting cluster that was in no public domain feed, and how Datazag followed it to the whole operation.",
    publishedOn: "2026-07-14",
    kind: "Case study",
  },
];

export const researchHref = (p: ResearchPiece) => p.href ?? `/intelligence/${p.slug}`;

/** Newest first. */
export function latestResearch(limit?: number): ResearchPiece[] {
  const sorted = [...RESEARCH].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  return limit ? sorted.slice(0, limit) : sorted;
}

/** "1 October 2026" */
export function researchDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
