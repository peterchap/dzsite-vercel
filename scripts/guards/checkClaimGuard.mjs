#!/usr/bin/env node
/**
 * Retired-claim guard (WU27-B; lead-time claims added 2026-08-22).
 *
 * The "<1% false positive rate" claim was retired site-wide — it was never
 * measured, so it is not defensible. This guard fails the build if the claim
 * (or a variant) is reintroduced anywhere in app/, components/, sanity/ or
 * lib/ source. Rate/accuracy claims re-enter ONLY via the /trust/methodology
 * page once the WU27-C measurement jobs have a mature window behind them.
 *
 * The two lead-time claims ("~10s from certificate to scored alert", "Up to 48h
 * ahead of blacklists") joined the list on 2026-08-22 — see the BANNED entries
 * for what each was measured against. The pattern is worth naming: both shipped
 * while claim_metrics.py, the module written to substantiate exactly those two
 * sentences, still carried "NOTHING PUBLIC RENDERS FROM THIS YET" at the top of
 * its docstring. The discipline existed and the copy went out around it. This
 * guard is what makes the retirement stick.
 *
 * Mechanism copy ("false-positive controls", "reduce false positives",
 * "false positives or false negatives") is fine and intentionally not caught.
 *
 * Run: node scripts/guards/checkClaimGuard.mjs   (part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "sanity", "lib"];

const BANNED = [
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
];

const EXEMPT = [/[\\/]__tests__[\\/]/, /[\\/]guards[\\/]/];

/**
 * Comment lines are not scanned — a comment cannot reach a page.
 *
 * This exists because the guard's first run after the lead-time retirement failed on the
 * comments EXPLAINING the retirement: recording "this claim was pulled because X" requires
 * naming the claim. Forcing those notes to paraphrase would make the retirement
 * undocumentable and un-greppable, which is worse than the risk it avoids — the retired
 * strings are exactly what a future reader needs to search for.
 *
 * Deliberately conservative: only WHOLE-LINE comments are skipped. A `//` appearing
 * mid-line is left alone, so a URL (`https://…`) is never truncated and a claim cannot be
 * smuggled past by appending a trailing comment to a line of copy.
 */
function isCommentOnly(line, inBlock) {
  const t = line.trim();
  if (inBlock) return { comment: true, inBlock: !/\*\//.test(t) };
  if (/^\/\//.test(t)) return { comment: true, inBlock: false };
  if (/^\*/.test(t)) return { comment: true, inBlock: false }; // continuation of a /** */
  if (/^(?:\{\s*)?\/\*/.test(t)) {
    // Opens a block/JSX comment. If it also closes on this line it is self-contained.
    return { comment: true, inBlock: !/\*\/\s*\}?\s*$/.test(t) };
  }
  return { comment: false, inBlock: false };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, out);
    } else if (/\.(tsx?|mdx?|json)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const violations = [];
for (const root of ROOTS) {
  let files;
  try {
    files = walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    if (EXEMPT.some((re) => re.test(file))) continue;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    let inBlock = false;
    lines.forEach((line, i) => {
      const state = isCommentOnly(line, inBlock);
      inBlock = state.inBlock;
      if (state.comment) return;
      for (const { re, why } of BANNED) {
        const m = line.match(re);
        if (m) {
          violations.push(`${relative(process.cwd(), file)}:${i + 1}  →  "${m[0]}" (${why})   ${line.trim().slice(0, 100)}`);
          break;
        }
      }
    });
  }
}

if (violations.length) {
  console.error(
    `\n✖ Claim guard failed — ${violations.length} retired/unmeasured accuracy claim(s) found.\n` +
      `  The <1% FP claim is retired (WU27-B). Use mechanism copy ("Four-stage verification",\n` +
      `  "Confidence-tiered alerts") instead; measured rates return via /trust/methodology only.\n`,
  );
  for (const v of violations) console.error("  " + v);
  console.error("");
  process.exit(1);
}

console.log("✓ Claim guard passed — no retired accuracy claims in app/, components/, sanity/ or lib/.");
