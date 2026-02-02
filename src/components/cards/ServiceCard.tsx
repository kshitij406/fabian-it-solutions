import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

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
    <Link href={`/services#${service.slug.current}`} className={cn('group', className)}>
      <Card className="h-full overflow-hidden border-border/40 bg-card/80 transition-all hover:border-border">
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={service.image?.alt || service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium tracking-tight">{service.title}</h3>
            <Sparkles className="h-4 w-4 text-muted-foreground/70" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.shortDescription}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
