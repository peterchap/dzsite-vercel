import type { SiteStats } from "@/lib/site-stats-core";

/**
 * MEASURED RECORD AGE — the freshness figure the insurer page publishes
 * instead of a refresh-cycle length.
 *
 * A cycle length ("every two months") describes the slowest path and says
 * nothing about how old the records actually served are. The measured age
 * distribution does. It is computed daily by the producer
 * (riskscore/orchestration/website_stats.py → coverage.json
 * `record_age_p50_hours` / `record_age_p95_hours`): time since each domain in
 * the measured corpus was last resolved, same population as the domain count.
 *
 * NEVER TYPED. The values arrive with every other published figure, from the
 * live feed at request time (lib/site-stats-live.ts, hourly). While the feed does not carry them — or
 * either is out of bounds — the page renders nothing. Same rule as
 * lib/legal-entity.ts: unknown is absent, never a placeholder or estimate.
 */
export type RecordAge = {
  /** e.g. "9 days". Human-readable, as it should render. */
  median: string | null;
  /** e.g. "31 days". */
  p95: string | null;
  /** ISO date (YYYY-MM-DD) the distribution was measured. */
  measuredAt: string | null;
};

/**
 * Hours → "N hours" under two days, else whole days. Always rounds UP:
 * rounding down would publish a fresher figure than was measured.
 */
export function formatAge(hours: number | null): string | null {
  if (hours === null || !Number.isFinite(hours) || hours <= 0) return null;
  if (hours < 48) {
    const h = Math.ceil(hours);
    return `${h} hour${h === 1 ? "" : "s"}`;
  }
  return `${Math.ceil(hours / 24)} days`;
}

/** The record-age line for a stats bundle — pass the live one from getSiteStats(). */
export function recordAgeFrom(stats: SiteStats): RecordAge {
  const { p50Hours, p95Hours, asOf } = stats.recordAge;
  return {
    median: formatAge(p50Hours),
    p95: formatAge(p95Hours),
    measuredAt: asOf ? asOf.slice(0, 10) : null,
  };
}

export function isRecordAgePublishable(age: RecordAge): age is { median: string; p95: string; measuredAt: string } {
  return Boolean(age.median && age.p95 && age.measuredAt);
}
