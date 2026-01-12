import Image from 'next/image';
import Pill from '@/components/atoms/Pill';

export type MethodColorVariant = 'default' | 'blue' | 'purple' | 'magenta' | 'orange' | 'green' | 'darkgrey';

// Dimension constants for ImpressionCard
export const IMPRESSION_CARD_HEIGHT = 436;
export const IMPRESSION_CARD_WIDTH = 398;
export const IMPRESSION_CARD_OVERLAP_MARGIN = 24;

export interface ImpressionCardProps {
  image?: { src: string; alt: string };
  methodLabel: string;
  methodColorVariant?: MethodColorVariant;
  className?: string;
  imageScale?: number;
}

export default function ImpressionCard({
  image,
  methodLabel,
  methodColorVariant = 'default',
  className = '',
  imageScale = 1,
}: ImpressionCardProps) {
  return (
    <div className={`flex flex-col gap-3 items-start ${className}`}>
      {/* Image Container - scales down in size, border radius stays at 12px */}
      <div 
        className="relative rounded-xl overflow-hidden bg-primary-50 transition-all duration-300 ease-out"
        style={{
          height: `${IMPRESSION_CARD_HEIGHT * imageScale}px`,
          width: `${IMPRESSION_CARD_WIDTH * imageScale}px`,
        }}
      >
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes={`${IMPRESSION_CARD_WIDTH}px`}
          />
        ) : (
          <div className="w-full h-full bg-primary-100" aria-hidden="true" />
        )}
      </div>

      {/* Method Pill - always visible, does not scale */}
      <Pill variant={methodColorVariant} size="sm">
        {methodLabel}
      </Pill>
    </div>
  );
}

