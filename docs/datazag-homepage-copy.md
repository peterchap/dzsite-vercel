# Datazag — Homepage Copy & Structure

**Purpose:** Build-ready copy for the new homepage, section by section. Hand this to whoever builds the site.

**What changed from the current build:** The existing page is architected around the raw data feed (the API / corpus / webhooks product). This version is architected around the current focus — the **360 Health Report** and the **External Platform Threat Report** lead magnet — and runs *outside-in*: the buyer's problem → the free report → how it works → the conversion → the full product range → who it's for. The data feed becomes the expansion story (Section 6), not the headline.

**Convention:** `>` blockquotes are finished copy. *Italic notes* are build/design guidance. `[ ]` brackets are placeholders needing your input — see Open Items at the end.

---

## 1. Hero

*Eyebrow — fix to 330M (current build says 320M here, 330M lower down):*

> 330M DOMAINS · REAL-TIME · PREDICTIVE

**H1:**

> Catch the fake login page before your team receives it.

**Subhead:**

> Attackers exploit your trust in third-party vendors — at AI scale. Datazag fingerprints the global infrastructure surface to detect platform impersonation pre-compromise, before campaigns send. We feed it into your blocking stack as automated data, not a manual portal — and we explain why each detection fires, so defensive AI and SOC automation can act on it.

**CTAs:**

> **[ Get my free External Platform Threat Report ]**  **[ Explore the platform ]**

**Supporting line:**

> One intelligence core. Detect earlier. Delivered as data.

*Build note: keep the infrastructure-timeline visual from the current build — the "DATAZAG DETECTS HERE / before abuse reaches your users" graphic is the strongest asset on the page and draws the leading-indicator thesis. It can be reused again in Section 4.*

*Alt H1 options if you want to test against the current line — all developed earlier this session:*
- *"Brand impersonation starts with vendor impersonation." (teaches the thesis in six words)*
- *"Attackers impersonate your vendors to get to your brand. We see it first."*
- *"The attack on your brand starts with a fake login for someone else's."*

---

## 2. Thesis strip

*A short full-width band. The current page never states its own argument — this is the spine the rest of the page hangs from.*

> ### Brand impersonation starts with vendor impersonation.
>
> Before attackers spoof your brand, they impersonate the platforms and vendors your business and your customers already trust — the SaaS logins, the email platforms, the suppliers. Our April 2026 CertStream analysis found that **over 85%** of brand impersonations targeting the world's top 100 brands spoofed just four platform players: **Amazon, Microsoft, PayPal and Apple.** That's where attackers concentrate, and that's where the infrastructure they need shows up in DNS and certificate data — before it's used against anyone.

---

## 3. Start free — the External Platform Threat Report

*This is the current focus and the primary conversion path. It belongs high on the page — not a stray button.*

> ## Start free — the External Platform Threat Report
>
> Enter your work email. We take the domain from your address, analyse its DNS and subdomains to map the platforms and vendors you actually run on — your email platform, your SaaS logins, your suppliers — then check our infrastructure feeds for spoofs targeting those exact platforms and your brand.
>
> **[ work email ]  [ Get my free report ]**
>
> No asset list, no scoping call, no questionnaire. The report tells you two things you probably can't see today: **which platforms expose you to impersonation**, and **what's already been built to exploit them.**
>
> *Need a report on a domain that isn't your own — a client's, a subsidiary's, a vendor's? That's a quick conversation. [Talk to us.]*

*Build note: the email field should validate against the global webmail-domain list. Webmail addresses route to the "talk to us" conversation rather than running a report on, e.g., gmail.com.*

---

## 4. How it works

*Four named mechanisms. Brand and reuse "Platform Fingerprinting," "Build-Time Detection" and "Pre-Arrival Blocking" everywhere — nav, deck, datasheets. The timeline visual from the hero illustrates this section.*

