import Link from 'next/link';

export type InfoRowsSize = 'lg' | 'base';

export interface InfoRowItem {
  label: string;
  href?: string;
}

export interface InfoRow {
  label: string;
  items: InfoRowItem[];
}

export interface InfoRowsProps {
  rows: InfoRow[];
  size?: InfoRowsSize;
  className?: string;
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

const sizeStyles: Record<
  InfoRowsSize,
  {
    label: string;
    item: string;
  }
> = {
  lg: {
    label: 'font-mono font-normal text-lg leading-[1.4] text-primary-400',
    item: 'font-sans font-medium text-lg leading-[1.4] text-primary-950',
  },
  base: {
    label: 'font-mono font-normal text-base leading-[1.4] text-primary-400',
    item: 'font-sans font-medium text-base leading-[1.4] text-primary-950',
  },
};

export default function InfoRows({ rows, size = 'lg', className = '' }: InfoRowsProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`flex flex-col gap-[88px] ${className}`}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="border-t border-primary-200 pt-4 flex gap-[256px] items-start"
          style={{ borderTopWidth: '0.5px' }}
        >
          {/* Left label column */}
          <div className={`${styles.label} w-[100px] shrink-0`}>
            {row.label}
          </div>

          {/* Right items column */}
          <div className={`flex-1 ${styles.item}`}>
            {row.items.map((item, itemIndex) => {
              const isLast = itemIndex === row.items.length - 1;
              const itemClasses = `block ${isLast ? '' : 'mb-[9px]'}`;

              if (item.href) {
                const isExternal = isExternalUrl(item.href);

                if (isExternal) {
                  return (
                    <a
                      key={itemIndex}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`${itemClasses} hover:underline`}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={`${itemClasses} hover:underline`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <span key={itemIndex} className={itemClasses}>
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

