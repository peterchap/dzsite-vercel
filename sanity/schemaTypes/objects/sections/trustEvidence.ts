export default {
  name: "section.trustEvidence",
  title: "Section: Trust & Evidence",
  type: "object",
  fields: [
    { name: "anchor", title: "Anchor (optional)", type: "string", description: "Lowercase id used for in-page links" },
    {
      name: "authorityStatement",
      title: "Authority Statement",
      type: "string",
      description: "Single sentence that establishes credibility (centered).",
      validation: (Rule: any) => Rule.required().min(10).max(220),
    },
    {
      name: "metrics",
      title: "Capability Metrics (4 Columns)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Numeric Headline", type: "string", validation: (r: any) => r.required() },
            { name: "label", title: "Label", type: "string", validation: (r: any) => r.required() },
            {
              name: "icon",
              title: "Icon (optional)",
              type: "string",
              options: { list: ["none", "clock", "gauge", "bolt", "globe"] },
              initialValue: "none",
            },
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }: any) { return { title: value, subtitle: label }; },
          }
        }
      ],
      validation: (Rule: any) => Rule.min(2).max(6),
    },
    {
      name: "readinessSignals",
      title: "Enterprise Readiness Signals",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Text", type: "string", validation: (r: any) => r.required() },
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: ["lock", "cloud", "key", "shield", "audit"] },
              initialValue: "shield",
            },
          ],
          preview: {
            select: { title: "text", icon: "icon" },
            prepare({ title, icon }: any) { return { title, subtitle: icon }; },
          }
        }
      ],
      validation: (Rule: any) => Rule.min(3).max(6),
    },
    {
      name: "socialProof",
      title: "Neutral Social Proof (optional)",
      type: "string",
      description: "Small muted one-liner (centered)",
    }
  ],
  preview: {
    select: { title: "authorityStatement" },
    prepare({ title }: any) {
      return { title: title || "Trust & Evidence" };
    },
  },
}
