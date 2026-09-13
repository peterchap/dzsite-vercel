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

import { scanDocuments } from "./checkCmsContentGuard";

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

console.log(`✓ CMS publishing gate self-test passed — ${n} assertions.`);
