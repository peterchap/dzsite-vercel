import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * /try domain-lookup demo endpoint.
 *
 * IMPORTANT — this currently returns a STUB response so the /try UI is reviewable.
 * When the real demo API details are provided, replace `buildStubResult()` with:
 *   1. a call to the Datazag enrichment API for `domain`
 *   2. `applyVisibilityTiers(enrichment)` — the visibility-tier mapping below
 * The visibility-tier structure (Tier 1 full / Tier 2 summary / Tier 3 field-name-only /
 * Tier 4 hidden) is per datazag-demo-page-build.md §2 and is PENDING SIGN-OFF before launch.
 *
 * Rate limiting (anonymous 1/session, email 5/day, portal unlimited), caching, and
 * CAPTCHA/abuse prevention are NOT yet implemented server-side — see build doc §4.
 */

type Tier = 1 | 2 | 3; // Tier 4 (hidden) attributes are simply omitted from the response.
type Attribute = { name: string; tier: Tier; value?: string };
type Section = { id: string; title: string; attributes: Attribute[] };
export type LookupResult = {
  domain: string;
  status: string;
  stub: boolean;
  sections: Section[];
};

const DOMAIN_RE = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

// Tier 3 attributes carry no value — the UI shows "Available via API or Full 360 Health Report".
const locked = (name: string): Attribute => ({ name, tier: 3 });

function buildStubResult(domain: string): LookupResult {
  return {
    domain,
    status: "resolved",
    stub: true,
    sections: [
      {
        id: "dns",
        title: "DNS records",
        attributes: [
          { name: "A records", tier: 1, value: "—" },
          { name: "AAAA records", tier: 1, value: "—" },
          { name: "MX records", tier: 1, value: "—" },
          { name: "NS records", tier: 1, value: "—" },
          { name: "TXT records", tier: 1, value: "—" },
          { name: "CAA records", tier: 1, value: "—" },
          { name: "SOA", tier: 1, value: "—" },
          { name: "DNS provider classification", tier: 2, value: "Provider name + classification" },
          locked("DNS hosting historical changes"),
        ],
      },
      {
        id: "email",
        title: "Email authentication & deliverability",
        attributes: [
          { name: "SPF policy", tier: 2, value: "Lookup count, third-party count, policy" },
          locked("SPF full chain"),
          { name: "DKIM selectors", tier: 2, value: "Count, providers detected" },
          locked("DKIM record details"),
          { name: "DMARC policy", tier: 2, value: "Policy type, percentage, reporting summary" },
          locked("DMARC reporting destination details"),
          { name: "BIMI presence", tier: 1, value: "—" },
          { name: "MTA-STS deployment", tier: 1, value: "—" },
          { name: "TLS-RPT setup", tier: 1, value: "—" },
          { name: "Mail server probing classification", tier: 2, value: "Mailbox provider category" },
        ],
      },
      {
        id: "tls",
        title: "TLS/SSL certificates",
        attributes: [
          { name: "Current certificate (issuer, validity, SANs)", tier: 1, value: "—" },
          { name: "Certificate transparency log entries", tier: 1, value: "Count, recent issuances" },
          { name: "Certificate authority classification", tier: 2, value: "CA category" },
          locked("Historical certificate timeline"),
        ],
      },
      {
        id: "hosting",
        title: "Hosting infrastructure",
        attributes: [
          { name: "IP address", tier: 1, value: "—" },
          { name: "ASN", tier: 1, value: "—" },
          { name: "ASN name and hosting provider", tier: 1, value: "—" },
          { name: "Country and geographic location", tier: 1, value: "—" },
          { name: "IP range and prefix", tier: 1, value: "—" },
          locked("Hosting provider risk classification"),
          // Neighbour analysis on the same ASN/prefix is Tier 4 (hidden) — omitted.
        ],
      },
      {
        id: "routing",
        title: "Routing posture",
        attributes: [
          { name: "RPKI validation state", tier: 1, value: "valid / invalid / unknown" },
          { name: "MANRS membership", tier: 1, value: "member / non-member" },
          { name: "IRR registration completeness", tier: 1, value: "present / absent" },
          locked("RPKI validation full chain"),
          locked("Routing posture historical changes"),
          locked("Routing risk score"),
        ],
      },
      {
        id: "provenance",
        title: "Domain provenance",
        attributes: [
          { name: "Registrar", tier: 1, value: "—" },
          { name: "Registration date", tier: 1, value: "—" },
          { name: "Expiry date", tier: 1, value: "—" },
          { name: "Last registrar change date (RDAP)", tier: 1, value: "—" },
          { name: "Recent registrar transfer (180d)", tier: 1, value: "yes / no" },
          { name: "WHOIS contact obfuscation status", tier: 2, value: "obfuscated / transparent" },
          locked("Full WHOIS contact details"),
          locked("Registrar reputation classification"),
          { name: "Domain age", tier: 1, value: "—" },
          { name: "Last DNS change date", tier: 1, value: "—" },
        ],
      },
      {
        id: "datazag",
        title: "Datazag-specific classification",
        attributes: [
          locked("Platform fingerprint match"),
          locked("Brand classification"),
          locked("Risk score"),
          locked("Threat-feed cross-reference status"),
          locked("Related-infrastructure cluster size"),
        ],
      },
    ],
  };
}

export async function POST(req: NextRequest) {
  let domain = "";
  try {
    const body = await req.json();
    domain = String(body?.domain ?? "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!domain || !DOMAIN_RE.test(domain)) {
    return NextResponse.json({ error: "Please enter a valid domain, e.g. microsoft.com" }, { status: 422 });
  }

  // TODO: swap stub for live enrichment + applyVisibilityTiers once API details are provided.
  const result = buildStubResult(domain);
  return NextResponse.json(result);
}
