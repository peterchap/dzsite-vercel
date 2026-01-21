export default {
  name: "section.simpleText",
  title: "Section: Simple Text",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 3 },
    {
      name: "body",
      title: "Body",
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
      ]
    },
    {
      name: "fontStyle",
      title: "Font Style",
      type: "string",
      options: {
        list: [
          { title: "Sans-Serif (Default)", value: "sans" },
          { title: "Heading (Outfit)", value: "heading" },
          { title: "Monospace", value: "mono" },
        ],
        layout: "radio"
      },
      initialValue: "sans"
    },
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Simple Text", subtitle: subtitle ?? "Section: Simple Text" };
    },
  },
};