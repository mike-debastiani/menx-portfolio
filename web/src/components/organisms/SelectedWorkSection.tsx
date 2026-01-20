'use client';

import { Container } from '@/components/layout';
import ProjectArchive, { type ProjectArchiveProps } from './ProjectArchive';
import Button from '@/components/atoms/Button';
import { cn } from '@/lib';

export interface SelectedWorkSectionProps {
  projects: ProjectArchiveProps['projects'];
  className?: string;
}

/**
 * SelectedWorkSection - Homepage section displaying selected projects.
 * Features a header with title and "VIEW ALL PROJECTS" button, followed by a grid of project cards.
 */
export default function SelectedWorkSection({ projects, className = '' }: SelectedWorkSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className={cn('py-12 md:py-20', className)}>
      <Container>
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between gap-4 sm:gap-6">
            <h2 className="font-sans font-medium text-3xl min-[450px]:text-3xl leading-[1.25] text-primary-950 min-[500px]:flex-1">
              Selected Work
            </h2>
            <Button variant="secondary" size="sm" href="/relevant-work" className="shrink-0 self-start">
              VIEW ALL CASE STUDIES
            </Button>
          </div>

          {/* Project Archive */}
          <ProjectArchive projects={projects} maxColumns={2} />
        </div>
      </Container>
    </section>
  );
}
