export default {
    name: "section.jsonExample",
    title: "Section: JSON Example",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        { name: "intro", title: "Intro", type: "text", rows: 3 },
        {
            name: "json",
            title: "JSON payload",
            type: "text",
            rows: 16,
            description: "Paste JSON. Rendering layer can pretty-print.",
            validation: (r: any) => r.required(),
        },
        {
            name: "callouts",
            title: "Callouts",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "callout",
                    fields: [
                        { name: "label", title: "Label", type: "string", validation: (r: any) => r.required() },
                        { name: "text", title: "Text", type: "text", rows: 2 },
                    ],
                },
            ],
        },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }: any) => ({ title: title ?? "JSON Example" }) },
};
