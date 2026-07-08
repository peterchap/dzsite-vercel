/**
 * Seed marketingPageCopy documents from each page's co-located copy.ts.
 *
 * The document content is built from the SAME PageContent object the page uses
 * for its fallbacks, so seeding can never change what a page renders.
 *
 * Usage:
 *   npx tsx scripts/seedMarketingCopy.ts            # seed all registered pages
 *   npx tsx scripts/seedMarketingCopy.ts about esp-partners   # seed a subset
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import { buildMarketingCopyDoc, type PageContent } from "../sanity/seedMarketingCopy";
import * as about from "../app/(marketing)/about/copy";
import * as trust from "../app/(marketing)/trust/copy";
import * as infra from "../app/(marketing)/infrastructure-intelligence/copy";
import * as mssp from "../app/(marketing)/mssp-partners/copy";
import * as esp from "../app/(marketing)/esp-partners/copy";
import * as reports from "../app/reports/copy";
import * as alerts from "../app/alerts/copy";
import * as howItWorks from "../app/(marketing)/how-it-works/copy";

dotenv.config({ path: ".env.local" });

type PageReg = { slug: string; title: string; content: PageContent };

const PAGES: PageReg[] = [
  { slug: about.SLUG, title: about.TITLE, content: about.content },
  { slug: trust.SLUG, title: trust.TITLE, content: trust.content },
  { slug: infra.SLUG, title: infra.TITLE, content: infra.content },
  { slug: mssp.SLUG, title: mssp.TITLE, content: mssp.content },
  { slug: esp.SLUG, title: esp.TITLE, content: esp.content },
  { slug: reports.SLUG, title: reports.TITLE, content: reports.content },
  { slug: alerts.SLUG, title: alerts.TITLE, content: alerts.content },
  { slug: howItWorks.SLUG, title: howItWorks.TITLE, content: howItWorks.content },
];

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const NOTES =
  "Seeded from code fallbacks. Layout is fixed in code; these fields are text-only overrides matched by section/item key. Empty fields fall back to the copy shipped in the page component.";

async function run() {
  if (!client.config().token) {
    console.error("No SANITY_WRITE_TOKEN found in .env.local");
    process.exit(1);
  }
  const filter = process.argv.slice(2);
  const targets = filter.length ? PAGES.filter((p) => filter.includes(p.slug)) : PAGES;
  if (!targets.length) {
    console.error(`No matching pages for filter: ${filter.join(", ")}. Known: ${PAGES.map((p) => p.slug).join(", ")}`);
    process.exit(1);
  }
  for (const p of targets) {
    const doc = buildMarketingCopyDoc({ slug: p.slug, title: p.title, notes: NOTES, content: p.content });
    await client.createOrReplace(doc as any);
    console.log(`✓ seeded ${doc._id} (${doc.sections.length} sections) → dataset "${client.config().dataset}"`);
  }
  console.log(`Done: ${targets.length} document(s).`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
