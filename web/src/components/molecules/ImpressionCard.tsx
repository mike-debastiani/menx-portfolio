'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Pill, { type PillSize } from '@/components/atoms/Pill';
import { motion } from 'framer-motion';

export type MethodColorVariant = 'default' | 'blue' | 'purple' | 'magenta' | 'orange' | 'green' | 'darkgrey';

// Dimension constants for ImpressionCard (fallback values)
export const IMPRESSION_CARD_HEIGHT = 436;
export const IMPRESSION_CARD_WIDTH = 398;
export const IMPRESSION_CARD_OVERLAP_MARGIN = 24;

// Hook to get responsive card dimensions from CSS variables
// On mobile, calculates width so that expanded item fills screen width minus padding
function useResponsiveCardDimensions() {
  const [dimensions, setDimensions] = useState({
    width: IMPRESSION_CARD_WIDTH,
    height: IMPRESSION_CARD_HEIGHT,
    overlapMargin: IMPRESSION_CARD_OVERLAP_MARGIN,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const root = document.documentElement;
      const viewportWidth = window.innerWidth;
      
      // Check if we're on mobile (< 768px)
      const isMobile = viewportWidth < 768;
      
      let width: number;
      let height: number;
      let overlapMargin: number;

      if (isMobile) {
        // On mobile: calculate width so expanded item fills screen minus padding
        const layoutMargin = parseFloat(
          getComputedStyle(root).getPropertyValue('--layout-margin').trim()
        ) || 16;
        
        // Expanded width = 2 * cardWidth (since detailCardWidth = cardWidth + overlapMargin - overlapMargin = cardWidth)
        // We want: 2 * cardWidth = viewportWidth - 2 * layoutMargin
        // So: cardWidth = (viewportWidth - 2 * layoutMargin) / 2
        width = (viewportWidth - 2 * layoutMargin) / 2;
        
        // Calculate height proportionally (maintain aspect ratio from desktop: 436/398)
        const aspectRatio = IMPRESSION_CARD_HEIGHT / IMPRESSION_CARD_WIDTH;
        height = width * aspectRatio;
        
        // Overlap margin proportional to card width (24px at 398px = ~6% of width)
        overlapMargin = Math.round(width * (IMPRESSION_CARD_OVERLAP_MARGIN / IMPRESSION_CARD_WIDTH));
      } else {
        // Tablet and Desktop: use CSS variables
        width = parseFloat(
          getComputedStyle(root).getPropertyValue('--impression-card-width').trim()
        ) || IMPRESSION_CARD_WIDTH;
        height = parseFloat(
          getComputedStyle(root).getPropertyValue('--impression-card-height').trim()
        ) || IMPRESSION_CARD_HEIGHT;
        overlapMargin = parseFloat(
          getComputedStyle(root).getPropertyValue('--impression-card-overlap-margin').trim()
        ) || IMPRESSION_CARD_OVERLAP_MARGIN;
      }

      setDimensions({ width, height, overlapMargin });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return dimensions;
}

export interface ImpressionCardProps {
  image?: { src: string; alt: string };
  methodLabel: string;
  methodColorVariant?: MethodColorVariant;
  className?: string;
  imageScale?: number;
  calculatedWidth?: number | null; // Calculated width for responsive layout (overrides hook value)
  /**
   * Optional shared element layout id for Framer Motion transitions.
   * Must match between the thumbnail and the modal hero image.
   */
  sharedImageLayoutId?: string;
}

export default function ImpressionCard({
  image,
  methodLabel,
  methodColorVariant = 'default',
  className = '',
  imageScale = 1,
  calculatedWidth,
  sharedImageLayoutId,
}: ImpressionCardProps) {
  const { width: baseWidth, height: baseHeight } = useResponsiveCardDimensions();
  const [pillSize, setPillSize] = useState<PillSize>('sm');

  // Update pill size based on viewport width
  useEffect(() => {
    const updatePillSize = () => {
      setPillSize(window.innerWidth < 600 ? 'xs' : 'sm');
    };

    updatePillSize();
    window.addEventListener('resize', updatePillSize);
    return () => window.removeEventListener('resize', updatePillSize);
  }, []);

  // Use calculated width if provided, otherwise use base width
  const effectiveWidth = calculatedWidth !== null && calculatedWidth !== undefined
    ? calculatedWidth
    : baseWidth;
  
  // Calculate height proportionally to maintain aspect ratio
  const aspectRatio = baseHeight / baseWidth;
  const effectiveHeight = calculatedWidth !== null && calculatedWidth !== undefined
    ? calculatedWidth * aspectRatio
    : baseHeight;

  const cardWidth = effectiveWidth * imageScale;
  const cardHeight = effectiveHeight * imageScale;

  return (
    <div className={`flex flex-col gap-2 min-[600px]:gap-3 items-start ${className}`}>
      {/* Image Container - scales down in size, border radius stays at 12px */}
      {sharedImageLayoutId ? (
        <motion.div
          layoutId={sharedImageLayoutId}
          className="relative rounded-xl overflow-hidden bg-primary-50 transition-all duration-300 ease-out"
          style={{
            height: `${cardHeight}px`,
            width: `${cardWidth}px`,
          }}
        >
          {image?.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={`${cardWidth}px`}
              quality={80}
            />
          ) : (
            <div className="w-full h-full bg-primary-100" aria-hidden="true" />
          )}
        </motion.div>
      ) : (
        <div
          className="relative rounded-xl overflow-hidden bg-primary-50 transition-all duration-300 ease-out"
          style={{
            height: `${cardHeight}px`,
            width: `${cardWidth}px`,
          }}
        >
          {image?.src ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={`${cardWidth}px`}
              quality={85}
            />
          ) : (
            <div className="w-full h-full bg-primary-100" aria-hidden="true" />
          )}
        </div>
      )}

      {/* Method Pill - xs size below 600px, sm size from 600px */}
      <Pill variant={methodColorVariant} size={pillSize}>
        {methodLabel}
      </Pill>
    </div>
  );
}

