export default {
    name: "section.jsonExample",
    title: "Section: Code Example",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        { name: "intro", title: "Intro", type: "text", rows: 3 },
        {
            name: "language",
            title: "Language",
            type: "string",
            options: {
                list: [
                    { title: "JSON", value: "json" },
                    { title: "SQL", value: "sql" },
                    { title: "Python", value: "python" },
                ],
            },
            initialValue: "json",
            validation: (r: any) => r.required(),
        },
        {
            name: "code",
            title: "Code snippet",
            type: "text",
            rows: 16,
            description: "Paste your code snippet here.",
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
    preview: {
        select: { title: "title", language: "language" },
        prepare: ({ title, language }: any) => ({ title: `${title ?? "Code Example"} (${language?.toUpperCase() ?? "JSON"})` })
    },
};
