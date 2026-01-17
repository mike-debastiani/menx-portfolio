'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type WorkflowPhaseKey =
  | 'research'
  | 'analysis'
  | 'ideation'
  | 'design'
  | 'testing'
  | 'development';

export type WorkflowSegment = {
  id: string;
  methodName: string;
  phase: WorkflowPhaseKey;
  count: number; // number of CMS examples => segment width
  // optional future link to ImpressionGallery:
  galleryIndex?: number;
};

export type WorkflowAtlasTimelineProps = {
  segments: WorkflowSegment[];
  // uncontrolled mode
  defaultActiveId?: string;
  // controlled mode
  activeId?: string;
  onActiveChange?: (id: string, segment: WorkflowSegment) => void;
  // future bridge to ImpressionGallery
  onSegmentSelect?: (segment: WorkflowSegment) => void;
  // optional legend label overrides
  phaseLabels?: Partial<Record<WorkflowPhaseKey, string>>;
  className?: string;
};

// Phase to color mapping (matching Figma design)
const getPhaseColorClass = (phase: WorkflowPhaseKey): string => {
  const phaseColorMap: Record<WorkflowPhaseKey, string> = {
    research: 'bg-accent-blue',
    analysis: 'bg-accent-purple',
    ideation: 'bg-accent-magenta',
    design: 'bg-accent-orange',
    testing: 'bg-accent-green',
    development: 'bg-accent-darkgrey',
  };
  return phaseColorMap[phase];
};

// Default phase labels
const DEFAULT_PHASE_LABELS: Record<WorkflowPhaseKey, string> = {
  research: 'Research & Discovery',
  analysis: 'Analyse & Synthesis',
  ideation: 'Ideation & Concepting',
  design: 'Design & Prototyping',
  testing: 'Testing & Validation',
  development: 'Development & Delivery',
};

// Constants from Figma design
const SEGMENT_GAP_MOBILE = 2; // gap between segments on mobile
const SEGMENT_GAP_DESKTOP = 4; // gap between segments on desktop
const BASE_HEIGHT = 16; // h-[16px] for normal segments
const ACTIVE_HEIGHT = 22; // h-[22px] for active segment (6px taller)
const MIN_SEGMENT_WIDTH_MOBILE = 2; // minimum width on mobile to keep segments visible but allow small sizes
const MIN_SEGMENT_WIDTH_DESKTOP = 10; // minimum width on desktop
const LEGEND_GAP_MOBILE = 12; // gap between legend items on mobile
const LEGEND_GAP_DESKTOP = 24; // gap between legend items on desktop
const LEGEND_DOT_TEXT_GAP = 8; // gap-[8px] between dot and text
const LEGEND_DOT_SIZE = 12; // size-[12px] for legend dots
const CONTAINER_GAP = 24; // gap-[24px] between timeline and legend

// Get minimum segment width based on viewport width
// Uses desktop default for SSR to avoid hydration mismatch
const getMinSegmentWidth = (viewportWidth?: number): number => {
  if (typeof viewportWidth === 'undefined' || typeof window === 'undefined') {
    return MIN_SEGMENT_WIDTH_DESKTOP; // Default for SSR
  }
  return viewportWidth < 600 ? MIN_SEGMENT_WIDTH_MOBILE : MIN_SEGMENT_WIDTH_DESKTOP;
};

// Get segment gap based on viewport width
// Uses desktop default for SSR to avoid hydration mismatch
const getSegmentGap = (viewportWidth?: number): number => {
  if (typeof viewportWidth === 'undefined' || typeof window === 'undefined') {
    return SEGMENT_GAP_DESKTOP; // Default for SSR
  }
  return viewportWidth < 600 ? SEGMENT_GAP_MOBILE : SEGMENT_GAP_DESKTOP;
};

// Calculate proportional widths for segments
// Always maintains exact ratio between segments based on count
// Timeline always uses 100% of container width (minus gaps)
const calculateSegmentWidths = (
  segments: WorkflowSegment[],
  containerWidth: number
): number[] => {
  const N = segments.length;
  if (N === 0) return [];

  // For SSR, use undefined to get desktop defaults
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : undefined;
  const minWidth = getMinSegmentWidth(viewportWidth);
  const segmentGap = getSegmentGap(viewportWidth);
  const totalGapWidth = (N - 1) * segmentGap;
  const availableWidth = containerWidth - totalGapWidth;

  if (availableWidth <= 0) {
    // Fallback: proportional widths even if container is very small
    const weights = segments.map((seg) => Math.max(seg.count, 1));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    return weights.map((weight) => (weight / totalWeight) * Math.max(availableWidth, N * minWidth));
  }

  // Calculate weights based on count (always proportional)
  const weights = segments.map((seg) => Math.max(seg.count, 1));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Calculate widths strictly proportional to weights
  let widths = weights.map((weight) => {
    return (weight / totalWeight) * availableWidth;
  });

  // Check if any segment is below minimum width
  const needsAdjustment = widths.some((w) => w < minWidth);
  
  if (needsAdjustment) {
    // Find segments that need minimum width
    const segmentsNeedingMin = widths.map((w, i) => w < minWidth).reduce((count, needs) => count + (needs ? 1 : 0), 0);
    const minWidthTotal = segmentsNeedingMin * minWidth;
    const remainingWidth = availableWidth - minWidthTotal;
    
    if (remainingWidth < 0) {
      // Container is too small - use absolute minimums
      return new Array(N).fill(minWidth);
    }
    
    // Recalculate: segments at minimum get minWidth, others get proportional share of remaining
    widths = widths.map((w, i) => {
      if (w < minWidth) {
        return minWidth;
      }
      // Recalculate weights for segments above minimum
      const aboveMinWeights = weights.filter((weight, idx) => widths[idx] >= minWidth);
      const aboveMinTotal = aboveMinWeights.reduce((sum, w) => sum + w, 0);
      return (weights[i] / aboveMinTotal) * remainingWidth;
    });
  }

  // Ensure exact total width - distribute rounding errors proportionally
  const currentTotal = widths.reduce((sum, w) => sum + w, 0);
  const difference = availableWidth - currentTotal;
  
  if (Math.abs(difference) > 0.001) {
    // Distribute difference proportionally to maintain ratio
    widths = widths.map((w) => {
      const proportion = w / currentTotal;
      return w + difference * proportion;
    });
  }

  // Final safety check: ensure no segment is below absolute minimum
  return widths.map((w) => Math.max(w, minWidth));
};

