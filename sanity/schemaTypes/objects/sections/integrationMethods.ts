export default {
    name: "section.integrationMethods",
    title: "Section: Integration Methods",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Section Title", type: "string" },
        {
            name: "methods",
            title: "Integration Methods",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", title: "Icon", type: "string" },
                        { name: "headline", title: "Headline", type: "string" },
                        {
                            name: "benefits",
                            title: "Benefits",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        {
                            name: "listTitle",
                            title: "List Title (e.g. Use Cases, Platforms)",
                            type: "string",
                        },
                        {
                            name: "listItems",
                            title: "List Items",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        {
                            name: "codeSnippet",
                            title: "Code Snippet",
                            type: "object",
                            fields: [
                                { name: "language", title: "Language", type: "string" },
                                { name: "code", title: "Code", type: "text", rows: 10 },
                            ],
                        },
                    ],
                },
            ],
            validation: (r: any) => r.length(2),
        },
        { name: "diagram", title: "Integration Diagram", type: "image" },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Integration Methods" }),
    },
};
