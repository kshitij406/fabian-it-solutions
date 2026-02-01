import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  let imageUrl: string | null = null
  try {
    if (project.coverImage?.asset?._ref && project.coverImage.asset._ref.trim() !== '') {
      imageUrl = urlFor(project.coverImage).width(600).height(400).url()
    }
  } catch {
    // Invalid image reference, use fallback
  }

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className={cn(
        'group block overflow-hidden rounded-lg border border-border/40 bg-card transition-all hover:border-border',
        className
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.coverImage?.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="gradient-fallback aspect-video w-full" />
      )}
      <div className="space-y-4 p-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
