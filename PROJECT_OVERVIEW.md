# Fabian IT Solutions - Project Overview

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- **CMS**: Sanity Studio v4.22.0
- **Theme**: next-themes (dark mode support)
- **Email**: Resend (contact form)
- **Rich Text**: @portabletext/react

## Folder Structure

### `src/app/`
Next.js App Router directory. Routes are defined by folder structure.

- **`(site)/`** - Route group for public-facing pages
  - `page.tsx` - Home page (`/`)
  - `layout.tsx` - Site layout wrapper (Navbar + Footer)
  - `services/page.tsx` - Services list (`/services`)
  - `work/page.tsx` - Projects list (`/work`)
  - `work/[slug]/page.tsx` - Project detail (`/work/:slug`)
  - `about/page.tsx` - About page (`/about`)
  - `contact/page.tsx` - Contact page (`/contact`)
  - `not-found.tsx` - Global 404 page
  - `error.tsx` - Error boundary

- **`admin/[[...slug]]/page.tsx`** - Sanity Studio (`/admin`)
- **`api/contact/route.ts`** - Contact form API endpoint
- **`layout.tsx`** - Root layout (ThemeProvider, fonts, JSON-LD)
- **`sitemap.ts`** - Dynamic sitemap generation
- **`robots.ts`** - Robots.txt generation
- **`globals.css`** - Global styles + Tailwind config

### `src/components/`
Reusable React components.

- **`Navbar.tsx`** - Main navigation (client component)
- **`Footer.tsx`** - Site footer
- **`Section.tsx`** - Page section wrapper with Container
- **`Container.tsx`** - Consistent max-width container
- **`ContactForm.tsx`** - Contact form (client component)
- **`PortableText.tsx`** - Rich text renderer for Sanity content
- **`theme-provider.tsx`** - Dark mode provider (client)
- **`cards/`** - Card components:
  - `ServiceCard.tsx`
  - `ProjectCard.tsx`
  - `PostCard.tsx` (legacy, not used)
- **`ui/`** - shadcn/ui components (Button, Card, Badge, Separator, Accordion, Input, Textarea)

### `src/sanity/`
Sanity CMS configuration and utilities.

- **`schemaTypes/`** - Content schemas:
  - `index.ts` - Exports all schemas
  - `siteSettings.ts` - Singleton site configuration
  - `homePage.ts` - Home page singleton
  - `aboutPage.ts` - About page singleton
  - `founder.ts` - Reusable founder object
  - `service.ts` - Service documents
  - `project.ts` - Project documents
  - `post.ts` - Blog posts (legacy, not used)
  - `author.ts` - Author documents
  - `testimonial.ts` - Testimonial documents
  - `faq.ts` - FAQ documents
  - `contactMessage.ts` - Contact form submissions
  - `blockContent.ts` - Reusable rich text schema
  - `link.ts` - Reusable link object
  - `seo.ts` - SEO fields object

- **`lib/`** - Sanity utilities:
  - `client.ts` - Read-only Sanity client
  - `write-client.ts` - Write client with token (server-only)
  - `fetch.ts` - Cached fetch helpers with revalidation
  - `queries.ts` - GROQ queries for all content types
  - `types.ts` - TypeScript types matching Sanity schemas
  - `image.ts` - Image URL builder helper
  - `live.ts` - Live preview utilities (optional)

- **`structure.ts`** - Sanity Studio desk structure (grouping)
- **`env.ts`** - Environment variable validation

### `src/lib/`
General utilities.

- **`utils.ts`** - `cn()` helper for className merging
- **`seed-data.ts`** - Fallback seed data (legacy, minimal usage)

### `public/`
Static image assets.

- **`hero/logo.png`** - Site logo (required)
- **`images/hero/main.jpg`** - Home page hero image (optional)
- **`images/founder/founder.jpg`** - Founder profile image (optional)

## CMS Editable Content (Sanity)

Edit content in Sanity Studio at `/admin`:

- **Home Page** (singleton) - Hero copy, CTAs, trust items, about preview, founder
- **About Page** (singleton) - Headline, intro, body, values, founder override
- **Founder** (object) - Reusable founder info for Home and About
- **Site Settings** (singleton) - Brand name, nav, footer links, contact, SEO
- **Services** and **Projects** - Existing content types remain unchanged

## Where to Edit Founder Info

- **Primary source**: Home Page singleton (`homePage.founder`)
- **Optional override**: About Page singleton (`aboutPage.founder`)
- If About Page founder is empty, the Home Page founder is used.

## Logo and Images

- **Logo**: Place at `public/hero/logo.png` (used in Navbar + Footer)
- **Hero image**: Place at `public/images/hero/main.jpg`
- **Founder image**: Place at `public/images/founder/founder.jpg`

## How to Publish Changes and See Them Live

1. Visit `/admin` and edit the Home Page or About Page singleton documents.
2. Click **Publish** in Sanity Studio.
3. Refresh the site - content updates within ~60 seconds due to ISR caching.

## Common Edits

### Change Site Brand Name
1. **Sanity**: Edit "Site Settings" document in `/admin`.
2. **Fallback**: `src/app/(site)/layout.tsx`

### Add New Navigation Link
1. Edit `src/components/Navbar.tsx` - add to `navLinks` array
2. Create page in `src/app/(site)/your-page/page.tsx`
3. Add route to sitemap if needed: `src/app/sitemap.ts`

### Change Contact Email
1. **API Route**: `src/app/api/contact/route.ts`
2. **Display**: `src/app/(site)/contact/page.tsx`
3. **Footer**: `src/components/Footer.tsx`

### Change Color Scheme
1. Edit `src/app/globals.css`
2. Modify CSS variables in `:root` and `.dark`
3. Primary color: `--primary` variable

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Access Sanity Studio
# Visit http://localhost:3000/admin
```

## Important Notes

- **Route Groups**: `(site)` is a route group (parentheses = not in URL)
- **Server Components**: Most pages are server components by default
- **Client Components**: Mark with `'use client'` when needed (Navbar, ContactForm, ThemeProvider)
- **Sanity Studio**: Accessible at `/admin` (separate from public site)
- **Image Optimization**: Next.js Image component + Sanity image URLs
- **Dark Mode**: Handled by next-themes, toggle in Navbar
- **Email**: Uses Resend API (requires `RESEND_API_KEY` in env)
- **No Blog**: Blog functionality remains removed from the public site

## Content Management

All content is managed in Sanity Studio at `/admin` and fetched server-side with ISR.
