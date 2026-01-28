import { Container } from '@/components/layout';
import Button from '@/components/atoms/Button';
import SectionDescription from '@/components/molecules/SectionDescription';
import ProjectArchive, { type ProjectArchiveProps } from './ProjectArchive';
import { cn } from '@/lib';

export interface SuggestedCaseStudiesSectionProps {
  projects: ProjectArchiveProps['projects'];
  archiveHref: string;
  className?: string;
}

export default function SuggestedCaseStudiesSection({
  projects,
  archiveHref,
  className = '',
}: SuggestedCaseStudiesSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-12 md:py-20', className)}>
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
            <SectionDescription
              title="Other interesting case studies"
              titleAs="h2"
              className="md:flex-1"
            />
            <Button variant="secondary" size="sm" href={archiveHref} className="shrink-0 self-start">
              View all case studies
            </Button>
          </div>

          <ProjectArchive projects={projects} maxColumns={2} />
        </div>
      </Container>
    </section>
  );
}
