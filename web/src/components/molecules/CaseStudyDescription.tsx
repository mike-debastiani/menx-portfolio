import Pill from '@/components/atoms/Pill';

export interface CaseStudyDescriptionProps {
  projectTitle: string;
  statement: string;
  description: string;
  attributes?: string[];
  className?: string;
}

export default function CaseStudyDescription({
  projectTitle,
  statement,
  description,
  attributes,
  className = '',
}: CaseStudyDescriptionProps) {
  return (
    <div className={`flex flex-col gap-6 items-start ${className}`}>
      {/* UpperInfo: Project Title + Statement */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* Project Title */}
        <p className="text-2xl leading-[1.25] font-normal text-primary-300 w-full">
          {projectTitle}
        </p>
        
        {/* Statement */}
        <p className="text-3xl leading-[1.2] font-medium text-primary-950 w-full">
          {statement}
        </p>
      </div>

      {/* Description */}
      <p className="text-base leading-[1.4] font-normal text-primary-300 w-full">
        {description}
      </p>

      {/* Attributes Pills */}
      {attributes && attributes.length > 0 && (
        <div className="flex flex-wrap gap-2 items-start w-full">
          {attributes.map((attribute, index) => (
            <Pill key={index} variant="default" size="sm">
              {attribute}
            </Pill>
          ))}
        </div>
      )}
    </div>
  );
}

