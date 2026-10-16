#!/usr/bin/env node
/**
 * Price guard (brief: report pricing ladder, 8 Oct 2026, Phase 1).
 *
 * Every price on datazag.com comes from the shared pricing config
 * (@datazag/site-chrome/pricing, read through lib/pricing.ts). This guard fails the build
 * when a price is typed into source instead: a currency amount ("$99", "£1,995"), or a
 * {{PRICE:cents}} marker with a typed number (markers are built from the config at
 * runtime: `{{PRICE:${...}}}`).
 *
 * Partner pages (brief: partner page closing sections, 13 Oct 2026) are held to more: the
 * MSSP, ESP and insurer pages, their offer content and their components name product ids
 * and never a price, so any currency amount or "/mo" there fails. They also must not say
 * terms are "handled privately": list prices are public.
 *
 * Scope: app/, components/ and lib/ (.ts, .tsx). Comment lines are skipped. CMS content
 * is covered by checkCmsContentGuard.ts through claimRules.mjs.
 *
 * Run: node scripts/guards/checkPriceGuard.mjs   (part of `npm run guard`)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIRS = ["app", "components", "lib"];
const SKIP = [/lib\/site-stats\.generated\.ts$/];
const RULES = [
  { re: /[$£€]\s?\d{2,}/, why: "a price typed into source (read it from lib/pricing.ts)" },
  { re: /\{\{PRICE:\d/, why: "a {{PRICE:cents}} marker with a typed amount (build it from lib/pricing.ts)" },
];
const PARTNER_FILES = [
  /^app\/\(marketing\)\/(mssp-partners|esp-partners|cyber-risk-underwriting)\//,
  /^components\/partners\//,
  /^lib\/partner-offers\.ts$/,
];
const PARTNER_RULES = [
  { re: /[$£€]\s?\d/, why: "a price typed into a partner page (name a product id; lib/pricing.ts renders the price)" },
  { re: /\/(?:mo|yr|month|year)\b/, why: "a billing period typed into a partner page (lib/pricing.ts adds it)" },
  { re: /handled privately/i, why: "partner pages do not say terms are handled privately (list prices are on /pricing)" },
];
const isComment = (line) => /^\s*(?:\/\/|\/?\*|\{\s*\/\*)/.test(line);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(name)) out.push(full);
  }
  return out;
}

const hits = [];
for (const dir of DIRS) {
  for (const full of walk(dir)) {
    const file = relative(".", full).replaceAll("\\", "/");
    if (SKIP.some((re) => re.test(file))) continue;
    readFileSync(full, "utf8").split(/\r?\n/).forEach((line, i) => {
      if (isComment(line)) return;
      const rules = PARTNER_FILES.some((re) => re.test(file)) ? [...RULES, ...PARTNER_RULES] : RULES;
      for (const { re, why } of rules) {
        if (re.test(line)) hits.push(`${file}:${i + 1}  ${why}\n    ${line.trim().slice(0, 140)}`);
      }
    });
  }
}

if (hits.length) {
  console.error(`✗ Price guard: ${hits.length} typed price(s). Read prices from lib/pricing.ts.\n`);
  for (const h of hits) console.error(`  ${h}`);
  process.exit(1);
}
console.log("✓ Price guard passed — no typed prices in app/, components/ or lib/; every price comes from the shared pricing config.");
