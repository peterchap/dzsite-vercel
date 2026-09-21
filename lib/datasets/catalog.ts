/**
 * DATASET CATALOG — the manifest behind the /datasets index.
 *
 * One entry per data product. Flipping a route live, or adding a dataset, is an
 * edit to this file and nothing else: the card on /datasets renders from it.
 *
 * ACCESS MODEL
 *   Every dataset is served directly from R2, over two routes:
 *     - marketplace — Databricks / Snowflake, materialized from the R2 artifact.
 *                     Live only once the listing clears review.
 *     - portal      — the Datazag customer portal (direct R2 / DuckDB). Does not
 *                     wait on marketplace review, so it is often live first.
 *   Availability is PER ROUTE. A dataset reads "Available" when at least one
 *   route is live, and never otherwise.
 *
 * HONESTY RULES (enforced at module load — a violation fails the build)
 *   - A route is `available` only when it is actually live. Do not flip it early.
 *   - An entry with `holdReason` may not have ANY route available. That is how
 *     ASN Reputation (scoring not sound) and Provider Intelligence (readiness
 *     unconfirmed) are kept from being shown as available by an editing slip.
 *   - A marketplace route marked available must carry the listing URL.
 *
 * FIGURES
 *   No figure is typed here. `coverage` names a key of DISPLAY_STATS in
 *   lib/site-stats.ts — the same projection the Observatory, provider profile
 *   and doc pages read — and the card renders that value with its own as-of.
 *   A dataset with no matching figure in the store shows no figure. Do not
 *   borrow a nearby number to fill the space.
 */
import type { DISPLAY_STATS } from "@/lib/site-stats";

export type StatKey = keyof typeof DISPLAY_STATS;

export type RouteStatus =
  | { status: "available"; url: string; label?: string }
  | { status: "coming-soon" };

export type CatalogEntry = {
  /** Durable slug. Doubles as the /datasets/<slug> path when a doc page exists. */
  slug: string;
  name: string;
  description: string;
  tier: "Free" | "Paid" | "Free and paid";
  /** Canonical figures for this dataset, read from lib/site-stats.ts. */
  coverage?: { stat: StatKey; label: string }[];
  /** Views folded into this dataset rather than listed on their own. */
  includes?: string[];
  routes: {
    marketplace: RouteStatus;
    portal: RouteStatus;
  };
  /** Set while the dataset must not be shown as available on any route. */
  holdReason?: string;
  order: number;
};

// To flip a route live:
//   portal: { status: "available", url: process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.datazag.com" }
//   marketplace: { status: "available", url: "<listing URL>" }
const COMING_SOON: RouteStatus = { status: "coming-soon" };

export const DATASET_CATALOG: CatalogEntry[] = [
  {
    slug: "ip-asn-intelligence",
    name: "IP to ASN Intelligence",
    description:
      "Map any IPv4 address to its prefix, autonomous system, operator, and registry country. Refreshed daily.",
    tier: "Free",
    coverage: [
      { stat: "networksProfiled", label: "ASNs profiled" },
      { stat: "ipv4Indexed", label: "IPv4 addresses indexed" },
    ],
    // 2026-09-16: Snowflake Marketplace listing approved and published. Portal path not live yet.
    routes: {
      marketplace: {
        status: "available",
        url: "https://app.snowflake.com/marketplace/listing/GZSVZ1AUFU0",
        label: "Snowflake Marketplace",
      },
      portal: COMING_SOON,
    },
    order: 10,
  },
  {
    slug: "domain-posture",
    name: "Domain Posture & Intelligence",
    // 2026-09-21: was "Security and mail posture for each domain, with the DNS and
    // hosting context behind it", and listed a "Mail records and remediation view".
    // Neither ships. The dataset carries email-authentication records and one mail
    // hostname; it carries no ASN, prefix, IP or provider column, so there is no
    // hosting context in it, and the remediation view (C1) is designed and not built.
    // A buyer reading the old line would have expected two products that do not exist.
    description:
      "What each domain publishes for email authentication and transport security — " +
      "SPF, DMARC, MTA-STS, DNSSEC and BIMI — and what those records actually say.",
    // True as of 2026-09-21 (centralake#74): B is tiered by COLUMN. Every domain is in
    // the free tier; the paid tier adds columns, not rows. Until then `tier` was 'paid'
    // on all 263M rows while this card said "Free and paid".
    tier: "Free and paid",
    // No coverage figure. B is built from gold.posture_current, a rolling
    // backfill (44% of the domain corpus on 2026-08-31), so the corpus figure
    // would overstate it. Add one when the stats feed publishes a posture count.
    // 2026-09-15: portal access not confirmed, and publish.domain_intel is not exported yet.
    routes: { marketplace: COMING_SOON, portal: COMING_SOON },
    order: 20,
  },
  {
    slug: "email-suppression",
    name: "Email Suppression & List Cleaning",
    description:
      "Clean mailing lists before you send, using Datazag's live domain data. Built for email service providers.",
    tier: "Paid",
    // 2026-09-15: no domain-grain suppression table exists yet. do_not_mail lives on
    // intel.mx_intel at mail-server grain; the per-domain column is proposed, not built.
    routes: { marketplace: COMING_SOON, portal: COMING_SOON },
    order: 30,
  },
  {
    slug: "provider-intelligence",
    name: "Provider Intelligence",
    description: "Profiles of the hosting, mail, and DNS providers that domains depend on.",
    tier: "Paid",
    routes: { marketplace: COMING_SOON, portal: COMING_SOON },
    holdReason: "Readiness check has not passed.",
    order: 40,
  },
  {
    slug: "asn-reputation",
    name: "ASN Reputation",
    description:
      "Reason-coded ASN and prefix reputation: routing hygiene, abuse density, and confidence.",
    tier: "Paid",
    routes: { marketplace: COMING_SOON, portal: COMING_SOON },
    holdReason: "Scoring is not yet sound enough to publish.",
    order: 50,
  },
];

export function isAvailable(entry: CatalogEntry): boolean {
  return Object.values(entry.routes).some((r) => r.status === "available");
}

// ---- Build-time assertions ------------------------------------------------
{
  const seen = new Set<string>();
  for (const entry of DATASET_CATALOG) {
    if (seen.has(entry.slug)) {
      throw new Error(`dataset catalog: duplicate slug "${entry.slug}".`);
    }
    seen.add(entry.slug);

    if (entry.holdReason && isAvailable(entry)) {
      throw new Error(
        `dataset catalog: "${entry.slug}" is on hold (${entry.holdReason}) but has a route ` +
          `marked available. Clear holdReason only when the hold is actually resolved.`,
      );
    }
    const mkt = entry.routes.marketplace;
    if (mkt.status === "available" && !/^https:\/\//.test(mkt.url)) {
      throw new Error(
        `dataset catalog: "${entry.slug}" marketplace route is available with no listing URL.`,
      );
    }
  }
}
