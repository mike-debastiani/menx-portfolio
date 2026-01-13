import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// Optional: Token for authenticated requests (needed for drafts in some cases)
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable');
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: false, // Must be false to access draft documents (CDN doesn't serve drafts)
  perspective: 'raw', // Include both published and draft documents
  token, // Optional token for authenticated requests
});

/**
 * Builds a Sanity image URL from an image reference.
 * Falls back to a simple CDN URL if imageUrlBuilder is not available.
 */
export function urlForImage(source: any, options?: { width?: number; height?: number; fit?: string }): string | null {
  if (!source?.asset?._ref) {
    return null;
  }

  try {
    // Try to use @sanity/image-url if available
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imageUrlBuilder = require('@sanity/image-url');
    const builder = imageUrlBuilder.default || imageUrlBuilder;
    let urlBuilder = builder(sanityClient).image(source);
    
    if (options?.width) urlBuilder = urlBuilder.width(options.width);
    if (options?.height) urlBuilder = urlBuilder.height(options.height);
    if (options?.fit) urlBuilder = urlBuilder.fit(options.fit);
    
    return urlBuilder.url();
  } catch {
    // Fallback: build URL manually
    const ref = source.asset._ref;
    // Sanity image ref format: image-{id}-{width}x{height}-{format}
    const parts = ref.split('-');
    if (parts.length < 4) return null;
    
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    
    const params = new URLSearchParams();
    if (options?.width) params.set('w', String(options.width));
    if (options?.height) params.set('h', String(options.height));
    if (options?.fit) params.set('fit', options.fit);
    
    const query = params.toString();
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}${query ? `?${query}` : ''}`;
  }
}
