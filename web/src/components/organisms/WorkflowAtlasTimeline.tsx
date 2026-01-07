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
const SEGMENT_GAP = 4; // gap-[4px] between segments
const BASE_HEIGHT = 16; // h-[16px] for normal segments
const ACTIVE_HEIGHT = 22; // h-[22px] for active segment (6px taller)
const MIN_SEGMENT_WIDTH = 10; // minimum width to keep segments visible
const LEGEND_GAP = 24; // gap-[24px] between legend items
const LEGEND_DOT_TEXT_GAP = 8; // gap-[8px] between dot and text
const LEGEND_DOT_SIZE = 12; // size-[12px] for legend dots
const CONTAINER_GAP = 24; // gap-[24px] between timeline and legend

// Calculate proportional widths for segments
const calculateSegmentWidths = (
  segments: WorkflowSegment[],
  containerWidth: number
): number[] => {
  const N = segments.length;
  if (N === 0) return [];

  const totalGapWidth = (N - 1) * SEGMENT_GAP;
  const availableWidth = containerWidth - totalGapWidth;

  if (availableWidth <= 0) {
    // Fallback: equal widths if container is too small
    return new Array(N).fill(Math.max(MIN_SEGMENT_WIDTH, availableWidth / N));
  }

  // Calculate weights (use max(count, 1) to ensure minimum weight)
  const weights = segments.map((seg) => Math.max(seg.count, 1));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  // Calculate preliminary widths proportional to weights
  let widths = weights.map((weight) => {
    const proportionalWidth = (weight / totalWeight) * availableWidth;
    return Math.max(proportionalWidth, MIN_SEGMENT_WIDTH);
  });

  // Check if enforcing min width causes overflow
  const totalWidth = widths.reduce((sum, w) => sum + w, 0);
  if (totalWidth > availableWidth) {
    // Scale down proportionally while maintaining minimum
    const scale = (availableWidth - N * MIN_SEGMENT_WIDTH) / (totalWidth - N * MIN_SEGMENT_WIDTH);
    widths = widths.map((w) => MIN_SEGMENT_WIDTH + (w - MIN_SEGMENT_WIDTH) * scale);
  }

  // Distribute rounding errors
  const currentTotal = widths.reduce((sum, w) => sum + w, 0);
  const difference = availableWidth - currentTotal;
  if (Math.abs(difference) > 0.01) {
    // Distribute leftover pixels
    const adjustmentPerSegment = difference / N;
    widths = widths.map((w) => w + adjustmentPerSegment);
  }

  // Ensure final widths are at least MIN_SEGMENT_WIDTH
  return widths.map((w) => Math.max(w, MIN_SEGMENT_WIDTH));
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine active ID (controlled vs uncontrolled)
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  // Calculate segment widths when container size or segments change
  useEffect(() => {
    const updateWidths = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const widths = calculateSegmentWidths(segments, containerWidth);
      setSegmentWidths(widths);
    };

    updateWidths();

    // Use ResizeObserver to handle container size changes
    const resizeObserver = new ResizeObserver(updateWidths);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also listen to window resize as fallback
    window.addEventListener('resize', updateWidths);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidths);
    };
  }, [segments]);

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
        className="flex gap-1 items-center relative w-full"
        style={{ height: `${ACTIVE_HEIGHT}px` }}
      >
        {segments.map((segment, index) => {
          const isActive = activeId === segment.id;
          const width = segmentWidths[index] || MIN_SEGMENT_WIDTH;
          const height = isActive ? ACTIVE_HEIGHT : BASE_HEIGHT;

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
                ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'}
              `}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                minWidth: `${MIN_SEGMENT_WIDTH}px`,
              }}
              aria-label={`${segment.methodName} method, ${segment.count} examples`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 items-center justify-between px-1 w-full">
        {uniquePhases.map((phase) => (
          <div key={phase} className="flex gap-2 items-center">
            <div
              className={`${getPhaseColorClass(phase)} rounded-full shrink-0`}
              style={{
                width: `${LEGEND_DOT_SIZE}px`,
                height: `${LEGEND_DOT_SIZE}px`,
              }}
              aria-hidden="true"
            />
            <p className="font-mono font-normal leading-[1.25] text-sm text-primary-950">
              {getPhaseLabel(phase)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

