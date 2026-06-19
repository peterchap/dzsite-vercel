# Infrastructure Intelligence Page — Revisions

**Current URL:** https://www.datazag.com/infrastructure-intelligence

**New role:** The dedicated **data product page** (BUILD product from homepage Section 6). Engine-credentialing content moves to a new /how-it-works page (separate doc).

**Approach:** Amend in place. The current URL stays live during the transition; engine content gets trimmed out *after* /how-it-works ships, not before — so there's no period where the engine claim is missing from the site.

**Optional URL change:** Consider renaming the page from `/infrastructure-intelligence` to `/data` or `/domain-intelligence` to align with the homepage routing language. Not urgent — set up a redirect if you change it.

**Cross-cutting fixes (do these first, regardless of restructure):**

1. Replace every instance of "315M+" with **330M+** to match the homepage corpus number.
2. **"Predict Threats Earlier"** in the hero — rewrite to use *pre-compromise* or *early-warning* language. We deliberately moved away from "predict" as it's harder to defend.
3. **"http://localhost:3001/"** appears in the canonical and og:url metadata. Build configuration leak — needs to be the production URL. Tell whoever owns the deploy.
4. Fix the **duplicated "Logs You Can Enrich" block** (currently rendered twice on the page — Sanity content-block bug).
5. Fix the **duplicated "Our Approach:" treatment** — appears in two different forms.
6. Check whether **"Available Q1 2026"** in the cloud-shares section is still accurate. If launched, update language; if delayed, hedge.

---

## Hero section

### KEEP

- The CTAs ("Get Free API Key" / "Data Dictionary") — both good calls to action for the data buyer.
- The three-token tagline ("Explainable risk factors • Designed to reduce noise • API, feeds & webhooks") — same caveat as on partner pages: format as proper badges, not inline string.

### CHANGE

The H1 "Infrastructure Intelligence — Predict Threats Earlier, with Context You Can Trust" needs the pre-compromise revision and a tighter brand frame:

> # Domain intelligence, built for the data teams who consume it.
>
> Cloud data shares, real-time API and webhooks — over 330M+ active domains with infrastructure context refreshed continuously. Built for SOC enrichment, fraud scoring, brand protection and email security pipelines.

The subhead beneath that:

> Replace manual DNS investigations with one SQL join. JOIN-ready domain intelligence across Snowflake, Databricks, AWS, Azure and GCP — and a real-time API for live lookups.

The page's primary purpose is now clearly the **data product**, and the hero should signal that to the technical/data-team buyer landing on the page. The framing shifts from "intelligence platform" to "data product for builders."

---

## The Manual Enrichment Problem

### KEEP

This entire section. The framing — manual DNS investigations vs one SQL join — is the strongest single value-prop argument on the page for the data-team buyer. Keep the existing image too if it visualises the workflow comparison.

### CHANGE

Tighten the closing line:

> Datazag's domain intelligence automates enrichment in one SQL join across all your logs, against the full 330M+ domain corpus. Hours of analyst time saved per investigation.

---

## The Solution: Use Datazag's Domain Intelligence

### KEEP

