import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { PostCard } from '@/components/cards/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  siteSettingsQuery,
  servicesQuery,
  featuredProjectsQuery,
  testimonialsQuery,
  postsQuery,
} from '@/sanity/lib/queries'
import type {
  SiteSettings,
  Service,
  Project,
  Testimonial,
  Post,
} from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import type { Metadata } from 'next'
import {
  seedSiteSettings,
  seedServices,
  seedProjects,
  seedTestimonials,
  seedPosts,
} from '@/lib/seed-data'

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
  const [siteSettings, services, featuredProjects, testimonials, posts] =
    await Promise.all([
      sanityFetch<SiteSettings>({ query: siteSettingsQuery }).catch(() => null),
      sanityFetch<Service[]>({ query: servicesQuery }).catch(() => []),
      sanityFetch<Project[]>({ query: featuredProjectsQuery }).catch(() => []),
      sanityFetch<Testimonial[]>({ query: testimonialsQuery }).catch(() => []),
      sanityFetch<Post[]>({ query: postsQuery, revalidate: 60 }).catch(() => []),
    ])

  const settings = siteSettings || seedSiteSettings
  const displayServices = services.length > 0 ? services : seedServices
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : seedProjects
  const displayTestimonials = testimonials.length > 0 ? testimonials : seedTestimonials
  const displayPosts = posts.length > 0 ? posts : seedPosts

  const recentPosts = displayPosts.slice(0, 3)

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
      {displayServices.length > 0 && (
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
            {displayServices.slice(0, 6).map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          {displayServices.length > 6 && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          )}
        </Section>
      )}

      {/* Featured Projects */}
      {displayProjects.length > 0 && (
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
            {displayProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/work">View All Projects</Link>
            </Button>
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {displayTestimonials.length > 0 && (
        <Section className="bg-muted/30">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayTestimonials.slice(0, 6).map((testimonial) => (
              <div
                key={testimonial._id}
                className="space-y-4 rounded-lg border border-border/40 bg-card p-8"
              >
                {testimonial.avatar && (
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={urlFor(testimonial.avatar)
                          .width(48)
                          .height(48)
                          .url()}
                        alt={testimonial.avatar.alt || testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      {(testimonial.role || testimonial.company) && (
                        <p className="text-sm text-muted-foreground">
                          {[testimonial.role, testimonial.company]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                {testimonial.rating && (
                  <p className="text-sm text-muted-foreground">
                    {'★'.repeat(testimonial.rating)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Blog Preview */}
      {recentPosts.length > 0 && (
        <Section id="blog">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-4xl font-light tracking-tight md:text-5xl">
              Latest from Our Blog
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Insights, updates, and industry news
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </Section>
      )}

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
