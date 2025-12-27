export default {
  name: "section.privacyCompliance",
  title: "Section: Privacy & Compliance",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "body", title: "Body", type: "text", rows: 6, validation: (r: any) => r.required() },
    { name: "cta", title: "CTA (optional)", type: "cta" },

    // enterprise legal reassurance (without overclaiming certifications)
    { name: "enterpriseNote", title: "Enterprise Note (optional)", type: "string", description: "E.g. DPAs / docs on request." },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }: any) {
      return { title: title ?? "Privacy & Compliance", subtitle: "Trust posture" };
    },
  },
};
