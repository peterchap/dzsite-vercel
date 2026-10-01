/**
 * Seed the machine-clicks blog post into Sanity.
 *
 *   npx tsx scripts/seedMachineClicksPost.ts            writes a DRAFT (drafts.<id>): editable in
 *                                                       Studio, invisible on the site
 *   npx tsx scripts/seedMachineClicksPost.ts --publish  writes the published document with
 *                                                       publishedAt = now, after three checks
 *
 * The three checks are the package's publication order (2026-10-01):
 *   1. MACHINE_CLICKS_EVIDENCE_URL in lib/machine-clicks.ts is set — the post's
 *      closing line links to the Observatory evidence page.
 *   2. That URL answers 200, and so does the CSV beside it.
 *   3. The Observatory's corp_mail_* figures are published — the post's scale
 *      section renders from them and is dropped without them.
 * Any failure refuses to publish and changes nothing.
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { MACHINE_CLICKS_POST, type PostBlock } from "../lib/blog/machine-clicks-post";
import { MACHINE_CLICKS_EVIDENCE_CSV_URL, MACHINE_CLICKS_EVIDENCE_URL } from "../lib/machine-clicks";
import { loadCorporateMailFigures } from "../lib/observatory-figures";

dotenv.config({ path: ".env.local" });

const publish = process.argv.includes("--publish");
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("No SANITY_API_TOKEN in .env.local");
  process.exit(1);
}
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

/** `**bold**` and `[text](href)` into spans and link mark definitions. */
function inline(text: string, keyBase: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let n = 0;
  const push = (t: string, marks: string[]) => {
    if (t) children.push({ _type: "span", _key: `${keyBase}s${n++}`, text: t, marks });
  };
  for (const m of text.matchAll(re)) {
    push(text.slice(last, m.index), []);
    if (m[1]) push(m[1], ["strong"]);
    else {
      const key = `${keyBase}l${markDefs.length}`;
      markDefs.push({ _type: "link", _key: key, href: m[3] });
      push(m[2], [key]);
    }
    last = (m.index ?? 0) + m[0].length;
  }
  push(text.slice(last), []);
  return { children, markDefs };
}

function toPortableText(blocks: PostBlock[], evidenceUrl: string | null) {
  return blocks.map((b, i) => {
    const text = b.text.split("{{EVIDENCE_URL}}").join(evidenceUrl ?? "");
    const { children, markDefs } = inline(text, `b${i}`);
    return {
      _type: "block",
      _key: `b${i}`,
      style: b.style === "bullet" ? "normal" : b.style,
      ...(b.style === "bullet" ? { listItem: "bullet", level: 1 } : {}),
      children,
      markDefs,
    };
  });
}

async function ok(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    return res.ok;
  } catch {
    return false;
  }
}

async function run() {
  const p = MACHINE_CLICKS_POST;

  if (publish) {
    const problems: string[] = [];
    if (!MACHINE_CLICKS_EVIDENCE_URL || !MACHINE_CLICKS_EVIDENCE_CSV_URL) {
      problems.push("lib/machine-clicks.ts: set MACHINE_CLICKS_EVIDENCE_URL and MACHINE_CLICKS_EVIDENCE_CSV_URL once both are live.");
    } else {
      if (!(await ok(MACHINE_CLICKS_EVIDENCE_URL))) problems.push(`evidence page not reachable: ${MACHINE_CLICKS_EVIDENCE_URL}`);
      if (!(await ok(MACHINE_CLICKS_EVIDENCE_CSV_URL))) problems.push(`evidence CSV not reachable: ${MACHINE_CLICKS_EVIDENCE_CSV_URL}`);
    }
    if (!(await loadCorporateMailFigures())) {
      problems.push("the Observatory has not published corp_mail_* yet (npm run measure:corporate, then a publish).");
    }
    if (problems.length) {
      console.error("Refusing to publish:\n" + problems.map((x) => `  - ${x}`).join("\n"));
      process.exit(1);
    }
  }

  const doc = {
    _id: publish ? p.id : `drafts.${p.id}`,
    _type: "blogPost",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    excerpt: p.excerpt,
    tags: p.tags,
    body: toPortableText(p.body, MACHINE_CLICKS_EVIDENCE_URL),
    ...(publish ? { publishedAt: new Date().toISOString() } : {}),
  };

  await client.createOrReplace(doc);
  console.log(publish ? `Published ${p.id} at /blog/${p.slug}` : `Wrote draft drafts.${p.id} (not on the site).`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
