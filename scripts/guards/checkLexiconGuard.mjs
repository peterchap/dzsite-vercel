#!/usr/bin/env node
/**
 * LEXICON GUARD (WU-C4) — one approved term per concept, enforced.
 *
 * This file IS the lexicon. The brief asked for the approved terms to be
 * "documented, enforced in CI as a banned-phrase list"; keeping the document
 * and the enforcement in one place is the only version that stays true — a
 * lexicon in a wiki drifts from the guard within a quarter.
 *
 * WHY THIS EXISTS. Four names for one product were in public circulation at
 * once: "Infrastructure Intelligence" (homepage, footer, About), "Domain
 * Intelligence" (Enterprise H1), "predictive domain intelligence" (in the
 * TERMS OF SERVICE — the stalest phrase on the site was in the contract) and
 * "Log Analytics" (a legacy page still indexed). Plus "DataZag" mid-sentence
 * and en-GB spellings against an en-US standardisation decision.
 *
 * NOT BANNED: "Domain Intelligence" on its own. It is a real product and a
 * real route (/domain-intelligence), and About states the relationship
 * plainly — domain intelligence is a SUBSET of the wider infrastructure
 * picture. Only the "predictive …" construction is retired. A guard that
 * banned the subset term would be wrong about the product.
 *
 * Run: node scripts/guards/checkLexiconGuard.mjs   (part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["app", "components", "sanity", "lib"];

/** Retired terms. `use` is the approved replacement, quoted in the failure. */
const BANNED_TERMS = [
  {
    re: /predictive domain intelligence/i,
    use: "Infrastructure Intelligence",
    why: "retired positioning; it outlived the company that used it",
  },
  {
    re: /\bLog Analytics\b/,
    use: "Threat Alerts (/alerts)",
    why: "old-site product name; the route is retired in lib/legacy-redirects.ts",
  },
  {
    re: /DataZag/,
    use: "Datazag",
    why: "the brand has one capital",
  },
];

/**
 * en-US standardisation. Each entry is the en-GB spelling and its en-US form.
 *
 * Matching is deliberately narrow, because this list is the one most likely to
 * produce noise:
 * Matching runs ONLY over prose — quoted strings and JSX text that contain a
 * space. Everything else on a line is code, and code is not copy:
 *   - `catalogue: {`, `const catalogue =`, `href: "#catalogue"` and
 *     `key: "analyse"` are identifiers, object keys and anchors. The text they
 *     render ("See the paid reports", "Analyze") is already en-US. Renaming
 *     them would be churn with no reader-visible effect.
 *   - `processing_authorisation` is a form field name on the contract between
 *     the contact form and its route handler; renaming it breaks submission,
 *     and no visitor ever reads it.
 * A single-word string is always a key, slug or anchor — never a sentence —
 * so requiring a space is what separates the two reliably.
 *
 * Comment lines are skipped for the same reason: comments are not copy.
 */
const EN_GB = [
  ["visualise", "visualize"], ["visualisation", "visualization"],
  ["organise", "organize"], ["organisation", "organization"], ["organisational", "organizational"],
  ["analyse", "analyze"], ["normalise", "normalize"], ["standardise", "standardize"],
  ["authorise", "authorize"], ["authorisation", "authorization"], ["authorised", "authorized"],
  ["unauthorised", "unauthorized"],
  ["optimise", "optimize"], ["recognise", "recognize"], ["summarise", "summarize"],
  ["minimise", "minimize"], ["maximise", "maximize"], ["prioritise", "prioritize"],
  ["customise", "customize"], ["personalise", "personalize"], ["specialise", "specialize"],
  ["behaviour", "behavior"], ["colour", "color"], ["defence", "defense"],
  ["centre", "center"], ["catalogue", "catalog"], ["licence", "license"],
  // Folded in from checkSpelling.mjs when the Observatory branch was rebased: that
  // guard scanned the same tree for the same thing, and two spelling guards is one
  // more than can be kept in step. These are the terms it had that this list did not.
  ["neighbour", "neighbor"], ["honour", "honor"],
  ["programme", "program"], ["favour", "favor"],
  ["categorise", "categorize"], ["serialise", "serialize"], ["initialise", "initialize"],
  ["realise", "realize"], ["capitalise", "capitalize"],
  ["labelled", "labeled"], ["labelling", "labeling"], ["modelled", "modeled"],
  ["cancelled", "canceled"], ["travelled", "traveled"], ["signalled", "signaled"], ["totalled", "totaled"],
  ["grey", "gray"], ["per cent", "percent"],
];

