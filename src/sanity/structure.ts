import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page')
        ),
      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page')
        ),
      S.divider(),
      // Core content
      S.listItem()
        .title('Services & Projects')
        .child(
          S.list()
            .title('Services & Projects')
            .items([
              S.listItem()
                .title('Services')
                .schemaType('service')
                .child(S.documentTypeList('service').title('Services')),
              S.listItem()
                .title('Projects')
                .schemaType('project')
                .child(S.documentTypeList('project').title('Projects')),
            ])
        ),
      S.listItem()
        .title('Testimonials & FAQs')
        .child(
          S.list()
            .title('Testimonials & FAQs')
            .items([
              S.listItem()
                .title('Testimonials')
                .schemaType('testimonial')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('FAQs')
                .schemaType('faq')
                .child(S.documentTypeList('faq').title('FAQs')),
            ])
        ),
      S.divider(),
      // Messages
      S.listItem()
        .title('Messages')
        .child(
          S.documentTypeList('contactMessage')
            .title('Contact Messages')
            .filter('_type == "contactMessage"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
    ])
