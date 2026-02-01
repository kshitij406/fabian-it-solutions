import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'
import { PortableText } from '@/components/PortableText'
import { sanityFetch } from '@/sanity/lib/fetch'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Project } from '@/sanity/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  let project: Project | null = null
  try {
    project = await sanityFetch<Project>({
      query: projectBySlugQuery,
      params: { slug },
    })
  } catch (error) {
    console.error('Error fetching project for metadata:', error)
  }

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const title = project.seo?.title || project.title || 'Project'
  const description =
    project.seo?.description || project.shortDescription || 'Project details'
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(1200).height(630).url()
    : undefined

  const metadata: Metadata = {
    title,
    description,
  }

  if (imageUrl) {
    metadata.openGraph = {
      title,
      description,
      images: [{ url: imageUrl }],
    }
    metadata.twitter = {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    }
  } else {
    metadata.openGraph = {
      title,
      description,
    }
    metadata.twitter = {
      card: 'summary',
      title,
      description,
    }
  }

  return metadata
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await sanityFetch<Project>({
    query: projectBySlugQuery,
    params: { slug },
  })

  if (!project) {
    notFound()
  }

  const coverImageUrl = project.coverImage
    ? urlFor(project.coverImage).width(1200).height(800).url()
    : null

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/work">← Back to Work</Link>
          </Button>
          <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground">
            {project.shortDescription}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {coverImageUrl && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={coverImageUrl}
              alt={project.coverImage.alt || project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <PortableText value={project.body} />
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Gallery</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video w-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={urlFor(image).width(800).height(600).url()}
                    alt={image.alt || `Gallery image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.links && (
          <div className="mt-12 flex flex-wrap gap-4">
            {project.links.repo && (
              <Button asChild>
                <Link href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  View Repository
                </Link>
              </Button>
            )}
            {project.links.live && (
              <Button asChild variant="outline">
                <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                  Live Site
                </Link>
              </Button>
            )}
            {project.links.caseStudy && (
              <Button asChild variant="outline">
                <Link
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Case Study
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}
