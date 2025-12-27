export default {
    name: "section.dataSources",
    title: "Section: Data Sources",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "sources",
            title: "Sources",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", title: "Icon (Lucide name)", type: "string" },
                        { name: "title", title: "Title", type: "string" },
                        { name: "description", title: "Description", type: "text", rows: 3 },
                    ],
                },
            ],
            validation: (r: any) => r.min(1),
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Data Sources" }),
    },
};
