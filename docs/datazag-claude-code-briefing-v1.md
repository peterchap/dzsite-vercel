# Datazag Website Build — Claude Code Briefing

**For:** the Claude Code session you start in the cloned repo
**Status:** Active build, partner-page revisions and homepage updates plus new /how-it-works page
**Deploy target:** Vercel (auto-deploy from GitHub main branch)
**Working environment:** Cloned local repository, branch-based workflow, PR review before merge

---

## How to use this document

This is the first prompt of the Claude Code session. Read it in full before doing anything else. The instructions in this document take precedence over assumptions inferred from the repository or general web-dev conventions. Where the build docs (listed below in Section 2) conflict with the live site state, the build docs are the source of truth.

If anything in this briefing is unclear after a careful read, stop and ask before acting. Don't improvise on the basis of inference.

---

## 1. Project context

Datazag is a UK-based cybersecurity intelligence platform. Bootstrapped, two founders, launched January 2026. Core product is platform-impersonation defence — detecting attacker infrastructure (lookalike domains, spoofed SaaS platforms) at the moment of provisioning, before campaigns launch, and feeding the detections directly into customers' existing security stack.

The site you're building serves three primary audiences:

- **Channel partners** (MSSPs, ESPs, cyber insurers, IT service providers) — these are the GTM motion. Sites reach them with segment-specific partner pages.
- **Technical buyers** consuming the data product directly via cloud marketplaces (Snowflake, Databricks, AWS, Azure, GCP) — these reach the data product page.
- **Sophisticated evaluators** (analysts, journalists, security researchers, investors) — these reach the homepage and the /how-it-works engine page.

The voice across the site is **substantive, technical, confident, restrained**. Datazag earns trust through specificity rather than marketing claims. Anything that reads as marketing-led or claim-forward is wrong tone for this brand.

---

## 2. Source-of-truth documents

These documents live in this repo's `/datazag/build-docs/` folder (or wherever they've been placed in the cloned repo — confirm the path during orientation). They are the source of truth for content, structure and visual specs:

1. `datazag-homepage-copy.md` — full homepage doc, ten sections with finalised copy, visual build notes, and content-moved-to-product-pages inventory.
2. `datazag-how-it-works-page-build.md` — full draft for the new /how-it-works engine page. Eleven sections, content and visual specs.
3. `datazag-data-product-page-revisions.md` — keep/change/add doc for the existing /infrastructure-intelligence page, repurposing it as the data product page.
4. `datazag-esp-page-revisions.md` — keep/change/add doc for the ESP partner page.
5. `datazag-mssp-page-revisions.md` — keep/change/add doc for the MSSP partner page.
6. `datazag-section-8-schematic-brief.md` — design brief for the Schematic 1.0 homepage visual (already executed; the actual image asset exists).

Read all six during your orientation pass before touching anything in the repo. Where two documents conflict (e.g. the homepage doc and the partner pages), the homepage doc wins because it's the most recently revised.

---

## 3. Locked data points

These four values are the source of truth across the entire site. Use them exactly as written. Do not improve, revise, or substitute alternatives even if you encounter older values in the existing site state.

| Item | Locked value | Notes |
|---|---|---|
| **Active corpus size** | 330M+ domains | Framed as "and growing" or "continuously refreshed" where natural; never "342M" or "315M" |
| **Ingestion latency** | <10 seconds | From CertStream to enriched intelligence in the Graph; never "sub-5-second" or other values |
| **BGP prefixes monitored** | ~1.23M | New stat — should appear on Section 9 (Proof) and on /how-it-works Section 6 (Routing hygiene verification) |
| **Autonomous systems mapped** | ~78,600 | New stat — same locations as above |

**Threat-feed integration framing:** there are licensing implications around naming specific threat-feed partners. The site references them generically only — phrases like *"cross-validated against leading independent abuse and routing intelligence sources before delivery"* are correct. Do not name specific feed vendors (no abuse.ch, URLhaus, Spamhaus, Feodo Tracker, Shadowserver, etc.) in any customer-facing copy.

If the existing site state has older corpus values (315M, 320M) or named feed vendors anywhere, update them to align with the locked values during the relevant work unit.

---

## 4. Workflow and review process

You are working in a cloned local copy of the production repo. The clone exists specifically so this work can happen without risk to the live site at https://www.datazag.com.

**Git workflow:**

- Work on a feature branch, not on main. Branch name: `feature/website-rebuild-q3` (confirm with the user before creating the branch if a different name is preferred).
- Never push directly to main. Push to the feature branch only.
- Push to GitHub after each work unit is complete and the user has reviewed in the local dev environment.
- Pull request from feature branch to main is the user's responsibility. Don't open the PR yourself; tell the user when the branch is ready for PR creation.
- Commit messages: clear, scoped, descriptive. Format: `<work unit number>: <short description>` (e.g. `WU3: add /how-it-works page template and schema`).

