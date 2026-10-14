// The priced closing offer on each partner page (brief: partner page closing sections,
// 13 Oct 2026). Rendered by components/partners/PartnerClosing.tsx.
//
// NO PRICES HERE. Each included line names product ids, and the price renders from the
// shared pricing config (lib/pricing.ts). The price guard fails the build on a typed price
// in this file or in a partner page. A new offer goes onto the pricing page first.
//
// Not in the CMS: the lines are tied to product ids, which an editor cannot check.

import type { PartnerSrc } from "@/lib/booking";
import type { FoundingOffer } from "@/lib/pricing";

export type LinkedCopy = { text: string; link?: { text: string; href: string } };

export type PartnerOffer = {
  src: PartnerSrc;
  title: string;
  summary: string;
  /** What the offer includes. Each line shows the prices of its product ids. */
  included: Array<{ text: string; ids: string[] }>;
  /** A line under the list, for example how partners are charged. */
  priceLine?: string;
  secondary: { label: string; href: string };
  /** Exactly three steps. */
  steps: [string, string, string];
  questions: Array<{ question: string; answer: LinkedCopy }>;
  /** The founding offer for this page, if it has one (lib/pricing.ts). */
  founding?: FoundingOffer["id"];
};

/** Every product id an offer names, in order. */
export function offerIds(offer: PartnerOffer): string[] {
  return offer.included.flatMap((line) => line.ids);
}

// The pricing page's own wording (its FAQ). Change it only when the partner discount is published.
const PARTNER_PRICE_LINE = "Partners buy at list price less a partner discount set on their account.";

/** Replaces the old wording about private terms in the margin sections. */
export const PARTNER_PRICING_NOTE: LinkedCopy = {
  text: "List prices are published on the pricing page. Partners receive a discount on their account, and set their own price to clients.",
  link: { text: "pricing page", href: "/pricing" },
};

export const MSSP_OFFER: PartnerOffer = {
  src: "mssp",
  title: "Start with your own clients",
  summary: "Run Datazag reports on your clients under your brand, then add monitoring and alerts.",
  included: [
    { text: "Domain infrastructure report per client", ids: ["domain_report"] },
    { text: "Organization estate report for larger clients", ids: ["org_estate_10", "org_estate_50", "org_estate_250"] },
    { text: "Annual monitoring with quarterly reruns and drift alerts", ids: ["monitoring"] },
    { text: "Platform and Infrastructure Alerts for your SOC", ids: ["alerts_platform", "alerts_infrastructure"] },
  ],
  priceLine: PARTNER_PRICE_LINE,
  secondary: { label: "Run a report on your own domain →", href: "/#free-report" },
  steps: [
    "A 20-minute call to see which clients and prospects fit.",
    "We run reports on a small group of your clients so you can judge the output.",
    "You choose the reports, monitoring or alerts that fit your service.",
  ],
  questions: [
    { question: "Do we need to integrate anything?", answer: { text: "No. Reports arrive as PDF, HTML and CSV under your brand. Alerts and data feeds can come later." } },
    { question: "What if it does not work for us?", answer: { text: "You judge the output on your own clients first. Reports are one-off purchases, so you can stop after any report." } },
  ],
  founding: "founding_mssp",
};

export const ESP_OFFER: PartnerOffer = {
  src: "esp",
  title: "Test it on your own signups",
  summary: "See what Datazag knows about the domains moving through your platform, then take the data into your warehouse.",
  included: [
    { text: "Data share in your own warehouse", ids: ["data_share_standard", "data_share_advanced"] },
    { text: "Platform Alerts for abuse and trust teams", ids: ["alerts_platform"] },
    { text: "Organization estate reports for account reviews", ids: ["org_estate_10"] },
  ],
  secondary: { label: "See a sample output →", href: "/#samples" },
  steps: [
    "A 20-minute call to agree which workflow to test first.",
    "You send a sample of signup or sending domains. We keep nothing after delivery.",
    "We return the results with their evidence, and walk you through them.",
  ],
  questions: [
    { question: "Is this a verdict on whether to accept a sender?", answer: { text: "No. It is evidence for your own decision. You set the rules." } },
    { question: "Do you see our customer data?", answer: { text: "Only the domain sample you choose to send, and we do not keep it." } },
  ],
  founding: "founding_esp",
};

export const INSURER_OFFER: PartnerOffer = {
  src: "insurers",
  title: "Test it against your book",
  summary: "Send domains for a sample of your book. We return discovery, posture and concentration for each insured.",
  included: [
    { text: "Portfolio report, up to 25 or 50 insureds", ids: ["portfolio_25", "portfolio_50"] },
    { text: "Analyst-reviewed diligence edition for submissions that need sign-off", ids: ["diligence"] },
    { text: "Annual monitoring through the policy term", ids: ["monitoring"] },
    { text: "Data share for accumulation and actuarial work", ids: ["data_share_standard"] },
  ],
  secondary: { label: "See a sample estate report →", href: "/samples/estate-attack-surface-report.html" },
  steps: [
    "A 20-minute call to agree the sample and the questions that matter.",
    "You send one or more domains per insured. We find the rest of each estate.",
    "You receive discovery, posture and concentration as separate layers, with evidence.",
  ],
  questions: [
    {
      question: "Does our book leave our environment?",
      answer: { text: "Not on the data-share route. Reports work like the API: you send domains, covered by our DPA.", link: { text: "DPA", href: "/legal/dpa" } },
    },
    { question: "Is this a risk score?", answer: { text: "No. Each finding shows the record it came from. You set the thresholds." } },
  ],
  founding: "founding_insurer",
};
