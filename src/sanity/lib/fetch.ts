import { cache } from 'react'
import { client } from './client'
import type { QueryParams } from 'next-sanity'
import { ABOUT_PAGE_QUERY, HOME_PAGE_QUERY } from './queries'
import type { AboutPage, HomePage } from './types'

export const revalidate = 60 // Revalidate every 60 seconds

export const sanityFetch = cache(
  async <T = any>({
    query,
    params = {},
    revalidate: revalidateTime = revalidate,
    tags,
  }: {
    query: string
    params?: QueryParams
    revalidate?: number | false
    tags?: string[]
  }): Promise<T> => {
    return client.fetch<T>(query, params, {
      next: {
        revalidate: revalidateTime === false ? 0 : revalidateTime,
        tags,
      },
    })
  }
)

export const fetchHomePage = cache(async (): Promise<HomePage | null> => {
  try {
    return await sanityFetch<HomePage>({
      query: HOME_PAGE_QUERY,
      revalidate,
      tags: ['homePage'],
    })
  } catch {
    return null
  }
})

export const fetchAboutPage = cache(async (): Promise<AboutPage | null> => {
  try {
    return await sanityFetch<AboutPage>({
      query: ABOUT_PAGE_QUERY,
      revalidate,
      tags: ['aboutPage'],
    })
  } catch {
    return null
  }
})
