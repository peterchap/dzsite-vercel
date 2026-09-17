/**
 * COMMITTED FALLBACK CONTENT for dataset documentation pages.
 *
 * WHY THIS FILE EXISTS
 *   /datasets/<slug> is the documentation URL submitted with a cloud
 *   marketplace listing. A listing is long-lived and its documentation link is
 *   not something we can revise quickly once buyers are on it. If the page
 *   were CMS-only, an unpublished document, a bad deploy of the dataset, or a
 *   Sanity outage would turn a live listing's documentation link into a 404.
 *
 *   So the CMS is the EDITING surface, not the only source. When Sanity
 *   returns a document for a slug, that document wins in full. When it does
 *   not, the page renders from here and stays up.
 *
 * WHAT BELONGS HERE
 *   Only datasets whose URL has been handed to a marketplace. This is a safety
 *   net for a durable public URL, not a second content system — a dataset that
 *   has not been submitted anywhere does not need an entry, and adding one for
 *   every dataset would give editors two places to edit and one of them wrong.
 *
 * FIGURES
 *   Same rule as everywhere else: no figure is typed here either. Copy uses
 *   {{DOMAINS}} / {{IPV4}} / {{ASNS}} / {{IPS_HOSTING}} tokens, resolved from
 *   lib/site-stats.ts at render time (see ./stat-tokens.ts).
 *
 * SCHEMA
 *   SHIPPED COLUMNS ONLY. The source of truth is centralake/config.py
 *   PRODUCTS[<key>].fields, which the export is checked against. Copy column
 *   names and meanings from there, not from a brief. Do not add a column here
 *   before it ships.
 */
import type { DatasetDoc } from "./types";

