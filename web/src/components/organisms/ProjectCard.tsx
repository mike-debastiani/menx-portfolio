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
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const [pillSize, setPillSize] = useState<PillSize>('sm');

  useEffect(() => {
    const updatePillSize = () => {
      if (window.innerWidth >= 1536) {
        // 2xl breakpoint
        setPillSize('xs');
      } else {
        setPillSize('sm');
      }
    };

    updatePillSize();
    window.addEventListener('resize', updatePillSize);
    return () => window.removeEventListener('resize', updatePillSize);
  }, []);

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
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
          <Button variant="secondary" icon="right" size="sm">
            VIEW PROJECTS
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
          <h3 className="text-2xl 2xl:text-xl font-medium text-primary-950 leading-[1.2]">{project.title}</h3>
          <p className="text-base 2xl:text-sm font-normal text-primary-950 leading-[1.5]">{project.excerpt}</p>
        </div>
      </div>
    </Link>
  );
}

