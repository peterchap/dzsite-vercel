/**
 * Figures from the Observatory, for the main site to show.
 *
 * THE MAIN SITE DOES NOT ORIGINATE NUMBERS (brief D2). Anything it displays
 * about the corpus resolves from the Observatory's published statistics and
 * links to the page that defines it. This reads the same Parquet file the
 * Observatory serves to analysts — the stable root copy, revalidated daily —
 * and picks the handful of figures the homepage and /observatory show.
 *
 * FAIL-SOFT, NEVER FAKE. If the file cannot be fetched at build, the
 * sections render without figures and keep their links. The homepage used
 * to carry a mockup with "412", "83" and "17" typed into it; a missing tile
 * is better than an invented one.
 *
 * Each figure carries its own as-of date and an anchor on the page that
 * explains it — the Observatory gives every measured statistic a stable
 * `id` equal to its stat_id — so a reader can go from the number to the
 * denominator and the method in one click.
 */

import { parquetReadObjects } from "hyparquet";
import { compressors } from "hyparquet-compressors";

export const OBSERVATORY_URL = "https://observatory.datazag.com";

/**
 * Where the Observatory publishes. Since 2026-09-13 a publish uploads to a
 * dated, immutable prefix on the CDN and then moves `latest.json` to point
 * at it. The root copy on observatory.datazag.com is no longer rewritten by
 * a publish: it froze at 2026-09-09, and reading it is how the homepage
 * came to say "Data as of 2026-09-09" for weeks while the Observatory moved
 * on. Follow the pointer; the root copy is only the fallback.
 */
const ARTIFACT_BASE =
  process.env.OBSERVATORY_ARTIFACT_BASE ?? "https://cdn.getdatazag.com/observatory";
const STATISTICS_FILE = "observatory_statistics.parquet";
const FALLBACK_STATISTICS_URL = `${OBSERVATORY_URL}/${STATISTICS_FILE}`;

export interface ObservatoryFigure {
  id: string;
  /** Formatted for display: "367.2M", "11.6%". */
  value: string;
  /** What the figure is, in the Observatory's own words. */
  label: string;
  /** The population the figure is computed over, when the row states one. */
  population: string | null;
  asOf: string | null;
  /** The Observatory page and anchor that define the figure. */
  href: string;
}

export interface ObservatoryFigures {
  /** The newest measurement date across the picked figures. */
  asOf: string | null;
  figures: ObservatoryFigure[];
}

/** The figures the main site shows, and the page each lives on. */
const PICKS: Array<{ id: string; path: string; shortLabel: string }> = [
  { id: "corpus_domains", path: "/", shortLabel: "resolving domains measured" },
  { id: "dmarc_enforced", path: "/email", shortLabel: "of DMARC records at enforcement" },
  { id: "moas_stable", path: "/security", shortLabel: "of multi-origin prefixes are stable multi-homing" },
  { id: "asn_half_of_domains", path: "/infrastructure", shortLabel: "networks carry half of all attributable domains" },
];

type Row = Record<string, unknown>;

function str(v: unknown): string | null {
  return typeof v === "string" && v.length > 0 ? v : null;
}

