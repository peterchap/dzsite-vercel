// /sanity/schemas/sections/heroPdiLaunch.js
export default {
  name: "section.heroPdiLaunch",
  title: "Hero – PDI Launch",
  type: "object",
  fields: [
    { name: "headline", type: "string" },
    { name: "subheadline", type: "text", rows: 3 },
    {
      name: "ctas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            {
              name: "variant",
              type: "string",
              options: { list: ["primary", "secondary", "ghost"] },
            },
          ],
        },
      ],
      validation: (r) => r.min(1).max(3),
    },
    {
      name: "note",
      title: "Small note (optional)",
      type: "string",
      description: 'e.g. "Transparent pricing — no sales call required"',
    },
  ],
};
