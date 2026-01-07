import Image from 'next/image';
import Pill from '@/components/atoms/Pill';

export type MethodColorVariant = 'default' | 'blue' | 'purple' | 'magenta' | 'orange' | 'green' | 'darkgrey';

export interface ImpressionCardProps {
  image?: { src: string; alt: string };
  methodLabel: string;
  methodColorVariant?: MethodColorVariant;
  className?: string;
}

export default function ImpressionCard({
  image,
  methodLabel,
  methodColorVariant = 'default',
  className = '',
}: ImpressionCardProps) {
  return (
    <div className={`flex flex-col gap-3 items-start ${className}`}>
      {/* Image Container - no border, rounded corners */}
      <div className="relative h-[429px] w-[292px] rounded-xl overflow-hidden bg-primary-50">
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="292px"
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

