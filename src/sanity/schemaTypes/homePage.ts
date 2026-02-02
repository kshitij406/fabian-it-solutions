import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCTAHref',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '/contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCTAHref',
      title: 'Secondary CTA Link',
      type: 'string',
      initialValue: '/services',
    }),
    defineField({
      name: 'trustItems',
      title: 'Trust Items',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(3).max(6),
    }),
    defineField({
      name: 'aboutPreviewTitle',
      title: 'About Preview Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutPreviewBody',
      title: 'About Preview Body',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'founder',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
