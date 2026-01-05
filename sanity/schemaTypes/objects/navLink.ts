import { defineType, defineField } from "sanity";

export default defineType({
    name: "navLink",
    title: "Navigation link",
    type: "object",
    fields: [
        defineField({ name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() }),
        defineField({
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
        }),
        defineField({ name: "pageRef", title: "Internal Page", type: "reference", to: [{ type: "page" }, { type: "useCase" }, { type: "pricingPage" }, { type: "blogPost" }] }),
        defineField({
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
        }),
        defineField({
            name: "anchor",
            title: "Section Anchor (optional)",
            type: "string",
            description: "Lowercase letters, numbers, dashes; appended as #anchor",
            validation: (Rule: any) => Rule.regex(/^[a-z0-9-]+$/).warning('Use lowercase letters, numbers, dashes'),
        }),
        defineField({
            name: "children",
            title: "Sub-links",
            type: "array",
            of: [{ type: "navLink" }],
        }),
    ],
    validation: (Rule: any) => Rule.custom((val: any) => {
        if (!val) return true;
        const hasLink = !!(val.pageRef || val.href || val.externalHref);
        const hasChildren = !!(val.children && val.children.length > 0);

        if (hasLink || hasChildren) return true;
        return "Warning: This link has no destination URL and no sub-links.";
    }).warning(),
    preview: {
        select: {
            title: "label",
            href: "href",
            children: "children",
        },
        prepare({ title, href, children }: any) {
            const subtitle = children?.length > 0
                ? `Dropdown (${children.length} items)`
                : href || "No link set";
            return {
                title: title || "New Link",
                subtitle: subtitle,
            };
        },
    },
});