**Review process per work unit:**

After completing each work unit:

1. Summarise what changed (which files, which Sanity documents, which schema types).
2. Summarise what you skipped or held back, and why.
3. Flag any uncertainties, ambiguities, or decisions you made without confirmation.
4. Hand back for review.

The user will review by running the dev environment locally (`npm run dev` or equivalent) and confirming in Studio (for Sanity content) and in the browser (for page templates).

Do not proceed to the next work unit without explicit confirmation that the current one is accepted.

**Acceptance criteria for each work unit:**

- Passes type-checking (`tsc --noEmit` or equivalent for the toolchain)
- Builds successfully (`npm run build` or equivalent)
- Renders without errors in `npm run dev`
- Copy matches the source-of-truth docs exactly (no paraphrasing)
- Follows existing repository conventions (file naming, component structure, Sanity schema patterns)
- No new dependencies added without confirmation
- No Sanity schema changes without confirmation

---

## 5. Constraints

These rules override anything else. They apply to every work unit.

1. **Never touch the production Sanity dataset.** All content work happens locally; content is populated in Sanity by the content owner via Studio after templates are live. If you write any `@sanity/client` code that creates or mutates documents, point it at a local dev dataset or stub it out — never at production.

2. **Never push to main.** Push to the feature branch only.

3. **Never add new dependencies without confirming with the user.** This includes npm packages, Sanity plugins, fonts, third-party hosted scripts. Always ask.

4. **Never modify the Sanity schema without confirming with the user.** Schema changes have implications for existing content. Even adding a new field to an existing document type needs confirmation. New document types definitely need confirmation.

5. **Never generate, commission or invent images, icons or visual assets.** The schematics, diagrams, orbital stat visuals and partner-page hero images are produced separately by a designer. Reference existing image asset IDs only. If a visual is missing for a section, leave a clearly-labelled placeholder and flag it in your review summary.

6. **Never paraphrase the source-of-truth copy.** The copy in the build docs is final. Use it verbatim where the Sanity field type allows. If a field expects a string and the docs have markdown formatting, strip the markdown and use the plain text; don't rewrite.

7. **Never substitute or improve the locked data points.** Corpus is 330M+. Latency is <10s. BGP scale is 1.23M prefixes / 78,600 ASNs. Threat feeds referenced generically only. Use these exact values.

8. **Where copy expects a CTA link to a page that doesn't exist yet, use a placeholder link `/coming-soon` and flag it in the review.** This applies to internal links to pages that haven't been built (e.g. `/not-asm`, `/trust`, `/methodology`, partner sub-pages for insurers and IT services).

9. **Sanity uses Portable Text, not markdown.** Rich-text content in Sanity is stored as structured JSON (Portable Text), not as markdown strings. When populating rich-text fields, convert the markdown from the build docs to Portable Text using `@sanity/block-tools` or equivalent. Don't dump raw markdown into Portable Text fields.

10. **Drafts before publish.** Even though you're not touching production Sanity, build the local templates so that they fetch from drafts by default in the dev environment. This matches the production review pattern.

11. **Don't refactor what you're not asked to refactor.** If you touch a component, don't restructure it beyond what the work unit requires. Same for schema files, page templates, styling, build configuration. Scope discipline is critical.

---

## 6. Repository orientation (first work unit)

Before any code changes, complete this orientation pass and report back:

**Files and structure to identify:**

- The framework in use (likely Next.js, possibly with the app router; confirm)
- The Sanity Studio location (typically `/sanity` or `/studio`)
- The Sanity schema files (typically `/sanity/schemas/*.ts` or `/schemas/*.ts`)
- The page templates (typically `/pages` or `/app`)
- The components library (typically `/components`)
- The styling approach (Tailwind, CSS modules, styled-components, etc.)
- The deployment configuration (`vercel.json` if present, environment variable expectations)
- The Sanity client configuration (project ID, dataset names, token expectations)
- Any existing build documentation or README content relevant to this work

**Document types to identify in the Sanity schema:**

- Homepage document type and field structure
- Partner page document type(s) — one shared, or per-segment?
- Data product page document type
- /infrastructure-intelligence page — does it map to a generic "page" type or a dedicated type?
- Hero/section/block patterns — what reusable structures exist?
- Image asset references — how are they linked from documents?

**Report back as a summary before doing anything else.** Include: the framework, the Sanity setup (project ID and dataset names — but not the tokens themselves), the relevant file paths, the document types and their key fields, and any inconsistencies you notice between the schema and the live site that might affect the upcoming work.

This first pass is read-only — no commits.

