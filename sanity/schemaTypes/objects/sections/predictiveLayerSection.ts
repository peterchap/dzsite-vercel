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
      name: 'architectureDiagram',
      title: 'Architecture Diagram (Top & Middle Layers)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        }
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
