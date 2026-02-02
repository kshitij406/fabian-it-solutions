import { groq } from 'next-sanity'
import type {
  SiteSettings,
  Service,
  Project,
  Post,
  Testimonial,
  Faq,
  HomePage,
  AboutPage,
} from './types'

// Site Settings (singleton)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  _id,
  _type,
  title,
  brandName,
  description,
  logo,
  "primaryNav": primaryNav[]{
    label,
    href,
    blank
  },
  "footerNav": footerNav[]{
    label,
    href,
    blank
  },
  "socials": socials[]{
    platform,
    url
  },
  contact,
  seo
}`

// Home Page (singleton)
export const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0]{
  _id,
  _type,
  heroHeadline,
  heroSubheadline,
  primaryCTA,
  primaryCTAHref,
  secondaryCTA,
  secondaryCTAHref,
  trustItems,
  aboutPreviewTitle,
  aboutPreviewBody,
  "founder": founder{
    name,
    role,
    bio,
    image,
    email,
    linkedin
  },
  seo
}`

// About Page (singleton)
export const ABOUT_PAGE_QUERY = groq`*[_type == "aboutPage"][0]{
  _id,
  _type,
  headline,
  intro,
  "body": body[],
  "founder": founder{
    name,
    role,
    bio,
    image,
    email,
    linkedin
  },
  "values": values[]{
    title,
    description
  },
  seo
}`

// Services
export const servicesQuery = groq`*[_type == "service"] | order(title asc){
  _id,
  _type,
  title,
  slug,
  shortDescription,
  excerpt,
  icon,
  image,
  "body": body[],
  features,
  seo
}`

// Projects
export const projectsQuery = groq`*[_type == "project"] | order(completedAt desc, _createdAt desc){
  _id,
  _type,
  title,
  slug,
  shortDescription,
  excerpt,
  tags,
  coverImage,
  "gallery": gallery[],
  links,
  "body": body[],
  completedAt,
  seo
}`

// Featured projects (first 3)
export const featuredProjectsQuery = groq`*[_type == "project"] | order(completedAt desc, _createdAt desc)[0...3]{
  _id,
  _type,
  title,
  slug,
  shortDescription,
  excerpt,
  tags,
  coverImage,
  links,
  completedAt
}`

// Project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  shortDescription,
  excerpt,
  tags,
  coverImage,
  "gallery": gallery[],
  links,
  "body": body[],
  completedAt,
  seo
}`

// Posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  "author": author->{
    _id,
    _type,
    name,
    slug,
    image,
    bio
  },
  categories,
  "body": body[],
  seo
}`

// Post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  "author": author->{
    _id,
    _type,
    name,
    slug,
    image,
    bio,
    website,
    email
  },
  categories,
  "body": body[],
  seo
}`

// Testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  _type,
  name,
  role,
  company,
  quote,
  avatar,
  rating
}`

// FAQs
export const faqsQuery = groq`*[_type == "faq"] | order(order asc, question asc){
  _id,
  _type,
  question,
  answer,
  category,
  order
}`
