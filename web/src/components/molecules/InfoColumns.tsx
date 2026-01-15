import Link from 'next/link';
import { cn } from '@/lib';

export type InfoColumnsSize = 'lg' | 'base';

export interface InfoColumnItem {
  label: string;
  href?: string;
}

export interface InfoColumn {
  title: string;
  items: InfoColumnItem[];
}

export interface InfoColumnsProps {
  description?: string;
  columns: InfoColumn[];
  size?: InfoColumnsSize;
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
  InfoColumnsSize,
  {
    description: string;
    title: string;
    item: string;
  }
> = {
  lg: {
    description: 'font-sans font-normal text-base leading-[1.5] text-primary-300',
    title: 'font-mono font-normal text-base leading-[1.5] text-primary-300',
    item: 'font-sans font-medium text-base leading-[1.5] text-primary-950',
  },
  base: {
    description: 'font-sans font-normal text-base leading-[1.5] text-primary-300',
    title: 'font-mono font-normal text-base leading-[1.5] text-primary-300',
    item: 'font-sans font-medium text-base leading-[1.5] text-primary-950',
  },
};

export default function InfoColumns({
  description,
  columns,
  size = 'lg',
  className = '',
}: InfoColumnsProps) {
  const styles = sizeStyles[size];
  const columnCount = Math.min(Math.max(columns.length, 1), 4);

  // Get column span classes for responsive layout
  // Desktop (1200px+): Each column takes 3 grid columns (7-9, 10-12)
  // Tablet (768px+): Each column takes 3 grid columns (out of 6)
  // Mobile: Full width (4 columns)
  const getColumnClasses = (index: number) => {
    if (columnCount === 1) {
      // Single column: full width
      return 'info-col-single';
    }
    
    if (columnCount === 2) {
      // Two columns: 7-9 and 10-12 on desktop
      return index === 0 ? 'info-col-first' : 'info-col-second';
    }
    
    if (columnCount === 3) {
      // Three columns: distribute evenly
      return 'info-col-three';
    }
    
    // Four columns: distribute evenly
    return 'info-col-four';
  };

  return (
    <>
      {description && (
        <div className={cn('info-col-description info-col-description-spacing', className)}>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={cn('flex flex-col gap-6', getColumnClasses(columnIndex))}
        >
          {/* Column title with divider */}
          <div
            className="border-b border-primary-200 pt-4 pb-2"
            style={{ borderBottomWidth: '0.5px' }}
          >
            <div className={styles.title}>{column.title}</div>
          </div>

          {/* Column items */}
          <div className="flex flex-col">
            {column.items.map((item, itemIndex) => {
              const isLast = itemIndex === column.items.length - 1;
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
                      className={cn(itemClasses, styles.item, 'hover:underline')}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={cn(itemClasses, styles.item, 'hover:underline')}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <span key={itemIndex} className={cn(itemClasses, styles.item)}>
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

