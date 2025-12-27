export default {
    name: "section.featureList",
    title: "Section: Feature List",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "groups",
            title: "Feature Groups",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Group Title", type: "string" },
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