function num(v: unknown): number | null {
  if (typeof v === "bigint") return Number(v);
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

/** 374600000 -> "374.6M"; 4452 -> "4,452". Mirrors the Observatory's formatter. */
/** The Observatory's own count format. lib/site-stats-core.ts fmtStat matches it (guarded). */
export function formatCount(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  return value.toLocaleString("en-US");
}

function formatValue(value: number, unit: string | null): string {
  if (unit === "percent") {
    const decimals = Number.isInteger(value * 10) ? 1 : 2;
    return `${value.toFixed(decimals)}%`;
  }
  return formatCount(value);
}

/** Same shape the Observatory's own reader accepts: a YYYY-MM-DD version. */
function isVersion(v: unknown): v is string {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
}

/**
 * The URL of the currently published statistics file. The pointer is
 * re-read hourly, so a publish reaches the site within the hour; the
 * versioned file it names is immutable. Any failure to read the pointer
 * falls back to the root copy — stale is better than blank, and the panel
 * shows its as-of date either way.
 */
async function resolveStatisticsUrl(): Promise<string> {
  try {
    const res = await fetch(`${ARTIFACT_BASE}/latest.json`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const pointer = (await res.json()) as { version?: unknown; artifacts?: unknown; published_at?: unknown };
    if (!isVersion(pointer.version)) throw new Error("latest.json names no version");
    if (Array.isArray(pointer.artifacts) && !pointer.artifacts.includes(STATISTICS_FILE)) {
      throw new Error(`latest.json version ${pointer.version} does not list ${STATISTICS_FILE}`);
    }
    // A same-day republish overwrites the dated prefix (2026-10-01: published at
    // 17:29 and again at 22:28 under 2026-10-01/). The fetch below caches by URL
    // for a day, so without this the second publish waited up to 24 hours. The
    // publish time makes each publish its own cache entry.
    const v = typeof pointer.published_at === "string" ? `?v=${encodeURIComponent(pointer.published_at)}` : "";
    return `${ARTIFACT_BASE}/${pointer.version}/${STATISTICS_FILE}${v}`;
  } catch (err) {
    console.warn("observatory-figures: could not resolve the published version, using the root copy:", err);
    return FALLBACK_STATISTICS_URL;
  }
}

/**
 * Every row of the published statistics file, or null when it could not be
 * read. The URL carries the publish time, so the day-long cache holds one
 * publish and a republish gets a new entry.
 */
async function loadStatisticsRows(): Promise<Row[] | null> {
  try {
    const url = await resolveStatisticsUrl();
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const file = await res.arrayBuffer();
    return (await parquetReadObjects({ file, compressors })) as Row[];
  } catch (err) {
    console.warn("observatory-figures: could not read the Observatory statistics:", err);
    return null;
  }
}

function measuredRow(rows: Row[], id: string): Row | null {
  return rows.find((r) => str(r.stat_id) === id && r.is_measured === true) ?? null;
}

/** The picked figures, or null when the Observatory could not be read. */
export async function loadObservatoryFigures(
  { exclude = [] }: { exclude?: string[] } = {},
): Promise<ObservatoryFigures | null> {
  try {
    const rows = await loadStatisticsRows();
    if (!rows) return null;

    const figures: ObservatoryFigure[] = [];
    for (const pick of PICKS.filter((p) => !exclude.includes(p.id))) {
      const row = measuredRow(rows, pick.id);
      const value = row ? num(row.value) : null;
      if (!row || value === null) continue;
      figures.push({
        id: pick.id,
        value: formatValue(value, str(row.unit)),
        label: pick.shortLabel,
        population: str(row.denominator_label),
        asOf: str(row.as_of),
        href: `${OBSERVATORY_URL}${pick.path === "/" ? "" : pick.path}#${pick.id}`,
      });
    }
    if (figures.length === 0) return null;

    const asOf = figures
      .map((f) => f.asOf)
      .filter((d): d is string => Boolean(d))
      .sort()
      .pop() ?? null;
    return { asOf, figures };
  } catch (err) {
    console.warn("observatory-figures: could not read the Observatory statistics:", err);
    return null;
  }
}

/**
 * THE HOMEPAGE'S INTELLIGENCE FIGURES (homepage repositioning, 2026-09-25).
 *
 * The homepage argues that Datazag sells interpretation, not records. These
 * are the figures that make that argument without asking to be believed:
 * each is a measured Observatory statistic, each is read here rather than
 * typed, and each links to the page that states its method and caveats.
 *
 * COUNTS, NOT SHARES. The funnel and the certificate lane are rendered from
 * the row's `numerator` — the Observatory publishes these as a share of a
 * named population, and the count is the same measurement read the other
 * way. The brief quoted the funnel as 178M → 169M → 159M; the store is the
 * source, so the first stage reads whatever mx_present measured today.
 *
 * ALL-OR-NOTHING WHERE A GROUP IS AN ARGUMENT. A funnel with a missing
 * stage, or a concentration pair with one half, reads as a different claim
 * from the one the section makes, so a group with any figure missing is
 * dropped whole. The section renders nothing if every group is gone.
 */
export interface CountFigure {
  id: string;
  /** The count, formatted: "158.9M", "229". */
  value: string;
  asOf: string | null;
  /** The population the count is drawn from, in the Observatory's words. */
  population: string | null;
  href: string;
}

export interface IntelligenceFigures {
  asOf: string | null;
  /** Names no zone file lists, found through certificate transparency. */
  certificateOnly: CountFigure | null;
  /** Publish MX → can receive mail → can receive mail and not parked. */
  mailFunnel: [CountFigure, CountFigure, CountFigure] | null;
  /** Networks carrying half, and nine in ten, of attributable domains. */
  concentration: { half: CountFigure; ninety: CountFigure } | null;
}

function countFigure(rows: Row[], id: string, path: string): CountFigure | null {
  const row = measuredRow(rows, id);
  const count = row ? num(row.numerator) : null;
  if (!row || count === null || count <= 0) return null;
  return {
    id,
    value: formatCount(count),
    asOf: str(row.as_of),
    population: str(row.denominator_label),
    href: `${OBSERVATORY_URL}${path}#${id}`,
  };
}

/**
 * The corpus figure as the Observatory publishes it: corpus_domains, the count of
 * resolving domains (2026-10-01). The main site's domain figure reads THIS, so
 * the two sites print the same number (lib/site-stats-live.ts). Null when the
 * statistics cannot be read or the row is absent or not measured.
 */
export interface CorpusFigure {
  value: number;
  asOf: string | null;
  method: string | null;
  href: string;
}

export async function loadCorpusDomains(): Promise<CorpusFigure | null> {
  const rows = await loadStatisticsRows();
  if (!rows) return null;
  const row = measuredRow(rows, "corpus_domains");
  // The SAME field the Observatory panel renders (loadObservatoryFigures reads num(row.value)):
  // corpus_domains is a count stat, so value is the count. Preferring numerator could make the
  // hero and the panel print different numbers if the two fields ever diverged.
  const value = row ? num(row.value) : null;
  if (!row || value === null || value <= 0) return null;
  return { value, asOf: str(row.as_of), method: str(row.method), href: `${OBSERVATORY_URL}/domains#corpus_domains` };
}

export async function loadIntelligenceFigures(): Promise<IntelligenceFigures | null> {
  const rows = await loadStatisticsRows();
  if (!rows) return null;

  const certificateOnly = countFigure(rows, "domains_from_ct", "/domains");

  const mx = countFigure(rows, "mx_present", "/email");
  const deliverable = countFigure(rows, "mx_deliverable", "/email");
  const active = countFigure(rows, "mx_deliverable_unparked", "/email");
  const mailFunnel: IntelligenceFigures["mailFunnel"] =
    mx && deliverable && active ? [mx, deliverable, active] : null;

  const half = countFigure(rows, "asn_half_of_domains", "/infrastructure");
  const ninety = countFigure(rows, "asn_ninety_of_domains", "/infrastructure");
  const concentration = half && ninety ? { half, ninety } : null;

  if (!certificateOnly && !mailFunnel && !concentration) return null;

  const all = [
    certificateOnly,
    ...(mailFunnel ?? []),
    ...(concentration ? [concentration.half, concentration.ninety] : []),
  ].filter((f): f is CountFigure => f !== null);

  const asOf = all
    .map((f) => f.asOf)
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop() ?? null;
  return { asOf, certificateOnly, mailFunnel, concentration };
}

/**
 * THE CORPORATE MAIL POPULATION (machine clicks, 2026-10-01).
 *
 * The machine-clicks post and the ESP page argue that the mailbox layer, not
 * the gateway layer, is where most URL-inspecting infrastructure sits. The
 * figures behind that are the Observatory's corp_mail_* statistics, the
 * daily re-measurement of the "Corporate Mail Path" note (2026-09-08):
 * domains that accept mail, are not parked, resolve a website and publish
 * SPF. Read here, never typed.
 *
 * ALL-OR-NOTHING. A scale comparison with one side missing is a different
 * claim, so any missing figure returns null and the copy that needs them is
 * left out (see resolveCorporateMailTokens).
 */
export interface CorporateMailFigures {
  asOf: string | null;
  /** Corporate domains, for prose: "112.9 million". */
  domains: string;
  /** Share on Microsoft or Google, whole percent: "24%". */
  microsoftGoogle: string;
  /** Share behind a dedicated gateway, one decimal: "2.2%". */
  gateway: string;
  href: string;
}

function proseCount(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} billion`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} million`;
  return value.toLocaleString("en-US");
}

export async function loadCorporateMailFigures(): Promise<CorporateMailFigures | null> {
  const rows = await loadStatisticsRows();
  if (!rows) return null;
  const domainsRow = measuredRow(rows, "corp_mail_domains");
  const msgRow = measuredRow(rows, "corp_mail_microsoft_google");
  const gwRow = measuredRow(rows, "corp_mail_gateway");
  const domains = domainsRow ? num(domainsRow.numerator) : null;
  const msg = msgRow ? num(msgRow.value) : null;
  const gw = gwRow ? num(gwRow.value) : null;
  if (!domainsRow || !msgRow || !gwRow || domains === null || domains <= 0 || msg === null || gw === null) {
    return null;
  }
  const asOf = [domainsRow, msgRow, gwRow]
    .map((r) => str(r.as_of))
    .filter((d): d is string => Boolean(d))
    .sort()
    .pop() ?? null;
  return {
    asOf,
    domains: proseCount(domains),
    microsoftGoogle: `${Math.round(msg)}%`,
    gateway: `${gw.toFixed(1)}%`,
    href: `${OBSERVATORY_URL}/email/providers#corp_mail_domains`,
  };
}

const CORPORATE_MAIL_TOKENS: Record<string, keyof CorporateMailFigures> = {
  "{{CORP_MAIL_DOMAINS}}": "domains",
  "{{CORP_MAIL_MS_GOOGLE_PCT}}": "microsoftGoogle",
  "{{CORP_MAIL_GATEWAY_PCT}}": "gateway",
};

/**
 * Fill the corporate-mail tokens in a piece of copy. Returns null when the
 * copy uses a token and the figures are unavailable: the caller drops that
 * paragraph rather than print a sentence with a hole in it.
 */
export function resolveCorporateMailTokens(text: string, figures: CorporateMailFigures | null): string | null {
  if (!/\{\{CORP_MAIL_[A-Z_]+\}\}/.test(text)) return text;
  if (!figures) return null;
  let out = text;
  for (const [token, key] of Object.entries(CORPORATE_MAIL_TOKENS)) {
    out = out.split(token).join(String(figures[key] ?? ""));
  }
  return /\{\{CORP_MAIL_[A-Z_]+\}\}/.test(out) ? null : out;
}
