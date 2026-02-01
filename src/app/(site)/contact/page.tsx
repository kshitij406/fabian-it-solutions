import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import type { Metadata } from 'next'
import { seedSiteSettings } from '@/lib/seed-data'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Fabian IT Solutions',
}

export default async function ContactPage() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
  }).catch(() => null)

  const settings = siteSettings || seedSiteSettings

  return (
    <Section>
      <div className="space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-light tracking-tight md:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            We'd love to hear from you. Get in touch and we'll respond as soon
            as possible.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-tight">
                Get in Touch
              </h2>
              {settings.contact && (
                <div className="space-y-6">
                  {settings.contact.email && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Email
                      </h3>
                      <a
                        href={`mailto:${settings.contact.email}`}
                        className="text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {settings.contact.email}
                      </a>
                    </div>
                  )}
                  {settings.contact.phone && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Phone
                      </h3>
                      <a
                        href={`tel:${settings.contact.phone}`}
                        className="text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {settings.contact.phone}
                      </a>
                    </div>
                  )}
                  {settings.contact.address && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Address
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {settings.contact.address}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {settings.socials && settings.socials.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-6">
                  {settings.socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  )
}
