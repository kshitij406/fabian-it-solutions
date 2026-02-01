import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
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
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short excerpt for listings (max 240 characters)',
      validation: (Rule) => Rule.required().max(240),
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
    }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
      title: 'Published At',
      description: 'Publication date and time',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'author',
      title: 'Author',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'categories',
      title: 'Categories',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'blockContent',
      name: 'body',
      title: 'Body',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'publishedAt',
      media: 'coverImage',
      authorName: 'author.name',
    },
    prepare({ title, subtitle, media, authorName }) {
      return {
        title,
        subtitle: authorName ? `${authorName} • ${subtitle ? new Date(subtitle).toLocaleDateString() : 'No date'}` : subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
