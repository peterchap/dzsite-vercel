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
const STATISTICS_URL = `${OBSERVATORY_URL}/observatory_statistics.parquet`;

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

/**
 * The picked figures, or null when the Observatory could not be read.
 * Cached by Next's fetch for a day, matching the Observatory's own
 * revalidation, so a deploy does not wait on it twice.
 */
export async function loadObservatoryFigures(): Promise<ObservatoryFigures | null> {
  try {
    const res = await fetch(STATISTICS_URL, { next: { revalidate: 86400 } });
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
