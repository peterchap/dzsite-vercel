#!/usr/bin/env tsx
/**
 * Self-test for the CMS publishing gate.
 *
 * The gate itself SKIPS without Sanity credentials, which means in most
 * environments it never runs — and a guard nobody can exercise is a guard
 * nobody has checked. This exercises its scanning logic against synthetic
 * documents shaped like the real defects, so the rules are verified
 * everywhere even where the CMS is unreachable.
 *
 * Run: npm run guard:cms:selftest   (part of `npm run guard`)
 */
import assert from "node:assert/strict";

import { confirmUnrendered, scanDocuments, UNRENDERED_DOCS } from "./checkCmsContentGuard";

let n = 0;
const check = (desc: string, fn: () => void) => {
  try {
    fn();
    n++;
  } catch (err) {
    console.error(`✖ ${desc}`);
    throw err;
  }
};

// ── Clean content passes ───────────────────────────────────────────────────
check("clean documents produce no findings", () => {
  const { violations, draftRefs } = scanDocuments([
    { _id: "page.about", _type: "page", title: "About", body: "Datazag makes external infrastructure risk visible." },
  ]);
  assert.equal(violations.length, 0);
  assert.equal(draftRefs.length, 0);
});

// ── Each real defect is caught ─────────────────────────────────────────────
check("a dev host in CMS copy is caught", () => {
  const { violations } = scanDocuments([
    { _id: "page.uc", _type: "page", canonical: "http://localhost:3001/use-cases" },
  ]);
  assert.equal(violations.length, 1);
  assert.match(violations[0].found, /localhost/);
});

check("a bracketed placeholder is caught", () => {
  const { violations } = scanDocuments([
    { _id: "page.terms", _type: "page", body: "governed by the laws of [jurisdiction to be specified]." },
  ]);
  assert.equal(violations.length, 1);
});

check("author-facing copy is caught", () => {
  const { violations } = scanDocuments([
    { _id: "page.blog", _type: "page", body: "Use this area for launch content and research notes." },
  ]);
  assert.equal(violations.length, 1);
});

check("a TODO marker is caught", () => {
  const { violations } = scanDocuments([
    { _id: "page.x", _type: "page", body: "TODO: write the real proposition here" },
  ]);
  assert.equal(violations.length, 1);
});

// ── Nested content is reached ──────────────────────────────────────────────
check("defects nested in arrays and objects are reached", () => {
  const { violations } = scanDocuments([
    {
      _id: "page.deep",
      _type: "page",
      sections: [
        { _key: "a", heading: "Fine" },
        { _key: "b", cards: [{ _key: "c", text: "Use this area for launch content." }] },
      ],
    },
  ]);
  assert.equal(violations.length, 1);
  assert.match(violations[0].where, /sections\[1\]\.cards\[0\]\.text/);
});

// ── Draft references (standing criterion 6) ────────────────────────────────
check("a reference to an unpublished document is caught", () => {
  const { draftRefs } = scanDocuments([
    {
      _id: "siteSettings",
      _type: "siteSettings",
      navLinks: [{ _key: "n1", pageRef: { _ref: "page.unpublished", _type: "reference" } }],
    },
  ]);
  assert.equal(draftRefs.length, 1);
  assert.equal(draftRefs[0].ref, "page.unpublished");
});

check("a reference to a published document is fine", () => {
  const { draftRefs } = scanDocuments([
    { _id: "page.live", _type: "page", title: "Live" },
    { _id: "siteSettings", _type: "siteSettings", link: { _ref: "page.live", _type: "reference" } },
  ]);
  assert.equal(draftRefs.length, 0);
});

// ── Exemptions hold ────────────────────────────────────────────────────────
check("a code field may contain a dev host without failing", () => {
  const { violations } = scanDocuments([
    { _id: "dataset.x", _type: "dataset", code: "curl http://localhost:8080/v1/domain" },
  ]);
  assert.equal(violations.length, 0);
});

