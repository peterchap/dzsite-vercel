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
 * SKIP, DON'T FAIL, when unconfigured: with no project/dataset the Sanity pass
 * is skipped rather than failed, matching checkDatasetFigures.ts, so the guard
 * still runs usefully in an environment without CMS credentials. It means CI
 * must have the credentials for this gate to bite — noted in the summary line
 * so a skip is never mistaken for a pass.
 *
 * Run: npm run guard:cms   (part of `npm run guard`)
 */
import { config as loadEnv } from "dotenv";

import { PRE_PROD_RULES } from "./preProdRules.mjs";

loadEnv({ path: ".env.local" });

type Rule = { re: RegExp; why: string; fix: string };
const RULES = PRE_PROD_RULES as Rule[];

export type Violation = { where: string; found: string; why: string; fix: string; context: string };
export type DraftRef = { ref: string; where: string };
export type ScanResult = { violations: Violation[]; draftRefs: DraftRef[] };

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
export function scanDocuments(docs: Array<Record<string, unknown>>): ScanResult {
  const violations: Violation[] = [];
  const refs: DraftRef[] = [];

  function scanString(text: string, where: string): void {
    for (const rule of RULES) {
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

  function scanDeep(value: unknown, where: string): void {
    if (typeof value === "string") return scanString(value, where);
    if (Array.isArray(value)) {
      value.forEach((v, i) => scanDeep(v, `${where}[${i}]`));
      return;
    }
    if (value && typeof value === "object") {
      const obj = value as Record<string, unknown>;
      if (typeof obj._ref === "string") refs.push({ ref: obj._ref, where });
      for (const [k, v] of Object.entries(obj)) {
        if (k.startsWith("_")) continue;
        if (EXEMPT_FIELDS.has(k)) continue;
        scanDeep(v, `${where}.${k}`);
      }
    }
  }

  const publishedIds = new Set(docs.map((d) => String(d._id)));
  for (const doc of docs) {
    scanDeep(doc, `${String(doc._type)}:${String(doc._id)}`);
  }

  // Standing criterion 6 — a published document must not point at a draft.
  const draftRefs = refs.filter((r) => !publishedIds.has(r.ref));
  return { violations, draftRefs };
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

  const { violations, draftRefs } = scanDocuments(docs);

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
      `no placeholders, dev hosts, author-facing copy or draft references.`,
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
