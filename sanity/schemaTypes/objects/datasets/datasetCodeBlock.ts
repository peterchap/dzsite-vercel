export default {
    name: "dataset.codeBlock",
    title: "Code Example",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
            description: "One or two lines explaining what this snippet does and when to use it.",
        },
        {
            name: "language",
            title: "Language",
            type: "string",
            options: {
                list: [
                    { title: "SQL", value: "sql" },
                    { title: "JSON", value: "json" },
                    { title: "Python", value: "python" },
                ],
                layout: "radio",
            },
            initialValue: "sql",
            validation: (r: any) => r.required(),
        },
        {
            name: "code",
            title: "Code",
            type: "text",
            rows: 10,
            description: "Pasted verbatim. Buyers copy this — make sure it runs.",
            validation: (r: any) => r.required(),
        },
        {
            name: "note",
            title: "Note",
            type: "text",
            rows: 2,
            description: "Optional footnote shown under the snippet.",
        },
    ],
    preview: {
        select: { title: "title", subtitle: "language" },
    },
};