> ## How it works
>
> **1. Platform Fingerprinting** — one work email gives us your domain. We analyse its DNS and subdomains to map the platforms and vendors you depend on. No input from you.
>
> **2. Corpus Matching** — every candidate domain is checked against two signals: the known DNS footprint of the platform or brand it appears to spoof (records, infrastructure, hosting patterns), and its own internet context — where it's hosted and the risk profile of the surrounding infrastructure. Together those signals separate genuine spoofs from coincidental lookalikes.
>
> **3. Build-Time Detection** — impersonation infrastructure is flagged as it's provisioned — registered, certificated, resolving — before the campaign that uses it ever launches.
>
> **4. Pre-Arrival Blocking** — detected infrastructure feeds directly into your blocking stack — email security, DNS resolvers, web gateways — so the threat never reaches your inboxes, browsers or APIs.

---

## 5. Why "360" — and the conversion

> ## Why 360? The threat outside. The trust and threat surfaces inside.
>
> Impersonation only works when three things line up: infrastructure an attacker has built, an organisation that operates on shaky foundations, and an organisation that hasn't configured the defences that close the gap. The 360 Health Report covers all three.
>
> **The external threat — what attackers have already built.** Platform and vendor spoofs, brand lookalikes, suspicious certificates issued against your name and your suppliers'. Drawn from the 330M-domain corpus and live infrastructure feeds; nothing required from you but a domain.
>
> **Your trust surface — how solid is the foundation you operate on.** Internet routing posture (RPKI, MANRS, IRR), ASN reputation and concentration, registrar selection and history, nameserver distribution and DNSSEC posture, domain provenance. The structural quality of the infrastructure your business runs on, scored against the rest of the namespace.
>
> **Your threat surface — how well you defend against specific attacks.** Email authentication (SPF, DKIM, DMARC, BIMI, MTA-STS), certificate authority controls (CAA), TLS hygiene (HSTS, key strength, SAN scope), subdomain integrity (dangling CNAMEs, abandoned wildcards). The configuration choices that determine whether an attacker's infrastructure can actually land.
>
> Together they show the full 360: the threat that exists, the foundation it lands on, and the defences in its way.

**The conversion:**

> The free report shows you the external threat. It doesn't show you your trust surface or your threat surface — and those are the halves that tell you what to do. Add your internal trust and threat surfaces and the External Platform Threat Report becomes the full **360 Health Report**: your routing, registrar and nameserver posture analysed against the threats found, your email authentication and certificate controls mapped against the attack patterns, every weak point identified, and — for IT and MSSP customers — paste-ready DNS records to close the threat-surface gaps, with provider-specific instructions. Trust-surface findings, by their nature, often require bigger moves than DNS records can solve — registrar transfers, NS restructuring, ASN changes — and the report flags them with the context and rationale to make those decisions.
>
> **External Platform Threat Report → add internal trust and threat surfaces → 360 Health Report.** From there, Brand & Platform Alerts keep it current.

---

## 6. One engine, three ways — Assess / Monitor / Build

*Section job: orient and route. The homepage doesn't sell three products here — it points the buyer to the right product page. Depth lives on /360-health-report, /alerts and /data.*

> ## One engine. Three ways to put it to work.
>
> Every Datazag product runs on the same Graph — the 330M-domain corpus, live CertStream, BGP and DNS pipelines. Pick the way you want to consume it.
>
> *[Attack diagram across the section: attacker provisions infrastructure → captured in the Datazag Graph → branches into three delivery modes (Assess / Monitor / Build).]*
>
> | | **ASSESS** | **MONITOR** | **BUILD** |
> |---|---|---|---|
> | **What you get** | 360 Health Report | Platform & Brand alerts | Datasets on cloud marketplaces |
> | **Cadence** | Point-in-time | Continuous, real-time | Continuous data refresh |
> | **Delivered as** | Shareable report | Feed into your security stack | Marketplace share, webhooks, API, white-label |
> | **Lead buyer** | Organisation or MSSP for their client | SOC / IT operations | Email security teams, data teams |
> | **Output answers** | "Where am I exposed today?" | "What's targeting me right now?" | "How do I build with this data?" |
> | **Role in defensive AI** | Proactive blueprint — surface and prioritise external exposure | Tactical trigger — live telemetry for SOC automation | Intelligence layer — enrichment data and ground truth for AI-driven detection |
>
> **[ See sample report ]**  **[ See alert format ]**  **[ See marketplace listings ]**