// ── Claim rules (scripts/guards/claimRules.mjs) ────────────────────────────
// Each string below reached a live or published CMS doc before 2026-09-28.
const claimCases: Array<[string, RegExp]> = [
  ["False positives under 5%", /False positives under 5/],
  ["Keep noise down with <5% false positives", /<5% false positive/],
  ["Our false positive rate is tracked daily", /false positive rate/],
  ["Known-good hosts mean false positives removed upstream", /false positives removed/],
  ["False positives are suppressed before delivery", /False positives are suppressed/],
  ["Sub-60s detection", /Sub-60s detection/],
  ["High-Confidence Alerts", /High-Confidence Alerts/],
  ["Less than 1% false positives", /Less than 1%/],
  ["Detect phishing infrastructure within ~60 seconds of SSL certificate issuance", /within ~60 seconds of SSL/],
  ["Zero-hour detection (~60 seconds from SSL issuance)", /~60 seconds from SSL/],
  ["Within 5 seconds of receiving certificate", /Within 5 seconds of receiving certificate/],
];
for (const [text, found] of claimCases) {
  check(`claim rule catches "${text}"`, () => {
    const { violations } = scanDocuments([{ _id: "page.live", _type: "page", slug: { current: "live" }, body: text }]);
    assert.equal(violations.length, 1);
    assert.match(violations[0].found, found);
    assert.match(violations[0].fix, /trust\/methodology/);
  });
}

check("claim rules leave mechanism copy alone", () => {
  const { violations } = scanDocuments([
    {
      _id: "page.live",
      _type: "page",
      body: [
        "Known-good infrastructure is filtered out before an alert is raised.",
        "Every alert shows its evidence, so you can judge it yourself.",
        "User reports run 85-95% false positives in legacy tools.",
        "We read new certificates from the public logs as they are published.",
        "The feed refreshes every 60 seconds from the CT log.",
      ],
    },
  ]);
  assert.equal(violations.length, 0);
});

check("claim rules reach nested fields", () => {
  const { violations } = scanDocuments([
    { _id: "page.x", _type: "page", sections: [{ _key: "a", steps: [{ _key: "b", features: ["Fine", "False positives under 5%"] }] }] },
  ]);
  assert.equal(violations.length, 1);
  assert.match(violations[0].where, /sections\[0\]\.steps\[0\]\.features\[1\]/);
});

// ── Unrendered docs skip claim rules, and only claim rules ─────────────────
check("a page with a retired slug skips claim rules", () => {
  const { violations, exempted } = scanDocuments([
    { _id: "legacy", _type: "page", slug: { current: "security-teams" }, body: "<5% false positives" },
  ]);
  assert.equal(violations.length, 0);
  assert.equal(exempted.length, 1);
  assert.match(exempted[0].reason, /legacy-redirects/);
});

check("the same claim on a live slug still fails", () => {
  const { violations, exempted } = scanDocuments([
    { _id: "live", _type: "page", slug: { current: "alerts-overview" }, body: "<5% false positives" },
  ]);
  assert.equal(violations.length, 1);
  assert.equal(exempted.length, 0);
});

check("a retired slug only exempts the page type", () => {
  const { violations } = scanDocuments([
    { _id: "copy", _type: "marketingPageCopy", slug: { current: "security-teams" }, body: "<5% false positives" },
  ]);
  assert.equal(violations.length, 1);
});

check("a listed unrendered doc skips claim rules", () => {
  const { violations, exempted } = scanDocuments(
    [{ _id: "orphan", _type: "pricingPage", body: "False positives are suppressed before delivery" }],
    { unrendered: [{ id: "orphan", reason: "no route" }] },
  );
  assert.equal(violations.length, 0);
  assert.deepEqual(exempted, [{ id: "orphan", reason: "no route" }]);
});

check("a lapsed exemption is scanned again", () => {
  const { violations } = scanDocuments(
    [{ _id: "orphan", _type: "pricingPage", body: "False positives are suppressed before delivery" }],
    { unrendered: [] },
  );
  assert.equal(violations.length, 1);
});

check("an unrendered doc still gets the pre-production rules", () => {
  const { violations } = scanDocuments([
    { _id: "legacy", _type: "page", slug: { current: "security-teams" }, canonical: "http://localhost:3001/x" },
  ]);
  assert.equal(violations.length, 1);
  assert.match(violations[0].found, /localhost/);
});

check("every shipped exemption still holds in source", () => {
  const { lapsed } = confirmUnrendered(UNRENDERED_DOCS);
  assert.deepEqual(lapsed, []);
});

check("an exemption lapses when its route file is gone or its query is used", () => {
  const { held, lapsed } = confirmUnrendered([
    { id: "a", reason: "x", route: "app/no-such-route/page.tsx" },
    { id: "b", reason: "x", unused: ["isRetiredPath"] },
  ]);
  assert.equal(held.length, 0);
  assert.equal(lapsed.length, 2);
});

console.log(`✓ CMS publishing gate self-test passed — ${n} assertions.`);
