'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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

// Phase to text color mapping (using CSS variables)
const getPhaseTextColor = (phase: WorkflowPhaseKey): string => {
  const phaseColorMap: Record<WorkflowPhaseKey, string> = {
    research: 'var(--color-accent-blue)',
    analysis: 'var(--color-accent-purple)',
    ideation: 'var(--color-accent-magenta)',
    design: 'var(--color-accent-orange)',
    testing: 'var(--color-accent-green)',
    development: 'var(--color-accent-darkgrey)',
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
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1200; // Default to desktop width for SSR
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine active ID (controlled vs uncontrolled)
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  // Set mounted flag after hydration and track viewport width
  useEffect(() => {
    setIsMounted(true);
    
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };
    
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    
    return () => {
      window.removeEventListener('resize', updateViewportWidth);
    };
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

  // Calculate phase label positions
  // Groups segments by phase and calculates center positions for labels
  const phaseLabelPositions = useMemo(() => {
    if (!containerRef.current || segmentWidths.length === 0 || !isMounted) {
      return [];
    }

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : undefined;
    const segmentGap = getSegmentGap(viewportWidth);
    
    // Group segments by phase and track their positions
    const phaseGroups = new Map<WorkflowPhaseKey, { startIndex: number; endIndex: number; startPosition: number; endPosition: number }>();
    
    let currentPosition = 0;
    
    segments.forEach((segment, index) => {
      const width = segmentWidths[index] || MIN_SEGMENT_WIDTH_DESKTOP;
      const segmentCenter = currentPosition + width / 2;
      
      if (!phaseGroups.has(segment.phase)) {
        // First segment of this phase
        phaseGroups.set(segment.phase, {
          startIndex: index,
          endIndex: index,
          startPosition: currentPosition,
          endPosition: currentPosition + width,
        });
      } else {
        // Extend the phase group
        const group = phaseGroups.get(segment.phase)!;
        group.endIndex = index;
        group.endPosition = currentPosition + width;
      }
      
      // Move to next segment position
      currentPosition += width + segmentGap;
    });
    
    // Calculate center positions for each phase
    return Array.from(phaseGroups.entries()).map(([phase, group]) => {
      const centerPosition = group.startPosition + (group.endPosition - group.startPosition) / 2;
      return {
        phase,
        centerPosition,
        startPosition: group.startPosition,
        endPosition: group.endPosition,
      };
    });
  }, [segments, segmentWidths, isMounted]);

  return (
    <div className={`flex flex-col items-start w-full ${className}`}>
      {/* Timeline with labels */}
      <div className="relative w-full">
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

        {/* Phase Labels - positioned below their segments */}
        {isMounted && phaseLabelPositions.length > 0 && (
          <div 
            className="relative w-full overflow-visible" 
            style={{ 
              marginTop: viewportWidth < 600 ? '12px' : '8px', 
              minHeight: '20px',
            }}
          >
            {phaseLabelPositions.map(({ phase, centerPosition }) => {
              const isSmallScreen = viewportWidth < 600;
              
              if (isSmallScreen) {
                // For rotated labels: wrapper handles centering, inner element rotates from center top
                // This ensures all labels align at the top AND are horizontally centered
                // Labels are positioned above segments with a 12px gap
                // Since labels are 100px wide and rotate from center top, half (50px) extends down from rotation point
                // Timeline segments have height ACTIVE_HEIGHT (22px)
                // Label container has marginTop: 12px, so segment top is at -34px relative to label container
                // We want label bottom to be 12px above segment top: -34px - 12px = -46px
                // Label rotation point is 50px above bottom, so: top = -46px - 50px = -96px
                const LABEL_WIDTH = 100;
                const GAP_TO_SEGMENTS = 12;
                const SEGMENT_HEIGHT = ACTIVE_HEIGHT; // 22px
                const LABEL_CONTAINER_MARGIN = 12; // marginTop of label container
                // Segment top relative to label container: -(SEGMENT_HEIGHT + LABEL_CONTAINER_MARGIN) = -34px
                // Label bottom should be: -34px - 12px gap = -46px
                // Label rotation point (center top) is 50px above bottom, so: top = -46px - 50px = -96px
                const labelTop = '46';
                
                return (
                  <div
                    key={phase}
                    className="absolute"
                    style={{
                      left: `${centerPosition}px`,
                      top: `${labelTop}px`,
                      transform: 'translateX(-50%)',
                      display: 'inline-flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      className="font-mono font-normal leading-[0] text-sm whitespace-nowrap"
                      style={{
                        transform: 'rotate(90deg)',
                        transformOrigin: 'center top',
                        color: getPhaseTextColor(phase),
                        width: '100px',
                      }}
                    >
                      {getPhaseLabel(phase)}
                    </div>
                  </div>
                );
              }
              
              // For non-rotated labels: normal alignment
              return (
                <div
                  key={phase}
                  className="absolute font-mono font-normal leading-[1.25] text-xs md:text-sm lg:text-base whitespace-nowrap"
                  style={{
                    left: `${centerPosition}px`,
                    top: '0',
                    transform: 'translateX(-50%)',
                    color: getPhaseTextColor(phase),
                  }}
                >
                  {getPhaseLabel(phase)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

