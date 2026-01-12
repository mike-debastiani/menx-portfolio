  'use client';

import { useState, useEffect, useCallback } from 'react';
import ImpressionCard, { 
  type ImpressionCardProps, 
  type MethodColorVariant,
  IMPRESSION_CARD_HEIGHT,
  IMPRESSION_CARD_WIDTH,
  IMPRESSION_CARD_OVERLAP_MARGIN,
} from '@/components/molecules/ImpressionCard';
import ImpressionDetailCard, { type ImpressionDetailCardProps } from '@/components/molecules/ImpressionDetailCard';

export interface ImpressionItemProps {
  id: string;
  card: ImpressionCardProps;
  detail: ImpressionDetailCardProps;
  defaultOpen?: boolean;
  isOpen?: boolean; // Controlled state - if provided, component is controlled
  onToggleOpen?: (open: boolean) => void;
  onRequestOpen?: () => void; // Callback when item requests to open
  onRequestClose?: () => void; // Callback when item requests to close
  className?: string;
  imageScale?: number;
}

export default function ImpressionItem({
  id,
  card,
  detail,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggleOpen,
  onRequestOpen,
  onRequestClose,
  className = '',
  imageScale = 1,
}: ImpressionItemProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Determine if component is controlled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Sync with defaultOpen prop changes (only in uncontrolled mode)
  useEffect(() => {
    if (!isControlled) {
      setInternalIsOpen(defaultOpen);
    }
  }, [defaultOpen, isControlled]);

  const handleToggle = useCallback(() => {
    if (isControlled) {
      // Controlled mode: use callbacks
      if (isOpen) {
        onRequestClose?.();
      } else {
        onRequestOpen?.();
      }
      // Also call legacy onToggleOpen for backwards compatibility
      if (onToggleOpen) {
        onToggleOpen(!isOpen);
      }
    } else {
      // Uncontrolled mode: manage internal state
      const newState = !internalIsOpen;
      setInternalIsOpen(newState);
      if (onToggleOpen) {
        onToggleOpen(newState);
      }
    }
  }, [isControlled, isOpen, internalIsOpen, onRequestOpen, onRequestClose, onToggleOpen]);

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

  // Calculate dimensions based on scale
  const cardHeight = IMPRESSION_CARD_HEIGHT * imageScale;
  const cardWidth = IMPRESSION_CARD_WIDTH * imageScale;
  const detailCardHeight = cardHeight; // Identical height
  const detailCardWidth = cardWidth + IMPRESSION_CARD_OVERLAP_MARGIN; // Width + negative margin
  
  // Calculate total width for the container:
  // - Collapsed: just card width
  // - Expanded: card width + detail card width, but subtract the overlap margin
  //   because the card's negative margin already creates the overlap internally
  //   This ensures the container width matches the visual width for correct gap spacing
  const totalWidth = isOpen 
    ? cardWidth + detailCardWidth - IMPRESSION_CARD_OVERLAP_MARGIN
    : cardWidth;

  return (
    <div
      className={`flex items-start justify-start pl-0 py-0 relative ${className}`}
      style={{ 
        width: `${totalWidth}px`,
        transition: prefersReducedMotion ? 'width 300ms ease-in-out' : 'width 500ms ease-in-out',
      }}
    >
      {/* ImpressionCard - always visible, shows image + pill */}
      <div 
        className="flex flex-col gap-3 items-start relative shrink-0 z-[2]"
        style={{ marginRight: `-${IMPRESSION_CARD_OVERLAP_MARGIN}px` }}
      >
        <ImpressionCard
          image={card.image}
          methodLabel={card.methodLabel}
          methodColorVariant={card.methodColorVariant}
          imageScale={imageScale}
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
          width: isOpen ? `${detailCardWidth}px` : '0px',
          minWidth: isOpen ? `${detailCardWidth}px` : '0px',
        }}
        aria-hidden={!isOpen}
      >
        <div 
          style={{ width: `${detailCardWidth}px` }}
        >
          <ImpressionDetailCard
            projectLabel={detail.projectLabel}
            title={detail.title}
            description={detail.description}
            buttonLabel={detail.buttonLabel}
            buttonHref={detail.buttonHref}
            height={detailCardHeight}
            width={detailCardWidth}
          />
        </div>
      </div>

      {/* Clickable area for card - only when detail is not open */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={false}
          aria-controls={`impression-detail-${id}`}
          className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded-xl z-10"
          aria-label={`Expand ${detail.title}`}
        >
          <span className="sr-only">Expand details</span>
        </button>
      )}
      
      {/* Clickable area for card only (not detail area) - only when open, allows button clicks in detail card */}
      {isOpen && (
        <button
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-expanded={true}
          aria-controls={`impression-detail-${id}`}
          className="absolute left-0 top-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded-xl z-10"
          style={{ width: `${cardWidth}px`, height: '100%' }}
          aria-label={`Collapse ${detail.title}`}
        >
          <span className="sr-only">Collapse details</span>
        </button>
      )}
    </div>
  );
}

