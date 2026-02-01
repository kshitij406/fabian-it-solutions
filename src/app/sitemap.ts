import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  siteSettingsQuery,
  servicesQuery,
  projectsQuery,
  postsQuery,
} from '@/sanity/lib/queries'
import type { SiteSettings, Service, Project, Post } from '@/sanity/lib/types'

export const revalidate = 300 // Revalidate sitemap every 5 minutes

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://fabianit.com')

  const [siteSettings, services, projects, posts] = await Promise.all([
    sanityFetch<SiteSettings>({ query: siteSettingsQuery, revalidate: 300 }),
    sanityFetch<Service[]>({ query: servicesQuery, revalidate: 300 }),
    sanityFetch<Project[]>({ query: projectsQuery, revalidate: 300 }),
    sanityFetch<Post[]>({ query: postsQuery, revalidate: 300 }),
  ])

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Add project pages
  if (projects && Array.isArray(projects)) {
    projects.forEach((project) => {
      if (project?.slug?.current) {
        routes.push({
          url: `${baseUrl}/work/${project.slug.current}`,
          lastModified: project.completedAt
            ? new Date(project.completedAt)
            : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  }

  // Add blog post pages
  if (posts && Array.isArray(posts)) {
    posts.forEach((post) => {
      if (post?.slug?.current && post?.publishedAt) {
        routes.push({
          url: `${baseUrl}/blog/${post.slug.current}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  }

  return routes
}
