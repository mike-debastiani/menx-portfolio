import Link from 'next/link';
import Button from '@/components/atoms/Button';

export interface ImpressionDetailCardProps {
  projectTitle: string;
  exampleTitle: string;
  description: string;
  projectSlug: string;
  className?: string;
}

export default function ImpressionDetailCard({
  projectTitle,
  exampleTitle,
  description,
  projectSlug,
  className = '',
}: ImpressionDetailCardProps) {
  return (
    <div
      className={`bg-white flex flex-col justify-between pt-8 px-6 pb-6 rounded-tr-xl rounded-br-xl border border-primary-100 ${className}`}
    >
      {/* Text Container */}
      <div className="flex flex-col gap-6 w-full">
        {/* Title Container */}
        <div className="flex flex-col gap-2 w-full">
          {/* Project Label */}
          <p className="font-mono text-base font-normal text-primary-300 leading-[1.5]">
            Project: {projectTitle}
          </p>
          {/* Example Title */}
          <h3 className="text-2xl font-medium text-primary-950 leading-[1.5]">{exampleTitle}</h3>
        </div>

        {/* Description */}
        <p className="text-base font-normal text-primary-950 leading-[1.5]">{description}</p>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-6 self-end">
        <Button variant="primary" icon="right" size="base" href={`/projects/${projectSlug}`}>
          View Project
        </Button>
      </div>
    </div>
  );
}

