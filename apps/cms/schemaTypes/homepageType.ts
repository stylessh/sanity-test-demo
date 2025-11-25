import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ctaGroup',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'type',
                  title: 'Button Type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Primary', value: 'primary'},
                      {title: 'Secondary', value: 'secondary'},
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'type',
                },
              },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
  ],
})
