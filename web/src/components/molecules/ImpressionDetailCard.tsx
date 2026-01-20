import Button from '@/components/atoms/Button';

export interface ImpressionDetailCardProps {
  projectLabel: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  className?: string;
  height?: number;
  width?: number;
}

export default function ImpressionDetailCard({
  projectLabel,
  title,
  description,
  buttonLabel,
  buttonHref,
  className = '',
  height,
  width,
}: ImpressionDetailCardProps) {
  return (
    <div 
      className={`bg-primary-50 flex flex-col items-end gap-4 md:justify-between overflow-hidden -mt-[40px] px-4 pb-4 pt-12 md:mt-0 md:pl-10 md:pr-5 md:py-5 lg:pr-6 lg:py-6 rounded-xl shrink-0 ${className}`}
      style={{
        height: height ? `${height}px` : undefined,
        width: width ? `${width}px` : undefined,
      }}
    >
      {/* Text Container */}
      <div className="flex flex-col gap-3 md:gap-3 min-h-[180px] md:min-h-[196px] lg:min-h-[212px] items-start w-full">
        {/* Title Container */}
        <div className="flex flex-col gap-1 items-start w-full">
          {/* Project Label */}
          <p className="font-mono font-normal text-sm md:text-base leading-[1.25] text-primary-300">
            Project: {projectLabel}
          </p>
          {/* Title */}
          <h3 className="font-medium text-lg md:text-2xl leading-[1.25] text-primary-950">
            {title}
          </h3>
        </div>

        {/* Description - always visible (also <500px) */}
        <p className="block font-normal text-sm leading-[1.4] text-primary-500 w-full whitespace-pre-wrap">
          {description}
        </p>
      </div>

      {/* Button - always use the “large screen” variant (also <500px) */}
      <div className="self-end relative z-20 w-auto">
        <Button variant="primary" icon="right" size="sm" href={buttonHref}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

