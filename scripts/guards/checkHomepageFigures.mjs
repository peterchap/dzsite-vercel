#!/usr/bin/env node
/**
 * Homepage figures guard (demand-generation brief, 7 Oct 2026).
 *
 * Every figure and price on the homepage is read at request time: coverage from
 * website-stats, Observatory figures from its published statistics, prices from the
 * portal. This guard fails the build if a figure or a price is typed into the
 * homepage source, or if one of the claims the brief forbids appears there.
 *
 * Scope: components/home/** and the homepage routes. Comment lines are skipped (a
 * comment cannot reach the page), and so are lines holding only class names.
 *
 * Run: node scripts/guards/checkHomepageFigures.mjs   (part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const FILES = ["app/page.tsx", "app/(marketing)/page.tsx"];
const DIRS = ["components/home"];

const RULES = [
  // Figures and prices.
  { re: /[$£€]\s?\d/, why: "a price typed into the homepage (read it from the portal)" },
  { re: /\b\d{1,3}(?:,\d{3})+\b/, why: "a grouped number typed into the homepage (read it from website-stats)" },
  { re: /\b\d+(?:\.\d+)?\s?[KMB]\+?(?![A-Za-z0-9])/, why: "a count like 373.2M typed into the homepage (read it from website-stats)" },
  { re: /\b\d+(?:\.\d+)?\s?(?:thousand|million|billion)\b/i, why: "a spelled-out count typed into the homepage" },
  { re: /(?<![\w\[-])\d+(?:\.\d+)?\s?%/, why: "a percentage typed into the homepage (read it from the Observatory)" },
  // Claims the brief forbids.
  { re: /\bpredictive\b/i, why: "say \"pre-compromise\", never \"predictive\"" },
  { re: /\banaly[sz]e[sd]?\b[^.]{0,60}\bdomains?\b[^.]{0,20}\bdaily\b/i, why: "a whole-corpus daily claim (the corpus refreshes over about two months)" },
  { re: /\bevery\s+domain\b[^.]{0,30}\b(?:daily|every day)\b/i, why: "a whole-corpus daily claim" },
  { re: /\bbefore\b[^.]{0,30}\b(?:threat\s+)?(?:feeds?|blocklists?|blacklists?)\b/i, why: "a lead-time claim (not yet measured)" },
  { re: /\b(?:hours?|days?|weeks?)\s+(?:ahead|earlier|before)\b/i, why: "a lead-time claim (not yet measured)" },
  { re: /\b(?:spamhaus|urlhaus|threatfox|openphish|phishtank|virustotal|safe\s?browsing|web\s?risk|surbl|abuse\.ch)\b/i, why: "a third-party feed named on the homepage" },
  { re: /\.ph\b/, why: "the embargoed registry-wildcard TLD" },
];

const isComment = (line) => /^\s*(?:\/\/|\/?\*|\{\s*\/\*)/.test(line);
// A line that is only Tailwind classes (className="..." or a const of classes).
const isClassOnly = (line) => /^\s*(?:className=|const\s+\w+(?:Class|Btn)\s*=|"[\w\s:/\-\[\].%()#,]*"[;,]?$)/.test(line);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(?:tsx?|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

const files = [...FILES, ...DIRS.flatMap((d) => walk(d))];
const violations = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (isComment(line) || isClassOnly(line)) return;
    // Tailwind class strings inside a line are not copy.
    const text = line.replace(/className=(?:"[^"]*"|\{`[^`]*`\})/g, "");
    for (const rule of RULES) {
      const m = text.match(rule.re);
      if (m) {
        violations.push(`${relative(process.cwd(), file)}:${i + 1}  →  ${m[0]}   (${rule.why})`);
        break;
      }
    }
  });
}

if (violations.length) {
  console.error(`\n✖ Homepage figures guard failed — ${violations.length} problem(s):\n`);
  for (const v of violations) console.error("  " + v);
  console.error("");
  process.exit(1);
}

console.log(`✓ Homepage figures guard passed — ${files.length} file(s), no typed figures, prices or forbidden claims.`);
