import { defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'label',
      title: 'Label',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'url',
      name: 'href',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'boolean',
      name: 'blank',
      title: 'Open in new tab',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})
