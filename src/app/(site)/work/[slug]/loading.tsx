import { Section } from '@/components/Section'

export default function Loading() {
  return (
    <Section>
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-8 h-4 w-32 rounded bg-muted" />
        <div className="mb-4 h-10 w-3/4 rounded bg-muted" />
        <div className="mb-12 h-6 w-1/2 rounded bg-muted" />
        <div className="mb-12 aspect-video w-full rounded-lg bg-muted" />
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </div>
    </Section>
  )
}
