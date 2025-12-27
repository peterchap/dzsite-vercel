export default {
    name: "section.falsePositiveReduction",
    title: "Section: False Positive Reduction",
    type: "object",
    fields: [
        { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
        { name: "subheadline", title: "Subheadline", type: "text", rows: 3 },
        {
            name: "metric",
            title: "Metric",
            type: "object",
            fields: [
                { name: "value", title: "Value (e.g. 99.9%)", type: "string" },
                { name: "label", title: "Label", type: "string" },
            ],
        },
        {
            name: "problemSnippet",
            title: "Problem Snippet",
            type: "object",
            fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "content", title: "Content", type: "text", rows: 3 },
            ],
        },
        {
            name: "solutionSnippet",
            title: "Datazag Solution Snippet",
            type: "object",
            fields: [
                { name: "title", title: "Title", type: "string" },
                { name: "content", title: "Content", type: "text", rows: 3 },
            ],
        },
        {
            name: "image",
            title: "Graphic / Image",
            type: "image",
            options: { hotspot: true },
        },
    ],
    preview: {
        select: { title: "headline" },
        prepare: ({ title }: any) => ({ title: title ?? "False Positive Reduction" }),
    },
};
