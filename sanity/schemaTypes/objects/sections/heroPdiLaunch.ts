// /sanity/schemas/sections/heroPdiLaunch.js
import type { Rule } from "sanity"
export default {
  name: "section.heroPdiLaunch",
  title: "Hero – PDI Launch",
  type: "object",
  fields: [
    { name: "anchor", title: "Section Anchor", type: "string", description: "Lowercase letters, numbers, dashes; unique per page", validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes") },
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
      validation: (r: Rule) => r.min(1).max(3),
    },
    {
      name: "note",
      title: "Small note (optional)",
      type: "string",
      description: 'e.g. "Transparent pricing — no sales call required"',
    },
  ],
};
