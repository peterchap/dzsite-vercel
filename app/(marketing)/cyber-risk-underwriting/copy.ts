import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "cyber-risk-underwriting";
export const TITLE = "Cyber Risk Underwriting";

/**
 * Insurer page copy (WU-C7, rebuilt to insurer brief v2 on 2026-09-30).
 *
 * TWO READERS. The page used to serve only the underwriter ("should we write
 * this risk?"). v2 leads with the portfolio analyst ("what happens to the book
 * if one provider fails?"), because scoring one insured from outside is a
 * crowded market and showing shared dependency across a book is not. The
 * individual-risk promise stays, beneath it.
 *
 * CLAIM RULES CARRIED FORWARD (2026-09-28): market claims may state
 * established general truths (Dyn 2016 is one); claims about Datazag's data
 * need Datazag's evidence. Datazag holds no claims or loss data, so the page
 * reports EXPOSURE (which insureds, which functions) and never prices a loss.
 * No loss ratio, lift or accuracy rate. "Evidence, not a score" (SCORE-1).
 *
 * CLAIM RULES ADDED BY v2:
 *   - DNS history starts in August 2026. Drift-since-bind is not claimable
 *     until a full policy period has passed, so monitoring is described as
 *     accruing from the start of the policy. The old "renewal and
 *     remediation" card compared periods and was removed for that reason.
 *   - Cadence is described as matched to how fast each thing changes, never
 *     as a single refresh cycle. The measured record-age distribution renders
 *     from ./freshness.ts and only once someone fills it in.
 *   - Unobserved is never clean. Every row carries the time it was observed.
 *   - The privacy claim is the SHARE PATH's only. It renders from
 *     lib/trust-posture.ts (DELIVERY_POSTURES), the same wording /trust uses,
 *     so the two pages cannot drift into different claims.
 *   - The datasets table renders from lib/datasets/catalog.ts. Only catalog
 *     entries appear, with their real availability. Estate expansion and
 *     dangling records are NOT datasets yet and are not listed as ones.
 *   - Input is a list of domains, one or more per insured (decided
 *     2026-09-30). The page never promises matching company names to domains.
 *     The reverse index runs from that domain list.
 *   - RESILIENCE IS A SEVERITY RATING, NOT A WEIGHTED SHARE (2026-10-01). The model is
 *     datazag_intelligence/estatereport/resilience.py: the share stays mechanical and
 *     unweighted; provider tier x exit friction drives a severity rating, from a
 *     hand-authored starter table, and an unassessed provider renders "not assessed".
 *     Never write "weighted share". The CDN/DNS concentration study has no such model,
 *     so research posts must not mention it.
 *   - NO ALERTS of any kind for insurers (2026-09-30): neither provider-change
 *     nor estate-growth alerts exist. They may come later as a subscription
 *     service. Until then "in-period" means re-running the assessment, and
 *     delivery is Assess + Enrich. Add a Detect card back only once it ships.
 *
 * CMS (2026-09-30): seeded as marketingPageCopy.cyber-risk-underwriting via
 * scripts/seedMarketingCopy.ts. Seed only AFTER this copy is deployed: the CMS
 * decides which item keys render, so a doc seeded ahead of the code drops the
 * cards the live code still expects.
 */
