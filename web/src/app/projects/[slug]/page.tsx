import type { Metadata } from 'next';
import { getCaseStudyBySlug } from '@/lib/sanity.queries';
import { CaseStudyHeader, ContentBlocksRenderer } from '@/components/organisms';
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
    title: `${caseStudyData.title} - Mike De Bastiani`,
    description: caseStudyData.excerpt || `Projekt-Detailseite: ${caseStudyData.title}`,
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudyData = await getCaseStudyBySlug(slug);

  if (!caseStudyData) {
    notFound();
  }

  return (
    <main>
      <CaseStudyHeader data={caseStudyData} />
      {caseStudyData.contentBlocks && caseStudyData.contentBlocks.length > 0 && (
        <ContentBlocksRenderer blocks={caseStudyData.contentBlocks as any} />
      )}
      <FooterSection />
    </main>
  );
}
