import { defineType, defineField } from "sanity";
import { Grid, ShieldAlert, ScanSearch, Info } from "lucide-react";

export default defineType({
    name: "section.detectionGrid",
    title: "Section: Detection Grid",
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
            title: "Section Title",
            type: "string",
            initialValue: "Phishing & Credential Harvesting",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "columns",
            title: "Grid Columns",
            type: "number",
            options: {
                list: [
                    { title: "2 Columns", value: 2 },
                    { title: "3 Columns", value: 3 },
                    { title: "4 Columns", value: 4 },
                ],
                layout: "radio",
            },
            initialValue: 2,
        }),
        defineField({
            name: "cards",
            title: "Detection Cards",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "detectionCard",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            description: "e.g., Phishing & Credential Harvesting",
                            validation: (r) => r.required(),
                        }),
                        defineField({
                            name: "whatWeDetect",
                            title: "What we detect",
                            type: "array",
                            description: "List of threats detected",
                            of: [{ type: "string" }],
                        }),
                        defineField({
                            name: "whyItMatters",
                            title: "Why it matters",
                            type: "text",
                            rows: 3,
                            description: "Explanation of importance",
                        }),
                        defineField({
                            name: "detectionMethods",
                            title: "Detection methods",
                            type: "array",
                            description: "List of technical methods",
                            of: [{ type: "string" }],
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            method1: "detectionMethods.0",
                        },
                        prepare({ title, method1 }) {
                            return {
                                title: title,
                                subtitle: method1 ? `Detects via: ${method1}...` : "No methods listed",
                                media: ShieldAlert,
                            };
                        },
                    },
                },
            ],
            validation: (r) => r.min(1),
        }),
    ],
    preview: {
        select: {
            title: "title",
            columns: "columns",
        },
        prepare({ title, columns }) {
            return {
                title: title || "Detection Grid",
                subtitle: `${columns || 2}-Column Grid`,
                media: Grid,
            };
        },
    },
});
