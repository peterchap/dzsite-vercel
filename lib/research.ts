/**
 * DATAZAG INSIGHTS — the one list of published research pieces.
 *
 * Insights pages are code (app/(marketing)/insights/<slug>), not Sanity blog
 * posts. Every surface that lists them reads this array: /insights (the one
 * listing), the sitemap and llms.txt. Add a piece here in the same PR that
 * adds its page.
 *
 * ONE HOME PER PIECE (2026-10-11 brand structure). Findings from the data go
 * here, in Insights. How Datazag is built goes to the Engineering blog (/blog,
 * Sanity blog posts). Never list the same piece in both.
 *
 * History: research lived at /intelligence/<slug> and was listed on /blog until
 * 2026-10-11. Both old paths 301 here (lib/legacy-redirects.ts).
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
  /** Where the piece lives, when it is not /insights/<slug> (guides live under /resources). */
  href?: string;
}

export const RESEARCH: readonly ResearchPiece[] = [
  {
    slug: "who-really-runs-business-email",
    title: "Who Really Runs Business Email? Hosts and other named providers run 53.8% of corporate mail domains",
    summary:
      "The State of Email Infrastructure 2026. Among the largest companies, Microsoft leads Google 9 : 1 in MX records. Across corporate mail domains the two are level, and DMARC enforcement falls from 73.3% to 14.2%.",
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

export const researchHref = (p: ResearchPiece) => p.href ?? `/insights/${p.slug}`;

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
