export default {
    name: "section.pricingOverview",
    title: "Section: Pricing Overview",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        { name: "footer", title: "Section Footer", type: "text", rows: 2 },
        {
            name: "tiers",
            title: "Pricing Tiers",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", title: "Tier Name", type: "string" },
                        { name: "priceInCents", title: "Price (in USD Cents)", type: "number", description: "Base price in USD cents. e.g. 9900 for $99. Leave empty for 'Custom' or free tiers." },
                        { name: "price", title: "Price Label (Static)", type: "string", description: "Fallback if cents not provided, or for text like 'Custom' or 'Free'" },
                        { name: "subtitle", title: "Subtitle", type: "string" },
                        {
                            name: "features",
                            title: "Features",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        { name: "cta", title: "CTA", type: "cta" },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Pricing Overview" }),
    },
};
