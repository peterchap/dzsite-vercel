export default {
    name: "section.pricingOverview",
    title: "Section: Pricing Overview",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        {
            name: "tiers",
            title: "Pricing Tiers",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", title: "Tier Name", type: "string" },
                        { name: "price", title: "Price", type: "string" },
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