// 2026-09-15: corrected to centralake PRODUCTS["A"] (publish.ip_prefix_asn, 11 columns).
// Earlier copy documented asn_name, asn_org and asn_type. None of them ship: asn_type was
// never built, and the two name columns were collapsed into `isp`. See
// centralake/ICEBERG-PIPELINE-handback.md §2.
const IP_ASN_INTELLIGENCE: DatasetDoc = {
  title: "IP to ASN Intelligence",
  slug: "ip-asn-intelligence",
  eyebrow: "Dataset documentation · Free",
  summary:
    "Map any IPv4 address to its network prefix, autonomous system, operator, and registry country. Integer range-bound join keys, refreshed daily.",
  overview: [
    "Maps any IPv4 address to its network prefix, the autonomous system (ASN) announcing it, and the operator of that network. Each range also carries the country the registry records for its address block, and a coarse reputation band.",
    "Ships with integer range-bound join keys, so the lookup is an ordinary range join in your warehouse — no UDFs, no external calls, no per-row API cost.",
    "Natively built by Datazag. License-clean for redistribution, and refreshed daily.",
    "Coverage is IPv4, and it is complete: every ASN announcing routes on the public internet is profiled — all {{ASNS}} of them. There is no sampled subset and no long tail left out, so a lookup that returns nothing means the address is unannounced, not that we are missing the network.",
    "Datazag observes {{DOMAINS}} live domains daily across those networks; this dataset is the IP-to-ASN layer of that corpus.",
  ],
  facts: [
    { label: "Coverage", value: "IPv4" },
    { label: "Refresh", value: "Daily" },
    {
      label: "ASNs profiled",
      value: "{{ASNS}}",
      // The claim is completeness against ROUTED ASNs — every AS announcing
      // routes. It is deliberately not "every ASN ever allocated": roughly
      // 120k have been allocated, and the dormant ones announce no address
      // space, so they have nothing for this dataset to map.
      note: "Every ASN announcing routes — none missing",
    },
    { label: "License", value: "Clean for redistribution" },
  ],
  tableName: "ip_prefix_asn",
  columns: [
    {
      name: "ip_start_int",
      type: "BIGINT",
      description:
        "First address of the range as an unsigned 32-bit integer. The range includes both endpoints.",
      isJoinKey: true,
    },
    {
      name: "ip_end_int",
      type: "BIGINT",
      description: "Last address of the range as an unsigned 32-bit integer, inclusive.",
      isJoinKey: true,
    },
    { name: "asn", type: "BIGINT", description: "Autonomous System Number announcing this range." },
    {
      name: "prefix",
      type: "VARCHAR",
      description: "The range in CIDR notation, for example 98.125.248.0/22.",
    },
    {
      name: "isp",
      type: "VARCHAR",
      description:
        "Name of the organization operating the autonomous system. NULL where the registry publishes only an opaque handle, not a usable name.",
    },
    {
      name: "country",
      type: "VARCHAR",
      description:
        "ISO 3166-1 alpha-2 country the Regional Internet Registry records for the address block containing this range, where the block's holder is registered. Where that block carries no country, the announcing autonomous system's registry country is used. Not a geolocation of the addresses, and it can differ between ranges announced by the same autonomous system. RIPE NCC records a few EU-wide blocks as EU.",
    },
    {
      name: "reputation_flag",
      type: "VARCHAR",
      description:
        "Coarse reputation band for the announcing AS: clean, watch, or risky. NULL where the AS has no reputation record — absence is never reported as clean.",
    },
    {
      name: "ipv4_only",
      type: "BOOLEAN",
      description: "Always true. This dataset covers IPv4 ranges only.",
    },
    {
      name: "snapshot_date",
      type: "DATE",
      description:
        "The date this row was built. Every row in a release carries the same date, so you can pin to a snapshot.",
    },
    { name: "tier", type: "VARCHAR", description: "Distribution tier. Always free in this dataset." },
    {
      name: "data_completeness",
      type: "VARCHAR",
      description:
        "Per-row JSON recording, for each optional signal, whether it was observed or not observed for this range.",
    },
  ],
  schemaNote:
    "The ip_start_int / ip_end_int range-bound naming matches the MaxMind and IPinfo convention, so this drops into join code you already have.",
  joinGuideTitle: "Join guide",
  joinGuideIntro:
    "Every row covers a contiguous range of addresses, bounded by two integers. Convert your IP to an integer once, then range-join. Announced prefixes can nest — a smaller prefix inside a larger one — so one address can match more than one row. Use the second query when you want exactly one row per address.",
  codeExamples: [
    {
      title: "Enrich your events with ASN, operator, and reputation",
      description:
        "The integer range join. Bound comparisons on both sides let the optimizer prune, which a BETWEEN scan over dotted strings cannot. Returns every range that contains the address.",
      language: "sql",
      code: `SELECT e.*, d.prefix, d.asn, d.isp, d.country, d.reputation_flag
FROM your_events e
JOIN ip_prefix_asn d
  ON e.ip_int >= d.ip_start_int AND e.ip_int <= d.ip_end_int;`,
    },
    {
      title: "One row per address: the most specific prefix wins",
      description:
        "Where prefixes nest, keep the narrowest range, which is the most specific route for that address.",
      language: "sql",
      code: `SELECT e.*, d.prefix, d.asn, d.isp, d.country, d.reputation_flag
FROM your_events e
JOIN ip_prefix_asn d
  ON e.ip_int >= d.ip_start_int AND e.ip_int <= d.ip_end_int
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY e.ip_int
  ORDER BY d.ip_end_int - d.ip_start_int
) = 1;`,
      note: "QUALIFY works in Snowflake and Databricks SQL. Elsewhere, wrap the join in a subquery and filter on the row number.",
    },
    {
      title: "Convert a dotted IPv4 address to the integer join key",
      description:
        "Run this once over your side of the join and store the result. Do not compute it per query.",
      language: "sql",
      code: `SELECT ip,
  (SPLIT_PART(ip,'.',1)*16777216 + SPLIT_PART(ip,'.',2)*65536
 + SPLIT_PART(ip,'.',3)*256 + SPLIT_PART(ip,'.',4)) AS ip_int
FROM your_ips;`,
      note: "The four terms are the octets weighted by 256^3, 256^2, 256, and 1 — the standard unsigned 32-bit representation.",
    },
  ],
  methodology: [
    {
      title: "How isp is chosen",
      body: "isp is the operator name published for the network. Where the routing data holds only a placeholder such as AS followed by a number, we fall back to the registry record. Where neither holds a usable name, isp is NULL rather than a placeholder.",
      tone: "neutral",
    },
    {
      title: "country is the registry country of the address block",
      body: "country is the country the Regional Internet Registry records for the address block that contains the range: where the block's holder is registered. One autonomous system can announce blocks registered in several countries, so country can differ between its ranges. It is not the location of the addresses. Do not use it as IP geolocation.",
      tone: "caveat",
    },
    {
      title: "reputation_flag is a signpost, not a score",
      body: "Three states — clean, watch, risky — deliberately coarse. It tells you where to look. It is not calibrated, carries no confidence value, and should not be thresholded as if it were a score. A NULL means we hold no reputation record for the network; it does not mean clean.",
      tone: "caveat",
    },
  ],
  relatedDatasets: [
    {
      title: "ASN Reputation",
      slug: "asn-reputation",
      summary:
        "Reason-coded ASN and prefix reputation: routing hygiene, abuse density, and confidence. The calibrated version of reputation_flag.",
      unpublished: true,
    },
  ],
  changelog: [
    {
      date: "2026-09-17",
      summary:
        "country is now described as the registry country of each range's address block, which can differ between ranges of the same autonomous system. It was previously described as the autonomous system's registration country, which was inaccurate. isp no longer carries bare AS-number handles; where no usable name exists it is NULL.",
    },
    {
      date: "2026-09-16",
      summary: "Available on Snowflake Marketplace as a free listing.",
    },
    {
      date: "2026-09-15",
      summary:
        "Documentation corrected to the shipped schema. Removed asn_name, asn_org, and asn_type, which the dataset does not include; the operator name is in isp. Added ipv4_only, tier, and data_completeness, and a join for nested prefixes.",
    },
    {
      date: "2026-08-28",
      summary:
        "Initial release. IPv4 coverage with prefix, ASN, operator name, registration country, and reputation_flag. Daily refresh.",
    },
  ],
  listingUrl: "https://app.snowflake.com/marketplace/listing/GZSVZ1AUFU0",
  listingLabel: "Get it on Snowflake Marketplace",
  contactNote:
    "Need it somewhere other than Snowflake? Ask us about other delivery modes.",
  order: 10,
};

/**
 * Keyed by slug. A slug in here is a URL we have promised to keep alive.
 */
export const DATASET_FALLBACKS: Record<string, DatasetDoc> = {
  [IP_ASN_INTELLIGENCE.slug]: IP_ASN_INTELLIGENCE,
};

export function getDatasetFallback(slug: string): DatasetDoc | null {
  return DATASET_FALLBACKS[slug] ?? null;
}

export const FALLBACK_SLUGS: string[] = Object.keys(DATASET_FALLBACKS);
