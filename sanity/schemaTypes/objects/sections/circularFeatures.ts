export default {
    name: "section.circularFeatures",
    title: "Section: Circular Features (6 Items)",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "kicker", title: "Kicker", type: "string" },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "hub",
            title: "Central Hub",
            type: "object",
            fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "icon", title: "Icon (Lucide name)", type: "string" },
            ],
        },
        {
            name: "items",
            title: "Circular Items (Exactly 6)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Title", type: "string" },
                        { name: "icon", title: "Icon (Lucide name)", type: "string" },
                        {
                            name: "features",
                            title: "Bullet Points",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                    ],
                },
            ],
            validation: (r: any) => r.length(6).error("This section requires exactly 6 items for the circular layout."),
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Circular Features", subtitle: "6 items in a circle" }),
    },
};
