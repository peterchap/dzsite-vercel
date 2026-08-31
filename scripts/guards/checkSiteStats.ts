#!/usr/bin/env tsx
/**
 * Site-stats module assertions (WU26).
 *
 * Locks the floor-rounding display formatter and the domains floor rule into
 * CI. Run via tsx (devDep) because lib/site-stats.ts uses extensionless TS
 * imports: `npm run guard` / `npm run guard:stats`.
 */
import assert from "node:assert/strict";
import {
  fmtStat,
  SITE_STATS,
  DISPLAY_STATS,
  DOMAINS_DISPLAY,
  STATS_AS_OF,
  BOUNDS,
  IPV4_ADDRESS_SPACE,
} from "../../lib/site-stats";

let n = 0;
const check = (desc: string, fn: () => void) => {
  fn();
  n++;
};

// fmtStat floors — never rounds up (the public claim must stay defensible).
check("368M floors to 360M+", () => assert.equal(fmtStat(368_000_000), "360M+"));
check("369,999,999 still floors to 360M+", () => assert.equal(fmtStat(369_999_999), "360M+"));
check("325.6M floors to 320M+", () => assert.equal(fmtStat(325_631_907), "320M+"));
check("3.129B floors to 3.1B", () => assert.equal(fmtStat(3_129_369_541), "3.1B"));
check("3,199,999,999 still floors to 3.1B", () => assert.equal(fmtStat(3_199_999_999), "3.1B"));
check("10.5M floors to 10M+", () => assert.equal(fmtStat(10_500_000), "10M+"));
check("78,756 floors to 78k", () => assert.equal(fmtStat(78_756), "78k"));
check("sub-1k renders literally", () => assert.equal(fmtStat(999), "999"));

// Domains floor rule: the effective figure never drops below the committed
// DuckLake floor.
//
// ⚠️ Lowered 2026-08-29 from 395,865,413. That earlier floor was measured over
// EVERY row of gold.dns_wide, including 39,926,798 names that do not resolve
// (NXDOMAIN/SERVFAIL/TIMEOUT). It was not a floor under the corpus, it was a
// floor under an inflated count — and being a floor, it would have REJECTED the
// corrected figure and kept the inflated one on the page. Lowering it is the
// point of this change; do not "restore" it.
check("effective domains ≥ 362.7M committed floor", () =>
  assert.ok(SITE_STATS.domainsMonitored >= 362_714_858));
check("corpus display is 360M+", () => assert.equal(DISPLAY_STATS.domainsMonitored, "360M+"));
// The corpus counts RESOLVING domains only. If the producer ever regresses to
// counting every row, the figure jumps back over 400M — assert it cannot.
// Bounds alone cannot catch this: 402M sits inside (100M, 2B) quite happily.
check("corpus count excludes dead names (no un-filtered gold.dns_wide count)", () =>
  assert.ok(
    SITE_STATS.domainsMonitored < 380_000_000,
    `domainsMonitored = ${SITE_STATS.domainsMonitored.toLocaleString()} looks like an ` +
      `UNFILTERED count of gold.dns_wide (~402M includes ~40M NXDOMAIN/SERVFAIL/TIMEOUT). ` +
      `The producer must filter on resolution_status IN ('RESOLVED','NODATA') — see ` +
      `MEASURED_SQL in riskscore/orchestration/website_stats.py. Do not raise this ceiling.`,
  ));
check("DOMAINS_DISPLAY aliases the corpus display", () =>
  assert.equal(DOMAINS_DISPLAY, DISPLAY_STATS.domainsMonitored));

// ── CEILING RULE ───────────────────────────────────────────────────────────
// Added 2026-08-22. Every assertion above this block guards against
// OVERSTATING growth — the floor rule, fmtStat's round-DOWN, "never round up".
// None of them could see a figure that cannot exist, and so "4.3B IPv4
// addresses indexed" rendered on the front page against an address space of
// 4,294,967,296. A floor cannot catch a ceiling violation.
check("ipv4Indexed cannot exceed the IPv4 address space", () =>
  assert.ok(
    SITE_STATS.ipv4Indexed <= IPV4_ADDRESS_SPACE,
    `ipv4Indexed = ${SITE_STATS.ipv4Indexed.toLocaleString()} exceeds 2^32 = ` +
      `${IPV4_ADDRESS_SPACE.toLocaleString()}. This number cannot exist. Find the ` +
      `double-count in the producer; do NOT cap it at 2^32.`,
  ));
check("the figure that actually shipped would fail this guard", () =>
  assert.ok(4_309_015_115 > IPV4_ADDRESS_SPACE));
check("every bounded figure is inside its bounds", () => {
  for (const [key, [lo, hi]] of Object.entries(BOUNDS)) {
    const v = (SITE_STATS as Record<string, unknown>)[key];
    assert.ok(
      typeof v === "number" && v >= lo && v <= hi,
      `${key} = ${String(v)} is outside [${lo.toLocaleString()}, ${hi.toLocaleString()}]`,
    );
  }
});
check("every bounded figure has a ceiling, not just a floor", () => {
  for (const [key, bound] of Object.entries(BOUNDS)) {
    assert.ok(Number.isFinite(bound[1]), `${key} has no ceiling`);
    assert.ok(bound[1] > bound[0], `${key} bounds are inverted`);
  }
});

// ── PER-FIGURE AS-OF ───────────────────────────────────────────────────────
// "If a figure cannot show one, it does not go on the page." Every figure the
// site renders must carry a parseable as-of of its own; a shared page-level
// timestamp is what let a 13-hour-old total read as live.
check("every displayed figure has its own parseable as-of", () => {
  for (const key of Object.keys(DISPLAY_STATS)) {
    const iso = (STATS_AS_OF as Record<string, string>)[key];
    assert.ok(iso, `${key} has no as-of — it must not be rendered`);
    assert.ok(!Number.isNaN(new Date(iso).getTime()), `${key} as-of unparseable: ${iso}`);
  }
});

// Every display stat must be derived, non-empty, and never a raw huge number.
check("all display stats formatted", () => {
  for (const [key, value] of Object.entries(DISPLAY_STATS)) {
    assert.ok(/^\d+(\.\d)?(B|M\+|k)$|^\d{1,3}$/.test(value), `${key} malformed: ${value}`);
  }
});

console.log(`✓ Site-stats guard passed — ${n} assertions (corpus displays as ${DOMAINS_DISPLAY}, as of ${SITE_STATS.statsAsOf}).`);
