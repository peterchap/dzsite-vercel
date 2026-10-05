/**
 * The shared header (@datazag/site-chrome nav.ts) lists datasets statically.
 * The site's rule is that a dataset is in the nav exactly when its page is
 * live (isAvailable in lib/datasets/catalog.ts). This guard fails when the
 * two disagree, so a shipped dataset is added to the package, and a held one
 * removed, before the site deploys.
 */
import { DATASET_LINKS, SITE_ORIGIN } from "@datazag/site-chrome/nav";
import { DATASET_CATALOG, isAvailable } from "../../lib/datasets/catalog";

const expected = [...DATASET_CATALOG]
    .filter(isAvailable)
    .sort((a, b) => a.order - b.order)
    .map((e) => `${e.name} -> ${SITE_ORIGIN}/datasets/${e.slug}`);
const actual = DATASET_LINKS.map((l) => `${l.label} -> ${l.href}`);

if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    console.error("✗ Site chrome nav guard: the shared header's dataset links do not match the live catalog.");
    console.error(`  catalog (live): ${expected.join(" | ") || "(none)"}`);
    console.error(`  site-chrome:    ${actual.join(" | ") || "(none)"}`);
    console.error("  Update DATASET_LINKS in @datazag/site-chrome, release it, and bump the dependency here.");
    process.exit(1);
}
console.log(`✓ Site chrome nav guard passed — ${actual.length} dataset link(s) match the live catalog.`);
