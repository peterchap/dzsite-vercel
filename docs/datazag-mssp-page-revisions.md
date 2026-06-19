# MSSP Partner Page — Revisions

**Page URL:** https://www.datazag.com/mssp-partners

**Approach:** Amend in place. Structure of this doc — for each existing element on the page, instructions on whether to **keep** it as-is, **change** the wording, or **add** new content. Revised copy in blockquotes where it replaces existing text.

**Cross-cutting fixes (apply throughout the page):**

1. Replace every instance of "315M" with **330M** to match the homepage corpus number.
2. Wherever the page describes detection mechanisms, use the named brand assets from the homepage: **Platform Fingerprinting**, **Corpus Matching**, **Build-Time Detection**, **Pre-Arrival Blocking**. The page currently describes these mechanisms in prose without crediting the names.
3. Add a single reference to **the Datazag Graph** as the engine, with a link to /how-it-works (or wherever the engine page lives).

---

## Hero section

### KEEP

- Headline: **"Scale profitably — without hiring more analysts"** — strong, business-mechanic-led, speaks directly to MSSP margin pressure.
- The structural framing (Multi-tenant, white-labelled, SOC scalability).

### CHANGE

The subhead has a stray space before the period and doesn't thread the new positioning language. Revise to:

> Add phishing and platform-impersonation protection across your client portfolio while improving margins. Datazag detects malicious infrastructure at AI scale — Build-Time Detection catches it as it's provisioned, before attacks launch and before your clients call.

The three-token tagline that currently reads as one cramped line — "Explainable risk factors • Designed to reduce noise • API, feeds & webhooks" — should be reformatted as three distinct chips/badges below the CTA, not as a single inline string. Same words, better visual rhythm.

---

## Why Partner with Datazag

### KEEP

- The three-card framing (Grow without margin erosion / Prevent incidents / Unlock new revenue streams).
- The "<1% false positive rate" reference — but see methodology note below.

### CHANGE

The first card's claim that "<1% false positive rate means minimal investigation time per alert" needs methodology backing. Either add an asterisk linking to /trust or /methodology when that page exists, or soften the claim slightly while you're pre-launch:

> *Grow without margin erosion* — Add new customers and brands without proportional analyst costs. Our false-positive controls (sub-brand resolution, explainable risk scoring, FP-check before delivery) mean minimal investigation time per alert.

### ADD

Add a fourth card surfacing the **long-tail platforms argument** — this is the strongest MSSP value angle and it's completely absent today:

> *Cover the platforms others don't*
>
> Microsoft, Google, Apple and Amazon detect impersonation of their own brand. Your clients use 30 to 60 other SaaS vendors with no mature brand-protection programmes. That's where you become essential — and where Datazag's Platform Fingerprinting maps the actual stack each of your clients runs on.

---

## How MSSPs Use Datazag

### KEEP

- The four-step breakdown structure (Early Alert / Continuous Monitoring / Evidence-Backed Escalation / Takedown-Ready Intelligence). The shape is right.
- The intro framing — "Phishing and impersonation campaigns are assembled step by step using newly registered domains, SSL certificates, DNS, and infrastructure."

### CHANGE

The four-step labels should be re-anchored to the named mechanisms where they map cleanly. Revise the four headers:

| Current label | Revised label |
|---|---|
| Early Alert & Customer Protection | **Build-Time Detection & Pre-Arrival Blocking** |
| Continuous Monitoring (No Analyst Time) | Continuous Monitoring (No Analyst Time) — keep |
| Evidence-Backed Escalation | Evidence-Backed Escalation — keep |
| Takedown-Ready Intelligence | Takedown-Ready Intelligence — keep |

Then update the first step's bullet content to thread the named mechanisms:

> **Build-Time Detection & Pre-Arrival Blocking**
> - Detect impersonation infrastructure at SSL issuance, DNS configuration and registration — before campaigns launch
> - Pre-Arrival Blocking feeds alerts directly into your clients' security stack
> - Reduce client exposure during the window before any platform-side takedown lands

### CHANGE

The "Where Datazag fits: early attack-chain visibility" block is currently identical word-for-word with the ESP page. Differentiate this one to specifically address MSSP analyst workload:

> **Where Datazag fits in your SOC workflow**
>
> Detection happens at infrastructure provisioning, alerts arrive in your existing SIEM or SOAR with the reasoning attached (matched signals, hosting context, infrastructure neighbours), and analysts only triage what's already been FP-checked. The result is fewer alerts to review, higher confidence per alert, and earlier action than your existing tooling provides.

---

## What You Can Build With Datazag

### KEEP

