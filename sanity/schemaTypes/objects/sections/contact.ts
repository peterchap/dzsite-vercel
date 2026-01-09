export default {
    name: "section.contact",
    title: "Section: Contact",
    type: "object",
    fields: [
        {
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r: any) =>
                r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
        },
        { name: "title", title: "Title", type: "string", initialValue: "Get in Touch" },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 3,
            initialValue:
                "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        },
        {
            name: "contactInfo",
            title: "Contact Info (Left Column)",
            type: "object",
            fields: [
                { name: "email", title: "Email", type: "string" },
                { name: "phone", title: "Phone", type: "string" },
                { name: "office", title: "Office Address", type: "text", rows: 3 },
                { name: "image", title: "Office Image", type: "image", options: { hotspot: true } },
            ],
        },
    ],
    preview: {
        select: { title: "title" },
        prepare: ({ title }: any) => ({ title: title ?? "Contact Section" }),
    },
};
