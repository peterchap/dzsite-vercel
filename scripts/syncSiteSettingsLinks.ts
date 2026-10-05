/**
 * Sync the CMS `siteSettings` footer link arrays to the link sets in lib/site-nav.ts.
 *
 * Why (2026-10-05): siteSettings still held old lists. companyLinks and productLinks
 * referenced page.about / page.contact / page.pricing, page docs that were never
 * published (those routes are code pages), and footerLinks still pointed at
 * /domain-intelligence. The footer ignored them (it falls back to its own lists),
 * but the CMS publishing gate failed on the unpublished references. Writing the
 * code's lists makes the CMS and the footer agree, with plain hrefs only.
 *
 * Usage:
 *   npx tsx scripts/syncSiteSettingsLinks.ts                 # dry run: print the change
 *   npx tsx scripts/syncSiteSettingsLinks.ts --apply         # write siteSettings
 *   npx tsx scripts/syncSiteSettingsLinks.ts --apply --delete-orphans
 *       also delete the unused "Real-time Webhooks" integration doc (webhooks do not
 *       ship), only if no other document references it.
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";

import {
  FOOTER_COMPANY_LINKS,
  FOOTER_PRODUCT_LINKS,
  FOOTER_TRUST_LINKS,
  type FooterLink,
} from "../lib/site-nav";

dotenv.config({ path: ".env.local" });

const APPLY = process.argv.includes("--apply");
const DELETE_ORPHANS = process.argv.includes("--delete-orphans");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export function toNavLinks(links: FooterLink[], prefix: string) {
  return links.map((l, i) => ({ _key: `${prefix}${i}`, _type: "navLink", label: l.label, href: l.href }));
}

// footerLinks is the footer's fallback for the Company column, so it mirrors it.
const TARGET = {
  productLinks: toNavLinks(FOOTER_PRODUCT_LINKS, "p"),
  trustLinks: toNavLinks(FOOTER_TRUST_LINKS, "t"),
  companyLinks: toNavLinks(FOOTER_COMPANY_LINKS, "c"),
  footerLinks: toNavLinks(FOOTER_COMPANY_LINKS, "f"),
};

function describe(links: any[] | undefined) {
  return (links ?? [])
    .map((l) => `${l.label} → ${l.href ?? (l.pageRef?._ref ? `ref:${l.pageRef._ref}` : "?")}`)
    .join(", ") || "(empty)";
}

async function run() {
  if (APPLY && !client.config().token) {
    console.error("No SANITY_WRITE_TOKEN found in .env.local");
    process.exit(1);
  }
  const site = await client.fetch(`*[_id == "siteSettings"][0]`);
  if (!site) throw new Error("siteSettings document not found");

  for (const [field, links] of Object.entries(TARGET)) {
    console.log(`${field}\n  now: ${describe(site[field])}\n  new: ${describe(links)}`);
  }

  const orphanId = "34657679-63c4-406e-a582-b9f9c5a71ea0";
  let deleteOrphan = false;
  if (DELETE_ORPHANS) {
    const orphan = await client.fetch(`*[_id == $id][0]{_id, title}`, { id: orphanId });
    const refs = await client.fetch(`count(*[references($id)])`, { id: orphanId });
    if (orphan && orphan.title === "Real-time Webhooks" && refs === 0) {
      deleteOrphan = true;
      console.log(`delete: integration "${orphan.title}" (${orphanId}), referenced by ${refs} documents`);
    } else {
      console.log(`skip delete: ${orphan ? `"${orphan.title}" referenced by ${refs}` : "not found"}`);
    }
  }

  if (!APPLY) {
    console.log("\nDry run. Re-run with --apply to write.");
    return;
  }
  await client.patch("siteSettings").set(TARGET).commit();
  console.log(`✓ siteSettings links written → dataset "${client.config().dataset}"`);
  if (deleteOrphan) {
    await client.delete(orphanId);
    console.log(`✓ deleted ${orphanId}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
