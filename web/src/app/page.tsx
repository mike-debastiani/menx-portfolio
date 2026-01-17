import type { Metadata } from 'next';
import { Container } from '@/components/layout';
import HomeHeroSection from '@/components/organisms/HomeHeroSection';
import SelectedWorkSection from '@/components/organisms/SelectedWorkSection';
import WorkflowAtlasSection from '@/components/organisms/WorkflowAtlasSection';
import FooterSection from '@/components/organisms/FooterSection';
import { getWorkflowAtlasData, getSelectedProjects, getHomeData, getAboutData } from '@/lib/sanity.queries';

export const metadata: Metadata = {
  title: 'Mike De Bastiani - Digital Product Designer',
  description: 'Portfolio von Mike De Bastiani - Student und Digital Product Designer. Entdecke meine Projekte und meinen Designprozess.',
};

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [workflowAtlasData, selectedProjects, homeData, aboutData] = await Promise.all([
    getWorkflowAtlasData(),
    getSelectedProjects(),
    getHomeData(),
    getAboutData(),
  ]);

  return (
    <main>
      <Container>
        <HomeHeroSection 
          homeData={homeData}
          subInfoItems={aboutData?.subInfoItems}
        />
      </Container>
      
      <SelectedWorkSection projects={selectedProjects} />
      
      <WorkflowAtlasSection data={workflowAtlasData} />
      
      <FooterSection />
    </main>
  );
}
