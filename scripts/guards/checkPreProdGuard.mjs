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

const ROOTS = ["app", "components", "sanity", "lib"];

const RULES = [
  {
    re: /http:\/\/localhost|https?:\/\/127\.0\.0\.1|localhost:\d+/,
    why: "a developer host in shipped source — it reached production as a canonical URL",
    fix: 'default to "https://www.datazag.com", never to a local origin',
  },
  {
    re: /\b(?:TODO|FIXME|XXX)\b[:\s-]/,
    why: "an unfinished marker",
    fix: "finish it or track it outside the page source",
  },
  {
    re: /\[[^\]]*\b(?:to be specified|to be confirmed|to be added|to be determined|TBD|TBC)\b[^\]]*\]/i,
    why: "a bracketed placeholder in body copy",
    fix: "supply the real value, or do not publish the sentence",
  },
  {
    // A stub STRING VALUE, e.g. `companyNumber: "TBD"`. The bracket rule above
    // catches prose placeholders; this catches the other shape, which is how a
    // half-filled legal fact would most likely arrive once someone starts
    // filling in lib/legal-entity.ts. Anchored to an assignment so ordinary
    // prose containing these letters is untouched.
    // NOT "N/A": `value ? fmt(value) : "N/A"` is a correct UI fallback for a
    // metric that genuinely has no value, not an unfinished field.
    re: /[:=]\s*["'`](?:TBD|TBC|xxx+|\?\?+|FILL ?ME|CHANGE ?ME)["'`]/i,
    why: "a stub value standing in for a real one",
    fix: "supply the real value, or leave the field null so the renderer omits it",
  },
  {
    // Narrow on purpose: "Use this page for report requests" on /contact is
    // addressed to the visitor and is fine. Only the author-facing phrasings
    // that actually shipped are caught.
    re: /\bUse this (?:area|space) (?:for|to)\b|\bshould explain the model\b|\bGood first posts\b|\bContent backlog\b|\bView topic ideas\b|\bfor future newsletter capture\b/i,
    why: "instructional copy addressed to the author, not the reader",
    fix: "write for the visitor, or delete the block",
  },
];

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
