/**
 * RESEARCH ON THE MAIN SITE — the one list of published research pieces.
 *
 * Research pages are code (app/(marketing)/intelligence/<slug>), not Sanity
 * blog posts, so /blog could not see them: on 2026-10-01 the first post went
 * live and /blog still said "No articles published yet". Every surface that
 * lists research reads this array: /intelligence, /blog, the sitemap and
 * llms.txt. Add a piece here in the same PR that adds its page.
 *
 * ONLY LIVE PIECES. An entry is a link a visitor can follow, so it goes in
 * when its page ships, never ahead of it.
 *
 * Mirrors the Observatory's registry (datazag-observatory src/lib/research.ts),
 * which lists the same pieces from its side. The rhythm both follow is
 * docs/research-cadence.md in that repo.
 */
export type ResearchKind = "Research" | "Case study";

export interface ResearchPiece {
  slug: string;
  /** The finding, with its number. */
  title: string;
  /** One or two sentences on what the piece shows. */
  summary: string;
  /** ISO date published. */
  publishedOn: string;
  kind: ResearchKind;
}

export const RESEARCH: readonly ResearchPiece[] = [
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

export const researchHref = (p: ResearchPiece) => `/intelligence/${p.slug}`;

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
