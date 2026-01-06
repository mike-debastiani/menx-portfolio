export type SubInfoSize = 'lg' | 'base';

export interface SubInfoProps {
  label: string;
  value: string;
  size?: SubInfoSize;
  className?: string;
}

const sizeStyles: Record<
  SubInfoSize,
  {
    label: string;
    value: string;
  }
> = {
  lg: {
    label: 'font-mono font-medium text-lg leading-[1.5] text-primary-300',
    value: 'font-sans font-normal text-lg leading-[1.5] text-primary-950',
  },
  base: {
    label: 'font-mono font-medium text-base leading-[1.5] text-primary-300',
    value: 'font-sans font-normal text-base leading-[1.5] text-primary-950',
  },
};

export default function SubInfo({
  label,
  value,
  size = 'base',
  className = '',
}: SubInfoProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

