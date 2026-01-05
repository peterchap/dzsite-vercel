export default {
    name: "cta",
    title: "CTA",
    type: "object",
    fields: [
        { name: "label", title: "Label", type: "string" },
        {
            name: "href",
            title: "Link (internal or external)",
            type: "string",
            validation: (Rule: any) => Rule.custom((value: any) => {
                if (!value) return true;
                const v = String(value).trim();
                if (!v) return true;
                if (v.startsWith('/')) return true;
                if (/^(https?:\/\/|mailto:|tel:)/i.test(v)) return true;
                return 'Enter a relative path like /enterprise or a full URL like https://example.com';
            })
        },
        { name: "pageRef", title: "Internal Page", type: "reference", to: [{ type: "page" }, { type: "useCase" }, { type: "pricingPage" }, { type: "blogPost" }] },
        {
            name: "externalHref",
            title: "Alternate link (internal or external)",
            type: "string",
            validation: (Rule: any) => Rule.custom((value: any) => {
                if (!value) return true;
                const v = String(value).trim();
                if (!v) return true;
                if (v.startsWith('/')) return true;
                if (/^(https?:\/\/|mailto:|tel:)/i.test(v)) return true;
                return 'Enter a relative path like /enterprise or a full URL like https://example.com';
            })
        },
        {
            name: "anchor",
            title: "Section Anchor (optional)",
            type: "string",
            description: "Lowercase letters, numbers, dashes; appended as #anchor",
            validation: (Rule: any) => Rule.regex(/^[a-z0-9-]+$/).warning('Use lowercase letters, numbers, dashes'),
        },
        {
            name: "variant",
            title: "Variant",
            type: "string",
            options: { list: ["primary", "secondary", "ghost"], layout: "radio" },
            initialValue: "primary",
        },
    ],
    validation: (Rule: any) => Rule.custom((val: any) => {
        if (!val) return true;
        const hasLink = val.pageRef || val.href || val.externalHref;
        const hasLabel = !!val.label;

        if (!hasLink && !hasLabel) return true; // Both empty is fine
        if (hasLink && !hasLabel) return "Label is required when a link is provided";
        if (hasLabel && !hasLink) return "A link (Internal Page or External URL) is required when a label is provided";

        return true;
    }),
};
