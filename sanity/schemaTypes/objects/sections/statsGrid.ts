export default {
    name: "section.statsGrid",
    title: "Section: Stats Grid",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        {
            name: "items",
            title: "Stats Items",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", title: "Icon (Lucide name)", type: "string" },
                        { name: "stat", title: "Stat (e.g. 310M+)", type: "string" },
                        { name: "label", title: "Label", type: "string" },
                        { name: "description", title: "Description", type: "text", rows: 3 },
                    ],
                },
            ],
            validation: (r: any) => r.min(1).max(4),
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Stats Grid" }),
    },
};
