import { Container } from '@/components/layout';
import HomeHeroSection from '@/components/organisms/HomeHeroSection';
import SelectedWorkSection from '@/components/organisms/SelectedWorkSection';
import WorkflowAtlasSection from '@/components/organisms/WorkflowAtlasSection';
import FooterSection from '@/components/organisms/FooterSection';
import { getWorkflowAtlasData, getSelectedProjects } from '@/lib/sanity.queries';

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [workflowAtlasData, selectedProjects] = await Promise.all([
    getWorkflowAtlasData(),
    getSelectedProjects(),
  ]);

  return (
    <main>
      <Container>
        <HomeHeroSection />
      </Container>
      
      <SelectedWorkSection projects={selectedProjects} />
      
      <WorkflowAtlasSection data={workflowAtlasData} />
      
      <FooterSection />
    </main>
  );
}
