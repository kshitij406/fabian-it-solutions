'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>
        {error.digest && (
          <p className="mb-4 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
