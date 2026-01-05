export default {
    name: "section.howItWorksSteps",
    title: "Section: How It Works (Steps)",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "steps",
            title: "Steps",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "step",
                    fields: [
                        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
                        { name: "text", title: "Text", type: "text", rows: 3 },
                    ],
                },
            ],
            validation: (r: any) => r.min(2),
        },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }: any) => ({ title: title ?? "How It Works" }) },
};
