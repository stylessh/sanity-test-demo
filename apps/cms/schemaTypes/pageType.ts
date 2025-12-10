import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page. Use "/" for the homepage.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
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
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title,
        subtitle: slug === '/' ? 'Homepage' : `/${slug}`,
      }
    },
  },
})
