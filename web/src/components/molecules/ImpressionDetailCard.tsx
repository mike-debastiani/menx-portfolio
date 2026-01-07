import Button from '@/components/atoms/Button';

export interface ImpressionDetailCardProps {
  projectLabel: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  className?: string;
}

export default function ImpressionDetailCard({
  projectLabel,
  title,
  description,
  buttonLabel,
  buttonHref,
  className = '',
}: ImpressionDetailCardProps) {
  return (
    <div className={`bg-primary-50 flex flex-col h-[429px] items-end justify-between overflow-hidden pl-12 pr-6 py-6 rounded-xl shrink-0 w-[316px] ${className}`}>
      {/* Text Container */}
      <div className="flex flex-col gap-6 h-[212px] items-start w-full">
        {/* Title Container */}
        <div className="flex flex-col gap-1 items-start w-full">
          {/* Project Label */}
          <p className="font-mono font-normal text-base leading-[1.5] text-primary-300">
            Project: {projectLabel}
          </p>
          {/* Title */}
          <h3 className="font-medium text-2xl leading-[1.5] text-primary-950">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-normal text-base leading-[1.5] text-primary-950 w-full whitespace-pre-wrap">
          {description}
        </p>
      </div>

      {/* Button - bottom-right aligned */}
      <div className="self-end">
        <Button variant="primary" icon="right" size="sm" href={buttonHref}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

