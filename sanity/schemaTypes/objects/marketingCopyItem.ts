export default {
    name: "marketingCopyItem",
    title: "Copy item",
    type: "object",
    fields: [
        {
            name: "itemKey",
            title: "Item key",
            type: "string",
            description: "Stable key used by the React page to match this copy to the right card, row or step.",
            validation: (r: any) => r.required(),
        },
        { name: "title", title: "Title", type: "string" },
        { name: "text", title: "Text", type: "text", rows: 4 },
        { name: "trigger", title: "Trigger", type: "text", rows: 3 },
        { name: "delivered", title: "Delivered", type: "text", rows: 3 },
        { name: "status", title: "Status", type: "string" },
        { name: "href", title: "Link URL", type: "string" },
        { name: "cta", title: "CTA label", type: "string" },
        { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
        { name: "points", title: "Bullet points", type: "array", of: [{ type: "string" }] },
    ],
    preview: {
        select: { title: "title", subtitle: "itemKey" },
        prepare({ title, subtitle }: any) {
            return { title: title || subtitle || "Copy item", subtitle };
        },
    },
};
