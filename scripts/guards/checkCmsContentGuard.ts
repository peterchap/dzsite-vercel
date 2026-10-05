#!/usr/bin/env tsx
/**
 * CMS PUBLISHING GATE (WU-C2) — the other half of the pre-production guard.
 *
 * checkPreProdGuard.mjs scans SOURCE. But most of this site's copy is written
 * in Sanity, where no source-scanning guard will ever see it — which is exactly
 * how the About editorial sentence, the blog's authoring instructions and the
 * jurisdiction placeholder all reached production. Closing only the source door
 * leaves the door most editors actually use standing open.
 *
 * This guard applies the SAME rule list (scripts/guards/preProdRules.mjs) to
 * every published document in the dataset, and adds the one check that only
 * makes sense against a CMS:
 *
 *   DRAFT REFERENCES — standing criterion 6: no published page links to a
 *   Draft-status document. In Sanity a draft lives at `drafts.<id>`; a
 *   published document referencing an id that exists ONLY as a draft renders a
 *   link to something the public cannot see. A reference to an id that exists
 *   in neither is a dangling reference and is reported too.
 *
 * CLAIM RULES — it also applies the retired and unmeasured accuracy claims
 * (scripts/guards/claimRules.mjs), the same list checkClaimGuard.mjs runs on
 * source. Before 2026-09-28 it did not, which is how a legacy CMS page
 * published "<5% false positives" undetected.
 *
 * Claim rules skip documents that cannot render: `page` docs whose slug is
 * retired in lib/legacy-redirects.ts, and the docs in UNRENDERED_DOCS below.
 * Each of those names the code that keeps it off the site. If that code
 * changes, the exemption lapses and the doc is scanned again.
 *
 * SKIP, DON'T FAIL, when unconfigured: with no project/dataset the Sanity pass
 * is skipped rather than failed, matching checkDatasetFigures.ts, so the guard
 * still runs usefully in an environment without CMS credentials. It means CI
 * must have the credentials for this gate to bite — noted in the summary line
 * so a skip is never mistaken for a pass.
 *
 * Run: npm run guard:cms   (part of `npm run guard`)
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { config as loadEnv } from "dotenv";

import { isRetiredPath } from "../../lib/legacy-redirects";
import { CLAIM_RULES } from "./claimRules.mjs";
import { PRE_PROD_RULES } from "./preProdRules.mjs";

loadEnv({ path: ".env.local" });

type Rule = { re: RegExp; why: string; fix: string };
const RULES = PRE_PROD_RULES as Rule[];
const CLAIMS: Rule[] = (CLAIM_RULES as Array<{ re: RegExp; why: string }>).map((r) => ({
  ...r,
  fix: "describe the mechanism or the alert contents instead; a measured rate returns only via /trust/methodology (lib/fp-status.ts)",
}));

/**
 * CMS docs that exist but cannot render, so claim rules skip them.
 *
 * Each entry was checked on https://www.datazag.com on 2026-09-28: the claim
 * text is not on any live page. `route` is a file that must exist and `unused`
 * lists names that no file in app/, components/ or lib/ may mention. Those are
 * what keep the doc off the site. If either stops holding, main() drops the
 * exemption and the doc is scanned again.
 *
 * To clear one for good, fix or delete the doc in Sanity and remove the entry.
 */
export type UnrenderedDoc = { id: string; reason: string; route?: string; unused?: string[] };

// The pricingPage, howItWorksHero and brand-protection page docs were listed here
// until 2026-09-29, when they were deleted from Sanity. page.home was listed until
// 2026-10-05, when it was no longer published.
//
// page.about (2026-10-05): the old CMS-built about page. Its ID has a dot, so it is
// private (token reads only), and other docs still reference it from CTAs. It does
// not render: the code route below owns /about and wins over the [...slug] catch-all.
// Its stale copy (", webhooks") can only reach the site if that route is removed.
export const UNRENDERED_DOCS: UnrenderedDoc[] = [
  {
    id: "page.about",
    reason: "page doc with slug 'about'. app/(marketing)/about/page.tsx owns /about (copy from marketingPageCopy 'about'), so the [...slug] page never renders it.",
    route: "app/(marketing)/about/page.tsx",
  },
];

