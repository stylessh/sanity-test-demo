import {defineField, defineType} from 'sanity'

export const stickyFeatureSection = defineType({
  name: 'stickyFeatureSection',
  title: 'Sticky Feature Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Section Subheading',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      features: 'features',
    },
    prepare({title, features}) {
      return {
        title: title || 'Sticky Feature Section',
        subtitle: `Sticky Features (${features?.length || 0} items)`,
      }
    },
  },
})
