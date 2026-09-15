/**
 * Live-ticker render guard (WU25 §1 — STOP-LINE).
 *
 * The "Certificates observed: 0" bug has regressed twice. A dead certificate
 * counter under a "~10s from certificate issuance" claim is self-refuting, and
 * "63k alert candidates from 0 certificates" is internally impossible. The rule
 * is simple: NEVER render a live zero.
 *
 * The per-hour "Infrastructure activity" panel renders ONLY if every metric is
 * non-zero and non-null. On any failure the whole panel is hidden (the static
 * corpus stats above it remain). Placeholder timestamps (e.g. "00:00 UTC") are
 * likewise never shown.
 *
 * Logic lives here as pure functions so it can be unit-tested without rendering
 * an async server component. See __tests__/live-activity-guard.test.ts and
 * scripts/guards/checkTickerGuard.mjs.
 */

/** A single number is a valid live metric only if it is a finite number > 0. */
export function isValidMetric(value: number | null | undefined): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

/**
 * The activity panel is renderable only when EVERY supplied metric is valid
 * (non-zero, non-null, finite). Any zero/null/missing metric hides the panel.
 */
export function isActivityPanelRenderable(
  metrics: Array<number | null | undefined>,
): boolean {
  if (!metrics.length) return false;
  return metrics.every(isValidMetric);
}

/**
 * A timestamp/snapshot label is a placeholder (and must not render) when it is
 * missing, empty, or a midnight zero-value like "00:00 UTC" / "00:00".
 */
export function isPlaceholderTimeLabel(label?: string | null): boolean {
  if (!label) return true;
  const trimmed = label.trim();
  if (!trimmed) return true;
  return /(^|\s)00:00(\s|$|\s*UTC)/i.test(trimmed);
}

/** Returns the snapshot label only if it is real; otherwise null (hide it). */
export function safeSnapshotLabel(label?: string | null): string | null {
  return isPlaceholderTimeLabel(label) ? null : (label as string);
}

/**
 * PER-FIGURE AS-OF (added 2026-08-22).
 *
 * The stats feed runs at three cadences — coverage daily, activity hourly,
 * status every few minutes — and the page renders them together. Measured on
 * the live endpoints: coverage.json read 00:15:47Z while activity.json read
 * 13:31:47Z, THIRTEEN HOURS apart, side by side, with one "Updated 13:31 UTC"
 * label between them. A live counter lends borrowed freshness to a stale total,
 * and the reader has no way to see it.
 *
 * The rule: every figure carries and displays its own as-of. A figure that
 * cannot show one does not go on the page — which is what `asOfLabel`
 * returning null means to the caller.
 */

/** Absolute UTC label for a figure's own as-of, e.g. "22 Aug 2026, 15:01 UTC". */
export function asOfLabel(iso?: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return `${date}, ${time} UTC`;
}

/** Age of a figure in hours, or null if it has no usable as-of. */
export function ageHours(iso: string | null | undefined, now: Date = new Date()): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return (now.getTime() - d.getTime()) / 3_600_000;
}

/**
 * Is a figure too old for the cadence it claims? A figure labelled "last 1h"
 * that was measured four hours ago is not a live figure, and rendering it
 * beside a fresh one is the borrowed-freshness bug.
 *
 * `maxAgeHours` is the cadence's own budget, not a display preference.
 */
export function isStale(
  iso: string | null | undefined,
  maxAgeHours: number,
  now: Date = new Date(),
): boolean {
  const age = ageHours(iso, now);
  // No as-of at all is treated as stale: an unstamped figure cannot be shown
  // to be current, and "cannot show one" means it does not go on the page.
  if (age === null) return true;
  return age > maxAgeHours;
}

/**
 * PER-FIGURE PUBLISHING (added 2026-09-15).
 *
 * isActivityPanelRenderable is all-or-nothing, which suited a panel whose
 * figures were read against each other ("63k alert candidates from 0
 * certificates"). The Observatory preview's activity rows are independent
 * figures, and the producer now nulls any single figure that fails its bounds.
 * Measured 2026-09-15: `certificates` was published null (2,067,773 over the
 * 2,000,000/h ceiling) while `new_domains` and `routing_changes` were valid and
 * fresh. All-or-nothing would have blanked two good figures for one bad one.
 *
 * So each figure stands alone: it renders only if it is a valid non-zero number
 * AND its own as-of is inside the cadence budget. Nothing is substituted — a
 * figure that fails is absent, never a placeholder.
 */

/**
 * Budget for an hourly figure. Three hours: slack for a late run, short enough
 * that a stalled certstream blob leaves the page instead of being republished
 * under a fresh timestamp (measured 2026-08-22: the blob was 3.7h stale while
 * activity.json carried an `updated` of "now").
 */
export const ACTIVITY_MAX_AGE_HOURS = 3;

export type ActivityFigure = {
  value: number | null | undefined;
  asOf: string | null | undefined;
};

/** The figures fit to render, each judged on its own value and as-of. */
export function publishableFigures<T extends ActivityFigure>(
  figures: T[],
  maxAgeHours: number = ACTIVITY_MAX_AGE_HOURS,
  now: Date = new Date(),
): Array<T & { value: number; asOf: string }> {
  return figures.filter(
    (f): f is T & { value: number; asOf: string } =>
      isValidMetric(f.value) && !isStale(f.asOf, maxAgeHours, now),
  );
}
