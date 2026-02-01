import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
