export interface DomainData {
    domain: string;
    registered_domain: string;
    status: string;
    // Core DNS
    ns1?: string;
    ns?: string;
    soa?: string;
    a?: string;
    aaaa?: string;
    ptr?: string;
    cname?: string;
    ip_int?: number;
    // MX & Email
    mx?: string;
    mx_domain?: string;
    mx_tld?: string;
    mx_priority?: number;
    mx_host_final?: string;
    mx_regdom_final?: string;
    mx_cname_chain?: string[];
    mx_ips?: string[];
    mx_ptr?: string;
    mx_ptr_regdom?: string;
    mx_under_customer?: boolean;
    mx_status?: string;
    // SPF/DMARC
    spf?: string;
    dmarc?: string;
    bimi?: string;
    // WWW
    www?: string;
    www_a?: string;
    www_ptr?: string;
    www_cname?: string;
    // Mail Subdomain
    mail_a?: string;
    mail_ptr?: string;
    mail_mx?: string;
    mail_spf?: string;
    mail_dmarc?: string;
    // Infrastructure
    asn?: string;
    isp?: string;              // Often enriched
    isp_country?: string;      // Often enriched
    mbp?: string;              // Mail Provider Name
    is_known_mbp?: boolean;
    // Risk & Flags
    is_phishing?: boolean;
    is_malware?: boolean;
    is_parked?: boolean;
    is_disposable?: boolean;
    is_new_domain?: boolean;
    is_spf_block?: boolean;
    is_dga_suspect?: boolean;
    dga_sld_entropy?: number;
    dga_sld_length?: number;
    risk_level?: string;       // "low", "medium", "high", "critical"
    risk_reasons?: string;
    risk_score?: number;       // 0-100
    top_domain_rank?: number;
    decision_flag?: boolean;   // Derived flag
    // Certificates
    https_cert_ok?: boolean;
    https_cert_issuer?: string;
    smtp_cert_ok?: boolean;
    // Meta
    _meta?: {
        timings: {
            fetch_ms: number;
            total_ms: number;
            [key: string]: number;
        };
    };
}

const MOCK_DATA: DomainData = {
    domain: "mock-sample.com",
    registered_domain: "mock-sample.com",
    status: "active",
    decision_flag: true,
    mx_domain: "mx-mock.google.com",
    is_known_mbp: true,
    mx_status: "OK",
    a: "1.2.3.4",
    is_spf_block: false,
    is_phishing: false,
    is_disposable: false,
    is_parked: false,
    is_malware: false,
    is_new_domain: false,
    top_domain_rank: 4521,
    mbp: "Google Workspace",
    spf: "v=spf1 include:_spf.google.com ~all",
    dmarc: "v=DMARC1; p=quarantine; pct=100",
    isp: "Google Cloud",
    isp_country: "United States",
    ns: "ns1.google.com, ns2.google.com",
    ptr: "ptr.mock-sample.com",
    cname: "none",
    mx: "aspmx.l.google.com",
    www: "1.2.3.4",
    www_ptr: "www.ptr.mock-sample.com",
    www_cname: "mock-sample.com",
    mail_a: "1.2.3.5",
    mail_ptr: "mail.ptr.mock-sample.com",
    mail_mx: "aspmx.l.google.com",
    mail_spf: "v=spf1 include:_spf.google.com ~all",
    mail_dmarc: "v=DMARC1; p=quarantine",
};


// Realtime API Response Interface (based on celery_app_realtime/api.py & main.py)
interface RealtimeApiResponse {
    domain: string;
    status: string;
    risk_score?: number;
    risk_level?: string;
    risk_reasons?: string | string[]; // Can be string or list based on risk_scoring.py
    records?: {
        A?: string[];
        AAAA?: string[];
        MX?: string[];
        NS?: string[];
        TXT?: string[];
        SOA?: string[];
        PTR?: Record<string, string>;
        CNAME?: string[];
        [key: string]: any;
    };
    _meta?: {
        timings?: Record<string, number>;
    };
    [key: string]: any; // Catch-all for other enriched fields
}

