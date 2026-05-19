import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section.predictiveLayerSection',
  title: 'Section: Predictive Layer Stack',
  type: 'object',
  fields: [
    defineField({
      name: 'anchor',
      title: 'Anchor ID',
      type: 'string',
      description: 'Used for #anchor navigation (e.g. "predictive-layer")',
      initialValue: 'predictive-layer'
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Datazag is the predictive layer alongside your stack.'
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'text',
      rows: 3,
      initialValue: "Datazag works with ASM, DRP, brand protection and threat intelligence \u2014 not against them. Where you've invested in any of these, Datazag is the layer that makes them work better. Where you haven't, it's the zero-input place to start."
    }),
    defineField({
      name: 'topProducts',
      title: 'Top Layer: Products',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3),
      initialValue: ['Assess', 'Monitor', 'Build']
    }),
    defineField({
      name: 'capabilityBands',
      title: 'Middle Layer: Capability Bands',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'band',
          fields: [
            { name: 'label', title: 'Capability Label', type: 'string' },
            { 
              name: 'iconType', 
              title: 'Icon', 
              type: 'string',
              options: { list: ['Network', 'Activity', 'Radio', 'ShieldCheck'] }
            },
            {
              name: 'cta',
              title: 'Link (Optional)',
              type: 'cta',
              description: 'URL to link to when the band is clicked (e.g. /how-it-works)'
            }
          ]
        }
      ],
      initialValue: [
        { label: 'Signal correlation and graphing', iconType: 'Network', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Predictive risk scoring', iconType: 'Activity', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Real-time telemetry', iconType: 'Radio', cta: { label: 'Learn More', href: '/how-it-works' } },
        { label: 'Routing hygiene verification', iconType: 'ShieldCheck', cta: { label: 'Learn More', href: '/how-it-works' } }
      ]
    }),
    defineField({
      name: 'substrateFoundations',
      title: 'Bottom Layer: Substrate Foundations',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['330M-domain corpus', 'CertStream', 'BGP (RouteViews & RIPE RIS)']
    })
  ],
  preview: {
    select: {
      title: 'headline'
    },
    prepare({ title }) {
      return {
        title: title || 'Predictive Layer Section',
        subtitle: 'Stacked Architectural Diagram'
      }
    }
  }
})
