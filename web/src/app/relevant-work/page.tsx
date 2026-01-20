import type { Metadata } from 'next';
import { Container, Grid } from '@/components/layout';
import ProjectArchiveHeader from '@/components/molecules/ProjectArchiveHeader';
import ProjectArchive from '@/components/organisms/ProjectArchive';
import FooterSection from '@/components/organisms/FooterSection';
import { getRelevantWorkProjects } from '@/lib/sanity.queries';

export const metadata: Metadata = {
  title: 'User Experience Case Studies - Mike De Bastiani',
  description: 'User Experience Case Studies von Mike De Bastiani. Entdecke, wie ich User Needs und Business Goals in digitale Erfahrungen transformiere.',
};

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RelevantWorkPage() {
  const projects = await getRelevantWorkProjects();

  return (
    <main>
      <Container>
        <div className="flex flex-col gap-14 md:gap-20 pt-12 md:pt-20">
          <Grid>
            <ProjectArchiveHeader
              title="User Experience Case Studies"
              description="Every project starts with understanding the real problem. Here's how I transform user needs and business goals into digital experiences that deliver results."
              category="UX Related Projects"
              projectCount={projects.length}
              countLabel="Case Studies"
            />
          </Grid>
          <ProjectArchive projects={projects} />
        </div>
      </Container>
      <FooterSection />
    </main>
  );
}
