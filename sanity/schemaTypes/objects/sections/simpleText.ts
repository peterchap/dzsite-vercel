export default {
  name: "section.simpleText",
  title: "Section: Simple Text",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 3 },
    { name: "body", title: "Body", type: "text", rows: 7, validation: (r: any) => r.required() },
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Simple Text", subtitle: subtitle ?? "Section: Simple Text" };
    },
  },
};