'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import ImpressionCard from './ImpressionCard';
import ImpressionDetailCard from './ImpressionDetailCard';
import Pill from '@/components/atoms/Pill';
import { PhaseColorVariant } from './ImpressionCard';

export interface ImpressionItemProps {
  id: string;
  imageSrc: string;
  imageAlt: string;
  methodName: string;
  phaseColorVariant: PhaseColorVariant;
  projectTitle: string;
  exampleTitle: string;
  description: string;
  projectSlug: string;
  defaultExpanded?: boolean;
  onToggle?: (id: string, expanded: boolean) => void;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ImpressionItem({
  id,
  imageSrc,
  imageAlt,
  methodName,
  phaseColorVariant,
  projectTitle,
  exampleTitle,
  description,
  projectSlug,
  defaultExpanded = false,
  onToggle,
  className = '',
  priority = false,
  sizes,
}: ImpressionItemProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // Sync internal state with defaultExpanded prop changes
  useEffect(() => {
    setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleToggle = useCallback(() => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
    if (onToggle) {
      onToggle(id, nextExpanded);
    }
  }, [expanded, id, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`
        relative mx-auto transition-all duration-500 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded-lg overflow-hidden
        ${expanded ? 'col-span-2' : 'col-span-1'}
        ${className}
      `}
      style={{
        width: expanded ? '648px' : '324px',
        maxWidth: expanded ? '648px' : '324px',
      }}
    >
      <div className="flex items-start gap-0 relative">
        {/* Left: Image Container with Pill */}
        <div className="flex-shrink-0 w-[324px]">
          <div className="flex flex-col gap-3 items-start">
            {/* Image Container - exact height match with DetailCard */}
            <div
              className={`
                relative w-full h-[475px] border border-primary-100 overflow-hidden transition-all duration-500 ease-in-out
                ${expanded ? 'rounded-tl-xl rounded-bl-xl border-r-0' : 'rounded-xl'}
              `}
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority={priority}
                  sizes={sizes}
                />
              ) : (
                <div className="w-full h-full bg-primary-50" aria-hidden="true" />
              )}
            </div>
            {/* Pill below image - self-start to maintain natural width */}
            <Pill variant={phaseColorVariant} size="sm" className="self-start">
              {methodName}
            </Pill>
          </div>
        </div>

        {/* Right: Detail Card */}
        <div
          className={`
            flex-shrink-0 h-[475px] overflow-hidden transition-all duration-500 ease-in-out
            ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
            ${prefersReducedMotion ? 'transition-opacity duration-300' : ''}
          `}
          style={{
            width: expanded ? '324px' : '0px',
            minWidth: expanded ? '324px' : '0px',
          }}
        >
          <div className="h-full w-[324px]">
            <ImpressionDetailCard
              projectTitle={projectTitle}
              exampleTitle={exampleTitle}
              description={description}
              projectSlug={projectSlug}
              className="h-full border-l-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

