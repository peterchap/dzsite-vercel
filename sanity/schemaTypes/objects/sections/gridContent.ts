export default {
  name: "section.gridContent",
  title: "Section: Grid Content",
  type: "object",
  fields: [
    {
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r: any) =>
        r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    },
    {
      name: "title",
      title: "Title",
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
          ],
        },
      ],
      validation: (r: any) => r.required(),
    },
    {
      name: "subtitle",
      title: "Sub-header",
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
          ],
        },
      ],
    },
    {
      name: "columns",
      title: "Grid Columns",
      type: "number",
      options: {
        list: [
          { title: "2 Columns", value: 2 },
          { title: "3 Columns", value: 3 },
          { title: "4 Columns", value: 4 },
        ],
      },
      initialValue: 3,
      validation: (r: any) => r.required(),
    },
    {
      name: "items",
      title: "Grid Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "gridItem",
          title: "Grid Item",
          fields: [
            {
              name: "eyebrow",
              title: "Eyebrow",
              type: "object",
              fields: [
                {
                  name: "text",
                  title: "Text",
                  type: "string",
                  validation: (r: any) => r.required(),
                },
                {
                  name: "color",
                  title: "Text Color",
                  type: "string",
                  options: {
                    list: [
                      { title: "Primary", value: "primary" },
                      { title: "Secondary", value: "secondary" },
                      { title: "Accent", value: "accent" },
                      { title: "Success", value: "success" },
                      { title: "Warning", value: "warning" },
                      { title: "Error", value: "error" },
                      { title: "Gray", value: "gray" },
                      { title: "Black", value: "black" },
                    ],
                  },
                  initialValue: "primary",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  description: "Icon name or emoji (e.g., 'check', '🚀', 'star')",
                },
              ],
            },
            {
              name: "headline",
              title: "Headline",
              type: "string",
              validation: (r: any) => r.required(),
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              rows: 3,
            },
            {
              name: "lists",
              title: "Lists",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "listSection",
                  title: "List Section",
                  fields: [
                    {
                      name: "title",
                      title: "Section Title",
                      type: "string",
                      validation: (r: any) => r.required(),
                    },
                    {
                      name: "items",
                      title: "List Items",
                      type: "array",
                      of: [{ type: "string" }],
                      validation: (r: any) => r.min(1),
                    },
                  ],
                },
              ],
            },
            {
              name: "footer",
              title: "Footer",
              type: "object",
              fields: [
                {
                  name: "leftColumn",
                  title: "Left Column Title",
                  type: "string",
                },
                {
                  name: "rightColumn",
                  title: "Right Column Text",
                  type: "text",
                  rows: 2,
                },
              ],
            },
          ],
          preview: {
            select: { headline: "headline", eyebrow: "eyebrow.text" },
            prepare({ headline, eyebrow }: any) {
              return {
                title: headline || "Grid Item",
                subtitle: eyebrow || "",
              };
            },
          },
        },
      ],
      validation: (r: any) => r.min(2),
    },
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare({ title, items }: any) {
      const titleText = title?.[0]?.children?.[0]?.text || "Grid Content";
      const itemCount = items?.length || 0;
      return {
        title: titleText,
        subtitle: `${itemCount} item${itemCount !== 1 ? "s" : ""}`,
      };
    },
  },
};