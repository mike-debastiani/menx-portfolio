import {
  testSanityConnection,
  getPhasesWithMethods,
  getProjectsCount,
  getImpressionsCount,
  getWorkflowAtlasData,
} from '@/lib/sanity.queries';
import { sanityClient } from '@/lib/sanity.client';

// Disable caching for debug page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SanityDebugPage() {
  try {
    const result = await testSanityConnection();

    if (!result) {
      return <p>Sanity connected, no content yet</p>;
    }

    // Direct queries to check raw data (including drafts)
    const [
      phases,
      projectsCount,
      impressionsCount,
      workflowData,
      rawImpressionsCount,
      rawPhasesCount,
      rawMethodsCount,
      rawProjectsCount,
      allImpressionsRaw,
      draftImpressionsCount,
      publishedImpressionsCount,
      allImpressionIds,
      totalImpressionsCheck,
    ] = await Promise.all([
      getPhasesWithMethods(),
      getProjectsCount(),
      getImpressionsCount(),
      getWorkflowAtlasData(),
      // Direct count queries without filters
      sanityClient.fetch<number>(`count(*[_type == "impression"])`),
      sanityClient.fetch<number>(`count(*[_type == "phase"])`),
      sanityClient.fetch<number>(`count(*[_type == "method"])`),
      sanityClient.fetch<number>(`count(*[_type == "project"])`),
      // Get first 20 impressions with their IDs to see what we're getting
      sanityClient.fetch<any[]>(`*[_type == "impression"][0...20] {
        _id,
        _type,
        headline,
        "methodRef": method._ref,
        "projectRef": project._ref,
        "hasMethod": defined(method),
        "hasProject": defined(project),
        "isDraft": _id match "drafts.*"
      }`),
      // Count drafts vs published
      sanityClient.fetch<number>(`count(*[_type == "impression" && _id match "drafts.*"])`),
      sanityClient.fetch<number>(`count(*[_type == "impression" && !(_id match "drafts.*")])`),
      // Try to get all impression IDs to see what's actually there
      sanityClient.fetch<{_id: string}[]>(`*[_type == "impression"] { _id }`),
      // Check if we can access drafts with a different query
      sanityClient.fetch<number>(`count(*[_type == "impression"])`),
    ]);

    const hasToken = !!process.env.SANITY_API_READ_TOKEN;

    return (
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Workflow Atlas Debug Inspector</h1>
        <p className="mb-8 text-green-600">✓ Sanity connected</p>
        
        {!hasToken && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h2 className="font-semibold text-yellow-800 mb-2">⚠ API Token fehlt</h2>
            <p className="text-sm text-yellow-700 mb-2">
              Um Draft-Dokumente abzurufen, wird möglicherweise ein API Token benötigt.
            </p>
            <p className="text-sm text-yellow-700">
              <strong>Lösung:</strong> Erstelle einen Read Token in Sanity und füge ihn als <code className="bg-yellow-100 px-1 rounded">SANITY_API_READ_TOKEN</code> in <code className="bg-yellow-100 px-1 rounded">web/.env.local</code> hinzu.
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              Sanity Studio → Project Settings → API → Add API token → Read token
            </p>
          </div>
        )}

        {rawImpressionsCount < 10 && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded">
            <h2 className="font-semibold text-red-800 mb-2">⚠ Nur {rawImpressionsCount} Impression(s) gefunden</h2>
            <p className="text-sm text-red-700 mb-2">
              Es wurden nur {rawImpressionsCount} Impression(s) im Dataset gefunden, obwohl 130+ erwartet werden.
            </p>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              <li>Prüfe, ob die Daten im richtigen Dataset (<code className="bg-red-100 px-1 rounded">development</code>) sind</li>
              <li>Prüfe, ob die Daten im Sanity Studio sichtbar sind</li>
              <li>Falls die Daten als Drafts existieren: Füge einen API Token hinzu (siehe oben)</li>
              <li>Prüfe die Project ID: <code className="bg-red-100 px-1 rounded">dn63o2e7</code></li>
            </ul>
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Raw Counts (Direct Query)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Impressions: <strong>{rawImpressionsCount}</strong></li>
                <li className="ml-4 text-gray-600">- Drafts: {draftImpressionsCount}</li>
                <li className="ml-4 text-gray-600">- Published: {publishedImpressionsCount}</li>
                <li>Phases: <strong>{rawPhasesCount}</strong></li>
                <li>Methods: <strong>{rawMethodsCount}</strong></li>
                <li>Projects: <strong>{rawProjectsCount}</strong></li>
              </ul>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Filtered Counts</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Projects (via query): <strong>{projectsCount}</strong></li>
                <li>Impressions (via query): <strong>{impressionsCount}</strong></li>
                <li>WorkflowAtlas impressions: <strong>{workflowData.impressions.length}</strong></li>
                <li>WorkflowAtlas methods: <strong>{workflowData.methods.length}</strong></li>
                <li>WorkflowAtlas phases: <strong>{workflowData.phases.length}</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Configuration Info</h2>
          <div className="bg-gray-50 p-4 rounded">
            <ul className="space-y-1 text-sm">
              <li><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET'}</li>
              <li><strong>Dataset:</strong> {process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET'}</li>
              <li><strong>API Token:</strong> {hasToken ? '✓ Set' : '✗ Not set'}</li>
              <li><strong>Token Length:</strong> {hasToken ? `${process.env.SANITY_API_READ_TOKEN?.length || 0} chars` : 'N/A'}</li>
              <li><strong>Environment:</strong> {process.env.NODE_ENV || 'unknown'}</li>
              <li><strong>Vercel:</strong> {process.env.VERCEL ? '✓ Yes' : '✗ No'}</li>
              <li><strong>Perspective:</strong> raw (includes drafts)</li>
              <li><strong>Use CDN:</strong> false</li>
            </ul>
            {!hasToken && process.env.VERCEL && (
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-sm">
                <p className="font-semibold text-red-800">⚠ Wichtig für Vercel:</p>
                <p className="text-red-700 mt-1">
                  Der API Token fehlt in Vercel Environment Variables. Gehe zu Vercel Dashboard → Settings → Environment Variables und füge <code className="bg-red-200 px-1 rounded">SANITY_API_READ_TOKEN</code> hinzu.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">All Impression IDs</h2>
          <p className="text-sm text-gray-600 mb-4">
            Total found: <strong>{allImpressionIds.length}</strong> (Check: {totalImpressionsCheck})
          </p>
          <div className="bg-gray-50 p-4 rounded max-h-60 overflow-y-auto">
            <ul className="list-disc list-inside space-y-1 text-xs font-mono">
              {allImpressionIds.map((imp: {_id: string}) => (
                <li key={imp._id}>{imp._id}</li>
              ))}
            </ul>
            {allImpressionIds.length === 0 && (
              <p className="text-gray-500 italic">Keine Impressions gefunden</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Raw Impressions (First 20)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Diese Liste zeigt die ersten 20 Impressions direkt aus Sanity (ohne Filter):
          </p>
          <div className="space-y-2">
            {allImpressionsRaw.map((impression: any) => (
              <div key={impression._id} className="border p-3 rounded text-sm">
                <p><strong>ID:</strong> {impression._id}</p>
                <p><strong>Headline:</strong> {impression.headline || 'N/A'}</p>
                <p><strong>Method Ref:</strong> {impression.methodRef || 'MISSING'}</p>
                <p><strong>Project Ref:</strong> {impression.projectRef || 'MISSING'}</p>
                <p><strong>Has Method:</strong> {impression.hasMethod ? '✓' : '✗'}</p>
                <p><strong>Has Project:</strong> {impression.hasProject ? '✓' : '✗'}</p>
                <p><strong>Is Draft:</strong> {impression.isDraft ? '✓ Yes' : '✗ No'}</p>
              </div>
            ))}
          </div>
          {rawImpressionsCount > 20 && (
            <p className="mt-4 text-gray-600">... and {rawImpressionsCount - 20} more</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">WorkflowAtlas Stats</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Impressions Count: <strong>{workflowData.stats.impressionsCount}</strong></li>
            <li>Methods with Impressions: <strong>{workflowData.stats.methodsWithImpressionsCount}</strong></li>
            <li>Phases in Dataset: <strong>{workflowData.stats.phasesInDatasetCount}</strong></li>
            <li>Projects Total: <strong>{workflowData.stats.projectsTotalCount}</strong></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Impressions Detail (First 10)</h2>
          <div className="space-y-4">
            {workflowData.impressions.slice(0, 10).map((impression) => {
              const method = impression.method as any;
              const project = impression.project as any;
              return (
                <div key={impression._id} className="border p-4 rounded">
                  <p><strong>ID:</strong> {impression._id}</p>
                  <p><strong>Headline:</strong> {impression.headline || 'N/A'}</p>
                  <p><strong>Method:</strong> {method?.name || 'MISSING'}</p>
                  <p><strong>Phase:</strong> {method?.phase?.name || 'MISSING'}</p>
                  <p><strong>Project:</strong> {project?.title || 'MISSING'}</p>
                  <p><strong>Order:</strong> {impression.order ?? 'N/A'}</p>
                </div>
              );
            })}
          </div>
          {workflowData.impressions.length > 10 && (
            <p className="mt-4 text-gray-600">... and {workflowData.impressions.length - 10} more</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Phases with Methods</h2>
          {phases.map((phase) => (
            <div key={phase._id} className="mb-6 border p-4 rounded">
              <h3 className="text-xl font-semibold">
                {phase.name} (Order: {phase.order}
                {phase.color && `, Color: ${phase.color}`})
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {phase.methods.map((method) => (
                  <li key={method._id}>
                    {method.name} (Order: {method.order}, Impressions:{' '}
                    {method.impressionCount})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <pre className="bg-red-50 p-4 rounded">{errorMessage}</pre>
      </main>
    );
  }
}
