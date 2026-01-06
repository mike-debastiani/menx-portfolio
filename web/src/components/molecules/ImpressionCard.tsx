import Image from 'next/image';
import Pill from '@/components/atoms/Pill';

export type PhaseColorVariant = 'default' | 'blue' | 'purple' | 'magenta' | 'orange' | 'green' | 'darkgrey';

export interface ImpressionCardProps {
  imageSrc: string;
  imageAlt: string;
  methodName: string;
  phaseColorVariant: PhaseColorVariant;
  className?: string;
  priority?: boolean;
  sizes?: string;
  hidePill?: boolean;
  imageBorderRadius?: string;
}

export default function ImpressionCard({
  imageSrc,
  imageAlt,
  methodName,
  phaseColorVariant,
  className = '',
  priority = false,
  sizes,
  hidePill = false,
  imageBorderRadius = 'rounded-xl',
}: ImpressionCardProps) {
  return (
    <div className={`flex flex-col gap-3 items-start w-full ${className}`}>
      {/* Image Container */}
      <div className={`relative w-full aspect-[324/475] border border-primary-100 ${imageBorderRadius} overflow-hidden`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority={priority}
            sizes={sizes}
          />
        ) : (
          <div className="w-full h-full bg-primary-50" aria-hidden="true" />
        )}
      </div>

      {/* Pill */}
      {!hidePill && (
        <Pill variant={phaseColorVariant} size="sm">
          {methodName}
        </Pill>
      )}
    </div>
  );
}

