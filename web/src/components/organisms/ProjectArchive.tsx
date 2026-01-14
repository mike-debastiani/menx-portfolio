'use client';

import ProjectCard, { type ProjectCardData } from './ProjectCard';
import { cn } from '@/lib';

export interface ProjectArchiveProps {
  projects: ProjectCardData[];
  className?: string;
}

/**
 * ProjectArchive - Container für die Anzeige von Projekten in einem Grid-Layout.
 * 
 * - Zeigt 2 Projekte nebeneinander auf größeren Screens (ab md: 768px)
 * - Zeigt 1 Projekt pro Zeile auf kleineren Screens
 * - Sicherstellt, dass nebeneinander liegende Cards gleich hohe Bilder und Gesamthöhe haben
 */
export default function ProjectArchive({ projects, className = '' }: ProjectArchiveProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      <div 
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: 'var(--layout-gutter)',
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} className="w-full h-full" />
        ))}
      </div>
    </div>
  );
}
