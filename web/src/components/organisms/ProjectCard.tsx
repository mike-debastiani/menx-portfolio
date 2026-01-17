'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill, type PillSize } from '@/components/atoms';
import Button from '@/components/atoms/Button';

export interface ProjectCardData {
  slug: string;
  title: string;
  excerpt: string;
  tags?: string[];
  image?: {
    src: string;
    alt?: string;
  } | null;
}

export interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
  maxColumns?: 2 | 3;
}

export default function ProjectCard({ project, className = '', maxColumns = 2 }: ProjectCardProps) {
  const [pillSize, setPillSize] = useState<PillSize>('xs');

  useEffect(() => {
    const updatePillSize = () => {
      const width = window.innerWidth;
      
      // If maxColumns === 3 and we're in 3-column layout (2xl: 1536px+), use xs
      if (maxColumns === 3 && width >= 1536) {
        setPillSize('xs');
      } else if (width > 1300) {
        // Desktop with 2 columns: > 1300px
        setPillSize('sm');
      } else {
        // Tablet & Mobile: <= 1300px
        setPillSize('xs');
      }
    };

    updatePillSize();
    window.addEventListener('resize', updatePillSize);
    return () => window.removeEventListener('resize', updatePillSize);
  }, [maxColumns]);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col gap-2 pb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded-xl ${className}`}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[820/520] rounded-xl overflow-hidden">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt || project.title}
            width={820}
            height={520}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-50" aria-hidden="true" />
        )}

        {/* Hover Overlay - Subtle gradient fade over entire image */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-25 group-focus-within:opacity-25 transition-opacity duration-150 pointer-events-none rounded-xl"
          style={{
            background: 'radial-gradient(100% 100% at 100% 0%, rgb(10, 10, 10) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hover Button Overlay */}
        <div className="absolute top-3 right-3 min-[451px]:top-4 min-[451px]:right-4 min-[1301px]:top-6 min-[1301px]:right-6 2xl:top-5 2xl:right-5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
          <Button variant="secondary" icon="right" size="sm">
            VIEW PROJECT
          </Button>
        </div>
      </div>

      {/* Project Info Container */}
      <div className="flex flex-col gap-4 2xl:gap-3">
        {/* Pills Row */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 2xl:gap-1.5">
            {project.tags.map((tag, index) => (
              <Pill key={index} variant="default" size={pillSize}>
                {tag}
              </Pill>
            ))}
          </div>
        )}

        {/* Text Container */}
        <div className="flex flex-col gap-3 2xl:gap-2 px-2">
          <h3 className="text-lg min-[1301px]:text-2xl font-medium text-primary-950 leading-[1.2]">{project.title}</h3>
          <p className="text-sm min-[1301px]:text-base font-normal text-primary-950 leading-[1.4]">{project.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}

