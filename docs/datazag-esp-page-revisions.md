# ESP Partner Page — Revisions

**Page URL:** https://www.datazag.com/esp-partners

**Approach:** Amend in place. Structure of this doc — for each existing element on the page, instructions on whether to **keep** it as-is, **change** the wording, or **add** new content. Revised copy in blockquotes where it replaces existing text.

**Cross-cutting fixes (apply throughout the page):**

1. Replace every instance of "315M" or "~315M" with **330M** to match the homepage corpus number.
2. **Urgent**: fix the broken `{{PRICE:1200000}}` and `{{PRICE:2000000}}` template literals in the pricing section. These are showing on the live page as raw template strings.
3. Use the named mechanisms from the homepage where applicable: **Platform Fingerprinting**, **Build-Time Detection**, **Pre-Arrival Blocking**, **Corpus Matching**.
4. Add a single reference to **the Datazag Graph** as the engine, with a link to /how-it-works.

---

## Hero section

### KEEP

- Headline: **"Protect your Platform & your Customers from Phishing Attacks"** — fine and accurate, though slightly generic. See optional change below.
- The compliance-anchor line: "Supports compliance with EU DSA, UK Online Safety Act, and MAAWG Best Practices." This is excellent and a genuine differentiator for ESPs.
- The dual CTAs (Partner with Datazag / Talk to Sales).

### CHANGE

The subhead currently reads as one slightly muddled sentence with a stray hyphen ("before they start live campaign—"). Tighten and thread the new positioning:

> Datazag enables Email Service Providers to detect brand and platform impersonation infrastructure pre-compromise — Build-Time Detection catches it as it's provisioned, before campaigns send. Block abuse early, protect deliverability, and stay compliant.

The dual CTAs go to the same destination (/contact). Either route them differently or consolidate. My recommendation:

> **[ Partner with Datazag ]**   [ Talk to sales ]

— make "Partner with Datazag" the primary visual CTA and "Talk to sales" the secondary text link.

### CHANGE (optional)

If you want the headline to do more work, an alternative that names the ESP-specific value angle:

> Protect your platform's reputation. Protect your customers' brands. Sell both back to them.

That signals all three doors of the ESP value proposition in the headline itself. Bolder; risks reading as commercial-first to the deliverability/abuse-team buyer. Keep the current headline if you want the safer compliance-led entry.

---

## Regulatory, Compliance & Deliverability Are Linked

### KEEP

- The whole "New Reality" and "How Datazag Helps" two-column structure. Strong, real differentiation, lands the compliance angle that other vendors can't credibly claim.
- The Google/Microsoft penalty reference.
- All four bullets in "The New Reality" column.
- The four-of-five bullets in "How Datazag Helps" — they're good. See add note below for the missing one.

### CHANGE

The "How Datazag Helps" first bullet currently reads:

> Detect phishing and impersonation infrastructure during domain registration, DNS setup, and SSL issuance

Update to credit the named mechanism:

> Detect phishing and platform-impersonation infrastructure via Build-Time Detection — during domain registration, DNS setup and SSL issuance

### ADD

The page currently has TWO of the three ESP value doors well covered (compliance/protection and the resale revenue stream). The **data hygiene for deliverability** door is implicit but not called out as a distinct value angle for the product/engineering buyer inside the ESP.

Add this as a third sub-section in this part of the page, between "How Datazag Helps" and "And One More Thing... A New Revenue Stream":

> ### And feed your deliverability and abuse engineering directly
>
> Datazag's 330M-domain corpus and live infrastructure intelligence drop straight into the data pipelines your deliverability, abuse and anti-fraud teams already run:
>
> - JOIN-ready domain reputation and infrastructure context for outbound risk scoring
> - Real-time SSL/DNS signals for inbound abuse detection
> - Marketplace delivery via Snowflake, Databricks, AWS, Azure and GCP — zero ETL
>
> Three teams inside your platform get distinct value from the same intelligence: abuse and deliverability operations get the protection signals, product engineering gets the data feeds, commercial leadership gets the resale revenue stream below.

The closing sentence of that addition is doing important work: it explicitly names the three-door framing (three teams, three buyer hooks, one product), which is the strategic insight we identified for ESPs and which currently isn't visible on the page.

---

## And One More Thing... A New Revenue Stream

### KEEP

