'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Container } from '@/components/layout';
import StatsGroup from './StatsGroup';
import ImpressionGallery, { type ImpressionGalleryRef, type ImpressionGalleryItem } from './ImpressionGallery';
import WorkflowAtlasTimeline, { type WorkflowSegment, type WorkflowPhaseKey } from './WorkflowAtlasTimeline';
import { phaseColorToMethodColorVariant, phaseToWorkflowPhaseKey, formatStatValue } from '@/lib/workflow-atlas.utils';
import type { WorkflowAtlasData, WorkflowAtlasImpression, WorkflowAtlasMethod } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.client';
import type { SanityImage } from '@/types/sanity';

export interface WorkflowAtlasSectionProps {
  data: WorkflowAtlasData;
  className?: string;
}

/**
 * WorkflowAtlasSection - Homepage section displaying stats, impression gallery, and timeline.
 * Supports bidirectional interaction between gallery and timeline.
 */
export default function WorkflowAtlasSection({ data, className = '' }: WorkflowAtlasSectionProps) {
  const galleryRef = useRef<ImpressionGalleryRef>(null);
  
  // State for bidirectional interaction
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const [focusedImpressionId, setFocusedImpressionId] = useState<string | null>(null);
  const [expandedImpressionId, setExpandedImpressionId] = useState<string | null>(null);

  // Convert impressions to gallery items
  const galleryItems: ImpressionGalleryItem[] = useMemo(() => {
    // Filter out impressions with missing method or project references
    const validImpressions = data.impressions.filter(
      (impression) => {
        const hasMethod = impression.method && typeof impression.method === 'object' && 'name' in impression.method;
        const hasProject = impression.project && typeof impression.project === 'object' && 'projectTitle' in impression.project;
        const hasPhase = hasMethod && (impression.method as WorkflowAtlasMethod).phase;
        return hasMethod && hasProject && hasPhase;
      }
    );
    
    // Debug: Log filtered impressions count
    if (process.env.NODE_ENV === 'development') {
      console.log('[WorkflowAtlasSection] Total impressions:', data.impressions.length);
      console.log('[WorkflowAtlasSection] Valid impressions:', validImpressions.length);
      if (data.impressions.length > validImpressions.length) {
        console.warn('[WorkflowAtlasSection] Filtered out', data.impressions.length - validImpressions.length, 'impressions with missing references');
      }
    }
    
    return validImpressions.map((impression) => {
      const method = impression.method as WorkflowAtlasMethod & { phase: { color?: string } };
      const phase = method.phase;
      const methodColorVariant = phaseColorToMethodColorVariant(phase.color);

      // Build image URL
      const imageUrl = urlForImage(impression.image, {
        width: 398,
        height: 436,
        fit: 'crop',
      });

      return {
        id: impression._id,
        card: {
          image: imageUrl
            ? { src: imageUrl, alt: impression.headline || 'Impression image' }
            : undefined,
          methodLabel: method.name,
          methodColorVariant,
        },
        detail: {
          projectLabel: impression.project.projectTitle || '',
          title: impression.headline,
          description: impression.description || '',
          buttonLabel: 'VIEW PROJECT',
          buttonHref: `/projects/${impression.project.slug.current}`,
        },
      };
    });
  }, [data.impressions]);

  // Convert methods to timeline segments
  const timelineSegments: WorkflowSegment[] = useMemo(() => {
    // Create a map from method ID to first impression index in the gallery
    const methodToFirstImpressionIndex = new Map<string, number>();
    data.impressions.forEach((impression, index) => {
      const methodId = (impression.method as WorkflowAtlasMethod)._id;
      if (!methodToFirstImpressionIndex.has(methodId)) {
        methodToFirstImpressionIndex.set(methodId, index);
      }
    });

    // Ensure methods are sorted by phase.order -> method.order
    // This is critical: methods must be ordered by their "order" field from Sanity, not by impression count
    const sortedMethods = [...data.methods].sort((a, b) => {
      // First sort by phase order
      if (a.phase.order !== b.phase.order) {
        return a.phase.order - b.phase.order;
      }
      // Then sort by method order within the same phase
      return a.order - b.order;
    });

    // Create segments from sorted methods
    const segments: WorkflowSegment[] = sortedMethods.map((method) => {
      const phase = method.phase;
      const phaseKey = phaseToWorkflowPhaseKey(phase);
      const galleryIndex = methodToFirstImpressionIndex.get(method._id) ?? 0;

      return {
        id: method._id,
        methodName: method.name,
        phase: phaseKey,
        count: method.impressionCount,
        galleryIndex,
      };
    });

    // Debug: Log segment order in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[WorkflowAtlasSection] Timeline segments order:', segments.map(s => {
        const method = sortedMethods.find(m => m._id === s.id);
        return {
          method: s.methodName,
          methodId: s.id,
          phase: s.phase,
          order: method?.order,
          phaseOrder: method?.phase.order,
          phaseName: method?.phase.name,
          impressionCount: s.count,
        };
      }));
      
      // Also log the raw methods data to compare
      console.log('[WorkflowAtlasSection] Raw methods from Sanity:', data.methods.map(m => ({
        _id: m._id,
        name: m.name,
        order: m.order,
        phaseId: m.phase._id,
        phaseName: m.phase.name,
        phaseOrder: m.phase.order,
      })));
    }

    return segments;
  }, [data.impressions, data.methods]);

  // Create a map from method ID to first impression index
  const methodToFirstImpressionIndex = useMemo(() => {
    const map = new Map<string, number>();
    data.impressions.forEach((impression, index) => {
      const methodId = (impression.method as WorkflowAtlasMethod)._id;
      if (!map.has(methodId)) {
        map.set(methodId, index);
      }
    });
    return map;
  }, [data.impressions]);

  // Handle gallery focus change -> update timeline active method
  const handleGalleryFocusChange = useCallback((impressionId: string | null) => {
    setFocusedImpressionId(impressionId);
    
    if (impressionId) {
      const impression = data.impressions.find((imp) => imp._id === impressionId);
      if (impression) {
        const methodId = (impression.method as WorkflowAtlasMethod)._id;
        setActiveMethodId(methodId);
      }
    }
  }, [data.impressions]);

  // Handle timeline segment click -> scroll gallery to first impression of that method
  const handleTimelineSegmentSelect = useCallback((segment: WorkflowSegment) => {
    // Auto-close any expanded impression
    setExpandedImpressionId(null);

    // Find the first impression for this method
    const firstIndex = methodToFirstImpressionIndex.get(segment.id);
    if (firstIndex !== undefined && galleryRef.current) {
      // Scroll to the first impression of this method, aligning its left edge to the container's left edge
      galleryRef.current.scrollToIndex(firstIndex, {
        align: 'start',
        behavior: 'smooth',
      });
      
      // Update active method
      setActiveMethodId(segment.id);
    }
  }, [methodToFirstImpressionIndex]);

  // Initialize: scroll to first item and highlight first segment
  useEffect(() => {
    if (galleryItems.length > 0 && timelineSegments.length > 0 && galleryRef.current) {
      // Wait for next frame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        // Small additional delay to ensure layout is complete
        setTimeout(() => {
          // Scroll gallery to the first item with proper margin offset (same as Timeline)
          galleryRef.current?.scrollToIndex(0, {
            align: 'start',
            behavior: 'auto', // Instant, no animation on initial load
          });
        }, 10);
      });
      
      // Highlight the first segment
      // The focus change handler will update this based on which impression is at the left edge
      const firstSegment = timelineSegments[0];
      if (firstSegment) {
        setActiveMethodId(firstSegment.id);
      }
    }
  }, [galleryItems.length, timelineSegments.length]); // Only run when items/segments are ready

  // Prepare stats data
  const statsItems = useMemo(() => [
    {
      value: formatStatValue(data.stats.impressionsCount),
      label: 'Application examples',
    },
    {
      value: formatStatValue(data.stats.methodsWithImpressionsCount),
      label: 'Methods',
    },
    {
      value: formatStatValue(data.stats.phasesInDatasetCount),
      label: 'Phases',
    },
    {
      value: formatStatValue(data.stats.projectsTotalCount),
      label: 'Projects',
    },
  ], [data.stats]);

  return (
    <section className={`py-24 overflow-visible ${className}`}>
      <Container>
        <div className="flex flex-col overflow-visible">
          {/* Section Header, Stats Group, and Impression Gallery with gap-20 (80px) */}
          <div className="flex flex-col gap-20 overflow-visible">
            {/* Section Header */}
            <div className="flex flex-col gap-4">
              <h2 className="font-sans font-medium text-4xl leading-[1.25] text-primary-950">
                Workflow Atlas
              </h2>
              <p className="font-sans font-normal text-base leading-[1.5] text-primary-400 max-w-3xl">
                A visual archive of my practical experience. This interactive timeline maps out the specific methodologies and artifacts I have applied across real projects. It offers a transparent look into my daily toolkit from initial discovery to final delivery.
              </p>
            </div>

            {/* Stats Group */}
            <StatsGroup items={statsItems} />

            {/* Impression Gallery - Break out of container padding to reach viewport edges */}
            <div 
              className="overflow-visible" 
              style={{ 
                overflow: 'visible',
                contain: 'none',
                // Ensure no height constraints
                height: 'auto',
                minHeight: 'fit-content',
                // Break out of container padding to reach viewport edges
                marginLeft: 'calc(-1 * var(--layout-margin))',
                marginRight: 'calc(-1 * var(--layout-margin))',
                width: 'calc(100% + 2 * var(--layout-margin))',
              }}
            >
              <ImpressionGallery
                ref={galleryRef}
                items={galleryItems}
                expandedImpressionId={expandedImpressionId}
                onExpandedChange={setExpandedImpressionId}
                onFocusChange={handleGalleryFocusChange}
              />
            </div>
          </div>

          {/* Timeline with gap-12 (48px) from Impression Gallery */}
          <div className="mt-12">
            <WorkflowAtlasTimeline
              segments={timelineSegments}
              activeId={activeMethodId || undefined}
              onSegmentSelect={handleTimelineSegmentSelect}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
