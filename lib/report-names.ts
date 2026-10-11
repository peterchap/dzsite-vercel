// Report product names, one place (must match datazag_intelligence
// healthreport/audiences.py and the product names in the shared pricing config).
// Names from the pricing ladder (PC, 2026-10-08). Editions are sold on the Portfolio
// report (investor, insurer portfolio, MSSP) or the Organization estate report.

export const FREE_REPORT_NAME = "Free exposure snapshot";
export const PAID_REPORT_NAME = "Domain infrastructure report";
export const ESTATE_SNAPSHOT_NAME = "Portfolio report";
export const ESTATE_REPORT_NAME = "Organization estate report";
export const ESTATE_EDITIONS = [
  "Investor Edition",
  "Insurer Edition (single risk)",
  "Insurer Portfolio Edition",
  "MSSP Edition",
  "M&A Diligence Edition",
] as const;
