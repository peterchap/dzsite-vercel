#!/usr/bin/env node
/**
 * Corpus-figure drift guard (WU25 §2).
 *
 * The corpus domain count is the single source of truth in lib/site-stats.ts.
 * This guard fails the build if a corpus-style literal (three digits followed
 * by "M", e.g. 315M / 330M / 340M+) is typed directly into page source under
 * app/ or components/ — every surface must import DOMAINS_DISPLAY instead.
 *
 * SPELLED-OUT FORMS — added 2026-09-13 (WU-C8). The \d{3}M pattern has a blind
 * spot: /docs carried "over 315 million domains" in words, eleven lines below a
 * hero already rendering DOMAINS_DISPLAY. Two different corpus figures on one
 * documentation page, and the guard could not see either. The figure a reader
 * compares is the figure as rendered, so the guard now reads it the same way
 * and catches "315 million" / "3.1 billion" as well as "315M".
 *
 * Run: node scripts/guards/checkCorpusDrift.mjs   (wired as part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components"];
// Three digits + M, not followed by another letter (excludes "MB", "Mbps", "Ms").
const CORPUS_LITERAL = /\d{3}M\+?(?![A-Za-z])/;
// The same magnitudes written out: "315 million", "3.1 billion", "390m domains".
const CORPUS_SPELLED = /\b\d{1,3}(?:[.,]\d+)?\s*(?:million|billion)\b/i;
const PATTERNS = [CORPUS_LITERAL, CORPUS_SPELLED];

// Legacy/backup surfaces that are not shipped routes are exempt.
const EXEMPT = [
  /\.backup\.tsx?$/,
  /[\\/]legacy-home[\\/]/,
  /[\\/]__tests__[\\/]/,
];

function isExempt(path) {
  return EXEMPT.some((re) => re.test(path));
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, out);
    } else if (/\.tsx?$/.test(entry)) {
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
    if (isExempt(file)) continue;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const pattern of PATTERNS) {
        const m = line.match(pattern);
        if (m) {
          violations.push(`${relative(process.cwd(), file)}:${i + 1}  →  ${m[0]}   ${line.trim()}`);
          break;
        }
      }
    });
  }
}

if (violations.length) {
  console.error(
    `\n✖ Corpus drift guard failed — ${violations.length} hard-coded corpus literal(s) found.\n` +
      `  Import DOMAINS_DISPLAY from "@/lib/site-stats" instead of typing the figure.\n`,
  );
  for (const v of violations) console.error("  " + v);
  console.error("");
  process.exit(1);
}

console.log("✓ Corpus drift guard passed — no hard-coded corpus literals in app/ or components/.");
