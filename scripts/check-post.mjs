#!/usr/bin/env node
/**
 * Pre-publish check for a research post (Peter's checklist, 2026-10-01).
 *
 *   node scripts/check-post.mjs <slug> [--url <base>] [--cta <path>...]
 *
 * SOURCE checks (always):
 *   1. Listed in lib/research.ts, which feeds /blog newest first, the sitemap
 *      and llms.txt. The list must still sort newest first.
 *   2. An og:image: opengraph-image.tsx beside the page.
 *   3. In app/sitemap.ts.
 *   4. No internal table names (gold.dns_wide, intel.*, lake.ref.*) and no
 *      dataset letters ("dataset B") in the page or its data.
 *
 * RENDERED checks (with --url, for example https://www.datazag.com or a preview):
 *   5. canonical and og:url on www.datazag.com; og:image present and absolute.
 *   6. Every sentence 20 words or fewer; en-US spelling.
 *   7. At least one link to an Observatory card (observatory.datazag.com/...#id).
 *   8. One contextual CTA: --cta lists the paths it should link to (for example
 *      machine clicks: --cta /esp-partners --cta /datasets/email-suppression).
 *   9. If the post names vendors, the closing line that shares count domains,
 *      not revenue or quality.
 *
 * Not checkable by script, so printed as a reminder: active voice, and every
 * figure dated with its population beside it.
 *
 * Exit 1 if any check fails. Warnings (long sentences) print but do not fail,
 * so a post can be iterated on; pass --strict to fail on them too.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--") && !isFlagValue(a));
function isFlagValue(a) {
  const i = args.indexOf(a);
  return i > 0 && ["--url", "--cta"].includes(args[i - 1]);
}
const base = valueOf("--url");
const ctas = args.flatMap((a, i) => (args[i - 1] === "--cta" ? [a] : []));
const strict = args.includes("--strict");
function valueOf(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}
if (!slug) {
  console.error("usage: node scripts/check-post.mjs <slug> [--url <base>] [--cta <path>...] [--strict]");
  process.exit(2);
}

const fails = [];
const warns = [];
const ok = (m) => console.log(`  ✓ ${m}`);
const fail = (m) => { fails.push(m); console.log(`  ✗ ${m}`); };
const warn = (m) => { warns.push(m); console.log(`  ! ${m}`); };

console.log(`\nPre-publish check: ${slug}`);

// 1. Listing
const research = readFileSync(join("lib", "research.ts"), "utf8");
const entries = research.split(/\r?\n  \{\r?\n/).slice(1).flatMap((b) => {
  const s = b.match(/slug:\s*"([^"]+)"/);
  const d = b.match(/publishedOn:\s*"(\d{4}-\d{2}-\d{2})"/);
  const h = b.match(/href:\s*"([^"]+)"/);
  return s && d ? [{ slug: s[1], date: d[1], href: h ? h[1] : null }] : [];
});
const entry = entries.find((e) => e.slug === slug);
// A guide lives where its href says (/resources/...); research lives at /intelligence/<slug>.
const path = entry?.href ?? `/intelligence/${slug}`;
const dir = join("app", "(marketing)", ...path.split("/").filter(Boolean));
if (entry) ok(`listed in lib/research.ts (published ${entry.date})`);
else fail("not in lib/research.ts, so /blog, the sitemap and llms.txt will not list it");
const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date)).map((e) => e.slug).join();
if (entries.map((e) => e.slug).join() === sorted) ok("lib/research.ts reads newest first");
else warn("lib/research.ts is not in newest-first order (latestResearch() sorts it, but keep the file in order)");

// 2. og:image
if (existsSync(join(dir, "opengraph-image.tsx"))) ok("opengraph-image.tsx present");
else fail(`no og:image: add ${join(dir, "opengraph-image.tsx")} (components/research/og-card.tsx)`);

// 3. Sitemap
const sitemap = readFileSync(join("app", "sitemap.ts"), "utf8");
if (sitemap.includes(`"${path}"`)) ok("in app/sitemap.ts");
else fail(`not in app/sitemap.ts: add { path: "${path}" }`);

// 4. Internal names, in the page's own source
const INTERNAL = /\b(?:lake\.)?(?:gold|silver|bronze|intel|ref)\.[a-z_]+|\bdns_wide\b|\bposture_current\b|\b(?:dataset|table|product) [A-F]\b/;
let leaks = 0;
if (existsSync(dir)) {
  for (const f of readdirSync(dir).filter((f) => /\.tsx?$/.test(f))) {
    readFileSync(join(dir, f), "utf8").split("\n").forEach((line, i) => {
      const code = line.replace(/\/\/.*$/, "").replace(/^\s*\*.*$/, "");
      const m = code.match(INTERNAL);
      if (m) { leaks++; fail(`${f}:${i + 1} internal name "${m[0]}"`); }
    });
  }
  if (!leaks) ok("no internal table names or dataset letters in source");
} else {
  fail(`no page directory at ${dir}`);
}

// 5-9. Rendered
if (base) {
  const url = `${base.replace(/\/$/, "")}${path}`;
  const res = await fetch(url, { redirect: "manual" });
  if (res.status !== 200) {
    fail(`${url} returned ${res.status}`);
  } else {
    const html = await res.text();
    const meta = (re) => (html.match(re) || [])[1] || null;
    const canonical = meta(/<link rel="canonical" href="([^"]+)"/);
    const ogUrl = meta(/<meta property="og:url" content="([^"]+)"/);
    const ogImage = meta(/<meta property="og:image" content="([^"]+)"/);
    for (const [name, v] of [["canonical", canonical], ["og:url", ogUrl]]) {
      if (v && v.startsWith("https://www.datazag.com/")) ok(`${name} on www`);
      else fail(`${name} is ${v ?? "missing"}, not https://www.datazag.com/...`);
    }
    if (ogImage && /^https:\/\//.test(ogImage)) ok("og:image present and absolute");
    else fail(`og:image is ${ogImage ?? "missing"}`);

    let main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
    main = main.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!-- -->/g, "");
    const text = main
      .replace(/<\/(p|li|h[1-6]|dd|dt|figcaption|blockquote|td|th|a|span|div)>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&rsquo;|&#x27;/g, "’").replace(/&ldquo;|&rdquo;|&quot;/g, "\"").replace(/&amp;/g, "&").replace(/&[a-z#0-9]+;/g, " ");

    // 6. Sentence length and spelling
    const long = [];
    for (const para of text.split("\n")) {
      for (const s of para.split(/(?<=[.!?])\s+/)) {
        const words = s.trim().split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
        if (words.length > 20) long.push(`[${words.length}] ${s.trim().slice(0, 110)}`);
      }
    }
    if (!long.length) ok("every sentence is 20 words or fewer");
    else (strict ? fail : warn)(`${long.length} sentence(s) over 20 words:\n      ${long.join("\n      ")}`);
    const UK = /\b(\w+is(e|ed|es|ing|ation)|behaviour\w*|colour\w*|centre\w*|artefact\w*|catalogue\w*|defence|licence|\w+lled)\b/gi;
    const ALLOW = new Set(["raise", "raised", "raises", "raising", "otherwise", "advise", "advised", "comprise", "comprises", "premise", "premises", "precise", "promise", "enterprise", "enterprises", "exercise", "expertise", "surprise", "revise", "revised", "supervise", "televise", "wise", "rise", "noise", "praise", "concise", "franchise", "merchandise", "compromise", "excise", "despise", "disguise", "chastise", "improvise", "apprise", "incise", "devise", "paradise", "poise", "cruise", "bruise", "anise", "arise", "arisen", "arising", "rising", "spelled", "called", "filled", "killed", "pulled", "rolled", "billed", "drilled", "spilled", "skilled", "stalled", "installed", "controlled", "polled", "enrolled", "distilled", "fulfilled", "compelled", "propelled", "expelled", "dispelled", "repelled", "rebelled", "excelled", "patrolled", "scrolled", "tolled", "trolled", "walled", "walled", "smelled", "swelled", "dwelled", "shelled", "spelled", "yelled", "felled", "quelled", "belled", "celled", "gelled", "welled", "milled", "chilled", "grilled", "thrilled", "willed", "stilled", "tilled", "hilled", "frilled", "befallen"]);
    const uk = [...new Set((text.match(UK) || []).map((w) => w.toLowerCase()))].filter((w) => !ALLOW.has(w));
    if (!uk.length) ok("no British spellings found");
    else warn(`possible British spellings (check each): ${uk.join(", ")}`);

    // 7. Observatory card links
    const obs = [...new Set([...html.matchAll(/href="(https:\/\/observatory\.datazag\.com\/[^"]*#[^"]+)"/g)].map((m) => m[1]))];
    const statesFigures = /\d+(?:\.\d+)?%|\b\d{1,3}(?:,\d{3})+\b|\d+(?:\.\d)?\s?(?:million|billion|M|B)\b/.test(text);
    if (obs.length) ok(`links ${obs.length} Observatory card(s)`);
    else if (statesFigures) fail("states figures but links no Observatory card (observatory.datazag.com/...#stat_id)");
    else ok("states no figures, so no Observatory card link is needed");

    // 8. CTA
    if (ctas.length) {
      for (const c of ctas) {
        if (main.includes(`href="${c}"`)) ok(`CTA links ${c}`);
        else fail(`no CTA link to ${c}`);
      }
    }

    // 9. Vendor closing line
    const VENDORS = /\b(Cloudflare|Microsoft|Google|Proofpoint|Mimecast|IONOS|OVHcloud|GoDaddy|Amazon|Fastly|Akamai|Barracuda|Cisco)\b/;
    if (VENDORS.test(text)) {
      if (/not statements about revenue|count domains, not revenue|not revenue/i.test(text)) ok("names vendors, and keeps the 'domains, not revenue or quality' line");
      else fail("names vendors but has no closing line that shares count domains, not revenue or quality");
    }
  }
}

console.log("  · by hand: active voice, and every figure dated with its population beside it");
console.log(fails.length ? `\n${fails.length} failed, ${warns.length} warning(s).` : `\nPassed, ${warns.length} warning(s).`);
process.exit(fails.length ? 1 : 0);
