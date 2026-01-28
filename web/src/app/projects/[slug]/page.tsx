import type { Metadata } from 'next';
import { getCaseStudyBySlug, getProjectCategoryBySlug, getSuggestedProjectsByCategory, getWorkflowAtlasProjectData } from '@/lib/sanity.queries';
import { CaseStudyHeader, ContentBlocksRenderer, SuggestedCaseStudiesSection, WorkflowAtlasSection } from '@/components/organisms';
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
  const projectCategory = await getProjectCategoryBySlug(slug);
  const suggestedProjects = projectCategory
    ? await getSuggestedProjectsByCategory(projectCategory, slug)
    : [];
  const archiveHref = projectCategory === 'lab' ? '/lab-projects' : '/relevant-work';

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
      {projectCategory && suggestedProjects.length > 0 && (
        <SuggestedCaseStudiesSection projects={suggestedProjects} archiveHref={archiveHref} />
      )}
      <FooterSection />
    </main>
  );
}
