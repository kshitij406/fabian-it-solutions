import { cache } from 'react'
import { client } from './client'
import type { QueryParams } from 'next-sanity'

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
