import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Post Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
    </Section>
  )
}
