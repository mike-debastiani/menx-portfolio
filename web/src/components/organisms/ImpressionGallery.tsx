'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ImpressionItem, { type ImpressionItemProps } from './ImpressionItem';
import { IMPRESSION_CARD_WIDTH, IMPRESSION_CARD_OVERLAP_MARGIN } from '@/components/molecules/ImpressionCard';

export interface ImpressionGalleryItem {
  id: string;
  card: ImpressionItemProps['card'];
  detail: ImpressionItemProps['detail'];
  imageScale?: number;
}

export interface ImpressionGalleryProps {
  items: ImpressionGalleryItem[];
  className?: string;
  initialActiveId?: string | null;
}

export default function ImpressionGallery({
  items,
  className = '',
  initialActiveId = null,
}: ImpressionGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(initialActiveId ?? null);
  const containerRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const scrollSettleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetScrollLeftRef = useRef<number | null>(null);
  const lastScrollPositionRef = useRef<number>(0);
  const scrollThreshold = 50; // Minimum scroll distance to trigger collapse

  // Scroll to center helper - centers item with its expanded width
  const scrollToCenter = useCallback((itemId: string, imageScale: number = 1) => {
    const container = containerRef.current;
    if (!container) return;

    const itemElement = container.querySelector(`[data-impression-item-id="${itemId}"]`) as HTMLElement;
    if (!itemElement) return;

    // Calculate expanded width: card width + detail card width
    // Detail card width = card width + overlap margin (for the negative margin overlap)
    const cardWidth = IMPRESSION_CARD_WIDTH * imageScale;
    const detailCardWidth = cardWidth + IMPRESSION_CARD_OVERLAP_MARGIN;
    const expandedWidth = cardWidth + detailCardWidth;

    const containerRect = container.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();
    
    // Get the item's position relative to the scroll container
    const itemLeftRelativeToContainer = itemRect.left - containerRect.left + container.scrollLeft;
    
    // Calculate the center of the expanded item
    const itemExpandedCenter = itemLeftRelativeToContainer + expandedWidth / 2;
    
    // Target scroll position to center the expanded item in the viewport
    const containerCenter = containerRect.width / 2;
    const targetScrollLeft = itemExpandedCenter - containerCenter;

    targetScrollLeftRef.current = targetScrollLeft;
    programmaticScrollRef.current = true;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });

    // Detect scroll settle
    let lastScrollLeft = container.scrollLeft;
    let stableFrames = 0;
    
    const checkSettle = () => {
      if (!container || targetScrollLeftRef.current === null) return;

      const currentScroll = container.scrollLeft;
      const target = targetScrollLeftRef.current;
      const diff = Math.abs(currentScroll - target);
      const hasMoved = Math.abs(currentScroll - lastScrollLeft) > 0.5;

      if (hasMoved) {
        // Still scrolling, reset stable frames
        stableFrames = 0;
        lastScrollLeft = currentScroll;
      } else if (diff <= 2) {
        // Close to target and not moving
        stableFrames += 1;
        if (stableFrames >= 3) {
          // Scroll has settled - update last scroll position to prevent false collapse
          lastScrollPositionRef.current = currentScroll;
          programmaticScrollRef.current = false;
          targetScrollLeftRef.current = null;
          stableFrames = 0;
          return;
        }
      } else {
        stableFrames = 0;
      }

      // Continue checking
      requestAnimationFrame(checkSettle);
    };

    // Start checking after a small delay to allow scroll to begin
    setTimeout(() => {
      requestAnimationFrame(checkSettle);
    }, 50);

    // Max timeout fallback
    if (scrollSettleTimeoutRef.current) {
      clearTimeout(scrollSettleTimeoutRef.current);
    }
    scrollSettleTimeoutRef.current = setTimeout(() => {
      // Update last scroll position when timeout fires
      if (container) {
        lastScrollPositionRef.current = container.scrollLeft;
      }
      programmaticScrollRef.current = false;
      targetScrollLeftRef.current = null;
    }, 900);
  }, []);

  // Handle item click
  const handleItemClick = useCallback(
    (itemId: string, imageScale: number = 1) => {
      // If another item is active, collapse it immediately
      if (activeId && activeId !== itemId) {
        setActiveId(null);
      }

      // If this item is already open, just center it (don't close it)
      if (activeId === itemId) {
        // Set programmatic scroll flag to prevent auto-collapse
        programmaticScrollRef.current = true;
        // Just center it without changing the open state
        requestAnimationFrame(() => {
          setTimeout(() => {
            scrollToCenter(itemId, imageScale);
          }, 10);
        });
        return;
      }

      // Set programmatic scroll flag BEFORE opening to prevent auto-collapse
      programmaticScrollRef.current = true;

      // Open the item immediately (so it expands)
      setActiveId(itemId);

      // Then scroll to center with expanded width
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        // Small additional delay to allow expansion animation to start
        setTimeout(() => {
          scrollToCenter(itemId, imageScale);
        }, 50);
      });
    },
    [activeId, scrollToCenter]
  );

  // Handle manual scroll (auto-collapse)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Don't collapse during programmatic scrolling
    if (programmaticScrollRef.current) {
      return;
    }

    // Only collapse if there's an active item and user has scrolled significantly
    if (activeId !== null) {
      const currentScroll = container.scrollLeft;
      const scrollDistance = Math.abs(currentScroll - lastScrollPositionRef.current);
      
      // Only collapse if scroll distance exceeds threshold
      if (scrollDistance >= scrollThreshold) {
        setActiveId(null);
        lastScrollPositionRef.current = currentScroll;
      }
    } else {
      // Update last scroll position even when no item is open
      lastScrollPositionRef.current = container.scrollLeft;
    }
  }, [activeId, scrollThreshold]);

  // Initialize last scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      lastScrollPositionRef.current = container.scrollLeft;
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollSettleTimeoutRef.current) {
        clearTimeout(scrollSettleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`flex flex-row items-end gap-6 overflow-x-auto overflow-y-visible scroll-smooth ${className}`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          data-impression-item-id={item.id}
          className="flex flex-col justify-end shrink-0"
        >
          <ImpressionItem
            id={item.id}
            card={item.card}
            detail={item.detail}
            isOpen={activeId === item.id}
            onRequestOpen={() => handleItemClick(item.id, item.imageScale || 1)}
            onRequestClose={() => setActiveId(null)}
            imageScale={item.imageScale}
          />
        </div>
      ))}
    </div>
  );
}
