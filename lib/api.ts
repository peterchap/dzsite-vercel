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

    const apiUrl = `https://api.datazag.com/api/${domain}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}
