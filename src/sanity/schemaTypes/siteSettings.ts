import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Site Title',
      description: 'The main title of the website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'brandName',
      title: 'Brand Name',
      description: 'The brand/company name displayed in navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'description',
      title: 'Site Description',
      description: 'Default meta description for the site',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      type: 'image',
      name: 'logo',
      title: 'Logo',
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
      type: 'array',
      name: 'primaryNav',
      title: 'Primary Navigation',
      description: 'Main navigation links',
      of: [{ type: 'link' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      type: 'array',
      name: 'footerNav',
      title: 'Footer Navigation',
      description: 'Footer navigation links',
      of: [{ type: 'link' }],
    }),
    defineField({
      type: 'array',
      name: 'socials',
      title: 'Social Media Links',
      description: 'Social media profiles',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'platform',
              title: 'Platform',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Email', value: 'email' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              type: 'url',
              name: 'url',
              title: 'URL',
              validation: (Rule) =>
                Rule.required().uri({
                  allowRelative: false,
                  scheme: ['http', 'https', 'mailto'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      type: 'object',
      name: 'contact',
      title: 'Contact Information',
      fields: [
        {
          type: 'string',
          name: 'email',
          title: 'Email',
          validation: (Rule) => Rule.required().email(),
        },
        {
          type: 'string',
          name: 'phone',
          title: 'Phone',
          validation: (Rule) => Rule.required(),
        },
        {
          type: 'text',
          name: 'address',
          title: 'Address',
          rows: 3,
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'Default SEO',
      description: 'Default SEO settings for the site',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
