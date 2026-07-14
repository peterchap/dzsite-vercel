import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section.partnershipSegmentsSection',
  title: 'Section: Partnership Segments Table',
  type: 'object',
  fields: [
    defineField({
      name: 'anchor',
      title: 'Anchor ID',
      type: 'string',
      description: 'Used for #anchor navigation (e.g. "partnerships")',
      initialValue: 'partnerships'
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'One domain is self-serve. Many domains is a partnership.'
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Datazag is built for the buyers responsible for many organizations at once. The partnership shape is consistent: your brand, your product, your customer relationship \u2014 Datazag intelligence inside.'
    }),
    defineField({
      name: 'cta',
      title: 'Section CTA',
      type: 'cta'
    }),
    defineField({
      name: 'segments',
      title: 'Partnership Segments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'segment',
          title: 'Segment',
          fields: [
            { name: 'segmentName', title: 'Segment Name (e.g. MSSPs & MSPs)', type: 'string' },
            { name: 'leadProduct', title: 'Lead Product (e.g. 360 Health Reports)', type: 'string' },
            { name: 'fitDescription', title: 'The Fit', type: 'text', rows: 2 },
            { name: 'partnerUrl', title: 'External/Custom URL', type: 'string', description: 'Used if no internal page is selected' },
            { name: 'pageRef', title: 'Internal Partner Page', type: 'reference', to: [{ type: 'page' }] },
            {
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: { list: ['Shield', 'Briefcase', 'Server', 'Mail'] },
              initialValue: 'Shield'
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'headline'
    },
    prepare({ title }) {
      return {
        title: title || 'Partnership Segments Section',
        subtitle: '4-Row Grid Layout'
      }
    }
  }
})
