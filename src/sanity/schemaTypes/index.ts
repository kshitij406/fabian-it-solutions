import { type SchemaTypeDefinition } from 'sanity'

// Object schemas (reusable)
import { blockContent } from './blockContent'
import { link } from './link'
import { seo } from './seo'

// Document schemas
import { author } from './author'
import { siteSettings } from './siteSettings'
import { service } from './service'
import { project } from './project'
import { post } from './post'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { contactMessage } from './contactMessage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Object types
    blockContent,
    link,
    seo,
    // Document types
    author,
    siteSettings,
    service,
    project,
    post,
    testimonial,
    faq,
    contactMessage,
  ],
}
