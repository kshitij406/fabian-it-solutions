import { Section } from '@/components/Section'
import { PortableText } from '@/components/PortableText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { fetchAboutPage, fetchHomePage } from '@/sanity/lib/fetch'
import type { Metadata } from 'next'
import { SanityImage } from '@/components/SanityImage'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Fabian IT Solutions',
}

export default async function AboutPage() {
  const [aboutPage, homePage] = await Promise.all([
    fetchAboutPage(),
    fetchHomePage(),
  ])

  const headline = aboutPage?.headline || 'About Fabian IT Solutions'
  const intro = aboutPage?.intro
  const body = aboutPage?.body

  const founder = aboutPage?.founder || homePage?.founder

  return (
    <>
      <Section>
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-light tracking-tight md:text-5xl">
              {headline}
            </h1>
            {intro ? (
              <p className="text-lg text-muted-foreground">{intro}</p>
            ) : null}
          </div>

          {body ? (
            <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none">
              <PortableText value={body} />
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              Content will be added soon.
            </p>
          )}
        </div>
      </Section>

      {founder ? (
        <Section className="bg-muted/30">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border/50 bg-card mx-auto lg:mx-0">
              <SanityImage
                image={founder.image}
                altFallback={`${founder.name}, ${founder.role}`}
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
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

      {aboutPage?.values && aboutPage.values.length > 0 ? (
        <Section>
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-light tracking-tight md:text-4xl">
                What We Value
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutPage.values.map((value) => (
                <Card key={value.title} className="border-border/50 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </>
  )
}
