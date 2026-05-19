import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section.howItWorks',
  title: 'How It Works Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'THE SYSTEM'
    }),
    defineField({
      name: 'systemTitle',
      title: 'Section Context Title',
      type: 'string',
      initialValue: 'How vendor impersonation detection works in practice.'
    }),
    defineField({
      name: 'systemDescription',
      title: 'Section Context Brief',
      type: 'text',
      rows: 2,
      initialValue: "Four mechanisms operating at the internet's foundational layers, transforming raw global telemetry into instant defensive actions."
    }),
    defineField({
      name: 'mechanisms',
      title: 'The Four Named Mechanisms',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mechanismItem',
          title: 'Mechanism Definition',
          fields: [
            { name: 'stepNumber', title: 'Step Sequence (e.g., 01)', type: 'string' },
            { name: 'mechanismName', title: 'Proprietary Name (e.g., Platform Fingerprinting)', type: 'string' },
            { name: 'systemTag', title: 'Technical Tracking Tag (e.g., MAPPING)', type: 'string' },
            { name: 'description', title: 'Technical Mechanism Detail', type: 'text', rows: 3 }
          ],
          preview: {
            select: { title: 'mechanismName', subtitle: 'stepNumber' },
          }
        }
      ],
      validation: Rule => Rule.max(4).error('Stick strictly to your four core mechanisms for strategic alignment.')
    })
  ],
  preview: {
    select: {
      title: 'systemTitle',
    },
    prepare({ title }: any) {
      return {
        title: title || 'How It Works System',
        subtitle: 'How It Works Section'
      };
    }
  }
})