export async function fetchDomainData(domain: string): Promise<DomainData> {
    // If we're in development, we can return mock data for any domain ending in .mock
    // OR if the user searches for "test.com"
    const useMock = process.env.NODE_ENV === 'development' &&
        (domain.endsWith('.mock') || domain === 'test.com');

    if (useMock) {
        console.log(`[API MOCK] Returning mock data for: ${domain}`);
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 800));
        return { ...MOCK_DATA, domain };
    }

    // Production / Real-time API Call
    // User provided URL: https://datazag-website-768322061961.europe-west1.run.app
    // Endpoint: /lookup?domain=...
    const baseUrl = "https://datazag-website-768322061961.europe-west1.run.app";
    const apiUrl = `${baseUrl}/lookup?domain=${encodeURIComponent(domain)}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                // 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '', // Uncomment if key is enforced
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const rawData: RealtimeApiResponse = await response.json();

        // Adapter: Map RealtimeApiResponse to DomainData
        return mapRealtimeResponseToDomainData(rawData);
    } catch (error) {
        console.error("Fetch Domain Data Error:", error);
        throw error;
    }
}

function mapRealtimeResponseToDomainData(raw: RealtimeApiResponse): DomainData {
    // The backend returns a flat structure (DNSRecords asdict), not nested records.
    // e.g. { a: "1.2.3.4", mx: "10 ...", spf: "...", www_a: "..." }

    // Helper to ensure we handle potentially missing fields gracefully
    const val = (v: any) => (v === null || v === undefined) ? undefined : v;
    const str = (v: any) => (v === null || v === undefined) ? "" : String(v);

    return {
        domain: raw.domain,
        registered_domain: raw.registered_domain || raw.domain,
        status: (raw.status === "alive" ? "ALIVE" : (raw.status || "").toUpperCase()),

        // Core DNS (Strings joined by backend)
        a: val(raw.a),
        aaaa: val(raw.aaaa),
        ns: val(raw.ns1) || val(raw.ns), // explicit ns1 or fallback
        ns1: val(raw.ns1),
        mx: val(raw.mx),
        soa: val(raw.soa),
        ptr: val(raw.ptr),
        cname: val(raw.cname),

        // Extended List Fields (if present)
        mx_ips: Array.isArray(raw.mx_ips) ? raw.mx_ips : [],
        mx_ptr: val(raw.mx_ptr),
        mx_ptr_regdom: val(raw.mx_ptr_regdom),

        // SPF/DMARC/BIMI
        spf: val(raw.spf),
        dmarc: val(raw.dmarc),
        bimi: val(raw.bimi),

        // WWW Data
        www: val(raw.www), // "1.2.3.4" or "Active"
        www_a: val(raw.www_a),
        www_cname: val(raw.www_cname),
        www_ptr: val(raw.www_ptr),

        // Mail Data
        mail_a: val(raw.mail_a),
        mail_mx: val(raw.mail_mx),
        mail_ptr: val(raw.mail_ptr),
        mail_spf: val(raw.mail_spf),
        mail_dmarc: val(raw.mail_dmarc),

        // Risk & Enrichment
        risk_score: raw.risk_score ?? 0,
        risk_level: (raw.risk_level || "unknown").toLowerCase(),
        risk_reasons: Array.isArray(raw.risk_reasons) ? raw.risk_reasons.join(", ") : val(raw.risk_reasons),

        // Infrastructure
        isp: val(raw.isp),
        isp_country: val(raw.isp_country) || val(raw.country),
        mbp: val(raw.mbp),
        is_known_mbp: raw.is_known_mbp,

        // Security Flags
        is_phishing: !!raw.is_phishing,
        is_malware: !!raw.is_malware,
        is_parked: !!raw.is_parked,
        is_disposable: !!raw.is_disposable,
        is_new_domain: !!raw.is_new_domain,
        is_spf_block: !!raw.is_spf_block,
        is_dga_suspect: !!raw.is_dga_suspect,
        dga_sld_entropy: raw.dga_sld_entropy,

        // Certificates
        https_cert_ok: raw.https_cert_ok,
        https_cert_issuer: raw.https_cert_issuer,
        smtp_cert_ok: raw.smtp_cert_ok,

        // Meta
        _meta: raw._meta ? {
            timings: {
                total_ms: raw._meta.timings?.total_ms || 0,
                fetch_ms: raw._meta.timings?.fetch_ms || 0
            }
        } : undefined
    };
}
