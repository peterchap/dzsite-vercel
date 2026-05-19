import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section.deliveryModesSection',
  title: 'Section: Delivery Modes (Assess / Monitor / Build)',
  type: 'object',
  fields: [
    defineField({
      name: 'anchor',
      title: 'Anchor ID',
      type: 'string',
      description: 'Used for #anchor navigation (e.g. "delivery-modes")',
      initialValue: 'delivery-modes'
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'One engine. Three ways to put it to work.'
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
      initialValue: 'Every Datazag product runs on the same Graph \u2014 the 330M-domain corpus, live CertStream, BGP and DNS pipelines. Pick the way you want to consume it.'
    }),
    defineField({
      name: 'modes',
      title: 'Delivery Modes',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        {
          type: 'object',
          name: 'deliveryMode',
          title: 'Delivery Mode',
          fields: [
            { name: 'phase', title: 'Phase (e.g. ASSESS)', type: 'string' },
            { name: 'productName', title: 'Product Name (e.g. 360 Health Report)', type: 'string' },
            { name: 'cadence', title: 'Cadence', type: 'string' },
            { name: 'deliveredAs', title: 'Delivered As', type: 'string' },
            { name: 'leadBuyer', title: 'Lead Buyer', type: 'string' },
            { name: 'outputAnswers', title: 'Output Answers', type: 'string' },
            { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
            { name: 'ctaUrl', title: 'CTA URL', type: 'string' },
            {
              name: 'themeColor',
              title: 'Theme Color',
              type: 'string',
              options: { list: ['blue', 'purple', 'cyan'] },
              initialValue: 'blue'
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
        title: title || 'Delivery Modes Section',
        subtitle: 'Assess / Monitor / Build Layout'
      }
    }
  }
})
