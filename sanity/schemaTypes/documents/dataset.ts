/**
 * DATASET DOCUMENTATION PAGE (/datasets/<slug>)
 *
 * These documents back the public documentation URL submitted with each
 * cloud-marketplace listing (Snowflake and friends). Two rules follow from
 * that and are enforced in the schema, not just by convention:
 *
 *  1. DURABLE URL — a listing is long-lived and points at this path. Changing
 *     a slug after submission breaks the listing's documentation link. The
 *     slug field says so; the IP-to-ASN page additionally has a committed
 *     fallback in lib/datasets/fallback.ts so the URL survives even if this
 *     document is unpublished by accident.
 *
 *  2. NO HAND-TYPED FIGURES — corpus and coverage numbers come from the
 *     canonical projection in lib/site-stats.ts. Editors write tokens
 *     ({{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}) and the renderer
 *     substitutes the live value, so a doc page cannot drift away from the
 *     rest of the site or from the marketplace listing.
 *
 * Describe ONLY shipped columns. No aspirational schema.
 */
export default {
    name: "dataset",
    title: "Dataset Page",
    type: "document",
    groups: [
        { name: "overview", title: "Overview", default: true },
        { name: "schema", title: "Schema" },
        { name: "usage", title: "Join guide" },
        { name: "method", title: "Methodology" },
        { name: "meta", title: "Listing & SEO" },
    ],
    fields: [
        // ---- Overview -------------------------------------------------
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "overview",
            description: "e.g. IP to ASN Intelligence — with Infrastructure Classification",
            validation: (r: any) => r.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "overview",
            options: { source: "title", maxLength: 96 },
            description:
                "DURABLE URL. This path is submitted to cloud marketplaces as the dataset's documentation link. Do not change it after a listing goes live.",
            validation: (r: any) => r.required(),
        },
        {
            name: "eyebrow",
            title: "Eyebrow",
            type: "string",
            group: "overview",
            description: "Small label above the title, e.g. 'Dataset Documentation - Free'",
        },
        {
            name: "summary",
            title: "One-line summary",
            type: "text",
            rows: 2,
            group: "overview",
            description: "Used on the /datasets index and as the fallback meta description.",
            validation: (r: any) => r.required(),
        },
        {
            name: "overview",
            title: "Overview",
            type: "array",
            of: [{ type: "text", rows: 4 }],
            group: "overview",
            description:
                "One entry per paragraph. Supports live-figure tokens: {{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}. Never type a corpus figure by hand — it will drift.",
            validation: (r: any) => r.required().min(1),
        },
        {
            name: "facts",
            title: "Fact strip",
            type: "array",
            of: [{ type: "dataset.fact" }],
            group: "overview",
            description: "Coverage / refresh / license / build provenance shown under the hero.",
        },

        // ---- Schema ---------------------------------------------------
        {
            name: "tableName",
            title: "Table name",
            type: "string",
            group: "schema",
            description: "The table as it appears in the share, e.g. DATAZAG_IP_ASN",
        },
        {
            name: "columns",
            title: "Schema reference",
            type: "array",
            of: [{ type: "dataset.column" }],
            group: "schema",
            description: "SHIPPED COLUMNS ONLY. Do not document a column that is not in the share.",
            validation: (r: any) => r.required().min(1),
        },
        {
            name: "schemaNote",
            title: "Schema note",
            type: "text",
            rows: 3,
            group: "schema",
            description: "Optional note under the table, e.g. naming-convention compatibility.",
        },

        // ---- Join guide -----------------------------------------------
        {
            name: "joinGuideTitle",
            title: "Join guide heading",
            type: "string",
            group: "usage",
            initialValue: "Join guide",
        },
        {
            name: "joinGuideIntro",
            title: "Join guide intro",
            type: "text",
            rows: 3,
            group: "usage",
        },
        {
            name: "codeExamples",
            title: "Code examples",
            type: "array",
            of: [{ type: "dataset.codeBlock" }],
            group: "usage",
            description: "The section buyers copy from. Every snippet must actually run.",
        },

        // ---- Methodology ----------------------------------------------
        {
            name: "methodology",
            title: "Methodology & caveats",
            type: "array",
            of: [{ type: "dataset.note" }],
            group: "method",
            description: "How derived fields are produced, and where they are deliberately coarse.",
        },
        {
            name: "relatedDatasets",
            title: "Related datasets",
            type: "array",
            of: [{ type: "reference", to: [{ type: "dataset" }] }],
            group: "method",
            description: "Shown as 'Related datasets'. Use for the paid-upgrade pointer.",
        },
        {
            name: "changelog",
            title: "Changelog",
            type: "array",
            of: [{ type: "dataset.changelogEntry" }],
            group: "method",
            description:
                "Dated entries. At least one — it is what makes the daily-refresh claim visibly real.",
        },

        // ---- Listing & SEO ---------------------------------------------
        {
            name: "listingUrl",
            title: "Marketplace listing URL",
            type: "url",
            group: "meta",
            description: "Public listing this page documents. Rendered as the primary CTA.",
        },
        {
            name: "listingLabel",
            title: "Marketplace CTA label",
            type: "string",
            group: "meta",
            initialValue: "Get it on Snowflake Marketplace",
        },
        {
            name: "contactNote",
            title: "Contact note",
            type: "text",
            rows: 2,
            group: "meta",
            description: "Shown beside the CTA, e.g. how to ask for another delivery mode.",
        },
        {
            name: "order",
            title: "Index order",
            type: "number",
            group: "meta",
            description: "Lower sorts first on /datasets. Ties fall back to title.",
            initialValue: 100,
        },
        { name: "seo", title: "SEO", type: "seo", group: "meta" },
    ],
    orderings: [
        {
            title: "Index order",
            name: "indexOrder",
            by: [
                { field: "order", direction: "asc" },
                { field: "title", direction: "asc" },
            ],
        },
    ],
    preview: {
        select: { title: "title", slug: "slug.current" },
        prepare({ title, slug }: any) {
            return {
                title,
                subtitle: slug ? `/datasets/${slug}` : "No slug — page will not resolve",
            };
        },
    },
};
