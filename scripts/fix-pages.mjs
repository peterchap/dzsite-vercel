import fs from 'fs';
import path from 'path';

// Parse .env.local
const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let val = match[2].trim();
        if (val.startsWith('"') && val.endsWith('"')) { val = val.slice(1, -1); }
        env[match[1].trim()] = val;
    }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_TOKEN;

async function run() {
    console.log("Fetching existing page IDs...");
    const query = encodeURIComponent(`*[_type == "page" && slug.current in ["how-it-works", "mssp-partners", "esp-partners", "domain-intelligence"]] { _id, "slug": slug.current }`);
    const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await res.json();
    
    const existingIds = {};
    if (result.result) {
        result.result.forEach(doc => {
            existingIds[doc.slug] = doc._id;
        });
    }

    const getId = (slug) => existingIds[slug] || `page-${slug}`;

    const docs = [];

    // --- 1. How It Works ---
    docs.push({
        _type: "page",
        _id: getId("how-it-works"),
        title: "How It Works | The Datazag Graph",
        slug: { _type: "slug", current: "how-it-works" },
        sections: [
            {
                _key: "hiw-2",
                _type: "section.mediaFeature",
                title: "Most threat intelligence is a list of indicators. Datazag is a graph of relationships.",
                subtitle: "Flat feeds tell you a domain is malicious. They don't tell you what ASN it belongs to, whether its routing posture is hijacked, or how its risk score is changing relative to its peers. The Datazag Graph models all of that as a connected dataset — nodes for every entity, edges for every relationship. The result is guilt-by-association detection.",
            },
            {
                _key: "hiw-3",
                _type: "section.benefitCards",
                title: "Signal correlation and graphing",
                subtitle: "Every entity in the Graph is a node with typed edges to every other entity it touches.",
                cards: [
                    { _key: "fl1", title: "Domain ↔ IP", description: "every observed resolution, with timestamps" },
                    { _key: "fl2", title: "Domain ↔ Certificate", description: "every certificate ever issued, with time and CA" },
                    { _key: "fl3", title: "Domain ↔ ASN", description: "the autonomous system hosting the domain" },
                    { _key: "fl4", title: "Domain ↔ Threat feed", description: "every external indicator that has touched the domain" },
                    { _key: "fl5", title: "ASN ↔ ASN", description: "peering relationships derived from BGP observations" }
                ]
            },
            {
                _key: "hiw-4",
                _type: "section.mediaFeature",
                title: "Explainable risk scoring",
                subtitle: "Every entity in the Graph carries a risk score, recomputed continuously from dozens of signals. Critically, every score ships with the signals and rationale that drove it. Black-box scores require trust; explainable scores produce action."
            },
            {
                _key: "hiw-5",
                _type: "section.mediaFeature",
                title: "Real-time telemetry",
                subtitle: "Static feeds tell you what was bad yesterday. The Datazag Graph tells you what's becoming bad now. The Graph is fed by streaming pipelines: Certificate transparency (<10s latency), BGP multi-collector observations, Active DNS polling, MX probing, and WHOIS feeds. Running on Apache Arrow Flight and DuckDB."
            },
            {
                _key: "hiw-6",
                _type: "section.mediaFeature",
                title: "Routing hygiene verification",
                subtitle: "Most threat-intelligence systems treat hosting as binary. The Datazag Graph treats it as a continuum. Every ASN and prefix is checked against RPKI, MANRS, IRR, and Origin AS consistency."
            },
            {
                _key: "hiw-7",
                _type: "section.iconList",
                title: "What flows in",
                description: "The Datazag Graph is built from continuous monitoring of the internet's core infrastructure.",
                items: [
                    { _key: "il1", text: "Mail provider analysis: Active probing of MX records across 1,000+ providers.", iconEmoji: "📨" },
                    { _key: "il2", text: "DNS infrastructure: Continuous polling of authoritative nameservers across 330M domains.", iconEmoji: "🌐" },
                    { _key: "il3", text: "Certificate transparency: Real-time CertStream monitoring of SSL/TLS issuance.", iconEmoji: "🔐" },
                    { _key: "il4", text: "BGP and routing data: Multi-collector observations via RouteViews and RIPE RIS.", iconEmoji: "📡" }
                ]
            },
            {
                _key: "hiw-8",
                _type: "section.howItWorksSteps",
                title: "The Graph in motion — four named mechanisms",
                steps: [
                    { _key: "stp1", title: "Platform Fingerprinting", text: "Maps the platforms and vendors the organisation depends on." },
                    { _key: "stp2", title: "Corpus Matching", text: "Checks candidates against known DNS footprints and internet context." },
                    { _key: "stp3", title: "Build-Time Detection", text: "Impersonation infrastructure is flagged at the moment it's provisioned." },
                    { _key: "stp4", title: "Pre-Arrival Blocking", text: "Feeds directly into the blocking stack — email gateway, DNS filtering." }
                ]
            },
            {
                _key: "hiw-9",
                _type: "section.benefitCards",
                title: "What the Graph is not",
                cards: [
                    { _key: "fln1", title: "Not a threat-intel feed", description: "Feeds are flat lists. The Graph is a structured relational dataset." },
                    { _key: "fln2", title: "Not an ASM tool", description: "ASM looks inward. The Graph looks outward at the internet." },
                    { _key: "fln3", title: "Not a SaaS dashboard", description: "The Graph is intelligence infrastructure consumed via API or data share." },
                    { _key: "fln4", title: "Not built from licensed feeds", description: "Datazag operates the collection infrastructure directly." }
                ]
            },
            {
                _key: "hiw-11",
                _type: "section.finalCta",
                title: "Want to see the Graph in action?",
                primaryCta: { _type: "cta", label: "Get my free report", href: "/register" },
                secondaryCta: { _type: "cta", label: "Talk to engineering", href: "/contact" }
            }
        ]
    });

    // --- 2. MSSP Partners ---
    docs.push({
        _type: "page",
        _id: getId("mssp-partners"),
        title: "MSSP Partners",
        slug: { _type: "slug", current: "mssp-partners" },
        sections: [
            {
                _key: "mssp-1",
                _type: "section.heroSplitCta",
                headline: "Scale profitably — without hiring more analysts",
                subheadline: "Add phishing and platform-impersonation protection across your client portfolio while improving margins. Datazag detects malicious infrastructure at AI scale — Build-Time Detection catches it as it's provisioned, before attacks launch and before your clients call.",
                primaryCta: { _type: "cta", label: "Partner with Datazag", href: "/contact" }
            },
            {
                _key: "mssp-2",
                _type: "section.benefitCards",
                title: "Why Partner with Datazag",
                cards: [
                    { _key: "bc1", title: "Grow without margin erosion", description: "Add new customers and brands without proportional analyst costs. Our false-positive controls mean minimal investigation time per alert." },
                    { _key: "bc2", title: "Prevent incidents", description: "Stop phishing campaigns before they are sent." },
                    { _key: "bc3", title: "Unlock new revenue streams", description: "Sell zero-hour protection as a premium add-on." },
                    { _key: "bc4", title: "Cover the platforms others don't", description: "Microsoft, Google, Apple and Amazon detect impersonation of their own brand. Your clients use 30 to 60 other SaaS vendors with no mature brand-protection programmes." }
                ]
            },
            {
                _key: "mssp-3",
                _type: "section.howItWorksSteps",
                title: "How MSSPs Use Datazag",
                subtitle: "Phishing and impersonation campaigns are assembled step by step using newly registered domains, SSL certificates, DNS, and infrastructure.",
                steps: [
                    { _key: "stp1", title: "Build-Time Detection & Pre-Arrival Blocking", text: "Detect impersonation infrastructure at SSL issuance, DNS configuration and registration — before campaigns launch." },
                    { _key: "stp2", title: "Continuous Monitoring (No Analyst Time)", text: "Automated tracking of suspicious domains." },
                    { _key: "stp3", title: "Evidence-Backed Escalation", text: "Provide clients with proof of intent." },
                    { _key: "stp4", title: "Takedown-Ready Intelligence", text: "Rich context ready for registrar abuse desks." }
                ]
            },
            {
                _key: "mssp-3b",
                _type: "section.mediaFeature",
                title: "Where Datazag fits in your SOC workflow",
                subtitle: "Detection happens at infrastructure provisioning, alerts arrive in your existing SIEM or SOAR with the reasoning attached, and analysts only triage what's already been FP-checked. The result is fewer alerts to review, higher confidence per alert, and earlier action."
            },
            {
                _key: "mssp-4",
                _type: "section.benefitCards",
                title: "What You Can Build With Datazag",
                columns: 3,
                cards: [
                    { _key: "col1", title: "Zero-Hour Phishing Defence", description: "Detect phishing infrastructure during: Domain registration (Platform Fingerprinting), DNS configuration (Corpus Matching), SSL certificate issuance (Build-Time Detection)." },
                    { _key: "col2", title: "Brand Impersonation & Abuse Monitoring", description: "Automated discovery of lookalike domains and brand abuse across the web." },
                    { _key: "col3", title: "SOC Enrichment & Threat Hunting", description: "JOIN-ready domain intelligence across 330M+ active domains. Hourly updates via cloud marketplaces." }
                ]
            },
            {
                _key: "mssp-5",
                _type: "section.twoColumnFeature",
                left: { 
                    title: "Customer-Owned Brand Monitoring", 
                    features: ["Datazag's MSSP programme is scoped to your client portfolio and your own brand. Third-party domain monitoring outside that scope is available under separate enterprise arrangements."] 
                },
                right: { 
                    title: "Global Campaign Context", 
                    features: ["Correlate attacks against your clients with broader global campaigns."] 
                }
            },
            {
                _key: "mssp-6",
                _type: "section.mediaFeature",
                title: "MSSP Control Plane (Admin Dashboard)",
                subtitle: "Built for governance and configuration, not alert triage. Manage client portfolios, set detection thresholds, and configure routing into your SIEM/SOAR without adding another pane of glass for your analysts."
            },
            {
                _key: "mssp-7",
                _type: "section.howItWorksSteps",
                title: "How Partners Typically Adopt Datazag",
                steps: [
                    { _key: "stp1", title: "Launch Zero-Hour Phishing Defence", text: "Immediate value for your clients." },
                    { _key: "stp2", title: "Expand into Brand Impersonation & Takedown", text: "Grow your service offering." },
                    { _key: "stp3", title: "Adopt the full SOC Enrichment layer", text: "As detection and hunting mature." }
                ]
            },
            {
                _key: "mssp-8",
                _type: "section.pricingOverview",
                title: "MSSP partner pricing",
                subtitle: "Datazag works with MSSPs on a per-client-brand basis, scaling with: Number of monitored client brands, Alert volume and integration depth, SLA and white-label requirements. Indicative starting range: $12,000 – $20,000 per month."
            }
        ]
    });

    // --- 3. ESP Partners ---
    docs.push({
        _type: "page",
        _id: getId("esp-partners"),
        title: "ESP Partners",
        slug: { _type: "slug", current: "esp-partners" },
        sections: [
            {
                _key: "esp-1",
                _type: "section.heroSplitCta",
                headline: "Protect your Platform & your Customers from Phishing Attacks",
                subheadline: "Datazag enables Email Service Providers to detect brand and platform impersonation infrastructure pre-compromise — Build-Time Detection catches it as it's provisioned, before campaigns send.",
                primaryCta: { _type: "cta", label: "Partner with Datazag", href: "/contact" }
            },
            {
                _key: "esp-2",
                _type: "section.benefitCards",
                title: "Regulatory, Compliance & Deliverability Are Linked",
                cards: [
                    { _key: "f1", title: "The New Reality", description: "Google and Microsoft are actively penalising ESPs that harbor abuse infrastructure." },
                    { _key: "f2", title: "How Datazag Helps", description: "Detect phishing and platform-impersonation infrastructure via Build-Time Detection — during domain registration, DNS setup and SSL issuance." },
                    { _key: "f3", title: "And feed your deliverability and abuse engineering directly", description: "Datazag's 330M-domain corpus and live infrastructure intelligence drop straight into the data pipelines your deliverability, abuse and anti-fraud teams already run." }
                ]
            },
            {
                _key: "esp-3",
                _type: "section.mediaFeature",
                title: "And One More Thing... A New Revenue Stream",
                subtitle: "Use Datazag's Brand & Platform Alerts to offer your customers a paid brand-monitoring service — your service, your pricing, Datazag intelligence inside."
            },
            {
                _key: "esp-4",
                _type: "section.howItWorksSteps",
                title: "How ESPs Use Datazag",
                subtitle: "Phishing and impersonation campaigns are assembled step by step.",
                steps: [
                    { _key: "s1", title: "Build-Time Detection & Pre-Arrival Blocking", text: "Alerting on bad infrastructure before campaigns send." },
                    { _key: "s2", title: "Continuous Monitoring", text: "Watching suspicious domains escalate to active threats." },
                    { _key: "s3", title: "Evidence-Based Escalation", text: "Providing concrete abuse proof." },
                    { _key: "s4", title: "Platform-Safe Enforcement", text: "Clear rationale for suspension without false positives." }
                ]
            },
            {
                _key: "esp-4b",
                _type: "section.mediaFeature",
                title: "Where Datazag fits in your abuse and deliverability workflow",
                subtitle: "Detection happens at infrastructure provisioning — before a customer's outbound campaign sends. Datazag intelligence drops into your risk-scoring pipeline, your onboarding controls, your throttling decisions and your sender-reputation analytics."
            },
            {
                _key: "esp-5",
                _type: "section.dataSources",
                title: "Powered by global domain intelligence",
                subtitle: "All alerts are enriched by the Datazag Graph — Datazag's continuously refreshed internet-infrastructure intelligence platform. Includes: 330M+ active global domains.",
                sources: [
                    { _key: "src1", name: "API & Webhooks", description: "Real-time delivery" },
                    { _key: "src2", name: "Snowflake & Databricks", description: "Data shares" },
                    { _key: "src3", name: "Cloud Marketplaces", description: "AWS, Azure, GCP" }
                ]
            },
            {
                _key: "esp-6",
                _type: "section.pricingOverview",
                title: "Platform pricing built for scale and resale",
                subtitle: "ESP partner pricing typically starts from $12,000 – $20,000 per month, scaling with: Platform size, Number of monitored brands, Alert volume, SLA."
            }
        ]
    });

    // --- 4. Domain Intelligence (Data Product) ---
    docs.push({
        _type: "page",
        _id: getId("domain-intelligence"),
        title: "Domain Intelligence API & Data Shares",
        slug: { _type: "slug", current: "domain-intelligence" },
        hero: {
            _type: "section.heroSplitCta",
            headline: "Domain intelligence, built for the data teams who consume it.",
            subheadline: "Replace manual DNS investigations with one SQL join. JOIN-ready domain intelligence across Snowflake, Databricks, AWS, Azure and GCP — and a real-time API for live lookups. over 330M+ active domains.",
            primaryCta: { _type: "cta", label: "Get Free API Key", href: "/register" }
        },
        sections: [
            {
                _key: "data-1",
                _type: "section.mediaFeature",
                title: "The Manual Enrichment Problem",
                subtitle: "Datazag's domain intelligence automates enrichment in one SQL join across all your logs, against the full 330M+ domain corpus. Hours of analyst time saved per investigation."
            },
            {
                _key: "data-2",
                _type: "section.twoColumnFeature",
                left: {
                    title: "Live Cloud Data Shares",
                    features: ["Zero-ETL, instant access.", "No API throttling, no download scripts.", "Features the Datazag Graph and a 330M+ row dataset."]
                },
                right: {
                    title: "Real-Time API Access",
                    features: ["If a domain isn't in our corpus, we trigger a Build-Time Detection scan to resolve, trace, and risk-score it in <2 seconds."]
                }
            },
            {
                _key: "data-3",
                _type: "section.mediaFeature",
                title: "More than a raw feed — pre-enriched, pre-scored, ready to JOIN.",
                subtitle: "Other data vendors hand you raw signals and leave the interpretation to you. Datazag delivers domain intelligence with risk scores, classifications, infrastructure context and historical patterns already computed — so your SQL queries return answers, not attributes."
            }
        ]
    });

    // Write out NDJSON
    const ndjson = docs.map(doc => JSON.stringify(doc)).join('\n');
    fs.writeFileSync('seed-data.ndjson', ndjson);
    console.log("Successfully generated seed-data.ndjson with correct schema mappings!");
}

run().catch(console.error);
