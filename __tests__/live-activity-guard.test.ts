import {
  isValidMetric,
  isActivityPanelRenderable,
  isPlaceholderTimeLabel,
  safeSnapshotLabel,
} from "../lib/live-activity-guard";

// WU25 §1 (STOP-LINE): the live "Certificates observed: 0" counter has
// regressed twice. These lock the render guard into CI.
describe("live-activity render guard", () => {
  it("treats zero / null / NaN as invalid metrics", () => {
    expect(isValidMetric(0)).toBe(false);
    expect(isValidMetric(null)).toBe(false);
    expect(isValidMetric(undefined)).toBe(false);
    expect(isValidMetric(Number.NaN)).toBe(false);
    expect(isValidMetric(83)).toBe(true);
  });

  it("hides the activity panel when any metric is zero or null", () => {
    // The exact self-refuting case: 63k candidates from 0 certificates.
    expect(isActivityPanelRenderable([0, 224000, 63000, 17])).toBe(false);
    expect(isActivityPanelRenderable([428, null, 63000, 17])).toBe(false);
    expect(isActivityPanelRenderable([])).toBe(false);
  });

  it("renders the activity panel only when every metric is positive", () => {
    expect(isActivityPanelRenderable([428, 224000, 63000, 17])).toBe(true);
  });

  it("rejects placeholder timestamps like 00:00 UTC", () => {
    expect(isPlaceholderTimeLabel("00:00 UTC")).toBe(true);
    expect(isPlaceholderTimeLabel("00:00")).toBe(true);
    expect(isPlaceholderTimeLabel("")).toBe(true);
    expect(isPlaceholderTimeLabel(undefined)).toBe(true);
    expect(isPlaceholderTimeLabel("08:12 UTC")).toBe(false);
  });

  it("nulls out placeholder snapshot labels but passes real ones", () => {
    expect(safeSnapshotLabel("00:00 UTC")).toBeNull();
    expect(safeSnapshotLabel("06:00 UTC")).toBe("06:00 UTC");
  });
});
