import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  className?: string
}

export function PostCard({ post, className }: PostCardProps) {
  let imageUrl: string | null = null
  try {
    if (post.coverImage?.asset?._ref && post.coverImage.asset._ref.trim() !== '') {
      imageUrl = urlFor(post.coverImage).width(600).height(400).url()
    }
  } catch {
    // Invalid image reference, use fallback
  }
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className={cn(
        'group block overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-border',
        className
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="gradient-fallback aspect-video w-full" />
      )}
      <div className="space-y-4 p-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight">{post.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author.name}</span>
          {publishedDate && <span>{publishedDate}</span>}
        </div>
      </div>
    </Link>
  )
}
