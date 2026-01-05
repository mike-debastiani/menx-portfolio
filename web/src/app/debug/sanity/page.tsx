import { testSanityConnection } from '@/lib/sanity.queries';

export default async function SanityDebugPage() {
  try {
    const result = await testSanityConnection();

    if (result) {
      return <p>Sanity connected</p>;
    }

    return <p>Sanity connected, no content yet</p>;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    return (
      <pre>{errorMessage}</pre>
    );
  }
}

