import { sanityClient } from './sanity.client';

/**
 * Generic Sanity fetch helper.
 * For Next.js App Router caching, use route segment config:
 * - export const revalidate = 60 (for ISR)
 * - export const dynamic = 'force-dynamic' (for no caching)
 */
export async function fetchSanity<T>(
  query: string,
  params?: Record<string, any>
): Promise<T> {
  return sanityClient.fetch<T>(query, params || {});
}

