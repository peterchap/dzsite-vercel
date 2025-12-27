export default {
    name: "navLink",
    title: "Navigation link",
    type: "object",
    fields: [
        { name: "label", title: "Label", type: "string", validation: (Rule: any) => Rule.required() },
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
    ],
    validation: (Rule: any) => Rule.custom((val: any) => {
        if (!val) return true;
        if (val.pageRef || val.href || val.externalHref) return true;
        return "Provide Internal Page or an External URL";
    }),
};
