import { Section } from '@/components/Section'
import { ContactForm } from '@/components/ContactForm'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Fabian IT Solutions',
}

export default async function ContactPage() {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
  }).catch(() => null)

  const phoneNumber = '+255 714 469 423'
  const email = 'fabiankivipa@yahoo.com'

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
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Phone
                  </h3>
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
                {siteSettings?.contact?.address && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Address
                    </h3>
                    <p className="text-foreground leading-relaxed">
                      {siteSettings.contact.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {siteSettings?.socials && siteSettings.socials.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-6">
                  {siteSettings.socials.map((social, idx) => (
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
