import {
  testSanityConnection,
  getPhasesWithMethods,
  getProjectsCount,
  getImpressionsCount,
} from '@/lib/sanity.queries';

export default async function SanityDebugPage() {
  try {
    const result = await testSanityConnection();

    if (!result) {
      return <p>Sanity connected, no content yet</p>;
    }

    const [phases, projectsCount, impressionsCount] = await Promise.all([
      getPhasesWithMethods(),
      getProjectsCount(),
      getImpressionsCount(),
    ]);

    return (
      <main>
        <h1>Workflow Atlas Debug Inspector</h1>
        <p>Sanity connected</p>

        <section>
          <h2>Summary</h2>
          <ul>
            <li>Total projects: {projectsCount}</li>
            <li>Total impressions: {impressionsCount}</li>
          </ul>
        </section>

        <section>
          <h2>Phases with Methods</h2>
          {phases.map((phase) => (
            <div key={phase._id}>
              <h3>
                {phase.name} (Order: {phase.order}
                {phase.color && `, Color: ${phase.color}`})
              </h3>
              <ul>
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
    return <pre>{errorMessage}</pre>;
  }
}
