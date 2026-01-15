import SubInfoGroup, { type SubInfoGroupProps, type SubInfoGroupItem } from './SubInfoGroup';

export interface AboutDescriptionProps {
  greeting?: string;
  heading: string;
  description: string;
  subInfoItems?: SubInfoGroupItem[];
  subInfoVariant?: SubInfoGroupProps['variant'];
  subInfoSize?: SubInfoGroupProps['size'];
  className?: string;
}

export default function AboutDescription({
  greeting,
  heading,
  description,
  subInfoItems,
  subInfoVariant,
  subInfoSize,
  className = '',
}: AboutDescriptionProps) {
  return (
    <div className={`flex flex-col gap-6 items-start ${className}`}>
      {/* UpperInfo: Greeting + Heading */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* Greeting */}
        {greeting && (
          <p className="text-2xl leading-[1.25] font-normal text-primary-300 w-full">
            {greeting}
          </p>
        )}
        
        {/* Main Heading */}
        <p className="text-3xl leading-[1.2] font-medium text-primary-950 w-full">
          {heading}
        </p>
      </div>

      {/* Description */}
      <p className="text-base leading-[1.5] font-normal text-primary-400 w-full">
        {description}
      </p>

      {/* SubInfoGroup with 12px top padding */}
      {subInfoItems && subInfoItems.length > 0 && (
        <div className="pt-3 w-full">
          <SubInfoGroup
            items={subInfoItems}
            variant={subInfoVariant || 'row'}
            size={subInfoSize}
          />
        </div>
      )}
    </div>
  );
}
