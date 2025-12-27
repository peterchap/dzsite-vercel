export default {
  name: "section.simpleText",
  title: "Section: Simple Text",
  type: "object",
  fields: [
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "body", title: "Body", type: "text", rows: 7, validation: (r: any) => r.required() },
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Simple Text", subtitle: subtitle ?? "Section: Simple Text" };
    },
  },
};