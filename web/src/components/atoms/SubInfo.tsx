export type SubInfoSize = 'lg' | 'base';

export interface SubInfoProps {
  label: string;
  value: string;
  size?: SubInfoSize;
  dot?: boolean;
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
  dot = false,
  className = '',
}: SubInfoProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <p className={styles.label}>{label}</p>
      {dot && (
        <div className="flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-accent-blue/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          </div>
        </div>
      )}
      <p className={styles.value}>{value}</p>
    </div>
  );
}

