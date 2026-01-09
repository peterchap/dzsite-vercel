export default {
    name: "section.featureList",
    title: "Section: Feature List",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        { name: "footer", title: "Section Footer", type: "text", rows: 2 },
        {
            name: "groups",
            title: "Feature Groups",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Group Title", type: "string" },
                        { name: "description", title: "Group Description", type: "text", rows: 2 },
                        {
                            name: "features",
                            title: "Features",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Feature List" }),
    },
};
