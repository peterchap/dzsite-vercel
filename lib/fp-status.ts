/**
 * THE FALSE-POSITIVE FRAMING — one statement, used everywhere the site talks
 * about alert quality (2026-09-28).
 *
 * Where we are: impersonation alerts were measured at roughly 99% false
 * positives before the current guards went in, and the after-state has not
 * been re-measured. So the site makes NO claim about alert quality — no rate,
 * no "high-confidence", no "false positives removed", no effect of our
 * controls ("reduce false positives"). It describes what we do and what each
 * alert contains, and it says plainly that the number is not published yet.
 *
 * The rule for copy:
 *   - OK:  mechanism ("known-good infrastructure is filtered out before an
 *          alert is raised"), contents ("every alert shows its evidence"),
 *          the customer's control ("you set the threshold").
 *   - NOT: rates, "high-confidence", "verified", "low false positive",
 *          "reduces false positives / noise / triage workload", latency.
 *
 * When the measurement lands, the number returns ONLY via /trust/methodology
 * with its n, window and date — and this line changes to point at it.
 * Enforced in part by scripts/guards/checkClaimGuard.mjs.
 */
export const FP_STATUS =
  "We have not published our false-positive numbers yet. We are measuring them, and we will publish them with the method. Until then, every alert shows its evidence, so you can judge it yourself — and tell us when we are wrong.";
