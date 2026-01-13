import { sanityClient } from '@/lib/sanity.client';

// Disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Server-side test page to directly query Sanity API
 * This helps verify if the issue is with the API or the configuration
 */
export default async function SanityTestPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dn63o2e7';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';
  const hasToken = !!process.env.SANITY_API_READ_TOKEN;

  let result: any = null;
  let error: string | null = null;

  try {
    // Test direct query using the configured client
    const query = `*[_type == "impression"] { _id, headline, "isDraft": _id match "drafts.*" }`;
    const impressions = await sanityClient.fetch<any[]>(query);
    
    result = {
      count: impressions.length,
      drafts: impressions.filter((i: any) => i.isDraft).length,
      published: impressions.filter((i: any) => !i.isDraft).length,
      sample: impressions.slice(0, 10),
    };
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sanity API Direct Test</h1>
      
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h2 className="font-semibold mb-2">Configuration</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Project ID:</strong> {projectId}</li>
          <li><strong>Dataset:</strong> {dataset}</li>
          <li><strong>Token:</strong> {hasToken ? '✓ Set' : '✗ Not set'}</li>
          <li><strong>Environment:</strong> {process.env.NODE_ENV}</li>
          <li><strong>Vercel:</strong> {process.env.VERCEL ? '✓ Yes' : '✗ No'}</li>
        </ul>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-800">Error</h3>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {!hasToken && process.env.VERCEL && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="font-semibold text-red-800 mb-2">⚠ Token fehlt auf Vercel!</h3>
          <p className="text-red-700 text-sm mb-2">
            Der Token ist nicht gesetzt. Gehe zu Vercel Dashboard → Settings → Environment Variables
            und füge <code className="bg-red-200 px-1 rounded">SANITY_API_READ_TOKEN</code> hinzu.
          </p>
          <p className="text-red-700 text-sm">
            <strong>WICHTIG:</strong> Stelle sicher, dass <strong>Production</strong> aktiviert ist!
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Query Results</h3>
            <ul className="text-sm space-y-1">
              <li><strong>Total Count:</strong> {result.count}</li>
              <li><strong>Drafts:</strong> {result.drafts}</li>
              <li><strong>Published:</strong> {result.published}</li>
            </ul>
            {result.sample.length > 0 && (
              <div className="mt-2">
                <strong>Sample Data (first 10):</strong>
                <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto max-h-60">
                  {JSON.stringify(result.sample, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">Wichtig</h3>
        <p className="text-sm text-yellow-700">
          Diese Seite testet die Sanity API direkt. Falls hier auch nur 1 Impression zurückkommt,
          liegt das Problem nicht an Vercel oder der Konfiguration, sondern daran, dass die Daten
          tatsächlich nicht im Dataset vorhanden sind oder in einem anderen Projekt/Dataset liegen.
        </p>
      </div>
    </main>
  );
}
