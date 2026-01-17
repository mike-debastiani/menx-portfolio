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
      className={`bg-primary-50 flex flex-col items-end justify-between overflow-hidden pl-6 pr-4 py-4 md:pl-10 md:pr-5 md:py-5 lg:pl-12 lg:pr-6 lg:py-6 rounded-xl shrink-0 ${className}`}
      style={{
        height: height ? `${height}px` : undefined,
        width: width ? `${width}px` : undefined,
      }}
    >
      {/* Text Container */}
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 h-[180px] md:h-[196px] lg:h-[212px] items-start w-full">
        {/* Title Container */}
        <div className="flex flex-col gap-1 items-start w-full">
          {/* Project Label */}
          <p className="font-mono font-normal text-base max-[500px]:text-base min-[500px]:text-[15px] lg:text-base leading-[1.25] text-primary-300">
            Project: {projectLabel}
          </p>
          {/* Title */}
          <h3 className="font-medium text-base max-[500px]:text-base min-[500px]:text-[22px] lg:text-2xl leading-[1.25] text-primary-950">
            {title}
          </h3>
        </div>

        {/* Description - hidden only below 500px */}
        <p className="hidden max-[500px]:hidden min-[500px]:block font-normal text-[15px] lg:text-base leading-[1.5] text-primary-500 w-full whitespace-pre-wrap">
          {description}
        </p>
      </div>

      {/* Button - full width without icon below 500px, right-aligned with icon from 500px */}
      <div className="self-stretch max-[500px]:self-stretch min-[500px]:self-end relative z-20 w-full max-[500px]:w-full min-[500px]:w-auto">
        {/* Mobile button - no icon, full width, only visible below 500px */}
        <Button 
          variant="primary" 
          icon="none"
          size="sm" 
          href={buttonHref}
          className="w-full max-[500px]:!block min-[500px]:!hidden"
        >
          {buttonLabel}
        </Button>
        {/* Standard button - with icon, auto width, only visible from 500px */}
        <Button 
          variant="primary" 
          icon="right"
          size="sm" 
          href={buttonHref}
          className="!hidden max-[500px]:!hidden min-[500px]:!block"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

