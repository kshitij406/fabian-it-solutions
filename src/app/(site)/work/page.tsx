import { Section } from '@/components/Section'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { sanityFetch } from '@/sanity/lib/fetch'
import { projectsQuery } from '@/sanity/lib/queries'
import type { Project } from '@/sanity/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Showcasing our latest projects and innovations',
}

export default async function WorkPage() {
  const projects = await sanityFetch<Project[]>({ query: projectsQuery })

  return (
    <Section>
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Our Work</h1>
        <p className="text-lg text-muted-foreground">
          Showcasing our latest projects and innovations
        </p>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>No projects available at this time.</p>
        </div>
      )}
    </Section>
  )
}
