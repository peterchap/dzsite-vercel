export default {
    name: "section.pricingTable",
    title: "Section: Pricing Table (Comparison)",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "string" },
        {
            name: "tiers",
            title: "Tiers (Headers)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", title: "Name", type: "string" },
                        { name: "subtitle", title: "Description", type: "string" },
                        { name: "priceLabel", title: "Price/Model Label", type: "string" },
                        { name: "cta", title: "CTA", type: "cta" },
                    ]
                }
            ],
            validation: (r: any) => r.max(3)
        },
        {
            name: "sections",
            title: "Feature Sections (Groups)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Section Title", type: "string" },
                        {
                            name: "rows",
                            title: "Rows",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    fields: [
                                        { name: "label", title: "Feature Label (optional)", type: "string" },
                                        {
                                            name: "cells",
                                            title: "Tier Content",
                                            description: "Content for each tier (1, 2, 3)",
                                            type: "array",
                                            of: [{ type: "string" }],
                                            validation: (r: any) => r.max(3)
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Pricing Table", subtitle: "Comparison View" }),
    },
};