export type Violation = { where: string; found: string; why: string; fix: string; context: string };
export type DraftRef = { ref: string; where: string };
export type Exempted = { id: string; reason: string };
export type ScanResult = { violations: Violation[]; draftRefs: DraftRef[]; exempted: Exempted[] };
export type ScanOptions = { unrendered?: UnrenderedDoc[] };

/** Why claim rules skip this doc, or null if it can render and is scanned. */
export function unrenderedReason(doc: Record<string, unknown>, unrendered: UnrenderedDoc[]): string | null {
  const listed = unrendered.find((u) => u.id === doc._id);
  if (listed) return listed.reason;
  const slug = (doc.slug as { current?: unknown } | undefined)?.current;
  if (doc._type === "page" && typeof slug === "string" && isRetiredPath(slug)) {
    return `page doc with slug '${slug}', retired in lib/legacy-redirects.ts`;
  }
  return null;
}

/**
 * Fields that legitimately carry non-prose. `code` holds SQL and snippets that
 * may contain a localhost example; `slug`/`href` are checked for placeholders
 * by shape elsewhere. Keys are matched on the LAST path segment.
 */
const EXEMPT_FIELDS = new Set(["code", "_rev", "_key", "_id", "_type"]);

/**
 * Pure scan over a set of published documents. Separated from the fetch so it
 * can be exercised without CMS credentials — a guard that only runs where it
 * cannot be tested is a guard nobody has checked. See __tests__ usage in
 * checkCmsContentGuard.selftest.ts.
 */
export function scanDocuments(docs: Array<Record<string, unknown>>, opts: ScanOptions = {}): ScanResult {
  const unrendered = opts.unrendered ?? UNRENDERED_DOCS;
  const violations: Violation[] = [];
  const refs: DraftRef[] = [];
  const exempted: Exempted[] = [];

  function scanString(text: string, where: string, rules: Rule[]): void {
    for (const rule of rules) {
      const m = text.match(rule.re);
      if (m) {
        violations.push({
          where,
          found: m[0].trim(),
          why: rule.why,
          fix: rule.fix,
          context: text.trim().slice(0, 160),
        });
        return; // one finding per string is enough to act on
      }
    }
  }

  function scanDeep(value: unknown, where: string, rules: Rule[][]): void {
    if (typeof value === "string") {
      for (const set of rules) scanString(value, where, set);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => scanDeep(v, `${where}[${i}]`, rules));
      return;
    }
    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if (typeof obj._ref === "string") refs.push({ ref: obj._ref, where });
      for (const [k, v] of Object.entries(obj)) {
        if (k.startsWith("_")) continue;
        if (EXEMPT_FIELDS.has(k)) continue;
        scanDeep(v, `${where}.${k}`, rules);
      }
    }
  }

  const publishedIds = new Set(docs.map((d) => String(d._id)));
  for (const doc of docs) {
    // Pre-production rules run on every doc, as before. Claim rules skip docs
    // that cannot render: a claim nobody can see is not a published claim.
    const reason = unrenderedReason(doc, unrendered);
    if (reason) exempted.push({ id: String(doc._id), reason });
    scanDeep(doc, `${String(doc._type)}:${String(doc._id)}`, reason ? [RULES] : [RULES, CLAIMS]);
  }

  // Standing criterion 6 — a published document must not point at a draft.
  const draftRefs = refs.filter((r) => !publishedIds.has(r.ref));
  return { violations, draftRefs, exempted };
}

/** Every .ts/.tsx/.mjs/.js file under the given roots. */
function sourceFiles(roots: string[]): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry !== "node_modules" && entry !== ".next") walk(full);
      } else if (/\.(?:tsx?|m?js)$/.test(entry)) {
        out.push(full);
      }
    }
  };
  for (const root of roots) if (existsSync(root)) walk(root);
  return out;
}

