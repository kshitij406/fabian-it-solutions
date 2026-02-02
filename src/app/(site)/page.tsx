import Link from 'next/link'
import Image from 'next/image'
import { existsSync } from 'fs'
import path from 'path'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { sanityFetch, fetchHomePage } from '@/sanity/lib/fetch'
import { servicesQuery, featuredProjectsQuery } from '@/sanity/lib/queries'
import type { Service, Project } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
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
  const [homePage, services, featuredProjects] = await Promise.all([
    fetchHomePage(),
    sanityFetch<Service[]>({ query: servicesQuery }).catch(() => []),
    sanityFetch<Project[]>({ query: featuredProjectsQuery }).catch(() => []),
  ])

  const heroHeadline = homePage?.heroHeadline || 'Fabian IT Solutions'
  const heroSubheadline =
    homePage?.heroSubheadline || 'Modern IT services for growing teams.'
  const primaryCTA = homePage?.primaryCTA || 'Contact Us'
  const primaryCTAHref = homePage?.primaryCTAHref || '/contact'
  const secondaryCTA = homePage?.secondaryCTA
  const secondaryCTAHref = homePage?.secondaryCTAHref || '/services'
  const trustItems = homePage?.trustItems || []

  const heroImagePath = path.join(
    process.cwd(),
    'public',
    'images',
    'hero',
    'main.jpg'
  )
  const heroImageExists = existsSync(heroImagePath)

  let founderImageUrl: string | null = null
  const localFounderPath = path.join(
    process.cwd(),
    'public',
    'images',
    'founder',
    'founder.jpg'
  )
  const localFounderExists = existsSync(localFounderPath)

  if (homePage?.founder?.image?.asset?._ref) {
    try {
      founderImageUrl = urlFor(homePage.founder.image).width(600).height(600).url()
    } catch {
      founderImageUrl = null
    }
  }

  const founder = homePage?.founder

  return (
    <>
      {/* Hero Section */}
      <Section className="pb-12 md:pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-light tracking-tight md:text-6xl">
                {heroHeadline}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed md:text-2xl">
                {heroSubheadline}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href={primaryCTAHref}>{primaryCTA}</Link>
              </Button>
              {secondaryCTA ? (
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href={secondaryCTAHref}>{secondaryCTA}</Link>
                </Button>
              ) : null}
            </div>
            {trustItems.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {trustItems.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/50 bg-card">
            {heroImageExists ? (
              <Image
                src="/images/hero/main.jpg"
                alt="Modern IT infrastructure"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="hero-gradient absolute inset-0" />
            )}
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

      {/* About Preview */}
      {homePage?.aboutPreviewTitle || homePage?.aboutPreviewBody ? (
        <Section className="bg-muted/30">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-light tracking-tight md:text-5xl">
                {homePage?.aboutPreviewTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {homePage?.aboutPreviewBody}
              </p>
              <Button asChild variant="link" className="px-0">
                <Link href="/about">Learn more about us</Link>
              </Button>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Consulting Focus
                </p>
                <Separator />
                <div className="grid gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Strategy & Roadmaps</span>
                    <span>01</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security & Compliance</span>
                    <span>02</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cloud & Modernization</span>
                    <span>03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ) : null}

      {/* Founder Section */}
      {founder ? (
        <Section>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border/50 bg-card mx-auto lg:mx-0">
              {founderImageUrl ? (
                <Image
                  src={founderImageUrl}
                  alt={founder.image?.alt || `${founder.name}, ${founder.role}`}
                  fill
                  className="object-cover"
                />
              ) : localFounderExists ? (
                <Image
                  src="/images/founder/founder.jpg"
                  alt={`${founder.name}, ${founder.role}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="gradient-fallback absolute inset-0" />
              )}
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Founder
                </p>
                <h2 className="text-4xl font-light tracking-tight md:text-5xl">
                  {founder.name}
                </h2>
                <p className="text-muted-foreground">{founder.role}</p>
              </div>
              <Separator />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {founder.bio}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {founder.email ? (
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {founder.email}
                  </a>
                ) : null}
                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Section>
      ) : null}

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
