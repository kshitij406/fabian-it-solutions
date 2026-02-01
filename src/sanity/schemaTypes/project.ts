import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Brief description for listings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Longer excerpt',
      rows: 3,
    }),
    defineField({
      type: 'array',
      name: 'tags',
      title: 'Tags',
      description: 'Project tags/categories',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'image',
      name: 'coverImage',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: 'string',
          name: 'alt',
          title: 'Alt text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'gallery',
      title: 'Gallery',
      description: 'Additional project images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      type: 'object',
      name: 'links',
      title: 'Links',
      fields: [
        {
          type: 'url',
          name: 'repo',
          title: 'Repository URL',
        },
        {
          type: 'url',
          name: 'live',
          title: 'Live Site URL',
        },
        {
          type: 'url',
          name: 'caseStudy',
          title: 'Case Study URL',
        },
      ],
    }),
    defineField({
      type: 'blockContent',
      name: 'body',
      title: 'Body',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'date',
      name: 'completedAt',
      title: 'Completed Date',
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'SEO',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Completed Date (newest)',
      name: 'completedAtDesc',
      by: [{ field: 'completedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
