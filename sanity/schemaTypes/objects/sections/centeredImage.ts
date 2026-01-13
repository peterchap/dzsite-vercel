export default {
    name: "section.centeredImage",
    title: "Section: Centered Image",
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
        { name: "kicker", title: "Kicker (optional)", type: "string" },
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 3 },
        {
            name: "mainImage",
            title: "Main Image (PNG)",
            type: "image",
            options: { hotspot: true },
            validation: (r: any) => r.required(),
        },
        {
            name: "footer",
            title: "Footer Text (optional)",
            type: "text",
            rows: 2,
        },
    ],
    preview: {
        select: { title: "title", media: "mainImage" },
        prepare({ title, media }: any) {
            return { title: title ?? "Centered Image", subtitle: "Image section", media };
        },
    },
};
