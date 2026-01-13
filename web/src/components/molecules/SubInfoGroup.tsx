import { SubInfo, type SubInfoSize } from '@/components/atoms';

export type SubInfoGroupVariant = 'row' | 'column';

export interface SubInfoGroupItem {
  label: string;
  value: string;
  showDot?: boolean;
}

export interface SubInfoGroupProps {
  items: SubInfoGroupItem[];
  variant?: SubInfoGroupVariant;
  size?: SubInfoSize;
  className?: string;
}

export default function SubInfoGroup({
  items,
  variant = 'row',
  size = 'base',
  className = '',
}: SubInfoGroupProps) {
  if (variant === 'row') {
    return (
      <div className={`flex gap-8 items-center flex-wrap ${className}`}>
        {items.map((item, index) => (
          <SubInfo
            key={index}
            label={item.label}
            value={item.value}
            size={size}
            dot={item.showDot}
          />
        ))}
      </div>
    );
  }

  // Column variant
  return (
    <div className={`flex flex-col gap-2 items-start ${className}`}>
      {items.map((item, index) => (
        <SubInfo
          key={index}
          label={item.label}
          value={item.value}
          size={size}
          dot={item.showDot}
        />
      ))}
    </div>
  );
}

