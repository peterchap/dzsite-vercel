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

console.log(`✓ Ticker render-guard assertions passed (${n} checks).`);
