#!/usr/bin/env node
/**
 * Live-ticker render-guard assertions (WU25 §1 — STOP-LINE, second regression).
 *
 * The "Certificates observed: 0" bug has regressed twice; this locks the guard
 * behaviour into CI. Mirrors the pure logic in lib/live-activity-guard.ts.
 * Kept dependency-free (no jest required) so it runs in any CI via
 * `npm run guard`. See also __tests__/live-activity-guard.test.ts.
 */
import assert from "node:assert/strict";
import {
  isValidMetric,
  isActivityPanelRenderable,
  isPlaceholderTimeLabel,
  safeSnapshotLabel,
  asOfLabel,
  ageHours,
  isStale,
} from "../../lib/live-activity-guard.ts";

let n = 0;
const check = (desc, fn) => {
  fn();
  n++;
};

// A live zero must never count as valid.
check("zero is invalid", () => assert.equal(isValidMetric(0), false));
check("null is invalid", () => assert.equal(isValidMetric(null), false));
check("undefined is invalid", () => assert.equal(isValidMetric(undefined), false));
check("NaN is invalid", () => assert.equal(isValidMetric(Number.NaN), false));
check("positive is valid", () => assert.equal(isValidMetric(83), true));

// The panel hides if ANY metric is zero/null — the core regression.
check("panel hidden when certificates=0", () =>
  assert.equal(isActivityPanelRenderable([0, 224000, 63000, 17]), false));
check("panel hidden when a metric is null", () =>
  assert.equal(isActivityPanelRenderable([428, null, 63000, 17]), false));
check("panel hidden when empty", () =>
  assert.equal(isActivityPanelRenderable([]), false));
check("panel visible when all metrics positive", () =>
  assert.equal(isActivityPanelRenderable([428, 224000, 63000, 17]), true));

// Placeholder timestamps must never render.
check("00:00 UTC is a placeholder", () =>
  assert.equal(isPlaceholderTimeLabel("00:00 UTC"), true));
check("00:00 is a placeholder", () =>
  assert.equal(isPlaceholderTimeLabel("00:00"), true));
check("empty is a placeholder", () =>
  assert.equal(isPlaceholderTimeLabel(""), true));
check("undefined is a placeholder", () =>
  assert.equal(isPlaceholderTimeLabel(undefined), true));
check("a real snapshot is not a placeholder", () =>
  assert.equal(isPlaceholderTimeLabel("08:12 UTC"), false));
check("safeSnapshotLabel nulls out a placeholder", () =>
  assert.equal(safeSnapshotLabel("00:00 UTC"), null));
check("safeSnapshotLabel passes a real label", () =>
  assert.equal(safeSnapshotLabel("06:00 UTC"), "06:00 UTC"));

// ── PER-FIGURE AS-OF (2026-08-22) ──────────────────────────────────────────
// Measured on the live endpoints: coverage.json read 00:15:47Z while
// activity.json read 13:31:47Z — THIRTEEN HOURS apart — and the page rendered
// them together under one timestamp. A live counter lends borrowed freshness
// to a stale total. Every figure carries its own as-of; a figure that cannot
// show one does not go on the page.
const NOW = new Date("2026-08-22T15:00:00Z");

check("asOfLabel renders an absolute UTC stamp", () =>
  assert.equal(asOfLabel("2026-08-22T15:01:47+00:00"), "22 Aug 2026, 15:01 UTC"));
check("asOfLabel nulls a missing stamp", () => assert.equal(asOfLabel(null), null));
check("asOfLabel nulls an unparseable stamp", () =>
  assert.equal(asOfLabel("not a date"), null));

check("ageHours measures against the supplied clock", () =>
  assert.equal(ageHours("2026-08-22T12:00:00Z", NOW), 3));
check("ageHours nulls a missing stamp", () => assert.equal(ageHours(null, NOW), null));

// The exact live case: a 3.7h-old certstream blob republished under a fresh
// `updated` on an HOURLY file.
check("a 3.7h-old hourly figure is stale", () =>
  assert.equal(isStale("2026-08-22T11:20:57Z", 3, NOW), true));
check("a 40-minute-old hourly figure is fresh", () =>
  assert.equal(isStale("2026-08-22T14:20:00Z", 3, NOW), false));
// The 13-hour gap that started all this.
check("a 13h-old figure is stale on an hourly budget", () =>
  assert.equal(isStale("2026-08-22T02:00:00Z", 3, NOW), true));
check("an unstamped figure counts as stale, not as fresh", () =>
  assert.equal(isStale(undefined, 3, NOW), true));
check("an unparseable stamp counts as stale", () =>
  assert.equal(isStale("whenever", 3, NOW), true));

console.log(`✓ Ticker render-guard assertions passed (${n} checks).`);