*Visual treatment: the existing "datazag_feed_.json" JSON panel and "real_time_webhooks.sh" terminal panel sit alongside this block as code illustrations of the API and webhooks consumption paths.*

---

## 7. Who it's for

*Section job: orient and route to partner pages. Depth lives on /partners/mssp, /partners/insurers, /partners/it-services, /partners/esp-agencies.*

> ## One domain is self-serve. Many domains is a partnership.
>
> Datazag is built for the buyers responsible for many organisations at once. The partnership shape is consistent: your brand, your product, your customer relationship — Datazag intelligence inside.
>
> | Segment | Lead product | The fit |
> |---|---|---|
> | **MSSPs & MSPs** | 360 Health Reports + Alerts | Run across your client base, white-label, intelligence inside your SOC |
> | **Cyber insurers / M&A** | External Platform Threat Report | Underwriting and diligence signal, monitored across the book |
> | **IT service providers** | Platform alerts + remediation records | You configure their platforms; you're accountable when they're spoofed |
> | **ESPs & marketing agencies** | Corpus feeds + brand/platform alerts | Front-line protection + new product line to resell |
>
> **[ Talk to us about partner access ]**

---

## 8. Where we fit — and why it holds up

*Section job: orient and route. Position Datazag against adjacent categories briefly, signal the engine that makes the position defensible, route to /not-asm and /how-it-works for depth.*

*Visual: **Schematic 1.0 — "The Datazag Graph — Intelligence Inside Your Stack."** Integration-flow diagram showing the four Datazag Graph capabilities (330M+ Domains / Real-Time Telemetry / Signal Correlation / Explainable Risk Scoring) on the left, real-time signals feeding into a universal customer security stack (Email Security / DNS Filtering & SIEM / Detection & Response) on the right, with the outcome "Pre-Compromise Threats Blocked Before They Land" on the far right. Same visual template as the four partner-page variants (Schematics 1.1 MSSP, 1.2 Insurer, 1.3 IT Services, 1.4 ESP) — visual cohesion across the site.*

*Layout note: place the diagram between the pre-diagram body and the post-diagram body. The diagram does the engine-credentialing job visually; the copy frames it and routes to depth.*

> ## Datazag is the predictive layer alongside your stack.
>
> Where you've invested in ASM, DRP, brand protection or threat intelligence, Datazag is the layer underneath that makes those investments work better. Where you haven't, it's the zero-input place to start.

[Schematic 1.0 — see visual brief above]

> What makes the position defensible is the engine beneath it — built specifically for pre-compromise infrastructure intelligence, not retrofitted from aggregating other vendors' feeds. Every detection ships with the reasoning that drove it, so defensive AI and SOC automation can act on it instead of just storing it.
>
> **[ How we compare to ASM ]**  **[ How the Graph works ]**

---

## 9. Proof — the corpus

*Four numbers, reused site-wide. Keep the current build's "LIVE CORPUS SIZE" stat visual here.*

*Build note — visual: reuse the orbital/concentric stat visual from the existing "The World's Infrastructure, Indexed in Sub-Seconds" section. That visual currently centres on two stats (LIVE CORPUS SIZE 330M+ and INGESTION LATENCY <10s) — expand it to four stats arranged around the same central concentric pattern (330M+, <10s, 3 yrs history, <1% FP rate). The orbital framing reads as "live, instrumented system" rather than "marketing tile," which is the credibility tone this section needs. Subtle increment animation on 330M+ is fine; nothing else needs to move. The four stats sit in matching format around the visual.*

