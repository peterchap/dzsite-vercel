#!/usr/bin/env tsx
/**
 * Site-stats module assertions (WU26).
 *
 * Locks the floor-rounding display formatter and the domains floor rule into
 * CI. Run via tsx (devDep) because lib/site-stats.ts uses extensionless TS
 * imports: `npm run guard` / `npm run guard:stats`.
 */
import assert from "node:assert/strict";
import { fmtStat, SITE_STATS, DISPLAY_STATS, DOMAINS_DISPLAY } from "../../lib/site-stats";

let n = 0;
const check = (desc: string, fn: () => void) => {
  fn();
  n++;
};

// fmtStat floors — never rounds up (the public claim must stay defensible).
check("368M floors to 360M+", () => assert.equal(fmtStat(368_000_000), "360M+"));
check("369,999,999 still floors to 360M+", () => assert.equal(fmtStat(369_999_999), "360M+"));
check("325.6M floors to 320M+", () => assert.equal(fmtStat(325_631_907), "320M+"));
check("4.32B floors to 4.3B", () => assert.equal(fmtStat(4_320_469_598), "4.3B"));
check("4,399,999,999 still floors to 4.3B", () => assert.equal(fmtStat(4_399_999_999), "4.3B"));
check("10.5M floors to 10M+", () => assert.equal(fmtStat(10_500_000), "10M+"));
check("78,756 floors to 78k", () => assert.equal(fmtStat(78_756), "78k"));
check("sub-1k renders literally", () => assert.equal(fmtStat(999), "999"));

// Domains floor rule: the effective figure never drops below the committed
// DuckLake floor while the CertaLake feed lags (currently ~325M vs ~368M).
check("effective domains ≥ 368M committed floor", () =>
  assert.ok(SITE_STATS.domainsMonitored >= 368_000_000));
check("corpus display is 360M+", () => assert.equal(DISPLAY_STATS.domainsMonitored, "360M+"));
check("DOMAINS_DISPLAY aliases the corpus display", () =>
  assert.equal(DOMAINS_DISPLAY, DISPLAY_STATS.domainsMonitored));

// Every display stat must be derived, non-empty, and never a raw huge number.
check("all display stats formatted", () => {
  for (const [key, value] of Object.entries(DISPLAY_STATS)) {
    assert.ok(/^\d+(\.\d)?(B|M\+|k)$|^\d{1,3}$/.test(value), `${key} malformed: ${value}`);
  }
});

console.log(`✓ Site-stats guard passed — ${n} assertions (corpus displays as ${DOMAINS_DISPLAY}, as of ${SITE_STATS.statsAsOf}).`);