- The three-service framing (Zero-Hour Phishing Defence / Brand Impersonation & Abuse Monitoring / SOC Enrichment & Threat Hunting). This is excellent — concrete, resellable, maps to a land-and-expand path.
- The structure of each service (capabilities, outcome, framing line).

### CHANGE

Service 1 — "Zero-Hour Phishing Defence" — update the detection phase bullets to thread the named mechanisms and lift "hours to days" from a generic claim to a defensible specific:

> **Detect phishing infrastructure during:**
> - Domain registration (Platform Fingerprinting)
> - DNS configuration (Corpus Matching)
> - SSL certificate issuance (Build-Time Detection)
>
> **Outcome:**
> - Hours to days of early warning, inside the window before platform-side takedowns land
> - Risk score and detailed reasoning per detection (signals matched, hosting context, infrastructure neighbours)
> - Pre-Arrival Blocking routes alerts straight into your clients' email gateways, DNS resolvers and web proxies — fewer escalations, faster response, less work

Service 3 — "SOC Enrichment & Threat Hunting" — the "315M+ domains" line needs the corpus update:

> **Intelligence layer:**
> - JOIN-ready domain intelligence across **330M+** active domains
> - Hourly updates via cloud marketplaces, supporting both Iceberg and Delta formats
> - API access with data updates every minute

---

## Brand Coverage & Intelligence Scope

### KEEP

- Both sub-sections (Customer-Owned Brand Monitoring / Global Campaign Context). The operational clarity here is good.
- The pricing-anchor sentence: "Pricing is based on distinct monitored brands."

### CHANGE

The "Datazag does not perform brand monitoring for third party domains that are not your clients" line reads slightly defensive. Reposition as a positive framing:

> Datazag's MSSP programme is scoped to your client portfolio and your own brand. Third-party domain monitoring outside that scope is available under separate enterprise arrangements — talk to us.

---

## MSSP Control Plane (Admin Dashboard)

### KEEP

This entire section. The framing — "for governance and configuration, not alert triage" — is unusually mature and addresses a real MSSP concern (vendor dashboards that compete with the SIEM/SOAR for analyst attention). It's actively differentiating. No changes.

---

## Next steps

### KEEP

- The "How Partners Typically Adopt Datazag" three-step adoption path. Good.
- The "Who This Program Is For" list with the emoji bullets.

### CHANGE

The expansion path mentions "Domain Intelligence Backbone" which doesn't appear elsewhere on the site or in the doc. Update to use the established naming:

> **How Partners Typically Adopt Datazag**
> 1. Launch Zero-Hour Phishing Defence
> 2. Expand into Brand Impersonation & Takedown
> 3. Adopt the full SOC Enrichment & Threat Hunting layer as detection and hunting mature
>
> This creates a natural expansion path without operational overhead.

(Also: the line "This creates a natural expansion path without operational overhead" appears twice in the current page — likely a render bug. Remove the duplicate.)

### ADD

Add a small "Powered by the Datazag Graph" footer or banner before the contact CTA, with a link to /how-it-works:

> Every Datazag detection runs on the Datazag Graph — a connected internet-infrastructure graph combining signal correlation, explainable risk scoring, real-time telemetry and routing-hygiene verification. *[ How the Graph works ]*

This is the single most important addition for the technical-buyer audience inside MSSPs (the SOC analysts evaluating the feed).

---

## Pricing approach

### ADD

The MSSP page currently has no pricing anchor (the ESP page does, even though that template is broken). Asymmetry is awkward — either both show indicative ranges or both hide. My recommendation: add an indicative-range section similar to the ESP page, scaled to MSSP economics:

> **MSSP partner pricing**
>
> Datazag works with MSSPs on a per-client-brand basis, scaling with:
> - Number of monitored client brands
> - Alert volume and integration depth
> - SLA and white-label requirements
>
> Indicative starting range: [X – Y per month] for the typical mid-market MSSP portfolio. Final pricing is agreed per partner.

Confirm with sales what the actual indicative range is. Even a wide bracket ("from £X / month") gives the prospect enough to know whether they're in the right zone, which qualifies the inbound. Hidden pricing wastes everyone's time on bad-fit conversations.

---

## Items that don't need changes

- The hero CTA structure
- The visual treatment overall
- The MSSP-specific control plane section
- The "Who This Program Is For" list
- The footer

---

## Open items needing your input

1. **Indicative pricing range** for the new pricing section (MSSP)
2. **/how-it-works page URL** for the Datazag Graph link (or the placeholder URL until that page exists)
3. **Methodology page** decision — whether to link "<1% false positive rate" to a /trust or /methodology page when that exists, or soften the claim in the meantime
4. **The fourth "Why Partner" card** (long-tail platforms) — confirm wording on what's typical for SaaS-vendor count per client; the "30 to 60" range I used is illustrative
