export type StatItemVariant = 'section' | 'meta';
export type StatItemSize = 'lg' | 'base';

export interface StatItemProps {
  value: string;
  label: string;
  metaLabel?: string;
  metaValue?: string;
  variant?: StatItemVariant;
  size?: StatItemSize;
  className?: string;
}

const sectionStyles = {
  container: 'flex flex-col items-start gap-2',
  value: 'font-sans font-normal text-4xl md:text-5xl leading-none text-primary-950',
  label: 'font-mono font-normal text-base leading-[1.25] text-primary-400',
};

const metaStyles: Record<
  StatItemSize,
  {
    container: string;
    metaLabel: string;
    metaValue: string;
  }
> = {
  lg: {
    container: 'flex flex-col items-start gap-1',
    metaLabel: 'font-mono font-normal text-lg leading-[1.4] text-primary-400',
    metaValue: 'font-sans font-medium text-lg leading-[1.4] text-primary-950',
  },
  base: {
    container: 'flex flex-col items-start gap-1',
    metaLabel: 'font-mono font-normal text-base leading-[1.4] text-primary-400',
    metaValue: 'font-sans font-medium text-base leading-[1.4] text-primary-950',
  },
};

export default function StatItem({
  value,
  label,
  metaLabel,
  metaValue,
  variant = 'section',
  size = 'base',
  className = '',
}: StatItemProps) {
  if (variant === 'section') {
    return (
      <div className={`${sectionStyles.container} ${className}`}>
        <div className="h-9 md:h-12">
          <p className={sectionStyles.value}>{value}</p>
        </div>
        <div className="h-6">
          <p className={sectionStyles.label}>{label}</p>
        </div>
      </div>
    );
  }

  // Meta variant - use metaLabel/metaValue if provided, otherwise fall back to label/value
  const metaStyle = metaStyles[size];
  const displayLabel = metaLabel ?? label;
  const displayValue = metaValue ?? value;

  return (
    <div className={`${metaStyle.container} ${className}`}>
      <p className={metaStyle.metaLabel}>{displayLabel}</p>
      <p className={metaStyle.metaValue}>{displayValue}</p>
    </div>
  );
}

