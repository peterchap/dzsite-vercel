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
 *   SHIPPED COLUMNS ONLY. This block documents what is in the share today. Do
 *   not add a column here before it ships.
 */
import type { DatasetDoc } from "./types";

const IP_ASN_INTELLIGENCE: DatasetDoc = {
  title: "IP to ASN Intelligence — with Infrastructure Classification",
  slug: "ip-asn-intelligence",
  eyebrow: "Dataset documentation · Free",
  summary:
    "Map any IPv4 address to its network prefix, autonomous system, operator, and infrastructure type. Integer range-bound join keys, refreshed daily.",
  overview: [
    "Maps any IPv4 address to its network prefix, autonomous system (ASN), and operator, enriched with an infrastructure type classification: cloud, hosting, CDN, ISP, or enterprise.",
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
  tableName: "DATAZAG_IP_ASN",
  columns: [
    {
      name: "ip_start_int",
      type: "NUMBER",
      description: "Start of the IP range, unsigned integer.",
      isJoinKey: true,
    },
    {
      name: "ip_end_int",
      type: "NUMBER",
      description: "End of the IP range, unsigned integer.",
      isJoinKey: true,
    },
    { name: "prefix", type: "VARCHAR", description: "CIDR prefix, e.g. 98.125.248.0/22." },
    { name: "asn", type: "NUMBER", description: "Autonomous System Number." },
    { name: "asn_name", type: "VARCHAR", description: "Operator name for the ASN." },
    { name: "asn_org", type: "VARCHAR", description: "Registered organization for the ASN." },
    { name: "country", type: "VARCHAR", description: "ISO country code for the allocation." },
    {
      name: "asn_type",
      type: "VARCHAR",
      description: "Infrastructure classification: cloud / hosting / cdn / isp / enterprise.",
    },
    {
      name: "reputation_flag",
      type: "VARCHAR",
      description:
        "Coarse infrastructure-risk indicator: clean / watch / risky. An indicator only, not a calibrated score.",
    },
    { name: "snapshot_date", type: "DATE", description: "Date the row was produced (daily refresh)." },
  ],
  schemaNote:
    "The START_IP_INT / END_IP_INT range-bound naming matches the MaxMind and IPinfo convention, so this drops into join code you already have.",
  joinGuideTitle: "Join guide",
  joinGuideIntro:
    "Every row covers a contiguous range of addresses, bounded by two integers. Convert your IP to an integer once, then range-join. This is the whole integration.",
  codeExamples: [
    {
      title: "Enrich your events with ASN and infrastructure type",
      description:
        "The integer range join. Bound comparisons on both sides let the optimizer prune, which a BETWEEN scan over dotted strings cannot.",
      language: "sql",
      code: `SELECT e.*, d.asn, d.asn_name, d.asn_type, d.reputation_flag
FROM your_events e
JOIN DATAZAG_IP_ASN d
  ON e.ip_int >= d.ip_start_int AND e.ip_int <= d.ip_end_int;`,
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
      title: "How asn_type is derived",
      body: "asn_type comes from authoritative provider ranges plus Datazag classification. Large named providers are individually attributed; the long tail is bucketed by type.",
      tone: "neutral",
    },
    {
      title: "CDN caveat",
      body: "For CDN-fronted ranges, the classification reflects the internet-facing provider, which may differ from the origin host. An address classified as cdn tells you who serves the traffic, not who runs the application behind it.",
      tone: "caveat",
    },
    {
      title: "reputation_flag is a signpost, not a score",
      body: "Three states — clean, watch, risky — deliberately coarse. It tells you where to look. It is not calibrated, carries no confidence value, and should not be thresholded as if it were a score. Full reason-coded ASN and prefix reputation (routing hygiene, abuse density, confidence) is in the paid ASN Reputation dataset.",
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
      date: "2026-08-28",
      summary:
        "Initial release. IPv4 coverage with prefix, ASN, operator, country, asn_type classification, and reputation_flag. Daily refresh.",
    },
  ],
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
