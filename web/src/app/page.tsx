import { Container } from '@/components/layout';
import HomeHeroSection from '@/components/organisms/HomeHeroSection';
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
        <HomeHeroSection />
      </Container>
      
      <WorkflowAtlasSection data={workflowAtlasData} />
    </main>
  );
}
