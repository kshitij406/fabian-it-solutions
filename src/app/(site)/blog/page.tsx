import { Section } from '@/components/Section'
import { PostCard } from '@/components/cards/PostCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, updates, and industry news',
}

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>({ query: postsQuery })

  return (
    <Section>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Insights, updates, and industry news
        </p>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No blog posts available at this time.</p>
        </div>
      )}
    </Section>
  )
}
