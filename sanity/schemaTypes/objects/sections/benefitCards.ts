export default {
  name: "section.benefitCards",
  title: "Section: Benefit Cards (Outcomes)",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
    { name: "kicker", title: "Kicker (optional)", type: "string" },
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 2 },
    {
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "benefitCard",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 3, validation: (r: any) => r.required() }
          ],
          preview: { select: { title: "title" } }
        }
      ],
      validation: (r: any) => r.required().min(3).max(6)
    }
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }: any) {
      return { title: title ?? "Benefit Cards", subtitle: subtitle ?? "Outcomes" };
    }
  }
};
