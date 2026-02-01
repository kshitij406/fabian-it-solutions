# CODEBASE PRIMER — Fabian IT Solutions Website

## Goal
Build a production-ready website for Fabian IT Solutions using Next.js App Router + TS + Tailwind + shadcn/ui + Sanity CMS.

## Repo assumptions (update if different)
- Next.js app lives in: src/app
- Shared UI/components: src/components
- Sanity client + queries: src/lib/sanity
- Styling: Tailwind (already configured)

## Hard requirements
- Server components by default.
- CMS drives content for: site settings, services, projects, posts, testimonials, FAQs.
- Accessible, responsive UI.
- SEO metadata + OG + Twitter cards.
- Blog uses Portable Text renderer with custom components.

## Content types (Sanity)
- siteSettings: brand, nav, footer, socials, SEO defaults
- service: title, slug, shortDescription, icon, body
- project: title, slug, shortDescription, tags, coverImage, gallery, body, links
- post: title, slug, excerpt, coverImage, publishedAt, author, body
- testimonial: name, role, company, quote, avatar
- faq: question, answer

## Pages
- / (home)
- /services
- /work
- /work/[slug]
- /about
- /blog
- /blog/[slug]
- /contact
- /admin/[[...slug]] (catch-all page)

## Definition of done
- Site builds with `npm run build`.
- No broken routes.
- Loading + not-found for dynamic routes.
- Safe contact form (Sanity write preferred) + honeypot.
