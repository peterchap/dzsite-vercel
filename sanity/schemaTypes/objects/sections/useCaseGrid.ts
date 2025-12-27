export default {
    name: "section.useCaseGrid",
    title: "Section: Use Case Grid (Challenge/Solution)",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "useCases",
            title: "Use Cases",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", title: "Icon (Lucide name)", type: "string" },
                        { name: "title", title: "Title", type: "string" },
                        { name: "challenge", title: "Challenge", type: "text", rows: 2 },
                        { name: "solution", title: "Solution", type: "text", rows: 2 },
                        { name: "result", title: "Result (Quote/Metric)", type: "string" },
                    ],
                },
            ],
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Use Case Grid" }),
    },
};
