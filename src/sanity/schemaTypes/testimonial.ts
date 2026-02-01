import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'role',
      title: 'Role',
      description: 'Job title or role',
    }),
    defineField({
      type: 'string',
      name: 'company',
      title: 'Company',
      description: 'Company name',
    }),
    defineField({
      type: 'text',
      name: 'quote',
      title: 'Quote',
      description: 'Testimonial quote (max 300 characters)',
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      type: 'image',
      name: 'avatar',
      title: 'Avatar',
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
      type: 'number',
      name: 'rating',
      title: 'Rating',
      description: 'Rating out of 5',
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'quote',
      media: 'avatar',
      company: 'company',
    },
    prepare({ title, subtitle, media, company }) {
      return {
        title: company ? `${title} - ${company}` : title,
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
