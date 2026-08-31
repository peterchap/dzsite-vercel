export default {
    name: "dataset.note",
    title: "Note",
    type: "object",
    fields: [
        { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
        {
            name: "body",
            title: "Body",
            type: "text",
            rows: 4,
            description:
                "Supports live-figure tokens: {{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}. Never type a figure by hand.",
            validation: (r: any) => r.required(),
        },
        {
            name: "tone",
            title: "Tone",
            type: "string",
            options: {
                list: [
                    { title: "Neutral", value: "neutral" },
                    { title: "Caveat", value: "caveat" },
                ],
                layout: "radio",
            },
            initialValue: "neutral",
        },
    ],
    preview: {
        select: { title: "title", subtitle: "tone" },
    },
};
