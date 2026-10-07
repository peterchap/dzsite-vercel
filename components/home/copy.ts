/**
 * HOMEPAGE COPY — demand generation restructure (brief: Peter, 7 Oct 2026).
 *
 * Rules for this file (en-US, plain English for non-native readers):
 * - Sentences of 20 words or fewer, active voice.
 * - "Pre-compromise", never the retired forecasting word.
 * - NO FIGURES OR PRICES. Every number on the homepage is read at request time:
 *   coverage from website-stats (lib/site-stats-live), Observatory figures from its
 *   published statistics, prices from the portal. scripts/guards/checkHomepageFigures.mjs
 *   fails the build if a figure, a price or a forbidden claim appears here.
 * - Forbidden: a whole-corpus daily-scan claim (the corpus refreshes over about two
 *   months; new and high-risk domains are checked daily), any lead-time claim (not yet
 *   measured: hub work/cc-task-lead-time-metric.md), any third-party feed by name, and
 *   the embargoed registry-wildcard TLD.
 */

export const HERO = {
  eyebrow: "For MSSPs, email platforms, cyber insurers and data teams",
  title: "Internet infrastructure intelligence you can act on.",
  // {domains} is filled from the live stats.
  intro: [
    "We track {domains} resolving domains, with their DNS, certificates and routing.",
    "We flag new attack infrastructure as it is set up.",
    "Use it to find hidden assets, assess risk and power your own security products.",
  ],
  primary: { label: "Get your free domain health report", href: "#free-report" },
  secondary: { label: "Explore datasets and sample outputs", href: "#samples" },
  observatoryLink: "Explore the Observatory",
};

/**
 * Section 2. The first four tiles match the hero's audience list one for one.
 * `estate` is resolved at render: the portal's /scope when NEXT_PUBLIC_SCOPE_LIVE,
 * otherwise the estate section of /reports.
 */
export const AUDIENCES = [
  {
    key: "mssp",
    audience: "MSSPs",
    problem: "Spot attacks on clients' platforms before they land.",
    outcome: "Add pre-compromise intelligence to your SOC service, under your own brand.",
    href: "/mssp-partners",
  },
  {
    key: "email",
    audience: "Email platforms",
    problem: "Vet senders and links, and keep bad actors off the platform.",
    outcome: "See who runs a sender's domain and mail before you onboard them.",
    href: "/esp-partners",
  },
  {
    key: "insurer",
    audience: "Cyber insurers",
    problem: "See concentration and exposure across a book.",
    outcome: "Find shared providers and weak email controls across your insureds.",
    href: "/cyber-risk-underwriting",
  },
  {
    key: "data",
    audience: "Data teams",
    problem: "Join infrastructure data to your own, in your warehouse.",
    outcome: "Query our datasets next to your own tables, with no data leaving your account.",
    href: "/datasets",
  },
  {
    key: "estate",
    audience: "Investors and M&A",
    problem: "Check a portfolio or a target's domain estate.",
    outcome: "Get a portfolio snapshot or a full estate report for a group of companies.",
    href: "estate",
  },
] as const;

export const FREE_REPORT = {
  kicker: "Free Domain Health Report",
  title: "See your domain the way an attacker sees it.",
  intro: "Enter your domain and work email. We check your public infrastructure and email you the report.",
  bullets: [
    { title: "Email controls", text: "SPF, DMARC and MTA-STS, and what each one leaves open." },
    { title: "Platform impersonation", text: "Lookalike domains that copy the platforms you rely on." },
    { title: "Hosting and subdomains", text: "Where your domain is hosted, and which subdomains are exposed." },
  ],
  sampleLink: "View a sample report",
};

export const EVIDENCE = {
  kicker: "Evidence and sample outputs",
  title: "See exactly what you get.",
  intro: "Each sample uses our real output format, run on a fictional organization.",
};

export const COVERAGE = {
  kicker: "Coverage and methodology",
  title: "What we see, and how we measure it.",
  method: [
    "We resolve DNS for every domain we know about.",
    "We read certificate transparency logs to find new names as certificates are issued.",
    "We add global routing data to place each address in the network that announces it.",
    "We collect all of this ourselves. We do not license threat feeds.",
  ],
  cadence: "New and high-risk domains are checked daily. The full corpus refreshes about every two months.",
  methodLink: { label: "Read how it works", href: "/how-it-works" },
};

export const DELIVERY = {
  kicker: "Delivery",
  title: "Use the data where you already work.",
  channels: [
    {
      key: "portal",
      title: "Reports in the portal",
      text: "Order and read reports in the Datazag portal. Estate orders include PDF, HTML and CSV files.",
      href: "/reports",
      link: "See the reports",
    },
    {
      key: "snowflake",
      title: "Snowflake Marketplace",
      text: "Get our IP-to-ASN dataset as a free Snowflake listing. Query it like any other table.",
      href: "/datasets/ip-asn-intelligence",
      link: "See the dataset",
    },
  ],
  daas: "Datasets arrive in your own warehouse. You join them to your data there, so your data stays in your environment.",
  other: { label: "Need another channel? Talk to us.", href: "/contact" },
};

export const OBSERVATORY = {
  kicker: "Datazag Observatory",
  title: "The internet's infrastructure, measured.",
  text: "Free to explore and cite.",
  button: "Explore the Observatory",
  about: { label: "What it measures", href: "/observatory" },
};

export const PRICING = {
  kicker: "Pricing",
  title: "Start free. Pay when you need more.",
  free: "Free",
  datasets: { title: "Datasets", text: "See what each dataset costs and where you can get it.", link: "See dataset pricing", href: "/pricing" },
  closing: { title: "Start with your own domain.", text: "Get the free report and see what an attacker can see." },
};
