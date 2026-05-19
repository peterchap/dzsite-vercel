import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section.why360Conversion',
  title: 'Why 360 Conversion',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'THE STRATEGY'
    }),
    defineField({
      name: 'sectionHeadline',
      title: 'Main Section Headline',
      type: 'string',
      initialValue: 'Why 360? The threat outside, the surface inside.'
    }),
    defineField({
      name: 'sectionBrief',
      title: 'Core Concept Brief',
      type: 'text',
      rows: 2,
      initialValue: 'Impersonation only works when two things line up: infrastructure an attacker has built, and an attack surface that lets it land. The 360 Health Report covers both halves.'
    }),
    defineField({
      name: 'externalTitle',
      title: 'External Half Title',
      type: 'string',
      initialValue: 'The external half \u2014 your platforms, and what\u2019s targeting them.'
    }),
    defineField({
      name: 'externalBody',
      title: 'External Half Body Copy',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'trustSurfaceTitle',
      title: 'Trust Surface Title (Bottom-Left Wedge)',
      type: 'string',
      initialValue: 'The Trust Surface \u2014 your verified perimeter.'
    }),
    defineField({
      name: 'trustSurfaceBody',
      title: 'Trust Surface Body Copy',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'threatSurfaceTitle',
      title: 'Threat Surface Title (Bottom-Right Wedge)',
      type: 'string',
      initialValue: 'The Threat Surface \u2014 your active exposure.'
    }),
    defineField({
      name: 'threatSurfaceBody',
      title: 'Threat Surface Body Copy',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'conversionHeadline',
      title: 'Conversion Transition Headline',
      type: 'string',
      initialValue: 'Upgrade to the Full 360 View'
    }),
    defineField({
      name: 'conversionBody',
      title: 'Conversion Description Copy',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'layers',
      title: 'Internal Audit Stack Layers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dataLayer',
          title: 'Data Layer',
          fields: [
            { name: 'title', title: 'Layer Title', type: 'string' },
            { name: 'outcome', title: 'Intelligence Outcome', type: 'string' },
            {
              name: 'signals',
              title: 'Extracted Signals',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'sectionHeadline',
    },
    prepare({ title }: any) {
      return {
        title: title || 'Why 360 Conversion',
        subtitle: 'Why 360 Conversion Section'
      };
    }
  }
})
