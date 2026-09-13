#!/usr/bin/env node
/**
 * Spelling guard: the register is en-US on both Datazag properties.
 *
 * The site's copy was already American in the main; what remained were
 * leaks — "visualise" in the homepage's own Observatory section, "labelling"
 * on the infrastructure-intelligence page. The Observatory ran the same rule
 * over its own source (scripts/guard-source.mjs there) and this is the same
 * list, so the two repos cannot drift apart on register.
 *
 * Comments are stripped before matching, and a match touching `_`, `.` or
 * another word character is not a match: `serviceCatalogue` and
 * `datasetCatalogue` are identifiers, not copy, and Sanity copy keys such as
 * `key: "analyse"` are lookups that must not change under a live document.
 * Copy is what a reader sees.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN = ["app", "components", "lib"].map((d) => join(ROOT, d));
const EXEMPT_DIRS = /(^|[\\/])(__tests__|guards|legacy-home)([\\/]|$)/;
const EXEMPT_FILES = /\.backup\.tsx?$/;

const BRITISH = [
  "organisations?",
  "authoris(?:e|es|ed|ation|ations)",
  "unauthorised",
  "neighbours?",
  "neighbourhoods?",
  "honoured",
  "honour",
  "(?:un)?recognis(?:e|ed|es)",
  "analys(?:e|ed|es|able)",
  "visualis(?:e|ed|es|ation)",
  "behaviours?",
  "licence",
  "programmes?",
  "centres?",
  "favours?",
  "categoris(?:e|ed|es)",
  "prioritis(?:e|ed|es)",
  "optimis(?:e|ed|es|ation)",
  "summaris(?:e|ed|es)",
  "serialis(?:e|ed|es)",
  "normalis(?:e|ed|es)",
  "standardis(?:e|ed|es)",
  "initialis(?:e|ed|es)",
  "realis(?:e|ed|es)",
  "minimis(?:e|ed|es)",
  "maximis(?:e|ed|es)",
  "capitalis(?:e|ed|es)",
  "(?:un)?labelled",
  "labelling",
  "modelled",
  "cancelled",
  "travelled",
  "signalled",
  "totalled",
  "grey",
  "per cent",
];

const PATTERN = new RegExp(`(?<![\\w.])(?:${BRITISH.join("|")})(?![\\w])`, "gi");

/** A Sanity copy key or an anchor id, which are lookups rather than copy. */
const LOOKUP = /(?:\bkey|\bid|\bhref):\s*["'#]/;

function* files(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (EXEMPT_DIRS.test(path)) continue;
    if (entry.isDirectory()) yield* files(path);
    else if (/\.(ts|tsx)$/.test(entry.name) && !EXEMPT_FILES.test(entry.name)) yield path;
  }
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^([ \t]*)\/\/.*$/gm, "$1")
    .replace(/(\s)\/\/.*$/gm, "$1");
}

const findings = [];
for (const dir of SCAN) {
  for (const path of files(dir)) {
    const file = relative(ROOT, path).split(sep).join("/");
    const lines = stripComments(readFileSync(path, "utf8")).split("\n");
    lines.forEach((line, i) => {
      if (LOOKUP.test(line)) return;
      for (const match of line.matchAll(PATTERN)) {
        findings.push(`${file}:${i + 1}  ${match[0]}`);
      }
    });
  }
}

if (findings.length) {
  console.error("✗ Spelling guard failed — British forms in copy (the register is en-US):\n");
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log("✓ Spelling guard passed — copy in app/, components/ and lib/ is en-US.");
