# Fabian IT Solutions — Project Overview

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
- **`ui/`** - shadcn/ui components (Button, etc.)

### `src/sanity/`
Sanity CMS configuration and utilities.

- **`schemaTypes/`** - Content schemas:
  - `index.ts` - Exports all schemas
  - `siteSettings.ts` - Singleton site configuration
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
  - `fetch.ts` - Cached fetch helper with revalidation
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

### `public/images/`
Static image assets.

- **`hero/main.jpg`** - Home page hero image
- **`founder/founder.jpg`** - Founder profile image (1200x1200px recommended)

## Where to Edit Key Things

### Navigation Links
**File**: `src/components/Navbar.tsx`
- Edit `navLinks` array (line ~12)

### Footer Links
**File**: `src/components/Footer.tsx`
- Edit Quick Links section (line ~47)
- Edit contact info (line ~82)

### Home Page Sections
**File**: `src/app/(site)/page.tsx`
- Hero section: lines ~64-104
- Services preview: lines ~106-130
- Projects preview: lines ~132-154
- Founder section: lines ~156-180
- CTA section: lines ~182-197

### Services Page
**File**: `src/app/(site)/services/page.tsx`
- Layout and styling only (content from Sanity)

### Work/Projects Page
**File**: `src/app/(site)/work/page.tsx`
- Layout and styling only (content from Sanity)

### Contact Form Email
**File**: `src/app/api/contact/route.ts`
- Email recipient: line ~95 (`fabiankivipa@yahoo.com`)
- Email subject: line ~97
- Email body template: lines ~99-107

### Contact Phone Number
**Files to update**:
- `src/components/Footer.tsx` (line ~82)
- `src/app/(site)/contact/page.tsx` (line ~20)
- `src/lib/seed-data.ts` (line ~32) - if still referenced

Current phone: `+255 714 469 423`

### Environment Variables
**File**: `.env.local` (create if missing)

Required:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your-write-token
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=your-verified-email@domain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Sanity Content Types
**Files**: `src/sanity/schemaTypes/*.ts`
- Edit field definitions, validations, previews

### Sanity Studio Structure
**File**: `src/sanity/structure.ts`
- Organize content groups, set singleton for siteSettings

## How to Add Images

### Static Images (public folder)
Place images in `public/images/`:

- Hero: `public/images/hero/main.jpg`
- Founder: `public/images/founder/founder.jpg`
- Sections: `public/images/sections/*.jpg`

Reference in code:
```tsx
<Image src="/images/hero/main.jpg" alt="..." />
```

### Sanity Images (CMS)
1. Upload in Sanity Studio at `/admin`
2. Images are automatically optimized via `urlFor()` helper
3. Reference in components using `urlFor(image).width(800).url()`

## Common Edits

### Change Site Brand Name
1. **Sanity**: Edit "Site Settings" document in `/admin`
2. **Fallback**: `src/app/(site)/page.tsx` line ~69

### Add New Navigation Link
1. Edit `src/components/Navbar.tsx` - add to `navLinks` array
2. Create page in `src/app/(site)/your-page/page.tsx`
3. Add route to sitemap if needed: `src/app/sitemap.ts`

### Change Contact Email
1. **API Route**: `src/app/api/contact/route.ts` line ~95
2. **Display**: `src/app/(site)/contact/page.tsx` line ~20
3. **Footer**: `src/components/Footer.tsx` line ~82

### Change Color Scheme
1. Edit `src/app/globals.css`
2. Modify CSS variables in `:root` and `.dark` sections
3. Primary color: `--primary` variable

### Add New Sanity Content Type
1. Create schema: `src/sanity/schemaTypes/yourType.ts`
2. Export in: `src/sanity/schemaTypes/index.ts`
3. Add query: `src/sanity/lib/queries.ts`
4. Add type: `src/sanity/lib/types.ts`
5. Add to structure: `src/sanity/structure.ts` (optional)

### Modify Contact Form
1. **Form UI**: `src/components/ContactForm.tsx`
2. **Validation/Email**: `src/app/api/contact/route.ts`
3. **Rate limiting**: Already implemented (5 req/min per IP)

### Update Founder Info
1. **Home page**: `src/app/(site)/page.tsx` lines ~156-180
2. **Image**: Place at `public/images/founder/founder.jpg`
3. **About page**: Can add similar section if needed

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
- **No Blog**: Blog functionality has been removed

## Content Management

All content is managed in Sanity Studio at `/admin`:

1. **Site Settings** (singleton) - Brand, nav, contact, socials
2. **Services** - Service offerings
3. **Projects** - Portfolio/work items
4. **Testimonials** - Client testimonials
5. **FAQs** - Frequently asked questions
6. **Contact Messages** - Form submissions (if storing to Sanity)

Content is fetched server-side and cached with ISR (Incremental Static Regeneration).
