/**
 * Seed the Sanity `dataset` documents from the committed fallbacks.
 *
 * The fallbacks in lib/datasets/fallback.ts keep a marketplace-submitted URL
 * alive when Sanity has nothing; this script puts that same content INTO
 * Sanity so it becomes editable. Run once per dataset, then edit in Studio —
 * after that, Sanity is the source of truth for the copy and re-running this
 * would overwrite an editor's work.
 *
 * That is why it uses createIfNotExists, not createOrReplace: re-running is a
 * no-op on documents that already exist. Pass --force to overwrite anyway.
 *
 *   node scripts/seedDatasets.mjs                (safe: create only)
 *   node scripts/seedDatasets.mjs --force        (overwrite existing)
 *   node scripts/seedDatasets.mjs --slug=ip-asn-intelligence
 *
 * Needs a WRITE token in .env.local. SANITY_WRITE_TOKEN is preferred and is
 * checked first: SANITY_API_TOKEN in this repo is the read-only token the site
 * reads with, and reaching for it here fails with a 403 that reads like a
 * permissions problem rather than the wrong-variable problem it actually is.
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";

dotenv.config({ path: ".env.local" });

const token =
  process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error(
    "✖ No write token found. Set SANITY_WRITE_TOKEN in .env.local " +
      "(SANITY_API_TOKEN is the site's read-only token and cannot create documents).",
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w8wq190o",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlySlug = args.find((a) => a.startsWith("--slug="))?.split("=")[1];

/**
 * The fallback module is TypeScript and imports from @/lib/site-stats, so it
 * cannot be imported directly from a plain .mjs script. Rather than pull in a
 * TS loader for a one-shot seed, the content is parsed out of the source file
 * — it is a single object literal with no computed values, by design.
 *
 * Keep this in step with lib/datasets/fallback.ts. If that file ever grows
 * logic, convert this script to tsx (the repo already depends on it).
 */
function loadFallbacks() {
  const src = readFileSync("lib/datasets/fallback.ts", "utf8");
  const start = src.indexOf("const IP_ASN_INTELLIGENCE: DatasetDoc = {");
  if (start === -1) {
    throw new Error(
      "Could not find the IP_ASN_INTELLIGENCE literal in lib/datasets/fallback.ts — " +
        "the file changed shape. Update scripts/seedDatasets.mjs.",
    );
  }
  const objStart = src.indexOf("{", start);
  // Brace-match to the end of the literal.
  let depth = 0;
  let end = -1;
  let inString = null;
  for (let i = objStart; i < src.length; i++) {
    const ch = src[i];
    const prev = src[i - 1];
    if (inString) {
      if (ch === inString && prev !== "\\") inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) throw new Error("Unbalanced braces in lib/datasets/fallback.ts");

  const literal = src.slice(objStart, end);
  // eslint-disable-next-line no-new-func
  const doc = new Function(`return (${literal});`)();
  return [doc];
}

/** Sanity needs a _key on every array item. Derive stable ones from content. */
function withKeys(arr, keyOf) {
  if (!Array.isArray(arr)) return undefined;
  return arr.map((item, i) => ({
    _key: `${keyOf(item, i)}`.replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 40).toLowerCase() || `i${i}`,
    ...item,
  }));
}

function toSanityDoc(d) {
  return {
    _id: `dataset.${d.slug}`,
    _type: "dataset",
    title: d.title,
    slug: { _type: "slug", current: d.slug },
    eyebrow: d.eyebrow,
    summary: d.summary,
    overview: d.overview,
    facts: withKeys(
      (d.facts ?? []).map((f) => ({
        _type: "dataset.fact",
        label: f.label,
        value: f.value,
        note: f.note,
      })),
      (f) => f.label,
    ),
    tableName: d.tableName,
    columns: withKeys(
      (d.columns ?? []).map((c) => ({
        _type: "dataset.column",
        name: c.name,
        type: c.type,
        description: c.description,
        isJoinKey: c.isJoinKey ?? false,
      })),
      (c) => c.name,
    ),
    schemaNote: d.schemaNote,
    joinGuideTitle: d.joinGuideTitle,
    joinGuideIntro: d.joinGuideIntro,
    codeExamples: withKeys(
      (d.codeExamples ?? []).map((c) => ({
        _type: "dataset.codeBlock",
        title: c.title,
        description: c.description,
        language: c.language,
        code: c.code,
        note: c.note,
      })),
      (c) => c.title,
    ),
    methodology: withKeys(
      (d.methodology ?? []).map((m) => ({
        _type: "dataset.note",
        title: m.title,
        body: m.body,
        tone: m.tone ?? "neutral",
      })),
      (m) => m.title,
    ),
    changelog: withKeys(
      (d.changelog ?? []).map((c) => ({
        _type: "dataset.changelogEntry",
        date: c.date,
        summary: c.summary,
      })),
      (c) => c.date,
    ),
    listingUrl: d.listingUrl,
    listingLabel: d.listingLabel,
    contactNote: d.contactNote,
    order: d.order ?? 100,
  };
}

async function run() {
  let fallbacks = loadFallbacks();
  if (onlySlug) fallbacks = fallbacks.filter((d) => d.slug === onlySlug);
  if (fallbacks.length === 0) {
    console.error(`✖ No committed dataset matched${onlySlug ? ` --slug=${onlySlug}` : ""}.`);
    process.exit(1);
  }

  for (const d of fallbacks) {
    const doc = toSanityDoc(d);

    // relatedDatasets holds references, which only resolve once the target
    // document exists. Seeding a reference to an unpublished dataset would
    // create a broken ref, so it is left for an editor to set in Studio.
    if (d.relatedDatasets?.length) {
      console.log(
        `  note: relatedDatasets not seeded for "${d.slug}" — set them in Studio once ` +
          `the target dataset pages exist (${d.relatedDatasets.map((r) => r.slug).join(", ")}).`,
      );
    }

    if (force) {
      await client.createOrReplace(doc);
      console.log(`✓ replaced ${doc._id}  →  /datasets/${d.slug}`);
    } else {
      const existing = await client.fetch("*[_id == $id][0]._id", { id: doc._id });
      if (existing) {
        console.log(`• skipped ${doc._id} (already exists — use --force to overwrite)`);
        continue;
      }
      await client.create(doc);
      console.log(`✓ created ${doc._id}  →  /datasets/${d.slug}`);
    }
  }

  console.log("\nDone. Edit these in Studio under Content → Datasets.");
}

run().catch((err) => {
  console.error("✖ Seed failed:", err.message || err);
  process.exit(1);
});
