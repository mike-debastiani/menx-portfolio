import { Container, Grid } from '@/components/layout';
import ProjectArchiveHeader from '@/components/molecules/ProjectArchiveHeader';
import ProjectArchive from '@/components/organisms/ProjectArchive';
import FooterSection from '@/components/organisms/FooterSection';
import { getLabProjects } from '@/lib/sanity.queries';

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LabProjectsPage() {
  const projects = await getLabProjects();

  return (
    <main>
      <Container>
        <div className="flex flex-col gap-10 py-20">
          <Grid>
            <ProjectArchiveHeader
              title="Lab Projects"
              description="Experimental work, side projects, and explorations beyond traditional UX boundaries."
              category="Non UX Related Works"
              projectCount={projects.length}
              countLabel="Projects"
            />
          </Grid>
          <ProjectArchive projects={projects} />
        </div>
      </Container>
      <FooterSection />
    </main>
  );
}
