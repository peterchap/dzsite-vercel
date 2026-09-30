/**
 * MEASURED RECORD AGE — the freshness figure the insurer page publishes
 * instead of a refresh-cycle length.
 *
 * Same rule as lib/legal-entity.ts: a value that is not known is `null`, and
 * the page renders nothing for it. Never a placeholder, never an estimate.
 *
 * Why age and not cycle length: a cycle length ("every two months") describes
 * the slowest path and understates how fresh most rows are. The age of the
 * records actually served, measured, is the honest number. Insurer brief v2
 * estimates the real figure is several times fresher than the cycle implies,
 * which is exactly why it must be measured rather than derived from the
 * estimate.
 *
 * Fill all three from a measurement over the served corpus (median and 95th
 * percentile of now − observed_at) and the line appears on
 * /cyber-risk-underwriting. No other file changes.
 */
export type RecordAge = {
  /** e.g. "4 days". Human-readable, as it should render. */
  median: string | null;
  /** e.g. "19 days". */
  p95: string | null;
  /** ISO date the distribution was measured. */
  measuredAt: string | null;
};

export const RECORD_AGE: RecordAge = {
  median: null,
  p95: null,
  measuredAt: null,
};

export function isRecordAgePublishable(age: RecordAge): age is { median: string; p95: string; measuredAt: string } {
  return Boolean(age.median && age.p95 && age.measuredAt);
}
