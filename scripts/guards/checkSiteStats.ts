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
import { computeSiteStats, parseCoverage, OBSERVATORY_DOMAINS_DEFINITION } from "../../lib/site-stats-core";
import { formatCount } from "../../lib/observatory-figures";

let n = 0;
// Several checks feed deliberately impossible values (4.31B IPv4, 5B domains) to
// prove they are rejected, and the rejection logs the same console.error a real bad
// feed would. Label anything logged inside a check so a fixture is never read as a
// live feed fault (it was, on 2026-10-05). Production logging is unchanged.
const check = (desc: string, fn: () => void) => {
  const { error, warn } = console;
  const tag = (log: (...a: unknown[]) => void) => (...a: unknown[]) =>
    log(`[self-test fixture, expected] ${a.map(String).join(" ")}`);
  console.error = tag(error);
  console.warn = tag(warn);
  try {
    fn();
  } finally {
    console.error = error;
    console.warn = warn;
  }
  n++;
};

// fmtStat is the OBSERVATORY'S format (2026-10-01): one decimal for millions and
// billions, rounded, no "+". It must agree with formatCount in
// lib/observatory-figures.ts, or the two sites print the same figure two ways.
check("the Observatory's corpus count renders as the Observatory prints it", () =>
  assert.equal(fmtStat(369_354_185), formatCount(369_354_185)));
check("millions: one decimal, rounded", () => assert.equal(fmtStat(13_790_175), "13.8M"));
check("billions: one decimal, rounded", () => assert.equal(fmtStat(3_137_402_342), "3.1B"));
check("no trailing plus", () => assert.ok(!fmtStat(368_899_047).includes("+")));
for (const n of [999_999, 1_000_000, 15_655_350, 99_950_000, 369_354_185, 999_999_999, 1_000_000_000, 4_294_967_296]) {
  check(`fmtStat agrees with the Observatory formatter at ${n}`, () => assert.equal(fmtStat(n), n >= 1_000_000 ? formatCount(n) : fmtStat(n)));
}
check("thousands still floor to whole thousands", () => assert.equal(fmtStat(79_340), "79k"));
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

check("corpus display is the formatted corpus figure", () =>
  assert.equal(DISPLAY_STATS.domainsMonitored, fmtStat(SITE_STATS.domainsMonitored as number)));
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
    // The Observatory's format (2026-10-01): "369.4M", "3.1B", "79k" — no "+".
    assert.ok(/^\d+\.\d(B|M)$|^\d+k$|^\d{1,3}$/.test(value), `${key} malformed: ${value}`);
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

// ── the LIVE path (lib/site-stats-live.ts, 2026-09-30) ─────────────────────────
// Pages render coverage.json read at request time. It must pass through the SAME
// gate as the build snapshot, and a bad feed must fall back rather than publish.
const liveFeed = (over: Record<string, unknown> = {}) =>
  parseCoverage(
    {
      domains: 368_899_047,
      infrastructure_ips: 13_790_175,
      ips: 3_137_402_342,
      asns: 79_340,
      record_age_p50_hours: 298,
      record_age_p95_hours: 751,
      updated: "2026-09-30T16:12:28+00:00",
      as_of: { domains: "2026-09-30T16:12:25+00:00", record_age_p50_hours: "2026-09-30T16:12:25+00:00" },
      ...over,
    },
    "2026-09-30T16:20:00Z",
    "test",
  );

check("live coverage.json maps onto the same fields the build snapshot uses", () => {
  const live = computeSiteStats(liveFeed(), "live");
  assert.ok(live);
  assert.equal(live.origin, "live");
  assert.equal(live.SITE_STATS.domainsMonitored, 368_899_047);
  assert.equal(live.DOMAINS_DISPLAY, "368.9M");
  assert.equal(live.STATS_AS_OF.domainsMonitored, "2026-09-30T16:12:25+00:00");
  // A figure with no as-of of its own takes the file's build time, never another figure's.
  assert.equal(live.STATS_AS_OF.networksProfiled, "2026-09-30T16:12:28+00:00");
  assert.deepEqual(live.recordAge, { p50Hours: 298, p95Hours: 751, asOf: "2026-09-30T16:12:25+00:00" });
});

check("the live path applies the same bounds: an impossible IPv4 count is unpublished", () => {
  const live = computeSiteStats(liveFeed({ ips: 4_309_015_115 }), "live");
  assert.ok(live);
  assert.equal(live.SITE_STATS.ipv4Indexed, null);
  assert.ok(!live.publishedStats.some((p) => p.key === "ipv4Indexed"));
});

check("an unpublishable live corpus figure returns null, so the caller falls back", () => {
  assert.equal(computeSiteStats(liveFeed({ domains: 0 }), "live"), null);
  assert.equal(computeSiteStats(liveFeed({ domains: 5_000_000_000 }), "live"), null);
  assert.equal(computeSiteStats(parseCoverage(null, "t", "test"), "live"), null);
});

check("record age is all-or-nothing, and out-of-bound ages are dropped", () => {
  const oneSided = computeSiteStats(liveFeed({ record_age_p95_hours: null }), "live");
  assert.deepEqual(oneSided?.recordAge, { p50Hours: null, p95Hours: null, asOf: null });
  const impossible = computeSiteStats(liveFeed({ record_age_p95_hours: 401 * 24 }), "live");
  assert.deepEqual(impossible?.recordAge, { p50Hours: null, p95Hours: null, asOf: null });
});

check("an Observatory-sourced domain figure carries the Observatory's definition", () => {
  const obs = computeSiteStats(liveFeed(), "live", "observatory");
  assert.ok(obs);
  assert.equal(obs.domainsSource, "observatory");
  assert.equal(obs.PUBLISHED_STATS.domainsMonitored.definition, OBSERVATORY_DOMAINS_DEFINITION);
  const cov = computeSiteStats(liveFeed(), "live");
  assert.notEqual(cov?.PUBLISHED_STATS.domainsMonitored.definition, OBSERVATORY_DOMAINS_DEFINITION);
});

check("the bundle is plain data, so it can cross into client components", () => {
  const live = computeSiteStats(liveFeed(), "live");
  assert.deepEqual(JSON.parse(JSON.stringify(live)), live);
});

check("the committed snapshot and a re-parse of the same values agree", () => {
  const snap = computeSiteStats(feedStats, "snapshot");
  assert.ok(snap);
  assert.equal(snap.DOMAINS_DISPLAY, DOMAINS_DISPLAY);
  assert.deepEqual(snap.publishedStats, publishedStats());
});

console.log(`✓ Site-stats guard passed — ${n} assertions (corpus displays as ${DOMAINS_DISPLAY}, as of ${SITE_STATS.statsAsOf}).`);
