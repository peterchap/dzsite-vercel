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
        "Coarse reputation band: clean, watch, or risky. A teaser indicator, not a calibrated score. Large shared networks such as cloud, CDN, and hosting providers are assessed on abuse observed on the specific range rather than flagged wholesale. NULL where not assessed — absence is never reported as clean.",
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
    "The ip_start_int / ip_end_int range-bound naming matches the MaxMind and IPinfo convention, so this drops into join code you already have. On Snowflake the share holds this one table in a schema called free, so qualify it as your_database.free.ip_prefix_asn or set your context first. The three integer columns arrive there as NUMBER(19,0) and the text columns as VARCHAR.",
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
      body: "Three states — clean, watch, risky — deliberately coarse. It tells you where to look. It is not calibrated, carries no confidence value, and should not be thresholded as if it were a score. Large shared networks such as cloud, CDN, and hosting providers are judged on abuse observed on the specific range, so a major provider is not flagged wholesale for abuse elsewhere on its network. A NULL means the range or network has not been assessed; it does not mean clean.",
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
        "reputation_flag no longer flags large shared networks wholesale: cloud, CDN, and hosting providers are assessed on abuse observed on the specific range. Smaller networks are still assessed as a whole.",
    },
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

// 2026-09-24: centralake PRODUCTS["B"] (publish.domain_intel, 23 columns), read off the
// built table rather than a brief. B is not on a marketplace yet — the rule at the top of
// this file says only submitted datasets belong here, and this is the one case that earns
// an exception: the free IP-to-ASN listing was REJECTED once for
// LISTING_PRACTICES_LINKS_DOCS because its documentation link did not resolve to
// documentation. The page has to be live before the listing is submitted, not after.
//
// Three columns moved the same morning (centralake#74, #75): mta_sts_mode was dropped at
// 99.95% NULL, first_seen_at became posture_first_seen_at, and dmarc_pct became effective
// rather than raw. Anything written before that date describes a schema that no longer
// ships.
const DOMAIN_POSTURE: DatasetDoc = {
  title: "Domain Posture & Intelligence",
  slug: "domain-posture",
  eyebrow: "Dataset documentation · Free and paid",
  summary:
    "What every domain publishes for email authentication and transport security — SPF, DMARC, MTA-STS, DNSSEC and BIMI — and what those records actually say. One row per registrable domain.",
  overview: [
    "One row per registrable domain, carrying the email-authentication and transport-security records that domain publishes in DNS, and what each record says. Not whether a domain looks secure — what it has actually published, read from the live record.",
    "The distinction that makes it useful is between publishing a control and enforcing one. A domain can publish DMARC and ask receivers to do nothing about failures. This dataset separates the two: dmarc_present says a record exists, dmarc_policy and dmarc_enforced say whether it does anything. The same split runs through SPF, MTA-STS and BIMI.",
    "The free tier is the whole estate, not a sample. Every domain we have observed is in it, with 18 of the 23 columns. The paid tier adds five columns of depth on the same rows — it does not add domains.",
    "Observed by Datazag from public DNS. No third-party feed is redistributed through it, and every release passes an automated licensing gate that scans each published value before it leaves our boundary.",
    "Datazag observes {{DOMAINS}} live domains daily; this dataset is the posture layer of that corpus.",
  ],
  facts: [
    { label: "Grain", value: "One row per registrable domain" },
    { label: "Refresh", value: "Daily" },
    {
      label: "Free tier",
      value: "18 of 23 columns",
      note: "Every domain, not a sample — paid adds columns, not rows",
    },
    { label: "License", value: "Clean for redistribution" },
  ],
  tableName: "domain_intel",
  columns: [
    {
      name: "domain",
      type: "VARCHAR",
      description: "The registrable domain this row describes. Unique across the table.",
      isJoinKey: true,
    },
    {
      name: "spf_present",
      type: "BOOLEAN",
      description: "Whether the domain publishes an SPF record.",
    },
    {
      name: "spf_qualifier",
      type: "VARCHAR",
      description:
        "How the domain's SPF record treats senders it does not list: -all rejects them, ~all marks them soft-fail, ?all is neutral, +all permits anyone, and no-all means the record ends without an all mechanism. Empty where no SPF record was published, or where the record ended in something we could not read as a valid qualifier.",
    },
    {
      name: "spf_include_count",
      type: "INTEGER",
      description:
        "Paid tier. How many include: mechanisms the SPF record chains to. SPF permits at most 10 DNS lookups, so a high count is a sign the record is close to failing.",
    },
    {
      name: "dmarc_present",
      type: "BOOLEAN",
      description: "Whether the domain publishes a DMARC record.",
    },
    {
      name: "dmarc_policy",
      type: "VARCHAR",
      description:
        "The action the domain asks receivers to take on mail that fails DMARC: none, quarantine or reject. Empty where no valid policy was published — an unrecognised p= is invalid under RFC 7489, and we do not guess an intent the domain never declared.",
    },
    {
      name: "dmarc_enforced",
      type: "BOOLEAN",
      description:
        "Whether the DMARC policy is actually enforcing, rather than published in monitor-only mode. This is the column to filter on when you want domains that are protected rather than domains that have a record.",
    },
    {
      name: "dmarc_rua",
      type: "BOOLEAN",
      description:
        "Paid tier. Whether the DMARC record requests aggregate reports, which indicates the owner is monitoring results rather than publishing and forgetting.",
    },
    {
      name: "dmarc_pct",
      type: "INTEGER",
      description:
        "Paid tier. The percentage of failing mail the domain asks receivers to apply its policy to. Below 100 the policy is only partially applied. A DMARC record that omits this value is applying its policy in full, and is published here as 100; this is empty only where there is no DMARC record at all.",
    },
    {
      name: "mta_sts",
      type: "BOOLEAN",
      description:
        "Whether the domain publishes an MTA-STS policy, which asks senders to require TLS when delivering to it.",
    },
    {
      name: "dnssec",
      type: "BOOLEAN",
      description: "Whether the domain is signed with DNSSEC.",
    },
    {
      name: "tlsrpt_present",
      type: "BOOLEAN",
      description:
        "Whether the domain publishes a TLS-RPT record requesting reports about delivery failures over TLS.",
    },
    {
      name: "bimi_present",
      type: "BOOLEAN",
      description:
        "Whether the domain publishes a BIMI record, used to display a brand logo in supporting mail clients.",
    },
    {
      name: "bimi_has_vmc",
      type: "BOOLEAN",
      description:
        "Paid tier. Whether that BIMI record references a Verified Mark Certificate, the stronger form that requires the trademark to have been verified.",
    },
    {
      name: "is_parked",
      type: "BOOLEAN",
      description:
        "Whether the domain appears to be parked rather than in active use. This is our assessment from the domain's DNS configuration on the snapshot date, not a fact the domain publishes, and the indicators behind it are maintained over time.",
    },
    {
      name: "primary_mx_host",
      type: "VARCHAR",
      description:
        "The hostname of the domain's primary mail exchanger, where it publishes one. A hostname only — this dataset carries no ASN, prefix or provider column.",
    },
    {
      name: "mail_provider",
      type: "VARCHAR",
      description:
        "The company that operates the domain's inbound mail, where we can identify it. This is the operator of the mail service rather than the domain's owner: a domain running its own mail on rented infrastructure is attributed to the service running it. Empty where the domain publishes no mail exchanger, or publishes one we could not attribute — mail_provider_source says which.",
    },
    {
      name: "mail_provider_source",
      type: "VARCHAR",
      description:
        "How the mail provider was determined: catalog where it comes from our curated matching rules, reverse_dns where it was inferred from the mail host's reverse DNS record. A reverse DNS inference names the infrastructure the mail runs on, which is usually but not always the same company as the mail operator. Where no provider is given this says why: unattributed if the domain publishes a mail exchanger we could not name, no_mx_published if it publishes none at all.",
    },
    {
      name: "posture_first_seen_at",
      type: "TIMESTAMP",
      description:
        "When we first observed this domain's email posture. Posture capture began on 2026-08-20, so no value precedes that date. It is not the domain's registration date and not the first time the domain existed.",
    },
    {
      name: "last_observed_at",
      type: "TIMESTAMP WITH TIME ZONE",
      description:
        "When this posture was last observed, in UTC. Domains are re-observed on a rolling basis, so this varies across rows within a single release.",
    },
    {
      name: "snapshot_date",
      type: "DATE",
      description:
        "The date this row was built. Every row in a release carries the same date, so you can pin an analysis to a snapshot.",
    },
    {
      name: "tier",
      type: "VARCHAR",
      description:
        "Distribution tier this row belongs to. Every row is in the free tier; the paid tier adds columns, not rows.",
    },
    {
      name: "data_completeness",
      type: "VARCHAR",
      description:
        "Paid tier. Records, per signal, whether the domain published a value we could read, published nothing, or published something that could not be parsed. Most domains do not publish DMARC, SPF or MTA-STS at all, and that absence is a finding rather than a gap in our observation.",
    },
  ],
  schemaNote:
    "18 of these 23 columns are in the free tier, on every domain. The five marked Paid tier — spf_include_count, dmarc_rua, dmarc_pct, bimi_has_vmc and data_completeness — are the correctness layer: how close an SPF record is to its lookup limit, whether the owner is collecting reports, how much of the policy is actually applied, whether the BIMI mark is verified, and what we could and could not read per signal. The paid tier adds no domains.",
  joinGuideTitle: "Join guide",
  joinGuideIntro:
    "The grain is the registrable domain and it is unique, so this is a plain equi-join against your own domain list. Normalize your side to the registrable domain first — a row for mail.example.com will not match, because the table keys on example.com.",
  codeExamples: [
    {
      title: "Which of your domains publish DMARC but do not enforce it",
      description:
        "The gap this dataset exists to show: a record is published, and it asks receivers to do nothing.",
      language: "sql",
      code: `SELECT d.domain,
       p.dmarc_policy,
       p.spf_qualifier
FROM   your_domains d
JOIN   domain_intel p USING (domain)
WHERE  p.dmarc_present
  AND  NOT p.dmarc_enforced
ORDER  BY d.domain;`,
      note: "dmarc_enforced is the column to filter on. dmarc_present only says a record exists.",
    },
    {
      title: "Score an acquisition target's estate in one pass",
      description: "Counts of what is published against what is enforced, across a domain list.",
      language: "sql",
      code: `SELECT count(*)                                   AS domains,
       count(*) FILTER (WHERE spf_present)      AS with_spf,
       count(*) FILTER (WHERE dmarc_present)    AS with_dmarc,
       count(*) FILTER (WHERE dmarc_enforced)   AS enforcing_dmarc,
       count(*) FILTER (WHERE dnssec)           AS signed,
       count(*) FILTER (WHERE mta_sts)          AS with_mta_sts
FROM   domain_intel
JOIN   your_domains USING (domain);`,
      note: "Every column here is in the free tier.",
    },
    {
      title: "Exclude parked domains before you count",
      description:
        "Parked domains depress every posture rate, and they are rarely what the question is about.",
      language: "sql",
      code: `SELECT count(*) FILTER (WHERE dmarc_enforced) * 100.0 / count(*) AS pct_enforcing
FROM   domain_intel
WHERE  NOT is_parked;`,
      note: "is_parked is our assessment from DNS configuration, not a declaration by the domain.",
    },
  ],
  methodology: [
    {
      title: "A domain that is absent has not been observed yet",
      body: "Posture is captured by a rolling backfill that began on 2026-08-20 and is still working through the corpus. A domain missing from a release has not been observed yet — it does NOT mean the domain publishes nothing. Do not treat absence as a finding, and do not compute a percentage against your own list without accounting for the rows that are not there. last_observed_at and snapshot_date let you measure the coverage of any release yourself rather than taking a number from us.",
      tone: "caveat",
    },
    {
      title: "Published is not enforced",
      body: "Every control here is split between whether a record exists and what it says, because the two answer different questions. dmarc_present is true for a domain whose policy is p=none, which asks receivers to take no action at all. spf_qualifier distinguishes a record ending in -all from one ending in ?all. If you are measuring protection rather than adoption, filter on dmarc_enforced and on the qualifier, not on the presence flags.",
      tone: "caveat",
    },
    {
      title: "Absent values mean absent records, not gaps in observation",
      body: "Most domains do not publish DMARC, SPF or MTA-STS at all. Where a column is empty, the usual reason is that the domain published nothing — that is the finding. Where a domain published something we could not read as valid, we publish nothing rather than guessing: an unrecognised DMARC p= is invalid under RFC 7489, and inventing an intent the domain never declared would be worse than an empty cell. The paid data_completeness column records which of the two happened, per signal, per domain.",
      tone: "neutral",
    },
    {
      title: "dmarc_pct is effective, not raw",
      body: "RFC 7489 defines an absent pct= as 100, so a DMARC record without one is applying its policy in full. We publish that as 100 rather than as an empty cell, because publishing it raw made full application look like missing data on almost every row. dmarc_pct is empty only where there is no DMARC record. Where the distinction matters, data_completeness records whether the value was stated explicitly or defaulted.",
      tone: "neutral",
    },
    {
      title: "is_parked is our assessment, and it moves",
      body: "Parking is inferred from the domain's DNS configuration on the snapshot date against a maintained list of indicators. It is not something the domain declares, the indicator list changes as parking services come and go, and a domain can therefore change state between releases without its DNS changing. Treat it as a filter, not as a fact about the registrant.",
      tone: "caveat",
    },
    {
      title: "What this dataset does not contain",
      body: "There is no ASN, prefix or IP address column here, no hosting or DNS provider, and no remediation guidance. mail_provider names the company that runs a domain's inbound mail and nothing wider than that. If you need the network layer behind a domain, that is IP to ASN Intelligence, and joining the two is your own step.",
      tone: "neutral",
    },
  ],
  relatedDatasets: [
    {
      title: "IP to ASN Intelligence",
      slug: "ip-asn-intelligence",
      summary:
        "Map an IPv4 address to its prefix, autonomous system, operator and registry country. The network layer this dataset deliberately does not carry.",
    },
  ],
  changelog: [
    {
      date: "2026-09-23",
      summary:
        "mail_provider and mail_provider_source added, both in the free tier. B already said which host takes a domain's mail; it now says who operates that host, and on what evidence — a curated matching rule or the mail host's reverse DNS.",
    },
    {
      date: "2026-09-21",
      summary:
        "dmarc_pct is now effective rather than raw: a DMARC record with no pct= reads 100, per RFC 7489, instead of empty. It is empty only where there is no DMARC record.",
    },
    {
      date: "2026-09-21",
      summary:
        "mta_sts_mode withdrawn. At 99.95% empty it promised a field it did not have; mta_sts (presence) still ships, and the paid data_completeness column still records whether a mode was published.",
    },
    {
      date: "2026-09-21",
      summary:
        "first_seen_at renamed posture_first_seen_at. It is the first posture observation, not the first sighting of the domain, and the old name said otherwise.",
    },
    {
      date: "2026-09-21",
      summary:
        "Free and paid tiers defined by column. Every domain is in the free tier with 16 of 21 columns; the paid tier adds five columns on the same rows.",
    },
  ],
  contactNote:
    "Not yet on a cloud marketplace. Talk to us about access while the listing is in preparation.",
  order: 20,
};

export const DATASET_FALLBACKS: Record<string, DatasetDoc> = {
  [IP_ASN_INTELLIGENCE.slug]: IP_ASN_INTELLIGENCE,
  [DOMAIN_POSTURE.slug]: DOMAIN_POSTURE,
};

export function getDatasetFallback(slug: string): DatasetDoc | null {
  return DATASET_FALLBACKS[slug] ?? null;
}

export const FALLBACK_SLUGS: string[] = Object.keys(DATASET_FALLBACKS);
