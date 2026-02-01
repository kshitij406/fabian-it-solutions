export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt: string
  _type: 'image'
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

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: Slug
  shortDescription: string
  excerpt?: string
  icon?: string
  image?: SanityImage
  body: any // Portable Text
  features?: string[]
  seo?: SEO
}

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: Slug
  shortDescription: string
  excerpt?: string
  tags?: string[]
  coverImage: SanityImage
  gallery?: SanityImage[]
  links?: {
    repo?: string
    live?: string
    caseStudy?: string
  }
  body: any // Portable Text
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
  body: any // Portable Text
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