const EXEMPT = [
  { re: /\.backup\.tsx?$/, why: "not a shipped route" },
  { re: /(?:^|[\\/])legacy-home[\\/]/, why: "reference copy of the old homepage" },
  { re: /(?:^|[\\/])__tests__[\\/]/, why: "test fixtures" },
  {
    re: /(?:^|[\\/])lib[\\/]legacy-redirects\.ts$/,
    why: "names the retired terms in order to retire them",
  },
  {
    re: /(?:^|[\\/])components[\\/]site[\\/]Footer\.tsx$/,
    why: "defensively rejects CMS copy containing the retired phrase, so it must name it",
  },
  {
    re: /(?:^|[\\/])components[\\/]ui[\\/]/,
    why: "vendored shadcn primitives",
  },
];

const isExempt = (path) => EXEMPT.some((e) => e.re.test(path));

/** A comment line, by the cheap test that covers this codebase's style. */
const isCommentLine = (line) => /^\s*(?:\/\/|\/\*|\*)/.test(line);

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

/**
 * Prose on a line: quoted strings and JSX text nodes that contain a space.
 * A one-word string is a key, slug or anchor, not a sentence.
 */
function proseSegments(line) {
  const out = [];
  const quoted = line.matchAll(/"([^"\n]*)"|'([^'\n]*)'|`([^`\n]*)`/g);
  for (const m of quoted) {
    const text = m[1] ?? m[2] ?? m[3] ?? "";
    if (/\s/.test(text)) out.push(text);
  }
  // JSX text between tags on one line, e.g. <p>Some copy here</p>
  for (const m of line.matchAll(/>([^<>{}]*[A-Za-z][^<>{}]*)</g)) {
    const text = m[1];
    if (/\s/.test(text)) out.push(text);
  }
  // A JSX text node on its OWN line — the common shape for body copy:
  //     <p className="mb-8">
  //         Datazag implements appropriate technical measures ...
  //     </p>
  // The first version of this guard required an opening and closing tag on the
  // same line and so read straight past every multi-line paragraph on the
  // site, including a real en-GB spelling in the DPA. A line carrying no code
  // punctuation at all is prose.
  const bare = line.trim();
  if (bare && !/[<>{}()=;`"']/.test(bare) && /[A-Za-z]\s+[A-Za-z]/.test(bare)) {
    out.push(bare);
  }
  return out;
}

/** en-GB word appearing in prose. */
function findEnGb(line) {
  const segments = proseSegments(line);
  if (segments.length === 0) return null;
  for (const [gb, us] of EN_GB) {
    const re = new RegExp(`(^|[^A-Za-z_])(${gb})(?![A-Za-z_])`, "i");
    for (const seg of segments) {
      const m = seg.match(re);
      if (m) return { hit: m[2], use: us, why: "en-US is the standardised spelling" };
    }
  }
  return null;
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
      const where = `${relative(process.cwd(), file)}:${i + 1}`;
      for (const term of BANNED_TERMS) {
        const m = line.match(term.re);
        if (m) {
          violations.push({ where, hit: m[0], use: term.use, why: term.why, line: line.trim() });
          return;
        }
      }
      if (isCommentLine(line)) return;
      const gb = findEnGb(line);
      if (gb) violations.push({ where, ...gb, line: line.trim() });
    });
  }
}

if (violations.length) {
  console.error(`\n✖ Lexicon guard failed — ${violations.length} off-lexicon term(s).\n`);
  for (const v of violations) {
    console.error(`  ${v.where}  →  ${v.hit}`);
    console.error(`     ${v.why}`);
    console.error(`     use: ${v.use}`);
    console.error(`     ${v.line}\n`);
  }
  process.exit(1);
}

console.log("✓ Lexicon guard passed — one approved term per concept, en-US throughout.");
