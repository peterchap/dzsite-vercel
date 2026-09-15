#!/usr/bin/env tsx
/**
 * Dataset-figure drift guard.
 *
 * checkCorpusDrift.mjs stops a corpus literal being typed into source under
 * app/ or components/. Dataset documentation pages open a second door: their
 * copy lives in Sanity, where an editor can type "370M" into a text field and
 * no source-scanning guard will ever see it. These pages are the documentation
 * URL on live cloud-marketplace listings, so a figure that drifts here drifts
 * in public, against a listing quoting something else.
 *
 * This guard closes that door from both sides:
 *   1. lib/datasets/fallback.ts — the committed content, scanned as source.
 *   2. Every `dataset` document in Sanity — scanned over the network.
 *
 * A hand-typed figure is a failure; the fix is a token ({{DOMAINS}},
 * {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}) resolved from lib/site-stats.ts.
 *
 * Run: npm run guard:datasets
 *
 * The Sanity pass is SKIPPED (not failed) when no project/token is configured,
 * so the guard still runs usefully in an environment without CMS credentials.
 * The fallback pass always runs.
 */
import { readFileSync } from "node:fs";

import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

/** Same shape as checkCorpusDrift.mjs: three digits + M, not part of a word. */
const CORPUS_LITERAL = /\d{3}M\+?(?![A-Za-z])/g;
/** Billions, too — an IPv4 figure typed by hand drifts the same way. */
const BILLIONS_LITERAL = /\b\d\.\d\s?B(?:illion)?\b(?![A-Za-z])/g;

const KNOWN_TOKENS = ["DOMAINS", "IPV4", "ASNS", "IPS_HOSTING"];
const TOKEN_RE = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

type Violation = { where: string; found: string; context: string };
const violations: Violation[] = [];
const warnings: string[] = [];

function scan(text: unknown, where: string): void {
  if (typeof text !== "string") return;

  for (const re of [CORPUS_LITERAL, BILLIONS_LITERAL]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      violations.push({ where, found: m[0], context: text.trim().slice(0, 120) });
    }
  }

  TOKEN_RE.lastIndex = 0;
  let t: RegExpExecArray | null;
  while ((t = TOKEN_RE.exec(text)) !== null) {
    if (!KNOWN_TOKENS.includes(t[1])) {
      warnings.push(`${where}: unknown token {{${t[1]}}} — it will render literally.`);
    }
  }
}

/** Walk every string in a document, skipping Sanity internals. */
function scanDeep(value: unknown, where: string): void {
  if (typeof value === "string") return scan(value, where);
  if (Array.isArray(value)) {
    value.forEach((v, i) => scanDeep(v, `${where}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k.startsWith("_")) continue; // _id, _type, _key, _rev, _createdAt…
      // Code snippets legitimately contain numbers (16777216, 65536…). They are
      // SQL, not claims, so they are exempt from the figure scan.
      if (k === "code") continue;
      scanDeep(v, `${where}.${k}`);
    }
  }
}

// ---- 1. Committed content (doc fallbacks + the /datasets catalog) --------
for (const path of ["lib/datasets/fallback.ts", "lib/datasets/catalog.ts"]) {
  let src = "";
  try {
    src = readFileSync(path, "utf8");
  } catch {
    console.error(`✖ Could not read ${path}`);
    process.exit(1);
  }

  src.split(/\r?\n/).forEach((line, i) => {
    // Skip the file's own header comment, which discusses the rule.
    const trimmed = line.trim();
    if (trimmed.startsWith("*") || trimmed.startsWith("//")) return;
    scan(line, `${path}:${i + 1}`);
  });
}

// ---- 2. Sanity dataset documents ----------------------------------------
async function scanSanity(): Promise<boolean> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) {
    console.log("· Sanity pass skipped — NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET not set.");
    return false;
  }

  const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
  const query = encodeURIComponent('*[_type == "dataset"]');
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      console.log(`· Sanity pass skipped — query returned ${res.status}.`);
      return false;
    }
    const body = (await res.json()) as { result?: unknown[] };
    const docs = body.result ?? [];
    for (const doc of docs) {
      const slug =
        (doc as { slug?: { current?: string } }).slug?.current ??
        (doc as { _id?: string })._id ??
        "unknown";
      scanDeep(doc, `sanity:dataset/${slug}`);
    }
    console.log(`· Scanned ${docs.length} dataset document(s) in Sanity.`);
    return true;
  } catch (err) {
    console.log(`· Sanity pass skipped — ${(err as Error).message}`);
    return false;
  }
}

// ---- Report --------------------------------------------------------------
async function main(): Promise<void> {
  await scanSanity();

  for (const w of warnings) console.warn("  ⚠ " + w);

  if (violations.length) {
    console.error(
      `\n✖ Dataset figure guard failed — ${violations.length} hand-typed figure(s) found.\n` +
        `  Dataset pages are the documentation URL on live marketplace listings; a figure\n` +
        `  typed here drifts away from lib/site-stats.ts and from the listing itself.\n` +
        `  Use a token instead: {{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}.\n`,
    );
    for (const v of violations) {
      console.error(`  ${v.where}  →  ${v.found}`);
      console.error(`      ${v.context}`);
    }
    console.error("");
    // exitCode rather than exit(): the Sanity fetch's handle is still settling,
    // and a hard exit here aborts libuv noisily on Windows.
    process.exitCode = 1;
    return;
  }

  console.log("✓ Dataset figure guard passed — no hand-typed figures in dataset copy.");
}

main().catch((err) => {
  console.error("✖ Dataset figure guard errored:", err);
  process.exit(1);
});
