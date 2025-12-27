export default {
    name: "section.twoProductSplit",
    title: "Section: Two Product Split",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "subtitle", title: "Subtitle", type: "text", rows: 3 },
        {
            name: "left",
            title: "Left card (Primary product)",
            type: "object",
            fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
                { name: "text", title: "Text", type: "text", rows: 3 },
                { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }], validation: (r: any) => r.min(1) },
                { name: "cta", title: "CTA", type: "cta" },
            ],
        },
        {
            name: "right",
            title: "Right card (Secondary product)",
            type: "object",
            fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
                { name: "text", title: "Text", type: "text", rows: 3 },
                { name: "bullets", title: "Bullets", type: "array", of: [{ type: "string" }], validation: (r: any) => r.min(1) },
                { name: "cta", title: "CTA", type: "cta" },
            ],
        },
    ],
    preview: { select: { title: "title" }, prepare: ({ title }: any) => ({ title: title ?? "Two Product Split" }) },
};
