'use client';

import { useEffect, useState } from 'react';
import ProjectCard, { type ProjectCardData } from './ProjectCard';
import ScrollReveal from '@/components/atoms/ScrollReveal';
import { cn } from '@/lib';

export interface ProjectArchiveProps {
  projects: ProjectCardData[];
  className?: string;
  maxColumns?: 2 | 3;
  firstRowRevealThreshold?: number;
}

/**
 * ProjectArchive - Container für die Anzeige von Projekten in einem Grid-Layout.
 * 
 * - Zeigt 1 Projekt pro Zeile auf kleineren Screens
 * - Zeigt 2 Projekte nebeneinander auf größeren Screens (ab md: 768px)
 * - Zeigt 3 Projekte nebeneinander auf sehr großen Screens (ab 2xl: 1536px), wenn maxColumns === 3
 * - Sicherstellt, dass nebeneinander liegende Cards gleich hohe Bilder und Gesamthöhe haben
 */
function getColumnsForWidth(width: number, maxColumns: 2 | 3): number {
  if (width < 768) return 1;
  if (maxColumns === 2) return 2;
  return width >= 1536 ? 3 : 2;
}

export default function ProjectArchive({
  projects,
  className = '',
  maxColumns = 3,
  firstRowRevealThreshold,
}: ProjectArchiveProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const columns = getColumnsForWidth(viewportWidth, maxColumns);

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
          <ScrollReveal
            key={`${project.slug}-${index}`}
            delay={index * 80}
            threshold={firstRowRevealThreshold && index < columns ? firstRowRevealThreshold : undefined}
          >
            <ProjectCard project={project} className="w-full h-full" maxColumns={maxColumns} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
