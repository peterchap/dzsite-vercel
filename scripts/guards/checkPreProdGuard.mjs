#!/usr/bin/env node
/**
 * Pre-production content guard (WU-C1 root cause; first slice of WU-C2).
 *
 * Five defects shipped to production that were not five copy errors — they were
 * one missing publishing gate, five times:
 *
 *   - the About sentence "About Datazag should explain the model, not repeat
 *     every product page" (a note to the writer, rendered to the reader)
 *   - the blog's own authoring instructions as body copy, plus a "View topic
 *     ideas" button that scrolled visitors into the content backlog
 *   - `canonical: http://localhost:3001/use-cases` on a production page
 *   - a "[jurisdiction to be specified]" placeholder in the Terms
 *
 * This guard fails the build on the source-side shapes of all four. It is
 * deliberately narrow: every pattern below matches something that actually
 * reached www.datazag.com, so a hit is a real regression, not a style opinion.
 *
 * SCOPE LIMIT — this reads SOURCE only. Page copy authored in Sanity is not
 * covered here; that is the remaining half of WU-C2 (see checkDatasetFigures.ts
 * for the precedent of a guard that also scans the CMS over the network).
 *
 * Run: node scripts/guards/checkPreProdGuard.mjs   (part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { PRE_PROD_RULES as RULES } from "./preProdRules.mjs";

const ROOTS = ["app", "components", "sanity", "lib"];

/**
 * Files where a pattern is legitimate. Each entry needs a reason — an exemption
 * without one is how a guard quietly stops guarding.
 */
const EXEMPT = [
  { re: /\.backup\.tsx?$/, why: "not a shipped route" },
  { re: /(?:^|[\\/])legacy-home[\\/]/, why: "reference copy of the old homepage" },
  { re: /(?:^|[\\/])__tests__[\\/]/, why: "test fixtures" },
  {
    re: /(?:^|[\\/])sanity[\\/]lib[\\/]PreviewAction\.tsx$/,
    why: "Studio-only dev preview base; never rendered on a public page",
  },
  {
    re: /(?:^|[\\/])scripts[\\/]guards[\\/]/,
    why: "the guards themselves quote the patterns they catch",
  },
  {
    re: /(?:^|[\\/])components[\\/]ui[\\/]/,
    why: "vendored shadcn primitives; Tailwind bracket syntax, no prose",
  },
];

function exemption(path) {
  return EXEMPT.find((e) => e.re.test(path));
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full, out);
    } else if (/\.(?:tsx?|mjs)$/.test(entry)) {
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
    if (exemption(file)) continue;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const rule of RULES) {
        const m = line.match(rule.re);
        if (m) {
          violations.push({
            where: `${relative(process.cwd(), file)}:${i + 1}`,
            hit: m[0].trim(),
            why: rule.why,
            fix: rule.fix,
            line: line.trim(),
          });
          break;
        }
      }
    });
  }
}

if (violations.length) {
  console.error(
    `\n✖ Pre-production guard failed — ${violations.length} item(s) that must not ship.\n`,
  );
  for (const v of violations) {
    console.error(`  ${v.where}  →  ${v.hit}`);
    console.error(`     ${v.why}`);
    console.error(`     fix: ${v.fix}`);
    console.error(`     ${v.line}\n`);
  }
  process.exit(1);
}

console.log("✓ Pre-production guard passed — no author-facing copy, placeholders or dev hosts in source.");
