export default {
    name: "section.featureHighlight",
    title: "Section: Feature Highlight",
    type: "object",
    fields: [
        { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
        { name: "title", title: "Title", type: "string" },
        { name: "content", title: "Content", type: "text", rows: 5 },
        {
            name: "approaches",
            title: "Our Approach",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "text", title: "Description", type: "string" },
                    ],
                },
            ],
        },
        { name: "visual", title: "Visual / Image", type: "image" },
        { name: "cta", title: "Call to Action", type: "cta" },
        {
            name: "layoutRatio",
            title: "Layout Ratio",
            type: "string",
            options: {
                list: [
                    { title: "Equal (50:50)", value: "50-50" },
                    { title: "Wider Content (60:40)", value: "60-40" },
                    { title: "Wider Visual (40:60)", value: "40-60" },
                ],
                layout: "radio",
            },
            initialValue: "50-50",
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Feature Highlight" }),
    },
};
