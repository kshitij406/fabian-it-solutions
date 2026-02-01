import { defineType, defineField } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
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
      type: 'text',
      name: 'bio',
      title: 'Bio',
      rows: 4,
    }),
    defineField({
      type: 'url',
      name: 'website',
      title: 'Website',
    }),
    defineField({
      type: 'string',
      name: 'email',
      title: 'Email',
      validation: (Rule) => Rule.email(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
