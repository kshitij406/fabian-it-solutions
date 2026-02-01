import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  siteSettingsQuery,
  servicesQuery,
  featuredProjectsQuery,
} from '@/sanity/lib/queries'
import type {
  SiteSettings,
  Service,
  Project,
} from '@/sanity/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Enterprise-grade IT solutions designed to elevate your business',
  openGraph: {
    title: 'Fabian IT Solutions',
    description: 'Enterprise-grade IT solutions designed to elevate your business',
    type: 'website',
  },
}

export default async function HomePage() {
  const [siteSettings, services, featuredProjects] =
    await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery }).catch(() => null),
      sanityFetch<Service[]>({ query: servicesQuery }).catch(() => []),
      sanityFetch<Project[]>({ query: featuredProjectsQuery }).catch(() => []),
    ])

  const settings = siteSettings || {
    brandName: 'Fabian IT Solutions',
    description: 'Enterprise-grade IT solutions designed to elevate your business. We deliver secure, scalable systems that drive growth.',
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pb-12 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-light tracking-tight md:text-6xl lg:text-7xl">
                {settings.brandName}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed md:text-2xl">
                {settings.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/services">Our Services</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              <span>Systems</span>
              <span>·</span>
              <span>Security</span>
              <span>·</span>
              <span>Cloud</span>
              <span>·</span>
              <span>Automation</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/hero/main.jpg"
              alt="Modern IT infrastructure"
              fill
              className="object-cover"
              priority
            />
            <div className="gradient-fallback absolute inset-0 -z-10" />
          </div>
        </div>
      </Section>

      {/* Services Preview */}
      {services.length > 0 ? (
        <Section id="services" className="bg-muted/30">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive IT solutions tailored to your needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          {services.length > 6 && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          )}
        </Section>
      ) : (
        <Section id="services" className="bg-muted/30">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              Our Services
            </h2>
            <p className="text-muted-foreground">No services available yet.</p>
          </div>
        </Section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 ? (
        <Section id="work">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              Featured Work
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Showcasing our latest projects and innovations
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/work">View All Projects</Link>
            </Button>
          </div>
        </Section>
      ) : (
        <Section id="work">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              Featured Work
            </h2>
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        </Section>
      )}

      {/* Founder Section */}
      <Section className="bg-muted/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg mx-auto lg:mx-0">
            <Image
              src="/images/founder/founder.jpg"
              alt="Fabian Kivipa, Founder"
              fill
              className="object-cover"
            />
            <div className="gradient-fallback absolute inset-0 -z-10" />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-light tracking-tight md:text-5xl">
                Meet the Founder
              </h2>
              <div className="space-y-2">
                <h3 className="text-2xl font-medium tracking-tight">
                  Fabian Kivipa
                </h3>
                <p className="text-muted-foreground">
                  Founder, Fabian IT Solutions
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a passion for technology and a commitment to excellence, Fabian Kivipa founded Fabian IT Solutions to deliver enterprise-grade IT solutions that transform businesses. Combining technical expertise with strategic vision, Fabian leads the team in creating innovative systems that drive growth and efficiency.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-foreground text-background">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="text-4xl font-light tracking-tight md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-background/80 md:text-xl">
            Let's discuss how we can help transform your business with
            innovative IT solutions.
          </p>
          <Button asChild size="lg" variant="secondary" className="h-12 px-8">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
