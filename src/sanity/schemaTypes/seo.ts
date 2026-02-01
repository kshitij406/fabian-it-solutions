import { defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'SEO Title',
      description: 'Override the default page title for search engines',
      validation: (Rule) => Rule.max(60).warning('Should be under 60 characters'),
    },
    {
      type: 'text',
      name: 'description',
      title: 'SEO Description',
      description: 'Meta description for search engines',
      validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
    },
    {
      type: 'image',
      name: 'image',
      title: 'OG Image',
      description: 'Image for social media sharing (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
    },
  ],
})
