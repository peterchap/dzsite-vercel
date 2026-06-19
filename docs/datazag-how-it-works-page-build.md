# /how-it-works — The Datazag Graph (Engine Page)

**New page URL:** `/how-it-works` (recommended) or `/the-graph` or `/datazag-graph`

**Page job:** Explain the engine that powers all three products. Credentialise the technical depth that makes Datazag's positioning defensible. The destination for any link that says "How the Graph works" elsewhere on the site.

**Primary audience:** Technical buyers evaluating depth — MSSP analysts, ESP product engineers, security data team leads, due-diligence-minded investors and analysts.

**Page voice:** Substantive, technical, confident. This is the page where Datazag earns the right to make the engine claims that appear elsewhere on the site. Specificity is the value (RPKI not "routing validation", Arrow Flight not "fast transport").

**Convention:** `>` blockquotes are finished copy. *Italic notes* are build/design guidance. `[ ]` brackets are placeholders needing your input.

---

## 1. Hero

> # The Datazag Graph
>
> A connected, continuously refreshed graph of the internet's infrastructure — domains, IPs, ASNs, certificates, threat feeds — with explainable risk scoring, real-time telemetry and routing-hygiene verification built in. Every Datazag product runs on it.
>
> **[ See it powering Assess ]**  **[ See it powering Monitor ]**  **[ See it powering Build ]**

*Visual: the layered architecture diagram. Three products on top (Assess / Monitor / Build), four Graph capabilities in the middle (2×2 grid), data substrate at the bottom (330M+ active domains · CertStream · BGP · DNS). Same diagram rendered earlier in chat. Each product label routes to that product's marketing page; each capability label routes to its section below on this page.*

---

## 2. Why a graph, not a feed

> ## Most threat intelligence is a list of indicators. Datazag is a graph of relationships.
>
> Flat feeds tell you a domain is malicious. They don't tell you *which other domains share its hosting infrastructure*, *what ASN it belongs to*, *which certificate authority signed it*, *whether its routing posture is hijacked*, or *how its risk score is changing relative to its peers*.
>
> The Datazag Graph models all of that as a connected dataset — nodes for every entity, edges for every relationship, scores recomputed continuously. The result is the kind of guilt-by-association detection that flat feeds structurally can't deliver: one flagged domain surfaces every related one without a second lookup.
>
> *Powering this approach are four capabilities, each described below.*

*Visual (optional, supports the section): a small node-and-edge fragment showing one domain at the centre with edges fanning out to its hosting ASN, its certificate authority, two neighbour domains on the same infrastructure, and an external threat-feed match. Static SVG is fine; doesn't need to be interactive.*

---

## 3. Signal correlation and graphing

> ## Signal correlation and graphing
>
> Every entity in the Graph is a node with typed edges to every other entity it touches.
>
> - **Domain ↔ IP** — every observed resolution, with timestamps
> - **Domain ↔ Certificate** — every certificate ever issued for the domain, with issuance time and CA
> - **Domain ↔ ASN** — the autonomous system hosting the domain at any point in its history
> - **Domain ↔ Threat feed** — every external indicator that has touched the domain
> - **ASN ↔ ASN** — peering relationships derived from BGP observations
> - **Certificate ↔ Subject Alternative Name** — every domain a certificate covers
> - **Registrar ↔ Domain** — every domain a registrar manages, with reputation context
>
> When a new domain is added to the Graph, every existing relationship is computed within the ingestion pipeline. Flagging the domain instantly surfaces the surrounding infrastructure neighbourhood — without your queries having to construct it.
>
> *In practice: one CertStream-detected lookalike domain becomes a connected sub-graph showing its hosting context, its certificate issuer, the other domains on its ASN, and any threat-feed matches in that neighbourhood. Detection becomes investigation, automatically.*

*Visual: an annotated graph fragment showing one node with eight edges to differently-labelled neighbour entity types (IP, ASN, Cert, Threat feed, neighbour domain, etc.). Each edge type colour-coded.*

---

## 4. Explainable risk scoring

