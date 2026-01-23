import type { Metadata } from 'next';
import { getCaseStudyBySlug, getWorkflowAtlasProjectData } from '@/lib/sanity.queries';
import { CaseStudyHeader, ContentBlocksRenderer, WorkflowAtlasSection } from '@/components/organisms';
import FooterSection from '@/components/organisms/FooterSection';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudyData = await getCaseStudyBySlug(slug);

  if (!caseStudyData) {
    return {
      title: 'Project - Mike De Bastiani',
      description: 'Projekt-Detailseite von Mike De Bastiani',
    };
  }

  return {
    title: `${caseStudyData.projectTitle || 'Project'} - Mike De Bastiani`,
    description: caseStudyData.projectDescription || caseStudyData.projectStatement || `Projekt-Detailseite: ${caseStudyData.projectTitle || 'Project'}`,
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudyData = await getCaseStudyBySlug(slug);
  const workflowAtlasData = await getWorkflowAtlasProjectData(slug);

  if (!caseStudyData) {
    notFound();
  }

  return (
    <main>
      <CaseStudyHeader data={caseStudyData} />
      {caseStudyData.contentBlocks && caseStudyData.contentBlocks.length > 0 && (
        <ContentBlocksRenderer blocks={caseStudyData.contentBlocks as any} />
      )}
      {workflowAtlasData.impressions.length > 0 && (
        <WorkflowAtlasSection
          data={workflowAtlasData}
          title="Workflow Atlas of this Project"
          description="A focused snapshot of the methods behind this project. This condensed Workflow Atlas highlights only the phases and techniques applied here, showing the key artifacts and decisions that shaped the outcome."
          showStats={false}
          showProjectLink={false}
        />
      )}
      <FooterSection />
    </main>
  );
}
