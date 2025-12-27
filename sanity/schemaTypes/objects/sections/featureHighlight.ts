export default {
    name: "section.featureHighlight",
    title: "Section: Feature Highlight",
    type: "object",
    fields: [
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
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Feature Highlight" }),
    },
};
