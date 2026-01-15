import { getCaseStudyBySlug } from '@/lib/sanity.queries';
import { CaseStudyHeader, ContentBlocksRenderer } from '@/components/organisms';
import FooterSection from '@/components/organisms/FooterSection';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
