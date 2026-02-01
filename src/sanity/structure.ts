import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (Singleton)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.divider(),
      // Site Content Group
      S.listItem()
        .title('Site Content')
        .child(
          S.list()
            .title('Site Content')
            .items([
              S.listItem()
                .title('Services')
                .schemaType('service')
                .child(S.documentTypeList('service').title('Services')),
              S.listItem()
                .title('Projects')
                .schemaType('project')
                .child(S.documentTypeList('project').title('Projects')),
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
      // Messages Group
      S.listItem()
        .title('Messages')
        .child(
          S.documentTypeList('contactMessage')
            .title('Contact Messages')
            .filter('_type == "contactMessage"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
    ])