---

## 7. Work units

Each work unit is a bounded scope of work. Complete one, summarise, get confirmation, then move to the next. Do not work on multiple in parallel.

### WU1 — Orientation pass (read-only)

Per Section 6 above. Read repo, read schema, read all six build docs, report back.

### WU2 — Schema audit and update plan

Identify which Sanity document types support the upcoming page changes. Specifically:

- Does the homepage document type support the new Section 6 grid with the "Role in defensive AI" row? If not, what field needs to change or be added?
- Does the homepage hero support the new AI-scale / pre-compromise subhead, or does the existing field constrain length / structure?
- Does the homepage Section 8 support the Schematic 1.0 image reference, with copy before and after the diagram?
- Does the homepage Section 9 stat block support the two new stats (1.23M prefixes, 78,600 ASNs) — either as additions or as replacements for existing stats?
- Does the data product page document type support all the field changes called for in `datazag-data-product-page-revisions.md`?
- Does the partner page document type support all the field changes called for in the ESP and MSSP revision docs?
- For the new /how-it-works page — does a suitable document type exist, or does a new type need to be created?

For each finding, produce a short plan: schema unchanged / minor field addition / new field type / new document type. Distinguish between schema changes that can happen now (additive, backwards-compatible) and changes that require a content migration (destructive, e.g. renaming or removing fields).

Hand back the plan for confirmation before making any schema changes.

### WU3 — Build /how-it-works as a new page

Following `datazag-how-it-works-page-build.md`. This is the largest work unit.

Sub-steps:

1. Confirm the schema decision for the new page type (per WU2 plan).
2. Create the Sanity schema document type (if confirmed).
3. Create the page template (`/pages/how-it-works.tsx` or `/app/how-it-works/page.tsx` depending on router).
4. Build the components needed for the eleven sections (some may reuse existing components; some — like the layered architecture diagram hero — may need new components).
5. Implement responsive layout per the existing site's responsive conventions.
6. Insert placeholder content matching the source-of-truth copy, mapped to draft Sanity documents in the local dev dataset.
7. Add the route to the site navigation only after confirmation.
8. Test the page renders in dev, type-checks pass, build succeeds.

Visual assets:

- Hero diagram (layered architecture) — placeholder if the asset doesn't exist yet
- Sections 2, 3, 4, 5, 6 — placeholders for the supporting visuals per the build doc
- Note in the review summary which visuals are placeholders, with the file location for each

Open items from the build doc to flag back:

- Page URL: `/how-it-works` recommended; confirm
- Data residency, SOC2 / ISO 27001 status, GDPR posture, sub-processors — these need user input before the Specs and Standards section can be populated. Leave placeholders.

### WU4 — Homepage Section 6 grid update

Add the "Role in defensive AI" row to the existing Assess/Monitor/Build grid. Copy as in the homepage doc.

This may require a schema change (additional field in the grid row structure) — refer to WU2 plan.

### WU5 — Homepage Section 8 copy and visual

Replace the current Section 8 copy with the final version from the homepage doc:

- New headline: "Datazag is the predictive layer alongside your stack."
- Pre-diagram body: as in the homepage doc
- Schematic 1.0 image (existing asset, if uploaded; placeholder if not)
- Post-diagram body: as in the homepage doc
- Two CTAs: "How we compare to ASM" → `/coming-soon` placeholder; "How the Graph works" → `/how-it-works` (live after WU3)

### WU6 — Homepage Section 9 (Proof) stats update

Update the stat block to incorporate the new BGP scale numbers. Decide structure (4-stat or 6-stat) based on the existing schema and visual layout. Recommended four-stat structure:

- 330M+ active domains
- <10s ingestion latency
- 1.23M+ BGP prefixes monitored
- 78,600+ autonomous systems mapped

(Drop the 3-yr history stat or the <1% FP rate stat from earlier proposals, depending on which fits the existing visual best. Flag the decision in your review summary.)

### WU7 — Homepage hero subhead update

Update to the new version from the homepage doc:

> Attackers exploit your trust in third-party vendors — at AI scale. Datazag fingerprints the global infrastructure surface to detect platform impersonation pre-compromise, before campaigns send. We feed it into your blocking stack as automated data, not a manual portal — and we explain why each detection fires, so defensive AI and SOC automation can act on it.

If the existing hero field constrains length, flag and ask. Don't truncate or paraphrase.

### WU8 — Data product page credibility fixes

Per `datazag-data-product-page-revisions.md`:

- All "315M+" → "330M+"
- "Predict Threats Earlier" → use pre-compromise / early-warning language per the doc
- Localhost canonical URL leak → production URL
- Duplicated "Logs You Can Enrich" block → remove duplicate
- Duplicated "Our Approach:" treatment → resolve to one version
- "Available Q1 2026" references → confirm with user whether still aspirational or now launched
- "From" pricing for Live Cloud Shares with no number → either populate or remove "From"
- Portal sign-up URL `https://portal@datazag.com` → confirm correct URL with user

