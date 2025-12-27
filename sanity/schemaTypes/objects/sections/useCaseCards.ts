export default {
    name: "section.useCaseCards",
    title: "Section: Use Case Cards",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "cards",
            title: "Cards",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "useCaseCard",
                    fields: [
                        { name: "audience", title: "Audience", type: "string", validation: (r: any) => r.required() },
                        { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
                        { name: "text", title: "Text", type: "text", rows: 3 },
                        { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }], validation: (r: any) => r.min(1) },
                        { name: "cta", title: "CTA", type: "cta" },
                    ],
                },
            ],
            validation: (r: any) => r.min(1),
        },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }: any) => ({ title: title ?? "Use Case Cards" }) },
};
