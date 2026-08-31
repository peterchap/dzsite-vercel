export default {
    name: "dataset.fact",
    title: "Fact",
    type: "object",
    fields: [
        {
            name: "label",
            title: "Label",
            type: "string",
            description: "e.g. Coverage / Refresh / License",
            validation: (r: any) => r.required(),
        },
        {
            name: "value",
            title: "Value",
            type: "string",
            description:
                "Supports live-figure tokens: {{DOMAINS}}, {{IPV4}}, {{ASNS}}, {{IPS_HOSTING}}. Never type a corpus figure by hand.",
            validation: (r: any) => r.required(),
        },
        {
            name: "note",
            title: "Qualifier",
            type: "string",
            description:
                "Short line under the value saying what the figure covers — e.g. whether it is complete, and complete of WHAT. A bare count leaves a buyer guessing whether anything is missing. State the population the figure is complete against; do not imply completeness the data does not have.",
            validation: (r: any) => r.max(120),
        },
    ],
    preview: {
        select: { title: "label", subtitle: "value" },
    },
};
