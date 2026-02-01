import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { servicesQuery } from '@/sanity/lib/queries'
import type { Service } from '@/sanity/lib/types'
import { PortableText } from '@/components/PortableText'
import type { Metadata } from 'next'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive IT solutions tailored to your business needs',
}

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>({ query: servicesQuery }).catch(
    () => []
  )

  return (
    <>
      <Section className="pb-12 md:pb-16">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-light tracking-tight md:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>
        </div>
      </Section>

      {services.length > 0 ? (
        <Section className="bg-muted/30">
          <div className="space-y-24">
            {services.map((service, idx) => (
              <div
                key={service._id}
                id={service.slug.current}
                className="scroll-mt-16"
              >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-light tracking-tight md:text-5xl">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    {service.body && Array.isArray(service.body) && service.body.length > 0 && (
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <PortableText value={service.body} />
                      </div>
                    )}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Key Features</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          {service.features.map((feature, featureIdx) => (
                            <li key={featureIdx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    {(() => {
                      try {
                        if (service.image?.asset?._ref && service.image.asset._ref.trim() !== '') {
                          return (
                            <Image
                              src={urlFor(service.image).width(800).height(600).url()}
                              alt={service.image.alt || service.title}
                              fill
                              className="object-cover"
                            />
                          )
                        }
                      } catch {
                        // Invalid image reference
                      }
                      return <div className="gradient-fallback h-full w-full" />
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : (
        <Section>
          <div className="text-center text-muted-foreground">
            <p>No services available at this time.</p>
          </div>
        </Section>
      )}
    </>
  )
}
