import { getProjectBySlug } from '@/lib/sanity.queries';
import { CaseStudyHeader } from '@/components/organisms';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);

  if (!projectData) {
    notFound();
  }

  return (
    <main>
      <CaseStudyHeader data={projectData} />
    </main>
  );
}
