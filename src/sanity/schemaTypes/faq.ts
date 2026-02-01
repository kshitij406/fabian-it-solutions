import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'question',
      title: 'Question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'answer',
      title: 'Answer',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'category',
      title: 'Category',
      description: 'Optional category for grouping FAQs',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Technical', value: 'technical' },
          { title: 'Support', value: 'support' },
        ],
      },
    }),
    defineField({
      type: 'number',
      name: 'order',
      title: 'Order',
      description: 'Display order (lower numbers appear first)',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
      category: 'category',
    },
    prepare({ title, subtitle, category }) {
      return {
        title,
        subtitle: category ? `${category} • ${subtitle ? subtitle.substring(0, 60) + '...' : ''}` : subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Order (ascending)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Question A-Z',
      name: 'questionAsc',
      by: [{ field: 'question', direction: 'asc' }],
    },
  ],
})
