/**
 * Machine clicks — the one place that knows which related pages are live.
 *
 * Rule (machine-clicks package, 2026-10-01): no page links to a deliverable a
 * visitor cannot reach. Each URL stays null until that page or file answers
 * 200 in production. Set it then, in this file only; every link on the site
 * reads from here and renders nothing while the value is null.
 *
 * The per-domain dataset and any free lookup file are deliberately absent.
 * Add them here, with their live URLs, when they ship (phase 2).
 */

/** Vendor evidence page on the Observatory. Null until it is live. */
export const MACHINE_CLICKS_EVIDENCE_URL: string | null = "https://observatory.datazag.com/email/machine-clicks";

/** Versioned evidence CSV, linked from the evidence page. Null until it is live. */
export const MACHINE_CLICKS_EVIDENCE_CSV_URL: string | null =
  "https://observatory.datazag.com/downloads/machine-clicks/v1/machine-clicks-vendor-evidence-v1.csv";

/** Implementation guide on the main site. */
export const MACHINE_CLICKS_GUIDE_PATH = "/resources/machine-clicks";
