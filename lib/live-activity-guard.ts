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
