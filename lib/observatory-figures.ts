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
  { id: "dmarc_enforced", path: "/mail", shortLabel: "of DMARC records at enforcement" },
  { id: "moas_stable", path: "/actors", shortLabel: "of multi-origin prefixes are stable multi-homing" },
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
function formatCount(value: number): string {
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
    const pointer = (await res.json()) as { version?: unknown; artifacts?: unknown };
    if (!isVersion(pointer.version)) throw new Error("latest.json names no version");
    if (Array.isArray(pointer.artifacts) && !pointer.artifacts.includes(STATISTICS_FILE)) {
      throw new Error(`latest.json version ${pointer.version} does not list ${STATISTICS_FILE}`);
    }
    return `${ARTIFACT_BASE}/${pointer.version}/${STATISTICS_FILE}`;
  } catch (err) {
    console.warn("observatory-figures: could not resolve the published version, using the root copy:", err);
    return FALLBACK_STATISTICS_URL;
  }
}

/**
 * The picked figures, or null when the Observatory could not be read.
 * The versioned file never changes, so the day-long cache only matters
 * for the root-copy fallback.
 */
export async function loadObservatoryFigures(): Promise<ObservatoryFigures | null> {
  try {
    const url = await resolveStatisticsUrl();
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const file = await res.arrayBuffer();
    const rows = (await parquetReadObjects({ file, compressors })) as Row[];

    const figures: ObservatoryFigure[] = [];
    for (const pick of PICKS) {
      const row = rows.find((r) => str(r.stat_id) === pick.id && r.is_measured === true);
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
