export default {
  name: 'persona',
  title: 'Target Personas',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Persona Title', // e.g., "MSSPs" or "M&A Due Diligence"
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'headline',
      title: 'Outcome Headline', // e.g., "Scale your SOC with real-time signals"
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'dataPoints',
      title: 'Key Data Signals', // Bullet points of what they get
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'samplePayload',
      title: 'Sample Data Payload (JSON)', // This reinforces the DaaS positioning
      type: 'text',
      description: 'Paste a small JSON snippet showing the data feed for this persona.',
    },
    {
      name: 'accentColor',
      title: 'Accent Color', // Match your design system (Blue, Purple, Orange)
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
        ],
      },
    },
  ],
};
