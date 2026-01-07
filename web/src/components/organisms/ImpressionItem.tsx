'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ImpressionCard, { type ImpressionCardProps, type MethodColorVariant } from '@/components/molecules/ImpressionCard';
import ImpressionDetailCard, { type ImpressionDetailCardProps } from '@/components/molecules/ImpressionDetailCard';

export interface ImpressionItemProps {
  id: string;
  card: ImpressionCardProps;
  detail: ImpressionDetailCardProps;
  defaultOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
  className?: string;
}

export default function ImpressionItem({
  id,
  card,
  detail,
  defaultOpen = false,
  onToggleOpen,
  className = '',
}: ImpressionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggleOpen) {
      onToggleOpen(newState);
    }
  }, [isOpen, onToggleOpen]);

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
      className={`flex h-[475px] items-start justify-center pl-0 py-0 relative ${className}`}
    >
      {/* ImpressionCard - always visible, shows image + pill */}
      <div className="flex flex-col gap-3 items-start mr-[-24px] relative shrink-0 z-[2]">
        <ImpressionCard
          image={card.image}
          methodLabel={card.methodLabel}
          methodColorVariant={card.methodColorVariant}
        />
      </div>

      {/* ImpressionDetailCard - animated expand/collapse to the right */}
      <div
        id={`impression-detail-${id}`}
        className={`
          relative shrink-0 z-[1] overflow-hidden
          transition-all duration-500 ease-in-out
          ${prefersReducedMotion ? 'duration-300' : ''}
        `}
        style={{
          width: isOpen ? '316px' : '0px',
          minWidth: isOpen ? '316px' : '0px',
        }}
        aria-hidden={!isOpen}
      >
        <div className="mr-[-24px] w-[316px]">
          <ImpressionDetailCard
            projectLabel={detail.projectLabel}
            title={detail.title}
            description={detail.description}
            buttonLabel={detail.buttonLabel}
            buttonHref={detail.buttonHref}
          />
        </div>
      </div>

      {/* Clickable overlay - entire item is clickable */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`impression-detail-${id}`}
        className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded-xl z-10"
        aria-label={isOpen ? `Collapse ${detail.title}` : `Expand ${detail.title}`}
      >
        <span className="sr-only">{isOpen ? 'Collapse details' : 'Expand details'}</span>
      </button>
    </div>
  );
}

