import { sanityClient } from './sanity.client';

export async function testSanityConnection() {
  const result = await sanityClient.fetch<unknown | null>(
    `*[_type match "*"][0]`
  );
  return result;
}

