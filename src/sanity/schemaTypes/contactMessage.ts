import { defineType, defineField } from 'sanity'

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Message',
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
      name: 'email',
      title: 'Email',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      type: 'string',
      name: 'subject',
      title: 'Subject',
    }),
    defineField({
      type: 'text',
      name: 'message',
      title: 'Message',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'honeypot',
      title: 'Honeypot',
      description: 'Spam protection field (should be empty)',
      hidden: true,
    }),
    defineField({
      type: 'string',
      name: 'status',
      title: 'Status',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      type: 'datetime',
      name: 'createdAt',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      createdAt: 'createdAt',
    },
    prepare({ title, subtitle, status, createdAt }) {
      return {
        title: `${title} (${status})`,
        subtitle: `${subtitle} • ${createdAt ? new Date(createdAt).toLocaleDateString() : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Created Date (newest)',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