- This entire section is great. The "And One More Thing..." framing is unusually personable for a B2B site and lands the resale angle warmly.
- The four use-case bullets (Typosquats & lookalikes / Fake login & payment pages / Executive impersonation / Trademark abuse).
- The "without inspecting email content or violating user privacy" reassurance — operationally critical for ESPs.

### CHANGE

Small refinement to the lead line. Currently:

> Use our alerting system to provide your clients with a paid brand monitoring service...

Update to credit the named product:

> Use Datazag's Brand & Platform Alerts to offer your customers a paid brand-monitoring service — your service, your pricing, Datazag intelligence inside.

The "your service, your pricing, Datazag intelligence inside" closing language threads the homepage's deal-shape framing into the ESP context, which makes the partnership model visible at a glance.

---

## "Prioritise what matters / Reduce noise and false positives / Designed for SOC workflows"

### CHANGE

This appears mid-page as a standalone three-token line, similar to the MSSP page's hero tagline. It reads as floating text. Either format as proper badges/chips, or remove (the points are made elsewhere on the page already).

---

## How ESPs Use Datazag

### KEEP

- The four-step framing (Early Warning & Pre-emptive Blocking / Continuous Monitoring / Evidence-Based Escalation / Platform-Safe Enforcement).
- The intro framing about attacks assembled step-by-step.

### CHANGE

Update the four step headers to credit the named mechanisms where they map:

| Current | Revised |
|---|---|
| Early Warning & Pre-emptive Blocking | **Build-Time Detection & Pre-Arrival Blocking** |
| Continuous Monitoring | Continuous Monitoring — keep |
| Evidence-Based Escalation | Evidence-Based Escalation — keep |
| Platform-Safe Enforcement | Platform-Safe Enforcement — keep |

The "Where Datazag fits: early attack-chain visibility" block is identical to the MSSP page. Differentiate this version for ESPs specifically:

> **Where Datazag fits in your abuse and deliverability workflow**
>
> Detection happens at infrastructure provisioning — before a customer's outbound campaign sends, before inbound abuse messages arrive. Datazag intelligence drops into your risk-scoring pipeline, your onboarding controls, your throttling decisions and your sender-reputation analytics. The result is proactive abuse prevention with audit-trail evidence, not reactive enforcement after damage is done.

---

## Powered by global domain intelligence

### KEEP

- Section heading and structure.
- The "Delivery options" list (API & Webhooks / Snowflake & Databricks / Cloud marketplaces / Security marketplaces).

### CHANGE

Update the corpus number and add a Datazag Graph reference:

> All alerts are enriched by **the Datazag Graph** — Datazag's continuously refreshed internet-infrastructure intelligence platform combining signal correlation, explainable risk scoring, real-time telemetry and routing-hygiene verification. *[ How the Graph works ]*
>
> **Includes:**
> - **330M+** active global domains
> - Daily full refresh
> - Hourly bad-actor updates
> - DNS, MX, SPF, DMARC, hosting, provider and risk context

Also: fix the typo "Marletplaces" → "Marketplaces" in the delivery options list.

---

## Platform pricing built for scale and resale

### URGENT FIX

Currently rendering as `{{PRICE:1200000}} –{{PRICE:2000000}}` — broken Sanity template references showing on the live page. Replace with actual numbers in standard currency format:

> ESP partner pricing typically starts from **$12,000 – $20,000 per month**, scaling with:

(Confirm the actual range with sales — the rendered values look like prices in cents that didn't get formatted, which means the underlying numbers are probably $12,000 / $20,000 in dollars. Verify before publishing.)

### KEEP

- The four scaling factors (Platform size and customer base / Number of monitored brands / Alert volume / SLA and compliance).
- The three pricing design notes (Embedded security features / Premium customer add-ons / Regulatory and mailbox compliance).
- The currency/billing footnote.

---

## Items that don't need changes

- The footer structure.
- The compliance-frameworks naming (EU DSA, UK Online Safety Act, MAAWG).
- The "without inspecting email content" reassurance.
- The Snowflake / Databricks / cloud-marketplace delivery options.

---

## Open items needing your input

1. **Confirm the actual ESP pricing range** ($12K – $20K per month, or different?) for the broken template fix.
2. **/how-it-works page URL** for the Datazag Graph link (or placeholder URL).
3. **Headline decision** — keep current compliance-led headline or switch to the three-doors framing ("Protect your platform's reputation. Protect your customers' brands. Sell both back to them.").
4. **The three-doors framing** — confirm wording on the three internal-team breakdown (abuse/deliverability ops, product engineering, commercial leadership) before this lands.
