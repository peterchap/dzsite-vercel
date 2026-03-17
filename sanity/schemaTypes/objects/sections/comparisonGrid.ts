import { defineType, defineField } from "sanity";
import { Grid, Trello } from "lucide-react";

export default defineType({
  name: "section.comparisonGrid",
  title: "Section: Comparison Grid",
  type: "object",
  icon: Grid,
  fields: [
    defineField({
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r) =>
        r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    }),
    // -- Primary Header --
    defineField({
      name: "kicker",
      title: "Kicker / Tagline",
      type: "string",
      description: "Small uppercase text above the title (e.g. COMPARISON)",
      initialValue: "COMPARISON"
    }),
    defineField({
      name: "title",
      title: "Primary Title",
      type: "string",
      validation: (r) => r.required(),
      initialValue: "From Dashboards to Data",
    }),
    defineField({
      name: "subtitle",
      title: "Primary Subtitle",
      type: "string",
      initialValue: "Your SOC needs intelligence — not another interface.",
    }),
    defineField({
      name: "description",
      title: "Primary Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Center", value: "center" },
            { title: "Right", value: "right" },
            { title: "Justify", value: "justify" }
          ]
        }
      ],
    }),
    defineField({
      name: "alignment",
      title: "Content Alignment",
      type: "string",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "left",
    }),

    // -- Table Configuration --
    defineField({
      name: "tableTitle",
      title: "Table Title",
      type: "string",
      initialValue: "The Old Way vs The DaaS Way",
    }),
    defineField({
      name: "column1Title",
      title: "Column 1 Title (Left)",
      type: "string",
      initialValue: "The Old Way (SaaS)",
    }),
    defineField({
      name: "column2Title",
      title: "Column 2 Title (Right)",
      type: "string",
      initialValue: "The Datazag Way (DaaS)",
    }),
    defineField({
      name: "rows",
      title: "Comparison Rows",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "row",
          fields: [
            defineField({
              name: "col1",
              title: "Column 1 Content",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "col2",
              title: "Column 2 Content",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { col1: "col1", col2: "col2" },
            prepare({ col1, col2 }) {
              return {
                title: `${col1 || ""} vs ${col2 || ""}`,
              };
            },
          },
        }),
      ],
    }),

    // -- Secondary Content (Below Table) --
    defineField({
      name: "secondarySubtitle",
      title: "Secondary Subtitle (Why This Matters)",
      type: "string",
      initialValue: "Why This Matters"
    }),
    defineField({
      name: "secondaryDescription",
      title: "Secondary Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Center", value: "center" },
            { title: "Right", value: "right" },
            { title: "Justify", value: "justify" }
          ]
        }
      ],
    }),

    // -- Footer --
    defineField({
      name: "footer",
      title: "Footer Quote/Text",
      type: "string",
      initialValue: "Intelligence should integrate with your stack — not compete with it.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Comparison Grid",
        media: Trello,
      };
    },
  },
});
