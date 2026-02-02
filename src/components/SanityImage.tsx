import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { SanityImage as SanityImageType } from '@/sanity/lib/types'

type Props = {
  image?: SanityImageType | null
  altFallback: string
  className?: string
  priority?: boolean
}

export function SanityImage({ image, altFallback, className, priority }: Props) {
  const url = image?.asset?.url
  const alt = image?.alt || altFallback
  const width = image?.asset?.metadata?.dimensions?.width
  const height = image?.asset?.metadata?.dimensions?.height

  if (!url) {
    return <div className={cn('gradient-fallback', className)} aria-hidden />
  }

  // Prefer known dimensions to avoid layout shift. Fall back to fill for unknown sizes.
  if (typeof width === 'number' && typeof height === 'number' && width > 0 && height > 0) {
    return (
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn('h-auto w-full object-cover', className)}
      />
    )
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      priority={priority}
      className={cn('object-cover', className)}
    />
  )
}