This work unit is credibility-fix-focused; the larger structural revision of this page (per the revision doc) can be a separate work unit later.

### WU9 — ESP partner page edits

Per `datazag-esp-page-revisions.md`:

- "Marletplaces" → "Marketplaces"
- "open ratese" → "open rates"
- "315M+" or "~315M" → "330M+"
- Named mechanism threading per the doc (Build-Time Detection, Platform Fingerprinting, Signal Correlation, Datazag Graph references)
- One added sentence introducing the Datazag Graph in the "Powered by global internet intelligence" section
- The 85% platform-impersonation finding referenced in the appropriate section (optional, per the doc)

### WU10 — MSSP partner page edits

Per `datazag-mssp-page-revisions.md`:

- Same cross-cutting fixes (corpus number, named mechanisms, Datazag Graph reference)
- The long-tail platforms argument added as a fourth "Why Partner" card (per the doc)
- Specific small grammar / formatting touch-ups per the doc
- "Domain Intelligence Backbone" naming consolidated with established Datazag vocabulary

### WU11 — Final review pass

Sanity-check the full diff against main:

- All locked data points consistent across all changed pages
- All named mechanisms used consistently
- All internal links resolve (or point to `/coming-soon` placeholders that are flagged)
- All Sanity drafts exist where they should
- All TypeScript compiles
- All builds succeed
- Lighthouse scores acceptable on changed pages (no regression from current)
- Visual placeholders all flagged in a single summary

Hand back the summary with the branch ready for PR.

---

## 8. Out of scope for this engagement

These are explicitly *not* part of the current work:

- Sanity content authoring beyond the schema and template work (the content owner populates production Sanity via Studio after templates are live)
- The substantiation-update pass referenced in the conversation (corroborated scoring framing, NXDOMAIN-validated metrics, etc.) — this is a future second pass once the substantiation data is locked
- Building partner pages for insurers/M&A and IT services (not yet drafted; would be a future engagement)
- Building /not-asm, /trust, /methodology, /research, /observatory pages (also future)
- Building the 85% platform-concentration research page (future)
- Building new Sanity Studio plugins or extensions
- SEO optimization beyond what the build docs specify
- Analytics instrumentation changes
- Performance tuning beyond avoiding regression
- Visual asset creation (handled by designer separately)
- Marketing email or other off-site materials

If during the work you identify something that seems important but is out of scope, flag it in the review summary as a future work item — don't expand scope unilaterally.

---

## 9. Things to flag back to the user during the work

Some questions can only be answered by the user. Flag these as they arise rather than improvising:

- Branch name: `feature/website-rebuild-q3` or a different convention? (Ask in WU1.)
- Sanity schema changes per WU2 — confirmation needed before WU3 starts.
- Page URL for /how-it-works — confirm this or an alternative (`/the-graph`, `/datazag-graph`).
- Data residency, security certifications, GDPR posture, sub-processors — for the Specs and Standards section of /how-it-works.
- "Available Q1 2026" content on the data product page — still accurate or update needed?
- Portal sign-up URL on the data product page — the existing `https://portal@datazag.com` looks malformed.
- Live Cloud Shares pricing — populate or remove the "From" fragment?
- Section 9 stat structure — keep four-stat layout (with two new stats replacing two old ones) or expand to six?
- Any existing partner-page or homepage components that the build doc copy doesn't map cleanly to.

Don't block on these — keep moving in parallel where possible, and surface them as questions during review.

---

## 10. Tone and discipline expectations

Three things to internalise:

**Restraint over enthusiasm.** When Datazag copy reads as substantive and confident, the tone is right. When it reads as marketing-led, claim-forward or breathless, the tone is wrong. Treat any temptation to embellish, polish, or "improve" the copy as a signal to pull back, not push forward.

**Source-of-truth discipline.** The build docs are the answer to "what should this page say?" If you find yourself thinking the copy could be better written, the right move is to stop and check whether the source doc has the version you're inventing. It usually does.

**Bounded scope.** Each work unit is bounded for a reason. Completing the work unit cleanly and handing back for review is more valuable than completing two and handing back a messier diff. When in doubt, finish narrowly and ask.

---

## 11. Starting prompt

The first thing to do after reading this briefing is:

1. Acknowledge you've read it.
2. Confirm or ask about: the branch name, the source-of-truth doc folder location, the local Sanity dev dataset name.
3. Begin WU1 (Orientation pass).
4. Report back with the orientation summary before doing anything else.

Good luck.
