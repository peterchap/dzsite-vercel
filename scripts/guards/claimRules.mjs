/**
 * SHARED CLAIM RULES — retired and unmeasured accuracy claims.
 *
 * One list, two scanners. checkClaimGuard.mjs applies these to SOURCE under
 * app/, components/, sanity/ and lib/; checkCmsContentGuard.ts applies the
 * same list to every published Sanity document that can render.
 *
 * The list used to live inside checkClaimGuard.mjs, so the CMS never saw it.
 * That is how a legacy CMS page published "<5% false positives" undetected.
 * See lib/fp-status.ts for the site-wide false-positive framing.
 *
 * Mechanism copy ("false-positive controls", "false positives or false
 * negatives") is fine and intentionally not caught.
 */
export const CLAIM_RULES = [
  { re: /(?:<|&lt;|≤)\s*1\s*%/, why: "the retired <1% claim" },
  { re: /less than 1\s*%/i, why: "the retired <1% claim (spelled out)" },
  { re: /sub-?1\s*%/i, why: "the retired <1% claim (sub-1%)" },
  { re: /1\s*%\s*false/i, why: "a 1% false-positive claim" },
  { re: /false[\s-]positive\s+rate/i, why: "an unmeasured false-positive rate claim" },
  { re: /zero false positives/i, why: "an absolute accuracy claim" },
  { re: /industry[\s-]leading accura/i, why: "a vague accuracy superlative (banned by WU27-B)" },

  // ── Lead-time claims, retired 2026-08-22 ────────────────────────────────
  // Both went live ahead of the machinery built to substantiate them, and when that
  // machinery was finally read, it disagreed with both.
  //
  //   "~10s from certificate to scored alert" — claim_metrics.latency_p50 measures
  //     25,625s = 7.1 HOURS (p95 13.6h). Its t1 is the R2 LastModified of the raw-ingest
  //     chunk, so it is dominated by batch cadence rather than processing — which means
  //     it is not evidence the pipeline is slow, but it IS the only measurement that
  //     exists, and it does not support ~10s.
  //
  //   "Up to 48h ahead of blacklists" — feed corroboration cannot measure this detector.
  //     The public domain feeds hold ~36k domains, we alert on ~242k, and they intersect
  //     ~50 times: URLhaus/ThreatFox/OpenPhish list malware and phishing URLs while we
  //     alert on brand and platform impersonation infrastructure. Restricting to the RED
  //     band moved the rate 0.005% -> 0.020% and moved the corroborated COUNT 38 -> 7.
  //     The binding constraint is the oracle, not the denominator, so no window length
  //     rescues it.
  //
  // A lead-time figure returns ONLY via /trust/methodology, sourced from
  // gold.claim_metrics, quoted with its n and its date. Not as a hero chip.
  { re: /\bup to\s*\d+\s*(?:h\b|hours?\b)/i, why: "an 'up to Nh' lead-time claim (retired 2026-08-22)" },
  { re: /\d+\s*(?:h|hours?)\s+(?:ahead of|earlier than|before)\s+(?:traditional\s+)?(?:black|block)lists?/i,
    why: "the retired 'Nh ahead of blacklists' claim" },
  { re: /~\s*\d+\s*s(?:ec|econds)?\b[^.]{0,40}(?:to|from)[^.]{0,40}(?:scored|alert)/i,
    why: "the retired '~10s from certificate to scored alert' claim" },
  { re: /(?:seconds|instant(?:ly|aneous)?)\s+from\s+certificate/i,
    why: "an unmeasured certificate-to-alert latency claim" },

  // ── False-positive framing, 2026-09-28 (lib/fp-status.ts) ───────────────
  // The <1% entries above caught one number. A legacy CMS page shipped "<5% false
  // positives" straight past them, so any OUR-rate construction is banned now,
  // whatever the number. Industry statistics about OTHER tools ("user reports run
  // 85-95% false positives") are not our accuracy and are not matched.
  { re: /(?:<|&lt;|≤|under|below|less than)\s*\d+(?:\.\d+)?\s*%[^.]{0,25}false[\s-]positive/i,
    why: "an unmeasured false-positive rate (any number)" },
  { re: /false[\s-]positives?\s+(?:rate\s+)?(?:under|below|less than|<|of\s+(?:under|below|less than))\s*\d/i,
    why: "an unmeasured false-positive rate (any number)" },
  { re: /false[\s-]positives?\s+(?:are\s+)?(?:removed|suppressed|eliminated)/i,
    why: "a claim that false positives are removed — the after-guard rate is not measured" },
  { re: /\bsub-?\s*\d+\s*-?\s*s(?:ec(?:ond)?s?)?\b[^.]{0,20}detection/i,
    why: "an unmeasured detection-latency claim (e.g. 'sub-60s detection')" },
  { re: /high[\s-]confidence\s+(?:verdicts?|signals?|alerts?)/i,
    why: "an alert-quality claim — confidence is not measured (lib/fp-status.ts)" },
];