export const content: PageContent = {
  hero: {
    eyebrow: "Risk intelligence · Cyber insurance",
    title: "The risk in a book is also in what the policies share.",
    body: "Every insured depends on providers for mail, DNS, hosting and certificates. When many insureds depend on the same provider, one outage becomes many claims at once. Datazag shows those shared dependencies across your book, with the evidence for each insured underneath.",
    secondaryBody: "For underwriters, the same evidence answers a simpler question: what does this applicant actually run, before you bind and during the term?",
    primaryCta: { label: "See a sample estate report", href: "/reports/sample#cross-estate" },
    secondaryCta: { label: "Request sample data", href: "/contact" },
  },

  readers: {
    eyebrow: "Two readers",
    title: "Two questions, one evidence base.",
    items: [
      { key: "underwriter", title: "Should we write this risk?", text: "The underwriter, before binding and during the term.", tags: ["Pre-bind assessment", "In-period review"] },
      { key: "analyst", title: "What happens to the book if one provider fails?", text: "The portfolio and accumulation analyst.", tags: ["Concentration", "Reverse index", "Scenarios"] },
    ],
  },

  decisions: {
    eyebrow: "Underwriting",
    title: "Underwrite what the applicant actually runs.",
    body: "A submission describes the estate the applicant knows about. Datazag finds more of it in public infrastructure: domains, providers and control gaps that do not reach the questionnaire.",
    secondaryBody: "No questionnaire, no agent, no asset inventory. Every finding carries the evidence that produced it, so a declination or a rate load can be explained to a broker.",
    items: [
      {
        key: "pre-bind",
        title: "Pre-bind assessment",
        text: "Check a submission against what is publicly visible, not only what was self-reported. Estate discovery finds domains the applicant did not declare. Posture analysis shows whether the controls they claim are actually published in DNS.",
        tags: ["Estate discovery", "Email authentication", "Provider concentration", "Certificate hygiene", "Reason codes"],
      },
      {
        key: "in-period",
        title: "In-period review",
        text: "A risk priced in January is not the risk you carry in July. Run the assessment again during the term to see new exposure and controls that are about to expire.",
        tags: ["New exposure", "Expiry calendar"],
      },
    ],
  },

  signals: {
    eyebrow: "What an underwriter acts on",
    title: "Specific, checkable, and tied to a control an insured can fix.",
    body: "These signals can inform a price or a condition. They are not a generic risk score. Each is read from public infrastructure and carries the record it was read from.",
    items: [
      { key: "undeclared-estate", title: "Undeclared estate", text: "Domains the applicant owns but did not list, linked through certificate, mail and registration records and sorted into confidence tiers. Adverse selection can hide in the gap between the declared estate and the real one." },
      { key: "email-auth", title: "Email authentication posture", text: "Whether SPF, DKIM and DMARC are published and enforcing, not just present. One policy blocks impersonation; the other only reports it. Business email compromise remains a significant source of cyber loss." },
      { key: "certificate-hygiene", title: "Certificate and expiry exposure", text: "What expires next, what has already lapsed, and which controls will fail if nobody acts. The expiry calendar shows how the insured runs their estate." },
      { key: "control-ladder", title: "Control maturity", text: "Where the estate sits on the ladder from baseline (SPF, DKIM, DMARC) to advanced (MTA-STS, TLS reporting, CAA, DNSSEC). A maturity path you can write conditions against, not a pass or fail." },
    ],
  },

  concentration: {
    eyebrow: "Concentration",
    title: "Provider share is not the same as provider risk.",
    body: "Anyone can count how many insureds use a provider. Datazag shows that share as it is, then rates how serious it is by two things: how resilient the provider is, and how hard it is to leave. Exit friction stands in for restoration time, and restoration time drives business interruption severity.",
    secondaryBody: "This is not hypothetical. In October 2016 an attack on the DNS provider Dyn made many major websites unreachable at the same time, across many unrelated companies.",
    items: [
      { key: "mailbox", title: "Mailbox provider", text: "Where each insured's mail is hosted." },
      { key: "gateway", title: "Email security gateway", text: "The filtering service in front of the mailbox." },
      { key: "nameserver", title: "Authoritative DNS", text: "Who answers for the insured's domains." },
      { key: "dnssec", title: "DNSSEC dependency", text: "Whose signing keeps a signed zone resolving." },
      { key: "cdn", title: "CDN", text: "Who serves the insured's websites." },
      { key: "hosting", title: "Hosting network", text: "The network (ASN) each service runs on." },
      { key: "ca", title: "Certificate authority", text: "Who issues the insured's certificates." },
      { key: "registrar", title: "Registrar", text: "Who holds the insured's domain registrations." },
    ],
  },

  compound: {
    eyebrow: "Compound exposure",
    title: "One provider for DNS and mail is one failure that removes two functions.",
    body: "That is worse than two separate concentrations of the same size. Datazag reports it as its own finding, so it is not hidden inside two provider shares.",
    secondaryBody: "Concentration does not depend on refresh speed. Enterprise DNS changes rarely, so a nameserver record observed a month ago is almost certainly still correct.",
  },

  reverse: {
    eyebrow: "Reverse index",
    title: "When a provider has an incident, start from the provider.",
    body: "After a provider outage, the first question is: what is our exposure? Working that out from policy files is slow. Datazag answers from the other direction. Name a provider, and see which domains on your list depend on it, and for what.",
    items: [
      { key: "incident", title: "Incident exposure", text: "Which insureds' domains depend on the affected provider, for DNS, mail or hosting, with the evidence for each." },
      { key: "scenario", title: "Scenario testing", text: "Name a provider and an outage, for example \"authoritative DNS unavailable for twelve hours\". See which insureds lose which functions. The result feeds systemic-scenario and reinsurance reporting." },
      { key: "boundary", title: "Exposure, not loss", text: "Datazag reports which policies are exposed and how. It holds no claims or loss data, so pricing the scenario stays with your own models." },
    ],
  },

  change: {
    eyebrow: "Change during the term",
    title: "The estate grows after you bind.",
    body: "Enterprise DNS changes rarely. The estate is what changes: new subdomains, new certificates and new hosting under a domain you already cover. Datazag reads Certificate Transparency logs continuously, so a new certificate under an insured's domain is seen as it is logged.",
    secondaryBody: "Changes show up in the next report and in the tables. Our DNS history starts in August 2026, so change is measured from then, not before.",
    items: [
      { key: "subdomains", title: "New subdomains", text: "Names that appear in new certificates, then resolved to see where they point." },
      { key: "certificates", title: "New certificates", text: "Issued for an insured's domains, with the issuing authority." },
      { key: "hosting", title: "New hosting", text: "Services appearing on networks or providers the insured did not use before." },
    ],
  },

  freshness: {
    eyebrow: "Freshness",
    title: "Refreshed as often as each thing changes.",
    body: "Different data changes at different speeds, so it is refreshed at different speeds. Portfolios can be moved to a faster schedule.",
    secondaryBody: "Every row carries the time it was observed. A domain we have not checked recently shows as not checked. It never shows as clean.",
    items: [
      { key: "hourly", title: "Hourly", text: "Internet infrastructure: routing and network data." },
      { key: "daily", title: "Daily", text: "New, retiring and high-risk domains, and subdomains found in new certificates." },
      // Key kept as "bimonthly": it is the CMS itemKey. The text is "at least monthly" because
      // that is the pipeline's refresh target (riskscore lake_corpus.py) and what was measured:
      // p95 record age was 31.3 days on 2026-09-30 (coverage.json record_age_p95_hours).
      { key: "bimonthly", title: "At least monthly", text: "Stable attributes that rarely change, such as nameservers and mail providers." },
    ],
  },

  datasets: {
    eyebrow: "For analysts",
    title: "The same data, as tables.",
    body: "Each dataset is documented on its own page. Availability is shown per dataset, and is only marked available when a route is live.",
    // Keyed by catalog slug (lib/datasets/catalog.ts). A slug missing from the
    // catalog renders nothing.
    items: [
      { key: "provider-intelligence", title: "Which providers does each insured depend on?", text: "DNS, mail, hosting and CDN providers behind each domain." },
      { key: "domain-posture", title: "What does each insured publish for email security?", text: "SPF, DMARC, MTA-STS, DNSSEC and BIMI, and what those records actually say." },
      { key: "ip-asn-intelligence", title: "Which network does each service run on?", text: "Maps an IP address to its network, operator and registry country." },
    ],
  },

  diligence: {
    eyebrow: "M&A due diligence",
    title: "An acquirer inherits the whole estate.",
    body: "The same evidence answers an acquirer's questions before a deal closes: what the target owns, how it is configured, and which providers it depends on. The forgotten parts of an estate are where risk hides, and the target may no longer track them itself.",
    secondaryBody: "Evidence for diligence, not an acquisition risk score. Each finding shows the record it came from, so it can be raised with the target and checked.",
    items: [
      { key: "forgotten-estate", title: "The forgotten estate", text: "Domains the target owns but may no longer track, found through shared certificates, mail and registration records. Discovery is evidence-based: we show what we can link, not a promise of every domain." },
      { key: "inherited-posture", title: "Inherited posture", text: "Whether email authentication, certificates and DNS controls are in place across the estate, not just on the main domain." },
      { key: "dependencies", title: "Provider dependencies", text: "Which mail, DNS, hosting and CDN providers the estate relies on, and how much of it sits with each one." },
      { key: "advisors", title: "For advisors", text: "Diligence firms can run the same assessment across many deals, with every finding in the same format." },
    ],
  },

  evidence: {
    eyebrow: "Evidence, not a score",
    title: "Every finding can be shown to the broker.",
    body: "A number an underwriter cannot explain is a number an underwriter cannot use. Datazag attaches the observation behind each finding: the record, the source and the time it was read. A rate load, a condition or a declination survives the conversation that follows it.",
    secondaryBody: "You set the thresholds. Datazag supplies the evidence and the reasoning. The underwriting decision stays yours.",
    primaryCta: { label: "Talk to us about your book", href: "/contact" },
    items: [
      { key: "reason-codes", title: "Reason codes", text: "Every finding states why it fired." },
      { key: "source-record", title: "Source record", text: "The DNS, certificate or routing observation it was read from." },
      { key: "confidence", title: "Confidence tier", text: "How strongly an asset is linked to the insured." },
      { key: "challengeable", title: "Challengeable", text: "A broker can dispute a finding against its evidence." },
    ],
  },

  delivery: {
    eyebrow: "Delivery",
    title: "Start with one report. Add the rest when you need it.",
    body: "A report answers questions about one moment. The reverse index and accumulation trends need the data itself, kept as a series. So delivery comes in two parts.",
    items: [
      { key: "assess", title: "Assess", text: "Reports on a submission or a sample of the book, with discovery, posture and concentration shown separately.", tags: ["Report"] },
      { key: "enrich", title: "Enrich", text: "The underlying tables in your own warehouse, refreshed on the schedule above, for accumulation trends and actuarial work.", tags: ["Tables in your warehouse"] },
    ],
  },

  privacy: {
    eyebrow: "Where your book goes",
    title: "Two delivery routes, two privacy positions.",
    body: "Your book can stay in your own Snowflake or Databricks account. The claim below is specific to that route, and it does not cover the others.",
    secondaryBody: "A report works like the API: you send us the domains, so Datazag processes them under the data-processing agreement.",
  },

  // FAQ (2026-10-01): questions an answer engine is asked about this page, answered
  // in short, self-contained sentences that restate what the page establishes. Item
  // title = question, text = answer. See components/seo/FaqSection.tsx.
  // Follows the 2026-09-30 founder rulings: domain-list input, exposure not loss, the measured refresh tiers, and the share-vs-API privacy split from lib/trust-posture.ts.
  faq: {
    eyebrow: "Questions",
    title: "Frequently asked questions",
    items: [
      { key: "input", title: "What do you need from us?", text: "A list of domains for the insureds in a sample of your book, one or more per insured. Datazag finds the rest of each estate from there." },
      { key: "weighting", title: "What does rating by resilience and exit friction mean?", text: "Counting how many insureds use a provider shows its share. Datazag shows that share as it is, then rates how serious it is by how resilient the provider is and how hard it is to leave. Exit friction stands in for restoration time, which drives business interruption severity. A provider not yet assessed is shown as not assessed, never as safe." },
      { key: "exposure", title: "Can you show which policies are exposed when a provider fails?", text: "Yes, from the domain list you send. Name a provider and see which insureds depend on it, and for which functions. Datazag reports exposure, not loss: it holds no claims or loss data." },
      { key: "freshness", title: "How fresh is the data?", text: "Routing and network data refresh hourly. New, retiring and high-risk domains refresh daily. Stable records such as nameservers and mail providers refresh at least monthly. Every row carries the time it was observed." },
      { key: "privacy", title: "Does our book leave our environment?", text: "Not on the data-share route: the data is delivered into your own Snowflake or Databricks account and queried there, so Datazag is not a processor of your book. A report or the API is different, because you send us the domains, and that is covered by the data-processing agreement." },
    ],
  },
  cta: {
    eyebrow: "Start here",
    title: "Test it against your book.",
    body: "Send a list of domains for a sample of your book, one or more per insured. We find the rest of each estate from there, and return the discovery, posture and concentration layers separately.",
    primaryCta: { label: "See a sample estate report", href: "/reports/sample#cross-estate" },
    secondaryCta: { label: "Request sample data", href: "/contact" },
  },
};
