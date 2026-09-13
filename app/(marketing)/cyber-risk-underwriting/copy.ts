import type { PageContent } from "@/sanity/seedMarketingCopy";

export const SLUG = "cyber-risk-underwriting";
export const TITLE = "Cyber Risk Underwriting";

/**
 * Insurer page copy (WU-C7).
 *
 * Every claim here is grounded in something the site already documents and
 * ships — estate discovery with confidence tiers, provider concentration
 * weighted by provider, the DNS and email control ladder, reason codes on every
 * finding (app/reports/copy.ts, app/(marketing)/infrastructure-intelligence).
 * Nothing on this page describes a capability that does not exist, and nothing
 * quantifies a loss ratio, a lift or an accuracy rate — no such measurement
 * exists, and the retired-claim guard exists because one was published once.
 */
export const content: PageContent = {
  hero: {
    eyebrow: "Cyber risk underwriting",
    title: "Underwrite what the applicant actually owns.",
    body: "A submission describes the estate the applicant knows about. Datazag evidences the rest from public infrastructure — the domains, providers and control gaps that never reach the questionnaire — before you bind, and every time it changes after you do.",
    secondaryBody: "No questionnaire, no agent, no asset inventory. Every finding carries the evidence that produced it, so a declination or a rate load can be explained to a broker.",
    primaryCta: { label: "Request a portfolio assessment", href: "/contact" },
    secondaryCta: { label: "See a sample report", href: "/reports/sample" },
  },

  decisions: {
    eyebrow: "Where it lands",
    title: "Two underwriting decisions, one evidence base.",
    body: "Infrastructure evidence is useful at exactly two moments: when you are pricing a risk you cannot inspect, and when that risk changes mid-term without telling you.",
    items: [
      {
        key: "pre-bind",
        title: "Pre-bind assessment",
        text: "Score a submission against what is publicly observable rather than what was self-reported. Estate discovery surfaces the domains the applicant did not declare; posture analysis shows whether the controls they claim are actually published in DNS.",
        tags: ["Estate discovery", "Email authentication", "Provider concentration", "Certificate hygiene", "Reason codes"],
      },
      {
        key: "in-period",
        title: "In-period monitoring",
        text: "A risk priced in January is not the risk you carry in July. Track posture regressions, newly exposed infrastructure, expiring controls and provider migrations across the policy term, and route the material ones.",
        tags: ["Posture change", "New exposure", "Expiry calendar", "Provider migration", "Alert routing"],
      },
      {
        key: "renewal",
        title: "Renewal and remediation",
        text: "Bring the same evidence to the renewal conversation. Where posture improved, price it. Where a warranty was given and the DNS never changed, you can show that too.",
        tags: ["Period comparison", "Warranty evidence", "Remediation tracking"],
      },
    ],
  },

  signals: {
    eyebrow: "What an underwriter acts on",
    title: "Specific, checkable, and tied to a control an insured can fix.",
    body: "These are the signals that change a price or a condition, not a generic risk score. Each is read from public infrastructure and each carries the record it was read from.",
    items: [
      { key: "undeclared-estate", title: "Undeclared estate", text: "Domains the applicant owns but did not list, evidenced through certificate, mail and registration relationships and sorted into confidence tiers. Adverse selection usually lives in the gap between the declared estate and the real one." },
      { key: "email-auth", title: "Email authentication posture", text: "Whether SPF, DKIM and DMARC are actually published and enforcing, rather than present and permissive — the difference between a policy that blocks impersonation and one that only reports it. Business email compromise is where the claims are." },
      { key: "concentration", title: "Provider concentration", text: "How much of the estate depends on one provider, weighted by which provider that is. A majority on a hyperscale platform is a different risk from the same share on a commodity registrar." },
      { key: "certificate-hygiene", title: "Certificate and expiry exposure", text: "What expires next, what has already lapsed, and which controls are due to fail unattended. An operational calendar is a leading indicator of how the insured runs their estate." },
      { key: "impersonation", title: "Impersonation infrastructure", text: "Lookalike domains and certificates built to impersonate the insured's brand or the platforms it depends on, observed at certificate issuance rather than after a campaign lands." },
      { key: "control-ladder", title: "Control maturity", text: "Where the estate sits on the ladder from baseline (SPF, DKIM, DMARC) to advanced (MTA-STS, TLS reporting, CAA, DNSSEC) — a maturity path you can write conditions against, not a pass/fail." },
    ],
  },

  portfolio: {
    eyebrow: "Across the book",
    title: "The exposure that only exists between risks.",
    body: "Individual submissions can each look acceptable while the book quietly concentrates. Aggregation is the exposure cyber underwriters are least able to see and least able to reinsure against once written.",
    items: [
      { key: "shared-dependency", title: "Shared dependency", text: "How many insureds sit behind the same mail provider, DNS provider, hosting platform or CDN — the correlated failure that turns many small claims into one event." },
      { key: "posture-distribution", title: "Posture distribution", text: "Where the book sits on the control ladder, so appetite and pricing can be set against the distribution rather than against individual outliers." },
      { key: "drift", title: "Portfolio drift", text: "How the book's posture moves between reporting periods, including insureds whose controls regressed after binding." },
      { key: "accumulation-view", title: "Accumulation view", text: "Segment the book by provider, sector, estate size or control maturity and see the same evidence rolled up, with every roll-up tracing back to the per-domain findings underneath it." },
    ],
  },

  evidence: {
    eyebrow: "Evidence, not a score",
    title: "Every finding can be shown to the broker.",
    body: "A number an underwriter cannot explain is a number an underwriter cannot use. Datazag attaches the observation behind each finding — the record, the source and the time it was read — so a rate load, a condition or a declination survives the conversation that follows it.",
    secondaryBody: "You set the thresholds. Datazag supplies the evidence and the reasoning; the underwriting decision stays yours.",
    primaryCta: { label: "Talk to us about your book", href: "/contact" },
    items: [
      { key: "reason-codes", title: "Reason codes", text: "Every finding states why it fired." },
      { key: "source-record", title: "Source record", text: "The DNS, certificate or routing observation it was read from." },
      { key: "confidence", title: "Confidence tier", text: "How strongly an asset is attributed to the insured." },
      { key: "challengeable", title: "Challengeable", text: "A broker can dispute a finding against its evidence." },
    ],
  },

  delivery: {
    eyebrow: "How it reaches your desk",
    title: "Into the workflow you already underwrite in.",
    body: "Assessment at the point of quote, monitoring across the term, and the portfolio layer wherever your accumulation analysis already lives.",
    items: [
      { key: "submission-report", title: "Submission report", text: "A per-risk assessment at quote, covering the discovered estate, posture and concentration." },
      { key: "portfolio-report", title: "Portfolio report", text: "The book-level view, segmented how you underwrite it." },
      { key: "api", title: "API", text: "Score a domain inline in a pricing or triage workflow." },
      { key: "alerts", title: "Alerts", text: "Material in-period changes routed to the owning underwriter." },
      { key: "data-share", title: "Data share", text: "The underlying evidence in your warehouse for actuarial and accumulation work." },
    ],
  },

  cta: {
    eyebrow: "Start here",
    title: "Bring us a book and we will show you what is in it.",
    body: "Send a sample of the estate — a set of insureds, a segment, or a single submission you are pricing now. You get the assessment back as evidence you can read, with the discovery, posture and concentration layers shown separately.",
    primaryCta: { label: "Request a portfolio assessment", href: "/contact" },
    secondaryCta: { label: "See a sample report", href: "/reports/sample" },
  },
};
