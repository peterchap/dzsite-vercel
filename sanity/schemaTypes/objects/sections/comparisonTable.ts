import { defineType, defineField } from "sanity";
import { Table, Check } from "lucide-react";

export default defineType({
    name: "section.comparisonTable",
    title: "Section: Comparison Table",
    type: "object",
    fields: [
        defineField({
            name: "anchor",
            title: "Section Anchor",
            type: "string",
            description: "Lowercase letters, numbers, dashes; unique per page",
            validation: (r) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (r) => r.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "columns",
            title: "Comparison Columns",
            type: "array",
            of: [
                defineField({
                    type: "object",
                    name: "column",
                    fields: [
                        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
                        defineField({
                            name: "isHighlight",
                            title: "Highlight Column?",
                            type: "boolean",
                            initialValue: false,
                            description: "Emphasize this column (e.g. for 'Recommended')"
                        }),
                        defineField({
                            name: "features",
                            title: "Features",
                            type: "array",
                            of: [{ type: "string" }],
                        }),
                    ],
                    preview: {
                        select: { title: "heading", isHighlight: "isHighlight" },
                        prepare({ title, isHighlight }) {
                            return {
                                title: title,
                                subtitle: isHighlight ? "Highlighted" : "Standard",
                            };
                        },
                    },
                }),
            ],
            validation: (r) => r.min(2).max(4),
        }),
        defineField({ name: "footer", title: "Footer Text", type: "string" }),
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }) {
            return {
                title: title || "Comparison Table",
                media: Table,
            };
        },
    },
});
