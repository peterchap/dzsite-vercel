export default {
    name: "section.threeColumnDetailed",
    title: "Section: Detailed Columns (1-4)",
    type: "object",
    fields: [
        {
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r: any) =>
                r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
        },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "columns",
            title: "Columns",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "top",
                            title: "Top Section",
                            type: "object",
                            fields: [
                                { name: "title", title: "Title", type: "string" },
                                { name: "subtitle", title: "Subtitle", type: "string" },
                            ],
                        },
                        {
                            name: "middle",
                            title: "Middle Section",
                            type: "object",
                            fields: [
                                { name: "heading", title: "Heading", type: "string" },
                                {
                                    name: "features",
                                    title: "Features with Icons",
                                    type: "array",
                                    of: [
                                        {
                                            type: "object",
                                            fields: [
                                                { name: "text", title: "Text", type: "string" },
                                                { name: "iconEmoji", title: "Icon (emoji)", type: "string" },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "bottom",
                            title: "Bottom Section (Outcome Box)",
                            type: "object",
                            fields: [
                                { name: "heading", title: "Heading", type: "string" },
                                {
                                    name: "outcomes",
                                    title: "Outcome Bullets",
                                    type: "array",
                                    of: [{ type: "string" }],
                                },
                                { name: "footer", title: "Centered Footer", type: "string" },
                            ],
                        },
                        { name: "cta", title: "Column CTA", type: "cta" },
                    ],
                },
            ],
            validation: (r: any) => r.min(1).max(4),
        },
    ],
    preview: {
        select: { title: "columns.0.top.title" },
        prepare: ({ title }: any) => ({ title: title ? `Three Column Detailed: ${title}` : "Three Column Detailed" }),
    },
};