*Pattern note: this is the strongest of the two existing visual donations from the current build — the orbital is fundamentally about scale and instrumentation, which is exactly Section 9's job. The previous use of "LIVE CORPUS SIZE" and "INGESTION LATENCY" labels can be relabelled consistently across all four stats in the same display style.*

> ## Built on the internet's infrastructure, not your asset list.

> **330M+** — active domains, continuously refreshed — *Not a bloated count of dead or historical records. Every domain in the corpus resolves and is tracked with current DNS, MX, certificate and hosting state.*
>
> **<10s** — from SSL issuance to indexed signal — *A lookalike vendor certificate is caught moments after it appears in the transparency logs.*
>
> **3 yrs** — of DNS and routing history — *Tells a freshly-registered vendor spoof apart from a vendor's legitimate, long-standing infrastructure.*
>
> **<1%** — false-positive rate — *A health report your team — or your client — can trust without re-checking every finding.*

*Note: drafts this session used both "<10s" (ingestion) and "<60s" (registration-to-alert). Confirm which figure belongs in the hero-level stat — they may both be true at different pipeline stages.*

---

## 10. Final CTA

> ## See what's already been built to impersonate you.
>
> Start with the free External Platform Threat Report — one work email, no scoping call.
>
> **[ Get my free report ]**

---

## Carry over from the current build

- The H1 — "Catch the fake login page before your team receives it" — is strong; kept as primary.
- The infrastructure-timeline visual ("DATAZAG DETECTS HERE") — best asset on the page; used in Sections 1 and 4.
- The "LIVE CORPUS SIZE 330M+ / <10s" stat treatment — moved to Section 9.
- The audience cards — segment labels and icons kept, but the format compressed to a signpost grid in Section 7. Per-segment paragraph depth moved to the /partners/* pages.
- The dark, technical aesthetic — fine for the buyer.
- The JSON / terminal panels — moved off the homepage entirely. Their natural home is the /data product page.
- The "Power Your Services" four-card layout — moved off the homepage entirely. The four consumption paths (cloud marketplace shares, real-time webhooks, high-concurrency API, white-label embeds) live on the /data product page. Section 6 of the homepage references them only as a single line ("Marketplace share, webhooks, API, white-label").

## Cut or fix from the current build

- The "Pitch: / Technical Detail: / DaaS Edge:" labels — internal scaffolding currently visible on the live page.
- The "Infrastructure Audit" section name — collapses into the established naming (External Platform Threat Report / 360 Health Report).
- The 320M vs 330M inconsistency — standardise on 330M throughout.
- The feed-content sprawl — three middle sections about the data feed become one (Section 6).
- Naming sprawl — "Free Health Report," "Infrastructure Audit," "Intelligence Core," "Intelligence Layer" all named overlapping things. The doc standardises on: External Platform Threat Report (free) → 360 Health Report (paid); Assess / Monitor / Build; Platform Fingerprinting + Build-Time Detection.
- Pricing surfacing — replaced by a dedicated /pricing page rather than a homepage section. Pricing remains a nav link from the homepage; the homepage references "transparent pricing" as a CTA hint where relevant but doesn't carry tier detail itself.

## Open items — needs your input

1. **Pricing** — moved to a dedicated /pricing page rather than a homepage section. The draft pricing copy (marketplace tier numbers and tier names, which marketplaces are live vs planned, channel pricing for the four partner segments) carries over to that page; still needs your actual numbers and the published-vs-gated decision for channel pricing.
2. **Email-security dataset names** — the exact feed list for the Build section.
3. **Cloud marketplaces** — which are live vs planned.
4. **The latency/detection stat** — confirm "<10s" vs "<60s" for the hero-level number.
5. **Hero H1** — keep "Catch the fake login page…" or switch to "Brand impersonation starts with vendor impersonation." Both are in the doc.
6. **"Platform vendor impersonation" reading** — doc assumes: attackers impersonate the trusted platforms/vendors in an org's ecosystem as the route into brand impersonation. Correct if off.
7. **Pre-Arrival Blocking naming** — pairs cleanly with Build-Time Detection (attacker side / defender side). Alternatives if you want something else: "Channel Protection," "Block-at-Source." Pick one and propagate.

## Content moved to product pages (for when those pages are built)

Section 6 was restructured into a signpost grid; the depth that came off the homepage now belongs on the dedicated product pages. Inventory:

**/360-health-report — needs:**
- The three-segment framing (external threat + trust surface + threat surface) at full depth
- Sample report walkthrough or anonymised excerpt
- How the report is delivered (PDF, portal, share link mechanics)
- Paste-ready remediation records detail (provider-specific instructions for SPF/DKIM/DMARC/CAA fixes)
- Trust-surface findings — the bigger-than-DNS remediations (registrar transfers, NS restructuring, ASN changes) and how the report surfaces them with context

