export interface DomainData {
    domain: string;
    mx_domain?: string;
    is_known_mbp?: boolean;
    mx_status?: string;
    a?: string;
    is_spf_block?: boolean;
    is_phishing?: boolean;
    is_disposable?: boolean;
    is_parked?: boolean;
    is_malware?: boolean;
    is_new_domain?: boolean;
    top_domain_rank?: number;
    mbp?: string;
    spf?: string;
    dmarc?: string;
    isp?: string;
    isp_country?: string;
    ns?: string;
    ptr?: string;
    cname?: string;
    mx?: string;
    www?: string;
    www_ptr?: string;
    www_cname?: string;
    mail_a?: string;
    mail_ptr?: string;
    mail_mx?: string;
    mail_spf?: string;
    mail_dmarc?: string;
    decision_flag?: boolean;
}

const MOCK_DATA: DomainData = {
    domain: "mock-sample.com",
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
