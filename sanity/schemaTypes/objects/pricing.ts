import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pricing',
    title: 'Pricing',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'plans',
            title: 'Plans',
            type: 'array',
            of: [
                defineField({
                    name: 'plan',
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string', title: 'Plan Name' }),
                        defineField({ name: 'price', type: 'string', title: 'Price' }),
                        defineField({ name: 'period', type: 'string', title: 'Period (e.g. /month)' }),
                        defineField({ name: 'features', type: 'array', of: [{ type: 'string' }], title: 'Features List' }),
                        defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
                        defineField({ name: 'ctaLink', type: 'string', title: 'CTA Link' }),
                        defineField({ name: 'featured', type: 'boolean', title: 'Is Featured?' }),
                    ]
                })
            ]
        }),
    ],
})