**/alerts — needs:**
- Both alert streams in full: Platform alerts (FP-check process, reasons payload structure, sub-brand resolution, the "platforms detect their own brand but..." pre-emption that captures the long-tail-platforms argument) and Brand alerts (evidence pack contents)
- How alerts route into the customer's stack (email gateway, DNS filtering, SIEM, web proxy integration patterns)
- Latency: Build-Time Detection inside the window before platform-side takedown lands
- Sample alert payload

**/data — needs:**
- The full four consumption paths (cloud marketplace shares, real-time webhooks, high-concurrency API, white-label embeds) with the existing JSON panel and webhooks terminal as code illustrations
- Active corpus claim (continuously DNS-refreshed, not padded)
- Email security as lead use case with the actual feed names
- Further use cases as datasets are listed
- Cloud marketplace listings (Azure / AWS / GCP — whichever are live)

**/partners/mssp — needs:**
- Run 360 Health Reports across the client base; alert routing into the MSSP SOC
- Co-branding / white-label mechanics and what the brand surfaces look like
- Pricing structure for MSSP partners (per-client or tiered)
- The "intelligence inside" deal shape — your brand, your client relationship, Datazag intelligence

**/partners/insurers — needs:**
- External Platform Threat Report as underwriting signal: per-applicant assessment pre-policy
- Continuous monitoring across the book post-policy
- The second commercial path: insurer-branded resale to insureds as a value-add (different pricing, different buyer inside the insurer)
- M&A due diligence as a related use case

**/partners/it-services — needs:**
- The accountability framing: you configure your clients' platforms, you're accountable when they get impersonated
- Platform impersonation alerts covering the deployed stack
- Paste-ready DNS remediation records with provider-specific instructions
- Trust-surface findings that require bigger moves than DNS records (and the report context that justifies them)

**/partners/esps-and-agencies — needs:**
- The three angles: front-line protection (both directions), data hygiene for deliverability, brand alerts as a new product line
- The corpus feeds for deliverability and abuse pipelines
- The resale deal shape and rev-share / co-sell economics
- Why this is a multi-door segment with three buyers inside the ESP

**/not-asm — needs:**
- Full DRP / Brand Protection / Threat Intelligence comparisons at depth, not the one-line summaries on the homepage
- The complete "different axis vs better product" framing for ASM
- Procurement guidance for buyers slotting Datazag for evaluation against an existing category

**/how-it-works — needs:**
- Platform Fingerprinting, Corpus Matching, Build-Time Detection, Pre-Arrival Blocking at depth
- The Datazag Graph: each of the four capabilities (signal correlation, predictive risk scoring, real-time telemetry, routing hygiene verification) with proper technical depth and the engineering specifics (RPKI, MANRS, IRR, Arrow Flight, RouteViews / RIPE RIS) explained for the buyer who isn't fluent in routing-security acronyms
