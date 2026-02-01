import { PortableText as PortableTextComponent } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) return null
      const imageUrl = urlFor(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={value.alt || 'Image'}
              fill
              className="object-cover"
            />
          </div>
          {value.alt && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      return (
        <Link
          href={href}
          target={value?.blank ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      )
    },
    code: ({ children }: any) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-4xl font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-3 mt-6 text-3xl font-semibold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-2 mt-4 text-2xl font-semibold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-4 border-l-4 border-primary pl-4 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-7">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value || !Array.isArray(value)) return null

  return (
    <div className={className}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
