#!/usr/bin/env node
/**
 * CONFIG JSON VALIDITY GUARD.
 *
 * vercel.json shipped to master as INVALID JSON: a commit adding the git
 * deployment setting appended a second object after the closing brace —
 *
 *     { "version": 2, ... }
 *     { "git": { "deploymentEnabled": false } }
 *
 * — rather than adding a key inside the first. Two concatenated objects parse
 * as neither.
 *
 * That defect is unusually quiet. Nothing in the test suite reads vercel.json,
 * `next build` never opens it, and every guard in this directory scans .ts/.tsx
 * source, so all eight passed over it. The only consumer is Vercel, at deploy
 * time, which is the worst possible moment to discover it: the config that
 * governs deployment is also the thing that breaks it, so the failure lands
 * when you are trying to ship and not before.
 *
 * A JSON.parse of each config file would have caught it in a second.
 *
 * Run: node scripts/guards/checkConfigJson.mjs   (part of `npm run guard`)
 */
import { readFileSync, existsSync } from "node:fs";

/** Config files whose consumer is outside this repo's own tooling. */
const FILES = [
  { path: "vercel.json", why: "read only by Vercel at deploy time" },
  { path: "package.json", why: "read by npm" },
  { path: "tsconfig.json", why: "read by tsc", allowComments: true },
  { path: ".sanity/runtime/app.js", skip: true },
];

const failures = [];
let checked = 0;

for (const entry of FILES) {
  if (entry.skip) continue;
  if (!existsSync(entry.path)) continue;

  let raw;
  try {
    raw = readFileSync(entry.path, "utf8");
  } catch (err) {
    failures.push(`${entry.path}: unreadable — ${err.message}`);
    continue;
  }

  // Parse the RAW text first. Only if that fails do we retry with comments
  // stripped, because naive comment-stripping does not respect string
  // literals — the first version of this guard ate `"@/*": ["./*"]` in
  // tsconfig.json, mistaking the `/*` inside a path alias for a comment, and
  // reported a perfectly valid file as broken. Raw-first means a valid file is
  // never mangled on the way to being checked.
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (rawErr) {
    if (!entry.allowComments) {
      failures.push(
        `${entry.path}: INVALID JSON — ${rawErr.message}\n` +
          `     ${entry.why}, so nothing else in this repo would have told you.\n` +
          `     A second top-level object appended after the closing brace is the\n` +
          `     shape that caused this guard to exist; add the key INSIDE instead.`,
      );
      continue;
    }
    const stripped = raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    try {
      parsed = JSON.parse(stripped);
    } catch {
      failures.push(`${entry.path}: INVALID JSON even with comments stripped — ${rawErr.message}`);
      continue;
    }
  }

  {
    if (parsed === null || typeof parsed !== "object") {
      failures.push(`${entry.path}: parsed, but is not an object (${entry.why})`);
      continue;
    }
    checked++;
  }
}

if (failures.length) {
  console.error(`\n✖ Config JSON guard failed — ${failures.length} file(s) will not parse.\n`);
  for (const f of failures) console.error("  " + f + "\n");
  process.exit(1);
}

console.log(`✓ Config JSON guard passed — ${checked} config file(s) parse.`);
