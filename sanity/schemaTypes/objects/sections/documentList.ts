export default {
    name: "section.documentList",
    title: "Section: Document List",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "documents",
            title: "Documents",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
                        { name: "description", title: "Description", type: "text", rows: 2 },
                        { name: "cta", title: "Link", type: "cta" },
                    ],
                },
            ],
            validation: (r: any) => r.min(1),
        },
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }: any) {
            return { title: title ?? "Document List" };
        },
    },
};
