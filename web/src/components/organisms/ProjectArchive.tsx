'use client';

import ProjectCard, { type ProjectCardData } from './ProjectCard';
import { cn } from '@/lib';

export interface ProjectArchiveProps {
  projects: ProjectCardData[];
  className?: string;
  maxColumns?: 2 | 3;
}

/**
 * ProjectArchive - Container für die Anzeige von Projekten in einem Grid-Layout.
 * 
 * - Zeigt 1 Projekt pro Zeile auf kleineren Screens
 * - Zeigt 2 Projekte nebeneinander auf größeren Screens (ab md: 768px)
 * - Zeigt 3 Projekte nebeneinander auf sehr großen Screens (ab 2xl: 1536px), wenn maxColumns === 3
 * - Sicherstellt, dass nebeneinander liegende Cards gleich hohe Bilder und Gesamthöhe haben
 */
export default function ProjectArchive({ projects, className = '', maxColumns = 3 }: ProjectArchiveProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const gridClasses = maxColumns === 2 
    ? 'grid grid-cols-1 md:grid-cols-2'
    : 'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3';

  return (
    <div className={cn('w-full', className)}>
      <div 
        className={gridClasses}
        style={{
          gap: 'var(--layout-gutter)',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={`${project.slug}-${index}`} project={project} className="w-full h-full" />
        ))}
      </div>
    </div>
  );
}
