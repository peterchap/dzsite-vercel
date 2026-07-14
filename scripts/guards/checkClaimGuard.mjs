#!/usr/bin/env node
/**
 * Retired-claim guard (WU27-B).
 *
 * The "<1% false positive rate" claim was retired site-wide — it was never
 * measured, so it is not defensible. This guard fails the build if the claim
 * (or a variant) is reintroduced anywhere in app/, components/, sanity/ or
 * lib/ source. Rate/accuracy claims re-enter ONLY via the /trust/methodology
 * page once the WU27-C measurement jobs have a mature window behind them.
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
];

const EXEMPT = [/[\\/]__tests__[\\/]/, /[\\/]guards[\\/]/];

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
    lines.forEach((line, i) => {
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