export default function WorkflowAtlasTimeline({
  segments,
  defaultActiveId,
  activeId: controlledActiveId,
  onActiveChange,
  onSegmentSelect,
  phaseLabels = {},
  className = '',
}: WorkflowAtlasTimelineProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | undefined>(defaultActiveId);
  const [segmentWidths, setSegmentWidths] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine active ID (controlled vs uncontrolled)
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  // Set mounted flag after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate segment widths when container size or segments change
  useEffect(() => {
    const updateWidths = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const widths = calculateSegmentWidths(segments, containerWidth);
      setSegmentWidths(widths);
    };

    // Only update widths after mount to avoid hydration mismatch
    if (isMounted) {
      updateWidths();
    }

    // Use ResizeObserver to handle container size changes
    const resizeObserver = new ResizeObserver(updateWidths);
    if (containerRef.current && isMounted) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as fallback
    if (isMounted) {
      window.addEventListener('resize', updateWidths);
    }

    return () => {
      resizeObserver.disconnect();
      if (isMounted) {
        window.removeEventListener('resize', updateWidths);
      }
    };
  }, [segments, isMounted]);

  const handleSegmentClick = useCallback(
    (segment: WorkflowSegment) => {
      if (controlledActiveId === undefined) {
        setInternalActiveId(segment.id);
      }
      if (onActiveChange) {
        onActiveChange(segment.id, segment);
      }
      if (onSegmentSelect) {
        onSegmentSelect(segment);
      }
    },
    [controlledActiveId, onActiveChange, onSegmentSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, segment: WorkflowSegment) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSegmentClick(segment);
      }
    },
    [handleSegmentClick]
  );

  // Get phase label (with override support)
  const getPhaseLabel = (phase: WorkflowPhaseKey): string => {
    return phaseLabels[phase] ?? DEFAULT_PHASE_LABELS[phase];
  };

  // Get all unique phases for legend
  const uniquePhases: WorkflowPhaseKey[] = [
    'research',
    'analysis',
    'ideation',
    'design',
    'testing',
    'development',
  ];

  return (
    <div className={`flex flex-col gap-6 items-start w-full ${className}`}>
      {/* Timeline */}
      <div
        ref={containerRef}
        className="flex gap-0.5 min-[600px]:gap-1 items-center relative w-full"
        style={{ height: `${ACTIVE_HEIGHT}px` }}
      >
        {segments.map((segment, index) => {
          const isActive = activeId === segment.id;
          // Use desktop default during SSR to avoid hydration mismatch
          const fallbackWidth = isMounted ? MIN_SEGMENT_WIDTH_MOBILE : MIN_SEGMENT_WIDTH_DESKTOP;
          const width = segmentWidths[index] || fallbackWidth;
          const height = isActive ? ACTIVE_HEIGHT : BASE_HEIGHT;
          // Use desktop default during SSR
          const minWidth = isMounted 
            ? getMinSegmentWidth(window.innerWidth)
            : MIN_SEGMENT_WIDTH_DESKTOP;

          return (
            <button
              key={segment.id}
              type="button"
              onClick={() => handleSegmentClick(segment)}
              onKeyDown={(e) => handleKeyDown(e, segment)}
              aria-pressed={isActive}
              title={`${segment.methodName} — ${segment.count} examples`}
              className={`
                ${getPhaseColorClass(segment.phase)}
                rounded-full
                transition-all duration-200 ease-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2
                ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80 hover:scale-y-[1.3]'}
              `}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                minWidth: `${minWidth}px`,
                flexShrink: 0,
              }}
              aria-label={`${segment.methodName} method, ${segment.count} examples`}
            />
          );
        })}
      </div>

      {/* Legend - responsive layout */}
      <div className="flex flex-wrap gap-3 min-[500px]:gap-4 md:gap-5 lg:gap-6 items-center justify-start px-1 w-full">
        {uniquePhases.map((phase) => (
          <div key={phase} className="flex gap-1.5 min-[500px]:gap-2 items-center shrink-0">
            <div
              className={`${getPhaseColorClass(phase)} rounded-full shrink-0`}
              style={{
                width: `${LEGEND_DOT_SIZE}px`,
                height: `${LEGEND_DOT_SIZE}px`,
              }}
              aria-hidden="true"
            />
            <p className="font-mono font-normal leading-[1.25] text-xs min-[500px]:text-[13px] lg:text-sm text-primary-950 whitespace-nowrap">
              {getPhaseLabel(phase)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

