import type { PortableTextBlock } from '@portabletext/types'

export type PortableTextValue = PortableTextBlock[]

export type SanityImage = {
  alt?: string
  asset?: {
    _id: string
    url: string
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
}

export interface Slug {
  current: string
  _type: 'slug'
}

export interface NavItem {
  label: string
  href: string
  blank?: boolean
  _type: 'link'
}

export interface SocialLink {
  platform: string
  url: string
  _type?: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
}

export interface SEO {
  title?: string
  description?: string
  image?: SanityImage
}

export interface Founder {
  name: string
  role: string
  bio: string
  image?: SanityImage
  email?: string
  linkedin?: string
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  brandName: string
  description?: string
  logo?: SanityImage
  primaryNav: NavItem[]
  footerNav?: NavItem[]
  socials: SocialLink[]
  contact?: ContactInfo
  seo?: SEO
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  heroHeadline: string
  heroSubheadline: string
  primaryCTA: string
  primaryCTAHref: string
  secondaryCTA?: string
  secondaryCTAHref?: string
  trustItems?: string[]
  aboutPreviewTitle: string
  aboutPreviewBody: string
  founder: Founder
  seo?: SEO
}

export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  headline: string
  intro?: string
  body: PortableTextValue
  founder?: Founder
  values?: Array<{
    title: string
    description: string
  }>
  seo?: SEO
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: Slug
  shortDescription: string
  image?: SanityImage
  body: PortableTextValue
  features?: string[]
  seo?: SEO
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: Slug
  shortDescription: string
  tags?: string[]
  coverImage: SanityImage
  gallery?: SanityImage[]
  links?: {
    repo?: string
    live?: string
    caseStudy?: string
  }
  body: PortableTextValue
  completedAt?: string
  seo?: SEO
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: Slug
  image?: SanityImage
  bio?: string
  website?: string
  email?: string
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: Slug
  excerpt: string
  coverImage?: SanityImage
  publishedAt: string
  author: Author
  categories?: string[]
  body: PortableTextValue
  seo?: SEO
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role?: string
  company?: string
  quote: string
  avatar?: SanityImage
  rating?: number
}

export interface Faq {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category?: string
  order?: number
}

export interface ContactMessage {
  _id: string
  _type: 'contactMessage'
  name: string
  email: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'archived'
  createdAt: string
}
