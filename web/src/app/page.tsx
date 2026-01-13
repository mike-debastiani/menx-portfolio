import { Container } from '@/components/layout';
import WorkflowAtlasSection from '@/components/organisms/WorkflowAtlasSection';
import { getWorkflowAtlasData } from '@/lib/sanity.queries';

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const workflowAtlasData = await getWorkflowAtlasData();

  return (
    <main>
      <Container>
        <h1>Home</h1>
        <p>HOME PAGE - MENX</p>
        <p>This is the home page placeholder.</p>
      </Container>
      
      <WorkflowAtlasSection data={workflowAtlasData} />
    </main>
  );
}
