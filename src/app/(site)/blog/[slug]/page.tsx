import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'
import { PortableText } from '@/components/PortableText'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  let post: Post | null = null
  try {
    post = await sanityFetch<Post>({
      query: postBySlugQuery,
      params: { slug },
    })
  } catch (error) {
    console.error('Error fetching post for metadata:', error)
  }

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const title = post.seo?.title || post.title || 'Blog Post'
  const description = post.seo?.description || post.excerpt || 'Blog post'
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined

  const metadata: Metadata = {
    title,
    description,
  }

  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    type: 'article',
  }

  if (post.publishedAt) {
    openGraph.publishedTime = post.publishedAt
  }

  if (post.author?.name) {
    openGraph.authors = [post.author.name]
  }

  if (imageUrl) {
    openGraph.images = [{ url: imageUrl }]
    metadata.openGraph = openGraph
    metadata.twitter = {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    }
  } else {
    metadata.openGraph = openGraph
    metadata.twitter = {
      card: 'summary',
      title,
      description,
    }
  }

  return metadata
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await sanityFetch<Post>({
    query: postBySlugQuery,
    params: { slug },
  })

  if (!post) {
    notFound()
  }

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(800).url()
    : null
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/blog">← Back to Blog</Link>
          </Button>
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author.image && (
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.image.alt || post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span>{post.author.name}</span>
            </div>
            {publishedDate && <span>•</span>}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        {coverImageUrl && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* JSON-LD for BlogPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title || 'Blog Post',
              description: post.excerpt || '',
              ...(coverImageUrl && { image: coverImageUrl }),
              ...(post.publishedAt && { datePublished: post.publishedAt }),
              ...(post.author?.name && {
                author: {
                  '@type': 'Person',
                  name: post.author.name,
                  ...(post.author.image && {
                    image: urlFor(post.author.image).width(200).height(200).url(),
                  }),
                },
              }),
              publisher: {
                '@type': 'Organization',
                name: 'Fabian IT Solutions',
              },
            }),
          }}
        />
      </div>
    </Section>
  )
}