/**
 * Splits UNRENDERED_DOCS into entries whose reason still holds in source and
 * entries that lapsed. A lapsed entry is scanned like any other doc.
 */
export function confirmUnrendered(list: UnrenderedDoc[]): { held: UnrenderedDoc[]; lapsed: Array<UnrenderedDoc & { why: string }> } {
  const code = sourceFiles(["app", "components", "lib"]).map((f) => ({ f, text: readFileSync(f, "utf8") }));
  const held: UnrenderedDoc[] = [];
  const lapsed: Array<UnrenderedDoc & { why: string }> = [];
  for (const u of list) {
    if (u.route && !existsSync(u.route)) {
      lapsed.push({ ...u, why: `${u.route} no longer exists` });
      continue;
    }
    const hit = (u.unused ?? []).flatMap((name) => code.filter((c) => c.text.includes(name)).map((c) => `${c.f} mentions ${name}`));
    if (hit.length) {
      lapsed.push({ ...u, why: hit[0] });
      continue;
    }
    held.push(u);
  }
  return { held, lapsed };
}

async function main(): Promise<void> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    console.log(
      "· CMS publishing gate SKIPPED — NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET not set.\n" +
        "  This gate only bites where the CMS is reachable. Set the credentials in CI.",
    );
    return;
  }

  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
  // Published documents only — drafts are meant to be unfinished.
  const query = encodeURIComponent('*[!(_id in path("drafts.**"))]');
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;

  let docs: Array<Record<string, unknown>>;
  try {
    const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    if (!res.ok) {
      console.log(`· CMS publishing gate SKIPPED — query returned ${res.status}.`);
      return;
    }
    docs = ((await res.json()) as { result?: Array<Record<string, unknown>> }).result ?? [];
  } catch (err) {
    console.log(`· CMS publishing gate SKIPPED — ${(err as Error).message}`);
    return;
  }

  const { held, lapsed } = confirmUnrendered(UNRENDERED_DOCS);
  for (const u of lapsed) {
    console.log(`· Exemption lapsed for ${u.id}: ${u.why}. Scanning it with the claim rules.`);
  }
  const ids = new Set(docs.map((d) => String(d._id)));
  for (const u of held.filter((h) => !ids.has(h.id))) {
    console.log(`· Stale exemption: ${u.id} is no longer published. Remove it from UNRENDERED_DOCS.`);
  }

  const { violations, draftRefs, exempted } = scanDocuments(docs, { unrendered: held });

  if (violations.length || draftRefs.length) {
    console.error(
      `\n✖ CMS publishing gate failed — ${violations.length} content issue(s), ` +
        `${draftRefs.length} unpublished reference(s).\n`,
    );
    for (const v of violations) {
      console.error(`  ${v.where}  →  ${v.found}`);
      console.error(`     ${v.why}`);
      console.error(`     fix: ${v.fix}`);
      console.error(`     ${v.context}\n`);
    }
    for (const d of draftRefs) {
      console.error(`  ${d.where}  →  references ${d.ref}, which is not published`);
      console.error(`     a published page must not link to a Draft-status document`);
      console.error(`     fix: publish the target, or remove the link\n`);
    }
    process.exit(1);
  }

  console.log(
    `✓ CMS publishing gate passed — ${docs.length} published document(s), ` +
      `no placeholders, dev hosts, author-facing copy, retired claims or draft references. ` +
      `${exempted.length} unrendered doc(s) skipped for claim rules.`,
  );
}

// Run the network pass only when this file is the entry point. The self-test
// imports scanDocuments from here, and its filename also contains the guard's
// name, so "selftest" is excluded explicitly.
const entry = process.argv[1] ?? "";
const invokedDirectly = entry.includes("checkCmsContentGuard") && !entry.includes("selftest");

if (invokedDirectly) {
  main().catch((err) => {
    console.error("✖ CMS publishing gate errored:", err);
    process.exit(1);
  });
}