- The two-column structure (Live Cloud Data Shares / Real-Time API Access).
- All five benefits in the Cloud Data Shares list — they're substantial and well-argued. The "Better economics" point about cloud-credit billing is genuinely differentiating versus SaaS-portal competitors. Keep.
- The SQL example.
- All five benefits in the Real-Time API Access list.
- The Python example.
- The use cases list.
- The Integration Diagram image (assuming it visualises the data flow into the customer's stack).

### CHANGE

The "315M+ row dataset" line in Cloud Data Shares → "330M+ row dataset."

The "Supported Platforms" list — verify which marketplaces are actually live versus aspirational. Update "Available Q1 2026" wherever needed.

The first sentence of Cloud Data Shares:

> **Zero-ETL, instant access.** No API throttling, no download scripts, no maintenance overhead. The data just appears in your SQL editor as a table.

(Removed the "It just appears" phrasing that read slightly informal.)

The "Adaptive DNS Scanning Grid" naming in the Cloud Data Shares description is a Datazag-internal term that we should make consistent with the rest of the site. Two options:

- Rename it **the Datazag Graph** to match the homepage's engine naming
- Or keep "Adaptive DNS Scanning Grid" as the specific technical component name (acceptable if it's genuinely a distinct named system in your architecture)

My recommendation: rename to the Datazag Graph, since that's now the brand-level engine claim. Internal technical names ("Adaptive DNS Scanning Grid", "Live Sonar Scan") confuse the brand-naming hierarchy.

### CHANGE

The "**Live Sonar Scan**" naming in the Real-Time API section — same issue. Rename to use the established Datazag naming. Could become: "If a domain isn't in our corpus, we trigger a **Build-Time Detection** scan to resolve, trace, and risk-score it in <2 seconds." (Build-Time Detection is one of the four named mechanisms — this is the right place to use it.)

---

## Intelligence, not just data

### CHANGE

This section is doing engine-credentialing work that will mostly move to the new /how-it-works page. For the data product page specifically, tighten and reframe to focus on what the data buyer gets:

> ## More than a raw feed — pre-enriched, pre-scored, ready to JOIN.
>
> Other data vendors hand you raw signals and leave the interpretation to you. Datazag delivers domain intelligence with risk scores, classifications, infrastructure context and historical patterns already computed — so your SQL queries return answers, not attributes.
>
> **Pre-enriched:** Every record carries 50+ attributes — DNS, WHOIS, certificates, hosting, reputation — joined in advance.
>
> **Pre-scored:** Risk scores, classifications and trust indicators are computed against the full graph at ingestion. Your queries return decisions, not lookups.
>
> **Refreshed continuously:** Real-time updates from CertStream, BGP and active DNS scanning. Today's internet, not yesterday's snapshot.
>
> **Explainable:** Every score includes the signals and reasoning that drove it — for defensive AI, SOC automation and audit workflows.

The fourth point on explainability is new and important — it threads the homepage's explainability claim into the data product description, which matters for AI-driven detection buyers.

### REMOVE

The "Sub-1% false positive rates on phishing detection through multi-signal analysis" claim — keep the substance but move it to /trust or /methodology when that page exists. Standing alone on a data product page it invites the methodology challenge (per the expert critique).

---

## Complete Domain Coverage, Updated in Real-Time (stats)

### KEEP

The four-stat treatment.

### CHANGE

Update numbers and labels to match the homepage stat block:

| Current | Revised |
|---|---|
| 315M+ Domains Monitored | **330M+** Active domains monitored |
| <60 sec Detection Speed | **<10 sec** Ingestion latency from CertStream |
| 50+ Attributes Per Domain | **50+** Attributes per domain (keep) |
| 24/7 Live Monitoring | **3 yrs** of DNS and routing history |

The detection-speed and live-monitoring stats overlap. Replace "Live Monitoring" with "3 yrs of DNS and routing history" — that's a more differentiating stat and matches the homepage proof block.

(Note: the existing "<60 sec" is registration-to-alert; "<10 sec" is ingestion latency. They're different stages of the pipeline. Confirm internally which figure should be the headline for which audience. Data buyers care more about ingestion latency; operational buyers care more about detection-to-alert. Both stats are real; the labelling needs to be precise.)

---

## Every domain. Every detail.

### KEEP

The whole nine-category attributes section. This is one of the strongest pieces of content on the page — concrete, technical, demonstrates depth. Data buyers love this kind of detail.

### CHANGE

Three small tweaks:

In "Email & Deliverability" — change "BIMI record validation" to "BIMI, MTA-STS and TLS-RPT record validation" (matches the threat-surface signals named on the homepage Section 5).

In "Security Signals" — change "Brand impersonation indicators" to "Brand and platform impersonation indicators" (platform impersonation is the homepage thesis; this section should reflect it).

In "Classification & Scoring" — change "Risk scoring algorithms" to "Explainable risk scoring" (consistent with the homepage Section 8 capability naming).

---

## See What Enrichment Looks Like

### KEEP

The entire SQL example with the result interpretation. Genuinely useful for the data-team buyer — they can visualise their own logs through this lens.

### CHANGE

The made-up domain `secure-payment-update.xyz` is fine but might land better with a more familiar platform-impersonation pattern matching the homepage thesis. Replace with something like `microsoft365-login-verify.xyz` or `paypal-account-secure.online` — same fictional construction but evokes the platform-impersonation framing.

---

## Logs You Can Enrich

### KEEP

The six log-type categories (DNS, SMTP/Email, Proxy/Web, Firewall, EDR, IAM). All real.

### REMOVE (urgent — render bug)

This section is currently duplicated on the page. The second instance needs removing. Looks like a Sanity content-block was inserted twice.

---

## Built from the Ground Up

### MOVE TO /how-it-works

This entire section is engine-credentialing content — it explains how the data is collected. It belongs on the new engine page, not on the data product page. Move it across when /how-it-works ships, then remove from this page.

In the interim (before /how-it-works exists), keep it here as supporting credibility content but plan for the move.

---

## Power critical security workflows (use cases)

### KEEP

All six use cases (Phishing Detection / Fraud Protection / Email Deliverability / Log Analytics & SIEM / KYC & Compliance / Brand Protection). These map to the data-team buyer's typical applications and the challenge/solution/example format works.

### CHANGE

The "Brand Protection" use case mentions "domain impersonation" — update to "brand and platform impersonation" to thread the thesis.

The Phishing Detection example timing: "<60 second detection" — confirm this matches the stat block (per the earlier note on which latency figure is which).

---

## Try It Yourself

### KEEP

The interactive domain-check demo. This is excellent for the data-team buyer — they can validate against a domain they know before committing.

---

## Flexible Access For Every Team (pricing)

### KEEP

- The three-tier structure (Free / API Access / Live Cloud Shares).
- The free tier description.
- The "From $79/month" API tier description.

### CHANGE

The "Live Cloud Shares" tier currently shows "From" with no number after it. Either populate the actual price or remove "From" so the tier name doesn't read as broken.

Also: the Free tier sign-up link reads `https://portal@datazag.com` — that's not a valid URL (it's the format of an email-with-route prefix). Should probably be `https://portal.datazag.com`. Worth checking.

### REMOVE

The pricing detail on this page should be lighter now that /pricing exists as a dedicated page. Keep the three tiers visible as orientation, but route deeper detail to /pricing. This avoids pricing drift between pages.

---

## Automating Enrichment

### KEEP

The manual-investigation breakdown ("Copy domain from logs → WHOIS lookup → DNS queries → VirusTotal → Google → 5-15 minutes per domain"). Strong concrete framing of the buyer's existing pain.

The "All 330M domains pre-enriched updated hourly, queryable in seconds" line works.

### CHANGE

The "Our Approach:" header appears in two different sections with two different treatments. Fix the duplication.

The 315M number here → 330M.

---

## FAQ

### KEEP

All six FAQs. They cover the right questions.

### CHANGE

"What makes Datazag different from other domain intelligence providers?" — current answer is fine but could be sharpened to reference the Graph:

> We focus on actionable intelligence rather than raw data dumps. Our multi-signal approach combines real-time monitoring, explainable risk scoring, and graph-level correlation — built on **the Datazag Graph**. The result is answers, not just attributes. [Learn how the Graph works →](/how-it-works)

That link drives traffic to the new engine page when it ships.

---

## What gets pulled OUT of this page (moves to /how-it-works)

When the new engine page is live, the following content moves out of this page:

1. **"Built from the Ground Up"** section in full — the six data sources content.
2. The detailed treatment of "Adaptive DNS Scanning Grid" / "Live Sonar Scan" technical naming — engine internals belong on the engine page.
3. Any deep treatment of the four Graph capabilities — replaced with a single intro line + link to /how-it-works.
4. References to specific technical underpinnings (Arrow Flight, RouteViews/RIPE RIS, MANRS, RPKI, IRR) — these belong on the engine page where they can be explained properly.

After the move, this page should be lean and focused on **the data product** — what it is, who consumes it, how they integrate it, what they get back. Engine claims become signposts ("powered by the Datazag Graph → /how-it-works") rather than depth content.

---

## Imagery recommendations for this page (post-restructure)

For the refocused data product page specifically:

1. **Workflow comparison visual** — manual investigation flow on the left (DNS lookup → WHOIS → VirusTotal → Google → annotate), Datazag-enriched flow on the right (one SQL join → done). Probably the existing "Manual Enrichment Problem" image is doing this already; verify it matches the new framing.
2. **Cloud marketplace logos** — Snowflake, Databricks, AWS Data Exchange, Azure Data Share, Google Cloud Analytics Hub. Native procurement is a trust signal; the logos do the work.
3. **Sample enrichment output** — anonymised screenshot or styled mockup showing what a real domain enrichment looks like with all 50+ attributes populated. The buyer thinks *"that's what I'd get back."*
4. **An entity graph fragment** — small Datazag-Graph-style visualisation showing one flagged domain with edges to its hosting ASN, certificate authority, neighbour domains. Credentials the "graph, not flat feed" claim without doing the full engine treatment.

The engine-architecture diagram I rendered earlier in chat belongs on /how-it-works, NOT here.

---

## Open items needing your input

1. **URL decision** — keep `/infrastructure-intelligence` or rename to `/data` or `/domain-intelligence`. Set up redirects either way.
2. **The "<60 sec" vs "<10 sec" latency stats** — which is the data-product-page headline, which is the homepage headline. Both are real; the labelling needs to be precise.
3. **Marketplace availability** — confirm which are actually live vs Q1 2026 aspirational.
4. **The portal sign-up URL typo** — `https://portal@datazag.com` looks wrong.
5. **The "From" pricing for Live Cloud Shares** — currently shows "From" with no number.
6. **Adaptive DNS Scanning Grid / Live Sonar Scan naming decision** — rename to use Datazag Graph and Build-Time Detection respectively, or keep as internal-component names. My recommendation: rename to brand naming.
