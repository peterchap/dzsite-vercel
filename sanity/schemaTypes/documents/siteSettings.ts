import { defineType, defineField } from 'sanity'

export default defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Site name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),
        defineField({
            name: "primaryCta",
            title: "Primary CTA",
            type: "cta",
        }),
        defineField({
            name: "secondaryCta",
            title: "Secondary CTA",
            type: "cta",
        }),
        defineField({
            name: "portalCta",
            title: "Portal Button (Right-side)",
            type: "cta",
        }),
        defineField({
            name: "navLinks",
            title: "Navigation links",
            type: "array",
            of: [{ type: "navLink" }],
        }),

        defineField({
            name: "footerAbout",
            title: "Footer About (short)",
            type: "text",
            rows: 3,
            }),

        defineField({
        name: "productLinks",
        title: "Footer: Product links",
        type: "array",
        of: [{ type: "navLink" }],
        }),

        defineField({
        name: "trustLinks",
        title: "Footer: Trust & Security links",
        type: "array",
        of: [{ type: "navLink" }],
        }),

        defineField({
        name: "companyLinks",
        title: "Footer: Company links",
        type: "array",
        of: [{ type: "navLink" }],
        }),

        defineField({
        name: "securityEmail",
        title: "Security contact email",
        type: "string",
        }),

        defineField({
        name: "copyright",
        title: "Footer copyright line",
        type: "string",
        }),

        defineField({
            name: "footerLinks",
            title: "Footer links",
            type: "array",
            of: [{ type: "navLink" }],
        }),
        defineField({
            name: "social",
            title: "Social links",
            type: "object",
            fields: [
                { name: "linkedin", title: "LinkedIn", type: "string" },
                { name: "x", title: "X / Twitter", type: "string" },
                { name: "github", title: "GitHub", type: "string" },
            ],
        }),
        defineField({
            name: "seo",
            title: "Default SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});
