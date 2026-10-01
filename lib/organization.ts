/**
 * ORGANIZATION STRUCTURED DATA — who Datazag is, for search engines.
 *
 * WHY (2026-09-30): stale third-party listings from the previous business
 * (Datarade: 267M domains and "data hygiene"; saasbrowser: "a SaaS for email
 * security, fraud detection and lead verification") rank for the company
 * name, and Datazag does not control them. The site had no Organization
 * schema at all, so nothing told a search engine which pages speak for the
 * company. This is that statement, rendered once in app/layout.tsx.
 *
 * SAME RULE AS lib/legal-entity.ts: only facts that are known. Every value
 * here comes from the legal entity record or a URL checked when it was added.
 * An unknown field is left out, never guessed.
 *
 * NO FIGURES. The corpus size changes daily, and a number frozen into
 * structured data is exactly the kind of stale claim this exists to outrank.
 */
import { LEGAL_ENTITY } from "./legal-entity";
import { VENDOR_ASSESSMENTS } from "./trust-posture";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.datazag.com";

/** Stable node id, so other JSON-LD on the site (datasets) can reference the entity. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Profiles that are ABOUT Datazag and that Datazag controls or that are
 * authoritative. Each was confirmed to resolve to this company when added.
 *
 * Add only URLs Datazag controls or that are an official register. A stale
 * aggregator listing (Datarade, saasbrowser) must never go here: sameAs tells
 * a search engine "this is also us".
 */
export const SAME_AS: string[] = [
  // Companies House register entry — confirmed "DATAZAG LTD", 2026-09-30.
  `https://find-and-update.company-information.service.gov.uk/company/${LEGAL_ENTITY.companyNumber}`,
  // Supplied by the founder 2026-10-01. LinkedIn resolved to "Datazag | LinkedIn"; the GitHub
  // account is type Organization, name "Datazag", website https://www.datazag.com. Crunchbase
  // refuses automated requests (Cloudflare), so it was not fetched; the slug matches the legal name.
  "https://www.linkedin.com/company/datazag/",
  "https://www.crunchbase.com/organization/datazag-ltd",
  "https://github.com/Datazag",
];

/**
 * The registered office as a PostalAddress, parsed from the one string in
 * lib/legal-entity.ts ("12 South Drive, Wokingham, England, RG40 2DH") so the
 * address is never typed twice. Null if it does not have the expected shape —
 * an address split wrongly is worse than none.
 */
function registeredAddress() {
  const parts = LEGAL_ENTITY.registeredOffice?.split(",").map((p) => p.trim()) ?? [];
  const postalCode = parts.at(-1);
  if (parts.length < 3 || !postalCode || !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postalCode)) return null;
  return {
    "@type": "PostalAddress",
    streetAddress: parts[0],
    addressLocality: parts[1],
    postalCode,
    addressCountry: "GB",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Datazag",
        legalName: LEGAL_ENTITY.legalName,
        url: SITE_URL,
        // The square Dz mark — app/icon.svg (supplied again 2026-10-01) rendered to a 512x512
        // PNG with Manrope embedded, via next/og. The SVG itself sets "Dz" as live Manrope text,
        // so any renderer without the font draws a different logo, and at 64px it is below
        // Google's 112px minimum. A square suits the knowledge panel, which crops to one.
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-mark.png`,
          width: 512,
          height: 512,
        },
        // The DATAZAG wordmark (691x134 PNG, transparent), for surfaces that show a wide image.
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 691,
          height: 134,
        },
        description:
          "Internet infrastructure intelligence: DNS, mail and authentication posture, hosting, " +
          "routing and certificates for the internet's domains, delivered as reports, an API, " +
          "alerts and cloud datasets.",
        ...(LEGAL_ENTITY.incorporatedOn ? { foundingDate: LEGAL_ENTITY.incorporatedOn } : {}),
        ...(LEGAL_ENTITY.companyNumber
          ? {
              identifier: {
                "@type": "PropertyValue",
                propertyID: "Companies House company number",
                value: LEGAL_ENTITY.companyNumber,
              },
            }
          : {}),
        ...(registeredAddress() ? { address: registeredAddress() } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: VENDOR_ASSESSMENTS.contactEmail,
        },
        ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Datazag",
        url: SITE_URL,
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}
