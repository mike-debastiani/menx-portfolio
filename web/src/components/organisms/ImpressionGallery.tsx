'use client';

import { useState, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
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
  // Controlled expanded state
  expandedImpressionId?: string | null;
  onExpandedChange?: (id: string | null) => void;
  // Focus tracking
  onFocusChange?: (impressionId: string | null) => void;
}

export interface ImpressionGalleryRef {
  scrollToImpressionId: (id: string, options?: { align?: 'center' | 'start'; behavior?: 'smooth' | 'auto' }) => void;
  scrollToIndex: (index: number, options?: { align?: 'center' | 'start'; behavior?: 'smooth' | 'auto' }) => void;
}

const ImpressionGallery = forwardRef<ImpressionGalleryRef, ImpressionGalleryProps>(
  function ImpressionGallery(
    {
      items,
      className = '',
      initialActiveId = null,
      expandedImpressionId: controlledExpandedId,
      onExpandedChange,
      onFocusChange,
    },
    ref
  ) {
    const [internalActiveId, setInternalActiveId] = useState<string | null>(initialActiveId ?? null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [endPaddingWidth, setEndPaddingWidth] = useState<number>(0);
    const [maxScrollLeft, setMaxScrollLeft] = useState<number>(Infinity);
    const [startPaddingWidth, setStartPaddingWidth] = useState<number>(0);
    const [gapSize, setGapSize] = useState<string>('var(--layout-gutter)');
    const [calculatedItemWidth, setCalculatedItemWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const programmaticScrollRef = useRef(false);
    const scrollSettleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const targetScrollLeftRef = useRef<number | null>(null);
    const lastScrollPositionRef = useRef<number>(0);
    const focusCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollThreshold = 50; // Minimum scroll distance to trigger collapse

    // Determine if expanded state is controlled
    const isExpandedControlled = controlledExpandedId !== undefined;
    const activeId = isExpandedControlled ? controlledExpandedId : internalActiveId;

    const setActiveId = useCallback(
      (id: string | null) => {
        if (isExpandedControlled) {
          onExpandedChange?.(id ?? null);
        } else {
          setInternalActiveId(id);
        }
      },
      [isExpandedControlled, onExpandedChange]
    );

  // Find the impression whose left edge is at or closest to the left edge of the container
  // This determines which method segment should be highlighted
  const findFocusedImpression = useCallback((): string | null => {
    const container = containerRef.current;
    if (!container || items.length === 0) return null;

    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const scrollLeft = container.scrollLeft;
    const clientWidth = container.clientWidth;
    
    // Threshold for "at the left edge" detection (in pixels)
    // Items within this threshold are considered "at the left edge"
    const edgeThreshold = 10;
    
    // First, check if we're scrolled into the padding area (past the last item)
    // If we're in the padding area, return the last item immediately
    const lastItemElement = container.querySelector(`[data-impression-item-id="${items[items.length - 1]?.id}"]`) as HTMLElement;
    if (lastItemElement) {
      // Get the last item's position relative to the scroll container's content
      const lastItemOffsetLeft = lastItemElement.offsetLeft;
      const lastItemWidth = lastItemElement.offsetWidth;
      const lastItemRight = lastItemOffsetLeft + lastItemWidth;
      
      // If we've scrolled past the last item's right edge (into padding), return the last item
      // We check if scrollLeft is greater than or equal to the last item's left position
      // This means we've scrolled far enough that the last item could be at the left edge
      if (scrollLeft >= lastItemOffsetLeft) {
        return items[items.length - 1]?.id || null;
      }
    }
    
    // Find the item whose left edge is closest to the container's left edge
    type Match = { id: string; distance: number };
    let bestMatch: Match | null = null;

    for (const item of items) {
      const itemElement = container.querySelector(`[data-impression-item-id="${item.id}"]`) as HTMLElement;
      if (!itemElement) continue;

      const itemRect = itemElement.getBoundingClientRect();
      const itemLeft = itemRect.left;
      
      // Calculate distance from item's left edge to container's left edge
      const distance = Math.abs(itemLeft - containerLeft);
      
      // Only consider items that are fully visible (left edge is at or to the right of container left)
      if (itemLeft >= containerLeft - edgeThreshold) {
        if (!bestMatch || distance < bestMatch.distance) {
          bestMatch = { id: item.id, distance };
        }
      }
    }

    // If we found a match, return it
    // Fallback: if no item is at the left edge, return the first item
    return bestMatch?.id ?? items[0]?.id ?? null;
  }, [items]);

  // Update focus when scrolling
  const updateFocus = useCallback(() => {
    if (programmaticScrollRef.current) return; // Don't update focus during programmatic scroll

    const focusedId = findFocusedImpression();
    onFocusChange?.(focusedId);
  }, [findFocusedImpression, onFocusChange]);

  // Scroll to center helper - centers item with its expanded width
  const scrollToCenter = useCallback((itemId: string, imageScale: number = 1, align: 'center' | 'start' = 'center', behavior: 'smooth' | 'auto' = 'smooth') => {
    const container = containerRef.current;
    if (!container) return;

    const itemElement = container.querySelector(`[data-impression-item-id="${itemId}"]`) as HTMLElement;
    if (!itemElement) return;

    // Use offsetLeft instead of getBoundingClientRect for final positions
    // offsetLeft gives us the position in the layout tree, not the animated position
    // This ensures accurate centering even during animations
    const itemOffsetLeft = itemElement.offsetLeft;
    const containerRect = container.getBoundingClientRect();
    
    let targetScrollLeft: number;
    
    if (align === 'start') {
      // Align to start with container padding offset (same as Timeline)
      // Get the layout margin from CSS variable (matches container padding)
      const root = document.documentElement;
      let layoutMargin = getComputedStyle(root).getPropertyValue('--layout-margin').trim();
      
      // Fallback: if CSS variable is not available, determine based on viewport width
      // Mobile: 16px, Tablet (768px-1279px): 32px, Desktop (>=1280px): 24px
      if (!layoutMargin) {
        const viewportWidth = window.innerWidth;
        layoutMargin = viewportWidth >= 1280 ? '24px' : viewportWidth >= 768 ? '32px' : '16px';
      }
      
      // Parse the value (e.g., "16px", "24px", or "32px") and convert to number
      const viewportWidth = window.innerWidth;
      const marginValue = parseFloat(layoutMargin) || (viewportWidth >= 1280 ? 24 : viewportWidth >= 768 ? 32 : 16);
      
      // Position item so it has the same left offset as the Timeline (container padding)
      // Since we added padding at the start of the container (marginValue), the first item
      // is already positioned at marginValue from the container's left edge.
      // Since the gallery wrapper breaks out of container padding with negative margins,
      // the scroll container reaches the viewport edge. So when we scroll to position the item
      // at the container's left edge (scrollLeft = itemOffsetLeft - marginValue), the item
      // will be at marginValue pixels from the viewport left edge (same as Timeline).
      targetScrollLeft = itemOffsetLeft - marginValue;
      
      // Ensure we don't scroll to negative values
      targetScrollLeft = Math.max(0, targetScrollLeft);
    } else {
      // Center alignment
      // Calculate expanded width: card width + detail card width
      // On mobile, calculate dimensions dynamically; on tablet/desktop use CSS variables
      const root = document.documentElement;
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 768;
      
      let baseWidth: number;
      let overlapMargin: number;
      
      if (isMobile) {
        // On mobile: calculate width so expanded item fills screen minus padding
        const layoutMargin = parseFloat(
          getComputedStyle(root).getPropertyValue('--layout-margin').trim()
        ) || 16;
        
        // Expanded width = 2 * cardWidth
        // We want: 2 * cardWidth = viewportWidth - 2 * layoutMargin
        baseWidth = (viewportWidth - 2 * layoutMargin) / 2;
        overlapMargin = Math.round(baseWidth * (IMPRESSION_CARD_OVERLAP_MARGIN / IMPRESSION_CARD_WIDTH));
      } else {
        // Tablet and Desktop: use CSS variables
        baseWidth = parseFloat(
          getComputedStyle(root).getPropertyValue('--impression-card-width').trim()
        ) || IMPRESSION_CARD_WIDTH;
        overlapMargin = parseFloat(
          getComputedStyle(root).getPropertyValue('--impression-card-overlap-margin').trim()
        ) || IMPRESSION_CARD_OVERLAP_MARGIN;
      }
      
      const cardWidth = baseWidth * imageScale;
      const detailCardWidth = cardWidth + overlapMargin;
      const expandedWidth = cardWidth + detailCardWidth;
      
      // Calculate the center of the expanded item using offsetLeft (final position in layout)
      // offsetLeft is relative to the scroll container, so we can use it directly
      const itemExpandedCenter = itemOffsetLeft + expandedWidth / 2;
      
      // Target scroll position to center the expanded item in the viewport
      const containerCenter = containerRect.width / 2;
      targetScrollLeft = itemExpandedCenter - containerCenter;
    }

    targetScrollLeftRef.current = targetScrollLeft;
    programmaticScrollRef.current = true;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior = prefersReducedMotion ? 'auto' : behavior;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: scrollBehavior,
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
          // Update focus after scroll settles
          updateFocus();
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
      updateFocus();
    }, 900);
  }, [updateFocus]);

  // Handle item click
  const handleItemClick = useCallback(
    (itemId: string, imageScale: number = 1) => {
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

      // If another item is active, we need to handle the transition properly
      if (activeId && activeId !== itemId) {
        // Set programmatic scroll flag to prevent auto-collapse during transition
        programmaticScrollRef.current = true;
        
        // Check for reduced motion preference
        const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const animationDuration = prefersReducedMotion ? 200 : 350;
        
        // Start both animations in parallel for smoother transition
        // Setting the new activeId will automatically close the old one
        // Both animations will run simultaneously
        setActiveId(itemId);
        
        // Single precise centering after both animations fully complete
        // This avoids bounce effect and ensures perfect centering with final positions
        // Use requestAnimationFrame to ensure DOM has updated with new state
        requestAnimationFrame(() => {
          // Wait for both animations to fully complete
          // This ensures all position changes are done and we use final stable positions
          setTimeout(() => {
            // Single centering with final positions - no bounce effect
            // Use 'auto' for faster, instant centering
            scrollToCenter(itemId, imageScale, 'center', 'auto');
          }, animationDuration + 20); // Wait for full animation + small buffer for DOM updates
        });
        return;
      }

      // No item is currently active, just open and center the new one
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

  // Handle manual scroll (auto-collapse + focus update + scroll limit)
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enforce maximum scroll limit - prevent scrolling past the last item's left edge
    if (maxScrollLeft !== Infinity && container.scrollLeft > maxScrollLeft) {
      container.scrollLeft = maxScrollLeft;
      return;
    }

    // Don't collapse during programmatic scrolling
    if (programmaticScrollRef.current) {
      return;
    }

    // Auto-collapse expanded item on user scroll
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

    // Update focus immediately using requestAnimationFrame for smooth, responsive updates
    // Cancel any pending timeout to avoid duplicate calls
    if (focusCheckTimeoutRef.current) {
      clearTimeout(focusCheckTimeoutRef.current);
    }
    // Use requestAnimationFrame for immediate, smooth updates during scroll
    requestAnimationFrame(() => {
      updateFocus();
    });
  }, [activeId, scrollThreshold, updateFocus, maxScrollLeft]);

  // Calculate start padding width (matches container padding/Timeline margin)
  useEffect(() => {
    const calculateStartPadding = () => {
      const root = document.documentElement;
      let layoutMargin = getComputedStyle(root).getPropertyValue('--layout-margin').trim();
      
      // Fallback: if CSS variable is not available, determine based on viewport width
      // Mobile: 16px, Tablet (768px-1279px): 32px, Desktop (>=1280px): 24px
      if (!layoutMargin) {
        const width = window.innerWidth;
        layoutMargin = width >= 1280 ? '24px' : width >= 768 ? '32px' : '16px';
      }
      
      const width = window.innerWidth;
      const marginValue = parseFloat(layoutMargin) || (width >= 1280 ? 24 : width >= 768 ? 32 : 16);
      setStartPaddingWidth(marginValue);
    };

    // Calculate on mount and resize
    calculateStartPadding();
    window.addEventListener('resize', calculateStartPadding);
    
    return () => {
      window.removeEventListener('resize', calculateStartPadding);
    };
  }, []);

  // Update gap size based on viewport width
  useEffect(() => {
    const updateGapSize = () => {
      const viewportWidth = window.innerWidth;
      // Set gap to 12px below 500px, otherwise use layout gutter
      if (viewportWidth < 500) {
        setGapSize('12px');
      } else {
        const root = document.documentElement;
        const layoutGutter = getComputedStyle(root).getPropertyValue('--layout-gutter').trim() || '16px';
        setGapSize(layoutGutter);
      }
    };

    updateGapSize();
    window.addEventListener('resize', updateGapSize);
    return () => window.removeEventListener('resize', updateGapSize);
  }, []);

  // Calculate item width for screens > 800px (fixed size based on 1500px = 4 items)
  useEffect(() => {
    const calculateItemWidth = () => {
      const viewportWidth = window.innerWidth;
      
      if (viewportWidth > 800) {
        // Calculate width so that at 1500px, 4 items fit: 1500 = 4 * itemWidth + 3 * gap
        // itemWidth = (1500 - 3 * gap) / 4
        // Use the gap value at 1500px (24px for desktop)
        const gapAt1500px = 24; // Desktop gap size
        
        const itemWidth = (1500 - 3 * gapAt1500px) / 4;
        setCalculatedItemWidth(itemWidth);
      } else {
        setCalculatedItemWidth(null);
      }
    };

    calculateItemWidth();
    window.addEventListener('resize', calculateItemWidth);
    return () => window.removeEventListener('resize', calculateItemWidth);
  }, []);

  // Initialize last scroll position and track container width
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      lastScrollPositionRef.current = container.scrollLeft;
      // Use offsetWidth instead of clientWidth to get the full width including padding/border
      const width = container.offsetWidth || container.clientWidth || window.innerWidth;
      setContainerWidth(width);
    }
  }, []);

  // Update container width and calculate end padding on resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) {
      setEndPaddingWidth(0);
      return;
    }

    const updateWidthAndPadding = () => {
      // Use offsetWidth instead of clientWidth to get the full width including padding/border
      const width = container.offsetWidth || container.clientWidth || window.innerWidth;
      setContainerWidth(width);

      // Wait for next frame to ensure all items are rendered
      requestAnimationFrame(() => {
        const lastItemElement = container.querySelector(`[data-impression-item-id="${items[items.length - 1]?.id}"]`) as HTMLElement;
        if (lastItemElement) {
          // Get the last item's position and width
          const lastItemRect = lastItemElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calculate position relative to scroll container content
          const lastItemLeft = lastItemRect.left - containerRect.left + container.scrollLeft;
          const lastItemWidth = lastItemRect.width;
          
          // Calculate maximum scroll position: the last item's left position
          // This is where the last item's left edge aligns with the container's left edge
          setMaxScrollLeft(lastItemLeft);
          
          // We want: maxScrollLeft = lastItemLeft (so the item's left edge is at container's left edge)
          // maxScrollLeft = scrollWidth - containerWidth
          // So: lastItemLeft = scrollWidth - containerWidth
          // scrollWidth = lastItemLeft + lastItemWidth + padding
          // Therefore: lastItemLeft = lastItemLeft + lastItemWidth + padding - containerWidth
          // So: padding = containerWidth - lastItemWidth
          const padding = Math.max(0, width - lastItemWidth);
          setEndPaddingWidth(padding);
        } else {
          // Fallback: use container width if last item not found
          setEndPaddingWidth(width);
          setMaxScrollLeft(Infinity);
        }
      });
    };

    // Initial update with a delay to ensure DOM is ready
    const timeoutId = setTimeout(updateWidthAndPadding, 100);

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      setTimeout(updateWidthAndPadding, 50);
    });
    resizeObserver.observe(container);

    // Also listen to window resize as fallback
    const handleResize = () => {
      clearTimeout(timeoutId);
      setTimeout(updateWidthAndPadding, 50);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  // Expose imperative API via ref
  useImperativeHandle(ref, () => ({
    scrollToImpressionId: (id: string, options?: { align?: 'center' | 'start'; behavior?: 'smooth' | 'auto' }) => {
      const item = items.find((item) => item.id === id);
      if (!item) return;
      scrollToCenter(id, item.imageScale || 1, options?.align || 'center', options?.behavior || 'smooth');
    },
    scrollToIndex: (index: number, options?: { align?: 'center' | 'start'; behavior?: 'smooth' | 'auto' }) => {
      if (index < 0 || index >= items.length) return;
      const item = items[index];
      scrollToCenter(item.id, item.imageScale || 1, options?.align || 'center', options?.behavior || 'smooth');
    },
  }), [items, scrollToCenter]);

  // Initial focus update
  useEffect(() => {
    updateFocus();
  }, [updateFocus]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollSettleTimeoutRef.current) {
        clearTimeout(scrollSettleTimeoutRef.current);
      }
      if (focusCheckTimeoutRef.current) {
        clearTimeout(focusCheckTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`overflow-visible ${className}`} 
      style={{ 
        contain: 'none',
        // Ensure wrapper doesn't clip content
        overflow: 'visible',
      }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-row items-end overflow-x-auto scroll-smooth"
        style={{
          gap: gapSize,
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          // Remove any height constraints that might cause clipping
          height: 'auto',
          minHeight: 'fit-content',
          // Ensure container doesn't clip vertically
          // Note: overflow-y: visible doesn't work with overflow-x: auto in CSS
          // But by ensuring height: auto, the container adapts to content
          maxHeight: 'none',
        }}
      >
        {/* Add padding at the start to create margin offset matching Timeline */}
        {items.length > 0 && startPaddingWidth > 0 && (
          <div 
            className="shrink-0"
            style={{ 
              width: `${startPaddingWidth}px`,
              minWidth: `${startPaddingWidth}px`,
              height: '1px', // Minimal height to not affect layout
            }}
            aria-hidden="true"
          />
        )}
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
              calculatedWidth={calculatedItemWidth}
            />
          </div>
        ))}
        {/* Add exact padding at the end to allow scrolling the last item to the left edge, but no further */}
        {/* Padding is calculated so the last item's left edge can reach the container's left edge */}
        {items.length > 0 && endPaddingWidth > 0 && (
          <div 
            className="shrink-0"
            style={{ 
              width: `${endPaddingWidth}px`,
              minWidth: `${endPaddingWidth}px`,
              height: '1px', // Minimal height to not affect layout
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
});

export default ImpressionGallery;
