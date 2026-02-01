import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

function getWriteToken(): string {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error(
      'Missing environment variable: SANITY_API_WRITE_TOKEN (required for contact form)'
    )
  }
  return token
}

let _writeClient: ReturnType<typeof createClient> | null = null

/**
 * Server-only write client with token authentication
 * Use this for mutations (create, update, delete)
 * Client is created lazily on first use to avoid build-time validation
 */
export function getWriteClient() {
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: getWriteToken(),
      useCdn: false,
    })
  }
  return _writeClient
}
