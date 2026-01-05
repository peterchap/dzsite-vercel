export default {
    name: "section.mediaFeature",
    title: "Section: Media Feature (Text + Image)",
    type: "object",
    fields: [
        {
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes")
        },
        {
            name: "imagePosition",
            title: "Image Position",
            type: "string",
            options: { list: ["left", "right", "bottom"] },
            initialValue: "right"
        },
        {
            name: "imageStyle",
            title: "Image Style",
            type: "string",
            options: {
                list: [
                    { title: "Card (White background, shadow)", value: "card" },
                    { title: "Plain (Transparent background)", value: "plain" },
                ],
            },
            initialValue: "card"
        },
        {
            name: "imageFit",
            title: "Image Fit",
            type: "string",
            options: {
                list: [
                    { title: "Cover (Fill the box, may crop edges)", value: "cover" },
                    { title: "Contain (Show full image, no cropping)", value: "contain" },
                ],
            },
            initialValue: "cover"
        },
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        { name: "subtitle", title: "Subtitle / Description", type: "text", rows: 4 },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            validation: (r: any) => r.required()
        },
        { name: "cta", title: "CTA (optional)", type: "cta" },
    ],
    preview: {
        select: { title: "title", media: "image" },
        prepare: ({ title, media }: any) => ({
            title: title ?? "Media Feature",
            subtitle: "Text + Image Split",
            media
        }),
    },
};
