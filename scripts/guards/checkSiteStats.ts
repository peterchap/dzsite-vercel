#!/usr/bin/env tsx
/**
 * Site-stats module assertions (WU26).
 *
 * Locks the floor-rounding display formatter and the domains floor rule into
 * CI. Run via tsx (devDep) because lib/site-stats.ts uses extensionless TS
 * imports: `npm run guard` / `npm run guard:stats`.
 */
import assert from "node:assert/strict";
import { feedStats } from "../../lib/site-stats.generated";
import {
  fmtStat,
  SITE_STATS,
  DISPLAY_STATS,
  DOMAINS_DISPLAY,
  PUBLISHED_STATS,
  publishedStats,
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
// ── R2 IS THE SOURCE (13 Sep 2026) ─────────────────────────────────────────
// The old "effective domains >= 362,714,858 committed floor" assertion is gone
// WITH the floor it guarded. It asserted that the published figure could never
// drop below the last hand-reconciled number — which is exactly the behaviour
// that would have kept the inflated 395,865,413 on the page after the producer
// was corrected to drop ~40M dead names. An assertion protecting a ratchet is
// an assertion against corrections.
//
// What replaces it is the contract that matters now: the published figure IS
// the feed's figure. Nothing substitutes a constant for it.
check("the published corpus figure comes from the feed, unmodified", () => {
  assert.equal(
    SITE_STATS.domainsMonitored,
    feedStats.domainsMonitored,
    "the corpus figure must be the feed's value — no constant, no floor, no ceiling clamp",
  );
});
check("a corpus figure is publishable at all", () =>
  assert.ok(SITE_STATS.domainsMonitored !== null, "an unpublishable corpus figure fails the build"));

check("corpus display is 360M+", () => assert.equal(DISPLAY_STATS.domainsMonitored, "360M+"));
// The corpus counts RESOLVING domains only. If the producer ever regresses to
// counting every row, the figure jumps back over 400M — assert it cannot.
// Bounds alone cannot catch this: 402M sits inside (100M, 2B) quite happily.
check("corpus count excludes dead names (no un-filtered gold.dns_wide count)", () =>
  assert.ok(
    (SITE_STATS.domainsMonitored ?? 0) < 380_000_000,
    `domainsMonitored = ${String(SITE_STATS.domainsMonitored)} looks like an ` +
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
    (SITE_STATS.ipv4Indexed ?? 0) <= IPV4_ADDRESS_SPACE,
    `ipv4Indexed = ${String(SITE_STATS.ipv4Indexed)} exceeds 2^32 = ` +
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
    // null is a legitimate value now: the feed had nothing publishable, so the
    // figure renders NOTHING. Only a present string has to be well-formed.
    if (value === null) continue;
    assert.ok(/^\d+(\.\d)?(B|M\+|k)$|^\d{1,3}$/.test(value), `${key} malformed: ${value}`);
  }
});

// ── RENDER NOTHING, NOT A CONSTANT ─────────────────────────────────────────
check("publishedStats() omits any figure the feed could not supply", () => {
  const published = publishedStats();
  for (const stat of published) {
    assert.ok(stat.value !== null, `${stat.key} is published with a null value`);
    assert.ok(stat.display !== null, `${stat.key} is published with a null display`);
    assert.ok(stat.measuredAt !== null, `${stat.key} is published with no measured-at`);
  }
  const nulls = Object.entries(PUBLISHED_STATS).filter(([, s]) => s.value === null);
  for (const [key] of nulls) {
    assert.ok(
      !published.some((p) => p.key === key),
      `${key} has no value but still reached publishedStats()`,
    );
  }
});

check("every published figure is the feed's own value", () => {
  for (const stat of publishedStats()) {
    assert.equal(
      stat.value,
      (feedStats as Record<string, unknown>)[stat.key],
      `${stat.key} does not match the feed — something is substituting a value`,
    );
  }
});

// ── PER-FIGURE DEFINITION (WU-C3) ──────────────────────────────────────────
// A number without its population is not a fact. Six coverage figures were in
// circulation and the damaging pair sat eleven lines apart on one page; the
// fix is that every published figure states what it counts, from one place.
check("every published figure carries a definition and a measured-at", () => {
  for (const [key, stat] of Object.entries(PUBLISHED_STATS)) {
    assert.ok(stat.definition?.trim(), `${key} has no definition — it must not be rendered`);
    assert.ok(
      stat.definition.trim().length >= 40,
      `${key} definition is too short to state a population: "${stat.definition}"`,
    );
    assert.ok(stat.label?.trim(), `${key} has no label`);
    assert.ok(stat.measuredAt, `${key} has no measuredAt`);
    assert.ok(
      !Number.isNaN(new Date(stat.measuredAt).getTime()),
      `${key} measuredAt unparseable: ${stat.measuredAt}`,
    );
  }
});

// The definition must describe the SAME number the page renders. If a figure
// is published, its display string is the one derived from site-stats — never
// a second literal typed beside it.
check("published figures agree with the display strings", () => {
  for (const [key, stat] of Object.entries(PUBLISHED_STATS)) {
    const expected = (DISPLAY_STATS as Record<string, string>)[key];
    assert.equal(stat.display, expected, `${key} display drifted: ${stat.display} vs ${expected}`);
    assert.equal(
      stat.measuredAt,
      (STATS_AS_OF as Record<string, string>)[key],
      `${key} measuredAt drifted from STATS_AS_OF`,
    );
  }
});

// Every figure the site formats for display must be published WITH a
// definition — adding a fifth stat to DISPLAY_STATS and forgetting to define
// it is exactly how the undefined figures got out the first time.
check("no displayed figure is missing from PUBLISHED_STATS", () => {
  for (const key of Object.keys(DISPLAY_STATS)) {
    assert.ok(
      key in PUBLISHED_STATS,
      `${key} is displayed but has no entry in PUBLISHED_STATS — it has no definition`,
    );
  }
});

console.log(`✓ Site-stats guard passed — ${n} assertions (corpus displays as ${DOMAINS_DISPLAY}, as of ${SITE_STATS.statsAsOf}).`);
