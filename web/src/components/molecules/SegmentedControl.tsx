'use client';

import { useState, useRef, KeyboardEvent, useEffect } from 'react';

export type SegmentedControlSize = 'base' | 'sm';

export interface SegmentedControlItem {
  id: string;
  label: string;
}

export interface SegmentedControlProps {
  items: SegmentedControlItem[];
  value: string;
  onChange: (id: string) => void;
  size?: SegmentedControlSize;
  className?: string;
}

const sizeStyles: Record<
  SegmentedControlSize,
  {
    container: string;
    segment: string;
  }
> = {
  base: {
    container: 'flex gap-2 max-[860px]:gap-1 max-[475px]:gap-2 items-center overflow-x-auto',
    segment: 'font-mono font-normal text-base leading-[1.5] px-6 py-3 max-[860px]:text-sm max-[860px]:px-3 rounded-full whitespace-nowrap flex-shrink-0',
  },
  sm: {
    container: 'flex gap-2 max-[860px]:gap-1 max-[475px]:gap-2 items-center overflow-x-auto',
    segment: 'font-mono font-normal text-sm leading-[1.5] px-5 py-2 max-[860px]:px-3 rounded-full whitespace-nowrap flex-shrink-0',
  },
};

const stateStyles = {
  active: {
    base: 'bg-primary-100 text-primary-950',
    hover: 'hover:bg-primary-200 hover:text-primary-950',
  },
  inactive: {
    base: 'bg-transparent text-primary-300',
    hover: 'hover:bg-primary-50 hover:text-primary-700',
  },
};

export default function SegmentedControl({
  items,
  value,
  onChange,
  size = 'base',
  className = '',
}: SegmentedControlProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(
    items.findIndex((item) => item.id === value) || 0
  );
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update focusedIndex when value changes
  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.id === value);
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [value, items]);

  // Handle scroll to show/hide fade overlays
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateFadeVisibility = () => {
      // Use requestAnimationFrame to ensure accurate measurements
      requestAnimationFrame(() => {
        if (!container) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const isScrollable = scrollWidth > clientWidth;
        const scrollThreshold = 2; // Small threshold to account for sub-pixel scrolling
        
        if (isScrollable) {
          // Show right fade if not scrolled to the end
          const isAtEnd = scrollLeft >= scrollWidth - clientWidth - scrollThreshold;
          setShowRightFade(!isAtEnd);
          
          // Show left fade if scrolled past the start
          const isAtStart = scrollLeft <= scrollThreshold;
          setShowLeftFade(!isAtStart);
        } else {
          // If not scrollable, hide both fades
          setShowLeftFade(false);
          setShowRightFade(false);
        }
      });
    };

    // Initial check with a small delay to ensure DOM is ready
    const initialTimeout = setTimeout(updateFadeVisibility, 0);

    // Listen to scroll events
    container.addEventListener('scroll', updateFadeVisibility, { passive: true });
    
    // Listen to resize events (content might change)
    const resizeObserver = new ResizeObserver(updateFadeVisibility);
    resizeObserver.observe(container);

    return () => {
      clearTimeout(initialTimeout);
      container.removeEventListener('scroll', updateFadeVisibility);
      resizeObserver.disconnect();
    };
  }, [items]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        setFocusedIndex(newIndex);
        segmentRefs.current[newIndex]?.focus();
        break;
      case 'ArrowRight':
        e.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        setFocusedIndex(newIndex);
        segmentRefs.current[newIndex]?.focus();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onChange(items[currentIndex].id);
        break;
      default:
        return;
    }
  };

  const styles = sizeStyles[size];

  return (
    <div className={`relative ${className}`}>
      {/* Left fade overlay */}
      <div
        className={`
          absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10
          transition-opacity duration-300
          ${showLeftFade ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
      
      {/* Scrollable container */}
      <div
        ref={containerRef}
        role="tablist"
        className={`${styles.container} relative scrollbar-hide`}
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {items.map((item, index) => {
          const isActive = value === item.id;
          const isFocused = focusedIndex === index;
          const stateStyle = isActive ? stateStyles.active : stateStyles.inactive;
          // Only the active or focused segment should be in tab order
          const tabIndex = isActive || isFocused ? 0 : -1;

          return (
            <button
              key={item.id}
              ref={(el) => {
                segmentRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isActive}
              tabIndex={tabIndex}
              onClick={() => {
                onChange(item.id);
                setFocusedIndex(index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
              className={`
                ${styles.segment}
                ${stateStyle.base}
                ${stateStyle.hover}
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary-500
                focus-visible:ring-offset-2
                transition-colors
                cursor-pointer
              `}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right fade overlay */}
      <div
        className={`
          absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10
          transition-opacity duration-300
          ${showRightFade ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
    </div>
  );
}

