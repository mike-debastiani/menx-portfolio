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
    container: 'flex gap-2 max-[860px]:gap-1 max-[475px]:gap-2 items-center',
    segment: 'font-mono font-normal text-base leading-[1.5] px-6 py-3 max-[860px]:text-sm max-[860px]:px-3 rounded-full',
  },
  sm: {
    container: 'flex gap-2 max-[860px]:gap-1 max-[475px]:gap-2 items-center',
    segment: 'font-mono font-normal text-sm leading-[1.5] px-5 py-2 max-[860px]:px-3 rounded-full',
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
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update focusedIndex when value changes
  useEffect(() => {
    const activeIndex = items.findIndex((item) => item.id === value);
    if (activeIndex !== -1) {
      setFocusedIndex(activeIndex);
    }
  }, [value, items]);

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
    <div role="tablist" className={`${styles.container} ${className}`}>
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
  );
}

