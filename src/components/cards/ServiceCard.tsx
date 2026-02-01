import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  let imageUrl: string | null = null
  try {
    if (service.image?.asset?._ref && service.image.asset._ref.trim() !== '') {
      imageUrl = urlFor(service.image).width(400).height(300).url()
    }
  } catch {
    // Invalid image reference, skip image
  }

  return (
    <Link
      href={`/services#${service.slug.current}`}
      className={cn(
        'group block space-y-4 rounded-lg border border-border/40 bg-card p-8 transition-all hover:border-border',
        className
      )}
    >
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={service.image?.alt || service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-medium tracking-tight">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.shortDescription}
        </p>
      </div>
    </Link>
  )
}
