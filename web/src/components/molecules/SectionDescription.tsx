import { Button } from '@/components/atoms';

export interface SectionDescriptionCTA {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SectionDescriptionProps {
  title: string;
  description?: string;
  cta?: SectionDescriptionCTA;
  className?: string;
}

export default function SectionDescription({
  title,
  description,
  cta,
  className = '',
}: SectionDescriptionProps) {
  return (
    <div className={`flex flex-col gap-4 items-start ${className}`}>
      <h2 className="font-sans font-medium text-3xl leading-[1.2] text-primary-950">
        {title}
      </h2>

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