> ## Explainable risk scoring
>
> Every entity in the Graph carries a risk score, recomputed continuously from dozens of signals:
>
> - **DNS velocity** — how often the resolution changes, on what cadence, and whether the pattern matches known attacker behaviours
> - **ASN concentration** — whether the surrounding infrastructure clusters with known-bad operators, and how closely
> - **Registrar reputation** — the historical abuse rate of the domain's registrar, weighted by recency
> - **Certificate cadence** — the issuance pattern (Let's Encrypt rapid cycle vs long-lived enterprise cert)
> - **Routing posture** — RPKI validation state, MANRS compliance, IRR registration completeness
> - **Domain provenance** — age, ownership continuity, WHOIS quality
> - **Neighbour signals** — risk scores of directly connected entities, weighted by edge type
>
> Critically, every score ships with the signals and rationale that drove it. Defensive AI, SOC automation and audit workflows can reason about *why* a domain scored where it did — not just that it crossed a threshold. Black-box scores require trust; explainable scores produce action.
>
> *Methodology depth: [link to /trust or /methodology page when that exists]*

*Visual: a single domain risk score (e.g. "87/100") with the contributing signals visualised as horizontal bars beneath, each showing the signal's name and its contribution weight. Demonstrates "explainable" tangibly.*

---

## 5. Real-time telemetry

> ## Real-time telemetry
>
> Static feeds tell you what was bad yesterday. The Datazag Graph tells you what's becoming bad now.
>
> The Graph is fed by streaming pipelines, not batch jobs:
>
> - **Certificate transparency** — direct CertStream ingestion, every certificate logged within seconds of issuance
> - **BGP** — multi-collector observations from **RouteViews** and **RIPE RIS** for routing visibility independent of any single vendor's vantage point
> - **DNS** — active polling of authoritative nameservers across the 330M-domain corpus, refreshed by priority tier (hourly for active domains, ~40 hours for the long tail)
> - **MX and mail server probing** — active classification of email infrastructure for 1,000+ mailbox providers
> - **WHOIS** — direct registry zone-file access where available
> - **Threat-feed integration** — phishing databases, malware feeds and security-community sources
>
> Underlying transport runs on **Apache Arrow Flight** across a distributed cluster, with **DuckDB** as the analytical engine. The result is end-to-end latency from real-world event to enriched intelligence measured in seconds, not hours.

*Visual: a flow diagram showing the six data sources on the left flowing into the Datazag Graph in the centre, then out to the three products on the right. Time annotations on the flow arrows showing typical latencies (e.g. "<10s from CertStream", "minutes for DNS refresh", etc).*

---

## 6. Routing hygiene verification

> ## Routing hygiene verification
>
> Most threat-intelligence systems treat hosting as binary — a domain is hosted somewhere or it isn't. The Datazag Graph treats it as a continuum: *hosted somewhere, and what's the routing posture of that somewhere?*
>
> Every ASN, prefix and route in the Graph is checked against:
>
> - **RPKI** (Resource Public Key Infrastructure) — is the route origin cryptographically valid?
> - **MANRS** (Mutually Agreed Norms for Routing Security) — does the hosting network meet community standards for routing security?
> - **IRR** (Internet Routing Registry) — is the prefix correctly registered?
> - **Origin AS consistency** — has the prefix been announced from multiple ASes (potential hijack signal)?
> - **Route stability** — how much churn has the prefix seen in the last 24 hours?
>
> A domain hosted on infrastructure with a hijacked routing posture carries fundamentally different risk than a domain hosted on a MANRS-compliant network with stable RPKI-validated routes. Datazag surfaces that distinction; most intelligence vendors don't see it at all.
>
> This is the depth that distinguishes "domain hosted somewhere" from "domain hosted somewhere with a hostile routing posture."

*Visual: a comparison illustration showing two domain entities side by side — left one with clean routing (RPKI valid, MANRS compliant, stable prefix) in green/teal, right one with hostile routing (RPKI invalid, MANRS non-compliant, prefix churn) in coral/red. Same domain "appearance" externally, very different risk signature.*

---

## 7. How the Graph is fed (data substrate)

> ## What flows in
>
> The Datazag Graph is built from continuous monitoring of the internet's core infrastructure — not licensed feeds, not bought datasets, not periodic crawls.
>
> **Mail provider analysis.** Active probing of MX records and mail server configurations to classify email infrastructure across 1,000+ mailbox providers, including full-chain vanity MX resolution.
>
> **DNS infrastructure.** Continuous polling of authoritative nameservers across the full 330M-domain corpus, plus passive DNS collection. Active records refresh hourly; the long tail every ~40 hours.
>
> **Certificate transparency logs.** Real-time CertStream monitoring of SSL/TLS certificate issuance — every certificate logged within seconds of being issued, before the domain it covers can be used in an attack.
>
> **BGP and routing data.** Multi-collector observations via RouteViews and RIPE RIS for vendor-independent routing visibility. RPKI validation, MANRS compliance and IRR registration state computed continuously.
>
> **WHOIS and registry data.** Direct feeds from registry operators and zone-file access where available, for authoritative registration data without rate limits.
>
> **Threat intelligence feeds.** Integration with phishing databases, malware feeds and security-community sources for external indicator enrichment.
>
> **Curated lookup tables.** MX → mailbox provider mapping, ASN → hosting provider classification, IP and TLD country attribution, ASN names and geographic location — maintained continuously.

*This section can take over the existing "Built from the Ground Up" content from the current Infrastructure Intelligence page (which is moving here as part of the restructure).*

---

## 8. The named mechanisms (how the Graph powers products)

> ## The Graph in motion — four named mechanisms
>
> The Graph's static structure is one thing; what it does in real time is another. Four mechanisms drive everything Datazag products deliver.
>
> ### Platform Fingerprinting
>
> One work email gives Datazag a domain. The Graph then analyses the domain's DNS and subdomains to map the platforms and vendors the organisation depends on — the SaaS logins, the email platforms, the supplier dependencies. No customer input beyond the email address. This is what makes the External Platform Threat Report self-serve.
>
> ### Corpus Matching
>
> Every candidate domain (newly registered, newly certificated, newly observed) is checked against two signals: the known DNS footprint of the platform or brand it appears to spoof, and its own internet context — where it's hosted and the risk profile of the surrounding infrastructure. Together those signals separate genuine spoofs from coincidental lookalikes.
>
> ### Build-Time Detection
>
> Impersonation infrastructure is flagged at the moment it's provisioned — registered, certificated, resolving — before the campaign that uses it ever launches. This is the temporal advantage: detection happens inside the window before any platform-side takedown lands, before the spoof goes live, before the first phishing email is sent.
>
> ### Pre-Arrival Blocking
>
> Detected infrastructure feeds directly into the customer's blocking stack — email gateway, DNS filtering, web proxy, SIEM. Detection becomes a block, not a queue. The intelligence acts on the infrastructure before it acts on the customer.

*Visual: a four-panel flow showing the four mechanisms in temporal sequence — Platform Fingerprinting (customer input) → Corpus Matching (Graph analysis) → Build-Time Detection (provisioning catch) → Pre-Arrival Blocking (stack integration). Could be redrawn from the homepage timeline visual.*

---

## 9. What the Graph is not

*This section pre-empts a common buyer misconception that comes up in technical evaluations. Optional but useful.*

> ## What the Graph is not
>
> **Not a threat-intel feed.** Feeds are flat lists of indicators. The Graph is a structured relational dataset where every entity carries its neighbourhood with it.
>
> **Not an ASM tool.** Attack-surface management tools look inward at the customer's perimeter to find their assets. The Graph looks outward at the internet to find what's targeting them.
>
> **Not a SaaS dashboard.** The Graph is intelligence infrastructure consumed via API, webhook, cloud marketplace data share, or embedded in partner products. Datazag's own portal exists for governance and configuration — not for analysts to live in.
>
> **Not built from licensed feeds.** Datazag operates the collection infrastructure (CertStream consumer, DNS scanning grid, BGP collectors, mail probing) rather than aggregating someone else's data products.

---

## 10. Specs and standards

*Buyer reassurance for the security-and-compliance-minded evaluator.*

> ## Specs and standards
>
> **Data residency:** [confirm — UK, EU, regions supported]
> **Security certifications:** [SOC2 status / ISO 27001 status / roadmap]
> **Privacy posture:** [GDPR posture; how customer email submissions are handled]
> **Sub-processors:** [link to /trust]
> **Methodology:** [link to /trust or /methodology]
>
> **Data sources are authoritative and legal:** RouteViews and RIPE RIS are public BGP archives; CertStream is the public-feed companion to Certificate Transparency. DNS authoritative polling is standard query traffic. No proprietary feeds licensed under restrictive terms.

*Open item: confirm exact data residency, certifications status, and sub-processors. This section is critical for enterprise security buyers — most ask within five minutes of an exploratory conversation. Even "in progress" or "Q3 2026 target" is better than absence.*

---

## 11. Final CTA

> ## Want to see the Graph in action?
>
> Start with the free External Platform Threat Report — one work email, no scoping call.
>
> **[ Get my free report ]**  **[ Talk to engineering ]**

*The secondary CTA ("Talk to engineering") is for the technical evaluator who's reading this page and wants depth conversations. Routes to a contact form with an "engineering" tag so it goes to the right inbox.*

---

## Visual asset inventory

What this page needs (in rough order of priority):

1. **The layered architecture diagram (hero)** — already rendered as an example. Build production version.
2. **The graph-fragment visual** (Section 2 + Section 3) — one node with edges. Could be the same visual used twice or two variants.
3. **The risk-score-with-contributing-signals visual** (Section 4) — explainability made tangible.
4. **The data-sources flow diagram** (Section 5 + Section 7) — six sources feeding into the Graph, latencies annotated.
5. **The routing posture comparison** (Section 6) — clean vs hostile routing visualised side by side.
6. **The four named mechanisms flow** (Section 8) — can be adapted from the homepage timeline visual.

Realistically, 1, 2 and 4 are essential. 3, 5 and 6 are valuable but the page works without them if budget is constrained.

---

## Open items needing your input

1. **Page URL** — `/how-it-works` (recommended) or `/the-graph` or `/datazag-graph`. Affects all internal links.
2. **Data residency** — confirm regions.
3. **Security certifications** — SOC2 / ISO 27001 status or roadmap dates.
4. **Privacy posture** — GDPR statement and how submitted email addresses are handled.
5. **Sub-processors** — link target.
6. **The "<10s" vs "<60s" latency stats** — same question as on the data product page. Which is the headline figure on this engine page (probably ingestion latency from CertStream, which is <10s, since this is the engine page).
7. **Methodology page** — does /trust or /methodology exist? If not, plan it as the next supporting page after /how-it-works ships. Several sections on this page link to it.
