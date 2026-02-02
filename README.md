# Fabian IT Solutions

Fabian IT Solutions is a modern, minimalist website for an IT consulting and services company.  
It is built with a **content-driven architecture** where most website content is editable via a headless CMS, while layout and structure remain stable and code-controlled.

🔗 **Live website:** https://fabian-it-solutions-2t5s.vercel.app/  
🔗 **CMS (Sanity Studio):** `/admin`

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **CMS:** Sanity (Headless CMS)
- **Images:** Next.js Image Optimization
- **Backend Routes:** Next.js Route Handlers
- **Deployment:** Vercel

---

## Project Philosophy

This project follows a strict separation of concerns:

- **Code controls structure**
  - Layout
  - Grid system
  - Styling
  - Responsiveness
  - Routing

- **Sanity controls content**
  - Text
  - Images
  - Page copy
  - SEO metadata

This ensures:
- Non-technical users can edit content safely
- Layout cannot be accidentally broken
- The site remains maintainable and scalable

---

## Folder Structure

```

src/
├── app/
│   ├── (site)/              # Public website routes
│   │   ├── page.tsx         # Home
│   │   ├── services/        # Services page
│   │   ├── work/            # Projects page
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   │
│   ├── admin/               # Sanity Studio (/admin)
│   ├── api/                 # Server routes (contact form)
│   └── layout.tsx           # Root layout
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Container.tsx        # Global centering wrapper
│   ├── Section.tsx
│   ├── ContactForm.tsx
│   └── cards/               # Service / Project / Post cards
│
├── sanity/
│   ├── schemaTypes/         # Sanity schemas
│   ├── lib/                 # Sanity client, queries, fetch helpers
│   └── structure.ts         # Custom Sanity desk structure
│
├── lib/
│   └── utils.ts
│
public/
├── hero/
│   └── logo.png             # Website logo
├── images/
│   ├── hero/
│   ├── sections/
│   └── founder/

```

---

## Content Management (Sanity)

Most website content is editable through **Sanity Studio**.

### Editable via Sanity
- Site title and description
- Navigation links
- Footer content
- Services
- Projects
- Contact information
- SEO metadata
- (Optionally) Home and About page content

### Not editable via Sanity (by design)
- Layout structure
- Grid system
- Typography scale
- Colors and spacing
- Animations and interactions
- Routing logic

This prevents accidental design breakage.

---

## Site Settings (Important)

In **Sanity Studio → Site Settings**, you can manage:
- Brand name
- Navigation menu
- Footer links
- Social links
- Contact email and phone number
- Default SEO metadata

Changes take effect after publishing.

---

## Logo Handling

The site logo is loaded from:

```

public/hero/logo.png

````

- Used in Navbar and Footer
- Loaded via `next/image`
- Falls back to text if the image is missing

To change the logo, replace the file while keeping the same path.

---

## Contact Form

- Implemented using a server-side API route
- Sends contact submissions via email
- Includes validation and spam protection
- Can optionally log messages to Sanity

Displayed contact details:
- **Email:** fabiankivipa@yahoo.com
- **Phone:** +255 714 469 423

---

## Running the Project Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
````

Local URLs:

* Website: [http://localhost:3000](http://localhost:3000)
* Sanity Studio: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token
```

Additional variables may be required if email delivery is enabled.

---

## Deployment

* Deployed on **Vercel**
* Automatic builds on push
* Must pass `npm run build`
* Sanity Studio is available in production at `/admin`

---

## Design Direction

* Minimalist, premium aesthetic
* Tech-consulting oriented
* Strong typography and spacing
* Subtle borders and transitions
* Dark and light mode support
* No unnecessary animations

---

## Author

**Fabian IT Solutions**
Founder: Fabian Kivipa
📧 [fabiankivipa@yahoo.com](mailto:fabiankivipa@yahoo.com)
📞 +255 714 469 423

---

## License

This project is private and not licensed for redistribution.

```
