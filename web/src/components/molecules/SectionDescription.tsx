import { type ReactNode } from 'react';
import { Button } from '@/components/atoms';

export interface SectionDescriptionCTA {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SectionDescriptionProps {
  title: string | ReactNode;
  description?: string;
  cta?: SectionDescriptionCTA;
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function SectionDescription({
  title,
  description,
  cta,
  className = '',
  titleAs = 'h2',
}: SectionDescriptionProps) {
  const TitleTag = titleAs;
  
  return (
    <div className={`flex flex-col gap-4 items-start ${className}`}>
      <TitleTag className="font-sans font-medium text-3xl leading-[1.2] text-primary-950">
        {title}
      </TitleTag>

      {description && (
        <p className="font-sans font-normal text-base leading-[1.5] text-primary-500">
          {description}
        </p>
      )}

      {cta && (
        <Button
          variant="primary"
          size="sm"
          icon="none"
          href={cta.href}
          onClick={cta.onClick}
        >
          {cta.label}
        </Button>
      )}
    </div>
  );
}

