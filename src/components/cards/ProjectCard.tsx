import Link from 'next/link'
import type { Project } from '@/sanity/lib/types'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SanityImage } from '@/components/SanityImage'

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug.current}`} className={cn('group', className)}>
      <Card className="h-full overflow-hidden border-border/40 bg-card/80 transition-all hover:border-border">
        <div className="relative aspect-video w-full overflow-hidden">
          <SanityImage
            image={project.coverImage}
            altFallback={project.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
