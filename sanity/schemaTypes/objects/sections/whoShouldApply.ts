import { defineType, defineField } from "sanity";
import { Users, Layout, CreditCard, ChevronRight } from "lucide-react";

export default defineType({
    name: "section.whoShouldApply",
    title: "Section: Who Should Apply",
    type: "object",
    groups: [
        { name: "content", title: "Content" },
        { name: "settings", title: "Settings" },
    ],
    fields: [
        defineField({
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
            group: "settings",
        }),
        defineField({
            name: "title",
            title: "Section Title",
            type: "string",
            group: "content",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 2,
            group: "content",
        }),
        defineField({
            name: "layout",
            title: "Layout Style",
            type: "string",
            options: {
                list: [
                    { title: "Tabs View", value: "tabs" },
                    { title: "Cards View", value: "cards" },
                ],
                layout: "radio",
            },
            initialValue: "tabs",
            group: "settings",
        }),
        defineField({
            name: "items",
            title: "Target Segments",
            type: "array",
            group: "content",
            of: [
                {
                    type: "object",
                    name: "segment",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Segment Title",
                            type: "string",
                            description: "e.g., Enterprise Security Teams",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "badge",
                            title: "Badge Text",
                            type: "string",
                            description: "Optional badge above the title",
                        }),
                        defineField({
                            name: "idealFor",
                            title: "Ideal For (List)",
                            type: "array",
                            of: [{ type: "string" }],
                            description: "Bulleted list of who this is ideal for",
                        }),
                        defineField({
                            name: "deployFeatures",
                            title: "What You'll Deploy (List)",
                            type: "array",
                            of: [{ type: "string" }],
                            description: "Bulleted list of features/deployments",
                        }),
                        defineField({
                            name: "pricing",
                            title: "Pricing Details",
                            type: "object",
                            fields: [
                                defineField({
                                    name: "title",
                                    title: "Pricing Title",
                                    type: "string",
                                    initialValue: "Founding Pricing",
                                }),
                                defineField({
                                    name: "price",
                                    title: "Price",
                                    type: "string",
                                    description: "e.g., $3,000/month",
                                }),
                                defineField({
                                    name: "originalPrice",
                                    title: "Original Price / Note",
                                    type: "string",
                                    description: "e.g., standard will be $5,000",
                                }),
                                defineField({
                                    name: "savings",
                                    title: "Savings / Highlight",
                                    type: "string",
                                    description: "e.g., Save $48,000 over 2 years",
                                }),
                                defineField({
                                    name: "details",
                                    title: "Additional Details (List)",
                                    type: "array",
                                    of: [{ type: "string" }],
                                }),
                            ]
                        }),
                        defineField({
                            name: "cta",
                            title: "Call to Action",
                            type: "object",
                            fields: [
                                { name: "text", title: "Button Text", type: "string" },
                                { name: "url", title: "Button URL", type: "string" },
                            ]
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "pricing.price"
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: title,
                                subtitle: subtitle,
                                media: Users
                            }
                        }
                    }
                }
            ],
            validation: (r) => r.min(1).max(4),
        }),
    ],
    preview: {
        select: {
            title: "title",
            layout: "layout",
        },
        prepare({ title, layout }) {
            return {
                title: title || "Who Should Apply",
                subtitle: `Layout: ${layout || "tabs"}`,
                media: Layout,
            };
        },
    },
});
