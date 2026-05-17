export default {
  name: 'section.dataCorpus',
  title: 'Data Corpus Stats',
  type: 'object',
  fields: [
    {
      name: "anchor",
      title: "Section Anchor",
      type: "string",
      description: "Lowercase letters, numbers, dashes; unique per page",
      validation: (r: any) => r.regex(/^[a-z0-9-]+$/).warning("Use lowercase letters, numbers, dashes"),
    },
    { name: 'mainHeadline', type: 'string' },
    { name: 'subheadline', type: 'text', rows: 3 },
    { name: 'totalDomains', type: 'string', description: 'e.g., 330M+' },
    { name: 'ingestionLatency', type: 'string', description: 'e.g., <10s' },
    {
      name: 'dataFeatures',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
            { name: 'icon', type: 'string', description: 'Lucide icon name' }
          ]
        }
      ]
    },
    { name: 'ctaLabel', type: 'string' },
    { name: 'ctaHref', type: 'string', title: 'CTA Link Destination' }
  ],
  preview: {
    select: { title: 'mainHeadline' },
    prepare({ title }: any) {
      return { title: title ?? "Data Corpus Stats", subtitle: "Data Corpus Stats" };
    },
  },
}
