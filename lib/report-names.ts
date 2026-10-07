// Report product names, one place (must match datazag_intelligence
// healthreport/audiences.py). Single-domain names decided 2026-10-06; estate names
// decided 2026-10-07: Level A is the portfolio snapshot, Level B the estate report,
// sold in persona editions.

export const FREE_REPORT_NAME = "Domain Exposure & DNS Hygiene Report";
export const PAID_REPORT_NAME = "Attack Surface & SaaS Discovery Report";
export const ESTATE_SNAPSHOT_NAME = "Portfolio Exposure Snapshot";
export const ESTATE_REPORT_NAME = "Estate Attack Surface Report";
export const ESTATE_EDITIONS = [
  "Investor Edition",
  "Insurer Edition (single risk)",
  "Insurer Portfolio Edition",
  "MSSP Edition",
  "M&A Diligence Edition",
] as const;
