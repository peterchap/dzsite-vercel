export default {
    name: "section.faqList",
    title: "Section: FAQ List",
    type: "object",
    fields: [
          { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        {
            name: "items",
            title: "FAQs",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "faqItem",
                    fields: [
                        { name: "question", title: "Question", type: "string", validation: (r: any) => r.required() },
                        { name: "answer", title: "Answer", type: "text", rows: 4, validation: (r: any) => r.required() },
                    ],
                },
            ],
            validation: (r: any) => r.min(1),
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "FAQ List" }),
    },
};
