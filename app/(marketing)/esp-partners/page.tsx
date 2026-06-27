import type { Metadata } from "next";

import ProductConceptPage, { type ProductConceptPageProps } from "@/components/sections/blocks/ProductConceptPage";
import { sanityFetch } from "@/sanity/fetch";
import { productConceptPageBySlugQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "ESP Partners — Datazag",
  description:
    "Datazag intelligence for Email Service Providers: detect bad actors, check outbound links, enrich SMTP logs and create white-label brand protection revenue.",
};

const fallbackContent: ProductConceptPageProps = {
  eyebrow: "ESP Partners",
  title: "Catch bad actors before they burn your sender reputation.",
  intro: "Bad actors can sign up on free or low-cost tiers, look legitimate, use a real website, send a malicious campaign and disappear before your team sees the damage. Datazag helps you score accounts, links, domains and SMTP activity earlier.",
  primaryCta: { label: "Partner with Datazag", href: "/contact" },
  secondaryCta: { label: "See pricing", href: "/pricing" },
  proof: [
    { title: "Fast bad actors", text: "Abusive users can look legitimate at signup, send quickly and disappear before manual review catches up." },
    { title: "Deliverability pressure", text: "Google, Microsoft and other inbox providers increasingly expect ESPs to control abuse and clean customer behaviour." },
    { title: "Regulatory pressure", text: "Fraud prevention expectations are rising in the UK and Europe, especially where platforms can reduce predictable online harm." },
    { title: "New revenue", text: "Launch partner-branded protection, hygiene and analytics services powered by Datazag data." },
  ],
  narrative: {
    kicker: "The ESP challenge",
    title: "The account can look legitimate until the campaign is already gone.",
    body: [
      "The hardest ESP abuse problem is speed. A bad actor signs up on a free or low-cost tier, presents a plausible business, points to a real website and passes the obvious checks. Then they send a malicious or deceptive campaign and disappear before the ESP has enough evidence to act manually.",
      "That creates a direct platform problem: damaged sender reputation, inbox-provider scrutiny, customer-support load, regulatory exposure and pressure from legitimate customers who need the platform to remain trusted.",
      "Datazag gives ESPs an earlier intelligence layer. You can score signup domains, customer data, landing-page links, campaign URLs and SMTP logs against domain, DNS, certificate, hosting, platform, brand and infrastructure signals before the bad actor has finished exploiting the platform.",
    ],
  },
  flowTitle: "How Datazag fits the ESP abuse lifecycle.",
  flow: [
    { title: "Signup", text: "Check the customer's domain, website, DNS, mail posture, hosting context and infrastructure history during onboarding or tier upgrades." },
    { title: "Campaign", text: "Score outbound links, landing-page domains, redirect chains and suspicious subdomains before or during send." },
    { title: "Send", text: "Use risk signals to allow, warn, throttle, block or route campaigns for review before reputation damage spreads." },
    { title: "Analyse", text: "Enrich SMTP logs and campaign history so deliverability, abuse and customer-success teams can see what happened." },
  ],
  alertTypeSection: {
    kicker: "Four ESP use cases",
    title: "Use Datazag intelligence before, during and after the send.",
    intro: "For ESPs, Datazag is a platform intelligence layer. It helps detect bad actors using the service, improve data quality, support deliverability analytics and create partner-branded revenue lines without forcing customers into a separate Datazag product.",
    stats: [
      { title: "Signup", text: "spot risk before bad actors send." },
      { title: "Send", text: "score links and campaigns in motion." },
      { title: "Logs", text: "enrich analytics after delivery." },
    ],
    types: [
      {
        title: "White-label brand protection",
        subtitle: "New revenue line",
        coverage: "Customer brands, domains, aliases, login terms, impersonation infrastructure, website evidence and abuse contacts.",
        action: "Sell a branded protection service to your customers at your own price, with Datazag powering the intelligence underneath.",
        text: "This gives ESPs a differentiated paid service beyond core sending. Customers get brand monitoring, evidence and protection under the ESP's brand; Datazag supplies the detection and infrastructure data layer.",
        evidence: ["Brand impersonation alerts and evidence packs", "Screenshots and abuse contacts when content appears", "Customer-facing report or portal outputs", "White-label or co-branded service packaging"],
      },
      {
        title: "Customer and list data cleaning",
        subtitle: "Hygiene and onboarding",
        coverage: "Signup domains, customer websites, email domains, landing-page domains, list-quality indicators, risky infrastructure and poor-quality data signals.",
        action: "Build a premium data cleaning and risk-screening service that identifies suspicious, low-quality or risky customer data before it harms sender reputation.",
        text: "Bad actors often look plausible because they have a real website and pass basic checks. Datazag adds external domain and infrastructure context so you can spot weak, new, suspicious or inconsistent signals earlier.",
        evidence: ["Risk scoring for signup domains, websites and customer data", "Weak DNS and email posture indicators", "Newly observed, parked or suspicious infrastructure context", "Customer-facing hygiene and remediation recommendations"],
      },
      {
        title: "Outbound link risk checks",
        subtitle: "Bad actor detection",
        coverage: "Campaign links, landing-page domains, redirect chains, newly observed domains, parked domains, suspicious subdomains and hosting context.",
        action: "Check links in outbound campaigns before or during send to detect malicious, suspicious or policy-breaking activity using your platform.",
        text: "A bad actor may look legitimate at account level, but the campaign destination can reveal the risk. Datazag scores those destinations so you can block, throttle, warn or route sends for review before the campaign is finished.",
        evidence: ["Domain risk and infrastructure context for outbound links", "Keyword, platform and brand impersonation signals", "Parking, DNS, certificate and hosting context", "Inputs for automated block, throttle or review decisions"],
      },
      {
        title: "SMTP log enrichment",
        subtitle: "Deliverability analytics",
        coverage: "Sending domains, recipient-domain patterns, campaign links, infrastructure risk, domain posture and historical context.",
        action: "Enhance SMTP logs and analytics with Datazag intelligence to improve deliverability, abuse detection and customer reporting.",
        text: "SMTP logs become more valuable when joined with domain and infrastructure intelligence. ESPs can improve internal analytics, customer success reporting, abuse operations and deliverability decisions.",
        evidence: ["Domain and infrastructure enrichment for logs", "Risk and reason fields for analytics pipelines", "Signals for deliverability, abuse and reputation teams", "API, data-share or warehouse-friendly delivery"],
      },
    ],
    note: "The ESP opportunity is balanced: stop fast bad actors before they damage your platform, show stronger fraud and abuse controls, and create branded services your customers will pay for. Datazag provides the intelligence layer; the ESP controls customer experience, pricing, enforcement policy and support model.",
  },
  exampleAlert: {
    kicker: "Example platform control",
    title: "How you catch a bad actor before the campaign is gone.",
    intro: "This fictional example shows Datazag as an input to ESP platform controls. A customer can look legitimate at signup, but their links, domains, DNS and infrastructure may reveal risk before or during the send.",
    severity: "ESP | ACCOUNT RISK",
    status: "Outbound Campaign Review Candidate",
    domain: "new-customer.test · real website · risky campaign links",
    fields: [
      { label: "Account path", value: "Free or low-cost signup with plausible website" },
      { label: "Decision path", value: "Allow, warn, throttle, block or send to review" },
      { label: "Campaign context", value: "Outbound links found in customer campaign content" },
      { label: "Risk context", value: "New landing domain, suspicious DNS, hosting and corpus novelty indicators" },
      { label: "Machine output", value: "Structured enrichment for scoring, policy or AI-agent workflow" },
      { label: "Deliverability impact", value: "Reduce abusive sends that can harm platform reputation" },
    ],
    reasons: ["Bad actor may look legitimate during basic onboarding checks", "Campaign links can carry risk even when the sending account looks normal", "Reason codes make enforcement decisions easier to explain", "Policy thresholds remain under ESP control"],
    latency: "Fast-abuse example — checks can run at signup, pre-send, near-real-time or in analytics pipelines",
  },
  secondaryExampleAlert: {
    kicker: "Example ESP product line",
    title: "What you can sell under your brand.",
    intro: "This fictional example shows Datazag as the intelligence layer behind an ESP-branded customer service. Your customer sees your product, your report and your support model; Datazag powers the monitoring and evidence underneath.",
    severity: "PARTNER | WHITE LABEL",
    status: "Brand Protection Add-On",
    domain: "Customer brands · impersonation alerts · evidence packs · reports",
    fields: [
      { label: "Partner offer", value: "Brand Protection powered by Datazag" },
      { label: "Customer experience", value: "Your branded dashboard, reports, alerts and support workflow" },
      { label: "Coverage", value: "Customer brands, domains, aliases, impersonation and related infrastructure" },
      { label: "Evidence", value: "Screenshots, abuse contacts, reason codes and lifecycle state" },
      { label: "Pricing", value: "You choose the customer price and packaging" },
      { label: "Commercial impact", value: "New recurring service revenue beyond core sending" },
    ],
    reasons: ["Adds a differentiated paid service in a commodity market", "Uses your existing customer relationship and platform distribution", "Provides security value without building internet-scale intelligence collection", "Creates an upgrade path from sending platform to trust and protection platform"],
    latency: "White-label service example — final packaging and customer pricing are partner-controlled",
  },
  packagesTitle: "ESP partner motions.",
  packages: [
    { title: "Signup risk checks", text: "Screen customer domains, websites and infrastructure before low-cost accounts can abuse the platform." },
    { title: "Outbound link checks", text: "Score campaign links and landing-page domains to detect bad actors using your platform." },
    { title: "Data cleaning service", text: "Identify risky, suspicious or low-quality customer data before it harms deliverability or trust." },
    { title: "SMTP log enrichment", text: "Join send logs with domain, DNS, infrastructure and risk intelligence for deeper analytics." },
    { title: "White-label brand protection", text: "Sell customer-facing brand monitoring and evidence services under your own brand and pricing." },
    { title: "Deliverability analytics", text: "Support reputation, customer success, abuse and compliance teams with better context." },
  ],
  finalTitle: "Stop fast abuse. Protect deliverability. Create new revenue.",
  finalBody: "Datazag gives ESPs the data layer for account risk, campaign-link checks, SMTP analytics and partner-branded services. You decide how to package it, enforce it and sell it to your customers.",
};

export default async function EspPartnersPage() {
  const cmsContent = await sanityFetch<ProductConceptPageProps | null>(productConceptPageBySlugQuery, { slug: "esp-partners" });
  return <ProductConceptPage {...(cmsContent ?? fallbackContent)} />;
}
