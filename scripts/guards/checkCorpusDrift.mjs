#!/usr/bin/env node
/**
 * Corpus-figure drift guard (WU25 §2).
 *
 * The corpus domain count is the single source of truth in lib/site-stats.ts.
 * This guard fails the build if a corpus-style literal (three digits followed
 * by "M", e.g. 315M / 330M / 340M+) is typed directly into page source under
 * app/ or components/ — every surface must import DOMAINS_DISPLAY instead.
 *
 * Run: node scripts/guards/checkCorpusDrift.mjs   (wired as part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components"];
// Three digits + M, not followed by another letter (excludes "MB", "Mbps", "Ms").
const CORPUS_LITERAL = /\d{3}M\+?(?![A-Za-z])/;

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
      const m = line.match(CORPUS_LITERAL);
      if (m) {
        violations.push(`${relative(process.cwd(), file)}:${i + 1}  →  ${m[0]}   ${line.trim()}`);
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
