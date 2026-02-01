import { groq } from 'next-sanity'
import type {
  SiteSettings,
  Service,
  Project,
  Post,
  Testimonial,
  Faq,
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
