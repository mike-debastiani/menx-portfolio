'use client';

import { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';
import { Container } from '@/components/layout';
import ScrollReveal from '@/components/atoms/ScrollReveal';
import StatsGroup from './StatsGroup';
import ImpressionGallery, { type ImpressionGalleryRef, type ImpressionGalleryItem } from './ImpressionGallery';
import WorkflowAtlasTimeline, { type WorkflowSegment, type WorkflowPhaseKey } from './WorkflowAtlasTimeline';
import { phaseColorToMethodColorVariant, phaseToWorkflowPhaseKey, formatStatValue } from '@/lib/workflow-atlas.utils';
import type { WorkflowAtlasData, WorkflowAtlasImpression, WorkflowAtlasMethod } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.client';
import type { SanityImage } from '@/types/sanity';
import { LayoutGroup } from 'framer-motion';
import { useIsMobileOverlay } from '@/lib/useIsMobileOverlay';
import ImpressionOverlayModal from '@/components/organisms/ImpressionOverlayModal';

export interface WorkflowAtlasSectionProps {
  data: WorkflowAtlasData;
  className?: string;
  title?: string;
  description?: string;
  showStats?: boolean;
  showProjectLink?: boolean;
}

/**
 * WorkflowAtlasSection - Homepage section displaying stats, impression gallery, and timeline.
 * Supports bidirectional interaction between gallery and timeline.
 */
export default function WorkflowAtlasSection({
  data,
  className = '',
  title,
  description,
  showStats,
  showProjectLink,
}: WorkflowAtlasSectionProps) {
  const galleryRef = useRef<ImpressionGalleryRef>(null);
  const isMobileOverlay = useIsMobileOverlay();
  const lastTriggerElementRef = useRef<HTMLElement | null>(null);
  
  // State for bidirectional interaction
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null);
  const [focusedImpressionId, setFocusedImpressionId] = useState<string | null>(null);
  const [expandedImpressionId, setExpandedImpressionId] = useState<string | null>(null);
  const [overlayImpressionId, setOverlayImpressionId] = useState<string | null>(null);
  const shouldShowProjectLink = showProjectLink ?? true;

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
        width: 800,
        height: 872,
        fit: 'crop',
        quality: 85,
        auto: 'format',
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
          showButton: shouldShowProjectLink,
        },
      };
    });
  }, [data.impressions, shouldShowProjectLink]);

  const overlayGalleryItem = useMemo(() => {
    if (!overlayImpressionId) return null;
    return galleryItems.find((item) => item.id === overlayImpressionId) ?? null;
  }, [galleryItems, overlayImpressionId]);

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

  // Ref to track expanded impression ID to avoid stale closure issues
  const expandedImpressionIdRef = useRef<string | null>(null);
  expandedImpressionIdRef.current = expandedImpressionId;

  // Handle gallery focus change -> update timeline active method
  // Only updates if no item is currently expanded (to respect forced state)
  const handleGalleryFocusChange = useCallback((impressionId: string | null) => {
    setFocusedImpressionId(impressionId);
    
    // Only update activeMethodId if no item is expanded (using ref to get latest value)
    // This allows the forced state from expanded items to take precedence
    if (!expandedImpressionIdRef.current && impressionId) {
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

  // When an impression is expanded, force highlight its corresponding segment
  // Use useLayoutEffect to ensure this runs synchronously before paint
  // This overrides the normal focus-based highlighting logic
  useLayoutEffect(() => {
    if (expandedImpressionId) {
      const impression = data.impressions.find((imp) => imp._id === expandedImpressionId);
      if (impression) {
        const methodId = (impression.method as WorkflowAtlasMethod)._id;
        setActiveMethodId(methodId);
      }
    }
  }, [expandedImpressionId, data.impressions]);

  // When expanded item is closed, return to focus-based highlighting
  useEffect(() => {
    if (!expandedImpressionId && focusedImpressionId) {
      const impression = data.impressions.find((imp) => imp._id === focusedImpressionId);
      if (impression) {
        const methodId = (impression.method as WorkflowAtlasMethod)._id;
        setActiveMethodId(methodId);
      }
    }
  }, [expandedImpressionId, focusedImpressionId, data.impressions]);

  // Mobile overlay mode: ensure desktop inline expansion is cleared
  useEffect(() => {
    if (!isMobileOverlay) return;
    setExpandedImpressionId(null);
  }, [isMobileOverlay]);

  // If switching to desktop, ensure any mobile overlay is closed
  useEffect(() => {
    if (isMobileOverlay) return;
    setOverlayImpressionId(null);
  }, [isMobileOverlay]);

  const handleMobileOverlayOpen = useCallback(
    (impressionId: string) => {
      // Capture focus for restore (basic focus restore is enough)
      lastTriggerElementRef.current = (document.activeElement as HTMLElement | null) ?? null;

      // Clear any inline expanded state (desktop behavior)
      setExpandedImpressionId(null);

      // Keep timeline highlight synced to the clicked impression's method
      const impression = data.impressions.find((imp) => imp._id === impressionId);
      if (impression) {
        const methodId = (impression.method as WorkflowAtlasMethod)._id;
        setActiveMethodId(methodId);
      }

      setOverlayImpressionId(impressionId);
    },
    [data.impressions]
  );

  const handleMobileOverlayClose = useCallback(() => {
    setOverlayImpressionId(null);
  }, []);

  const handleAfterMobileOverlayClose = useCallback(() => {
    // Restore focus to the previously focused trigger (best-effort)
    lastTriggerElementRef.current?.focus?.();
    lastTriggerElementRef.current = null;
  }, []);

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

  const sectionTitle = title ?? 'Workflow Atlas';
  const sectionDescription = description ?? 'A visual archive of my practical experience. This interactive timeline maps out the specific methodologies and artifacts I have applied across real projects. It offers a transparent look into my daily toolkit from initial discovery to final delivery.';
  const shouldShowStats = showStats ?? true;

  // Extract phase labels from Sanity CMS data
  const phaseLabels = useMemo(() => {
    const labels: Partial<Record<WorkflowPhaseKey, string>> = {};
    
    // Map each phase from Sanity to its WorkflowPhaseKey and store its name
    data.phases.forEach((phase) => {
      const phaseKey = phaseToWorkflowPhaseKey(phase);
      if (phase.name) {
        labels[phaseKey] = phase.name;
      }
    });
    
    return labels;
  }, [data.phases]);

  return (
    <ScrollReveal
      as="section"
      id="workflow"
      className={`py-12 md:py-20 overflow-visible ${className}`}
    >
      <Container>
        <div className="flex flex-col overflow-visible">
          {/* Section Header, Stats Group, and Impression Gallery with gap-20 (80px) */}
          <div className="flex flex-col gap-12 md:gap-20 overflow-visible">
            {/* Section Header */}
            <div className="flex flex-col gap-4">
              <h2 className="font-sans font-medium text-3xl min-[450px]:text-3xl leading-[1.2] text-primary-950">
                {sectionTitle}
              </h2>
              <p className="font-sans font-normal text-sm min-[450px]:text-base leading-[1.5] text-primary-400 max-w-3xl">
                {sectionDescription}
              </p>
            </div>

            {/* Stats Group */}
            {shouldShowStats && <StatsGroup items={statsItems} />}

            {/* Impression Gallery - Break out of container padding to reach viewport edges */}
            <LayoutGroup>
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
                  isMobileOverlay={isMobileOverlay}
                  onMobileOpen={handleMobileOverlayOpen}
                />
              </div>

              <ImpressionOverlayModal
                open={isMobileOverlay && overlayImpressionId !== null}
                impressionId={overlayImpressionId}
                image={overlayGalleryItem?.card.image}
                methodLabel={overlayGalleryItem?.card.methodLabel}
                methodColorVariant={overlayGalleryItem?.card.methodColorVariant}
                detail={overlayGalleryItem?.detail ?? null}
                onClose={handleMobileOverlayClose}
                onAfterClose={handleAfterMobileOverlayClose}
              />
            </LayoutGroup>
          </div>

          {/* Timeline with responsive gap from Impression Gallery */}
          {/* Smaller gap on mobile (< 600px), full gap on larger screens */}
          <div className="mt-8 min-[600px]:mt-12">
            <WorkflowAtlasTimeline
              segments={timelineSegments}
              activeId={activeMethodId || undefined}
              onSegmentSelect={handleTimelineSegmentSelect}
              phaseLabels={phaseLabels}
            />
          </div>
        </div>
      </Container>
    </ScrollReveal>
  );
}
