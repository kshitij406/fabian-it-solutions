import { Section } from '@/components/Section'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Fabian IT Solutions',
}

export default async function AboutPage() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
  })

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">About Us</h1>
          <p className="text-lg text-muted-foreground">
            {siteSettings?.description ||
              'Delivering innovative IT solutions for your business needs.'}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none">
          <div className="space-y-6">
            <p>
              {siteSettings?.description ||
                'Fabian IT Solutions is dedicated to providing cutting-edge technology solutions that help businesses thrive in the digital age.'}
            </p>
            <p>
              With years of experience in the IT industry, we specialize in
              delivering tailored solutions that meet your unique business
              requirements.
            </p>
          </div>

          {siteSettings?.contact && (
            <div className="mt-12 rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
              <div className="space-y-2">
                {siteSettings.contact.email && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${siteSettings.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {siteSettings.contact.email}
                    </a>
                  </p>
                )}
                {siteSettings.contact.phone && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href={`tel:${siteSettings.contact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {siteSettings.contact.phone}
                    </a>
                  </p>
                )}
                {siteSettings.contact.address && (
                  <p>
                    <strong>Address:</strong> {siteSettings.contact.address}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
