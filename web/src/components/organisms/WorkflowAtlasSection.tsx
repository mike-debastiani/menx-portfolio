'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
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
        const hasProject = impression.project && typeof impression.project === 'object' && 'title' in impression.project;
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
          projectLabel: impression.project.title,
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
    const segments: WorkflowSegment[] = [];
    let galleryIndex = 0;

    data.impressions.forEach((impression, index) => {
      const method = impression.method as WorkflowAtlasMethod & { phase: { color?: string } };
      const methodId = method._id;

      // Check if this is the first impression for this method
      const isFirstForMethod = index === 0 || 
        (data.impressions[index - 1].method as WorkflowAtlasMethod)._id !== methodId;

      if (isFirstForMethod) {
        const phase = method.phase;
        const phaseKey = phaseToWorkflowPhaseKey(phase);
        const methodData = data.methods.find((m) => m._id === methodId);

        segments.push({
          id: methodId,
          methodName: method.name,
          phase: phaseKey,
          count: methodData?.impressionCount || 0,
          galleryIndex,
        });
      }

      galleryIndex++;
    });

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
      // Scroll to the first impression of this method
      galleryRef.current.scrollToIndex(firstIndex, {
        align: 'center',
        behavior: 'smooth',
      });
      
      // Update active method
      setActiveMethodId(segment.id);
    }
  }, [methodToFirstImpressionIndex]);

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
    <section className={`py-24 ${className}`}>
      <Container>
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col gap-4">
            <h2 className="font-sans font-medium text-4xl leading-[1.25] text-primary-950">
              Workflow Atlas
            </h2>
            <p className="font-sans font-normal text-lg leading-[1.5] text-primary-950 max-w-3xl">
              A visual archive of my practical experience. This interactive timeline maps out the specific methodologies and artifacts I have applied across real projects. It offers a transparent look into my daily toolkit from initial discovery to final delivery.
            </p>
          </div>

          {/* Stats Group */}
          <StatsGroup items={statsItems} />

          {/* Impression Gallery */}
          <ImpressionGallery
            ref={galleryRef}
            items={galleryItems}
            expandedImpressionId={expandedImpressionId}
            onExpandedChange={setExpandedImpressionId}
            onFocusChange={handleGalleryFocusChange}
          />

          {/* Timeline */}
          <WorkflowAtlasTimeline
            segments={timelineSegments}
            activeId={activeMethodId || undefined}
            onSegmentSelect={handleTimelineSegmentSelect}
          />
        </div>
      </Container>
    </section>
  );
}
