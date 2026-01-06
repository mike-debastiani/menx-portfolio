import StatItem from '@/components/atoms/StatItem';

export interface StatsGroupItem {
  value: string;
  label: string;
  subLabel?: string;
  subValue?: string;
}

export interface StatsGroupProps {
  items: StatsGroupItem[];
  className?: string;
}

export default function StatsGroup({ items, className = '' }: StatsGroupProps) {
  // Validate item count in development
  if (process.env.NODE_ENV === 'development') {
    if (items.length < 2 || items.length > 4) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(
          `StatsGroup: Expected 2-4 items, but received ${items.length}. Component will still render.`
        );
      }
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-12 gap-6 w-full">
        {items.map((item, index) => (
          <div key={index} className="col-span-3">
            <StatItem
              variant="section"
              value={item.value}
              label={item.label}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

