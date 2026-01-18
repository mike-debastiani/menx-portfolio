import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib';

export interface GridProps {
  children: ReactNode;
  className?: string;
  rowGap?: string | number;
  /**
   * Overrides the global layout column count for this grid only.
   * Useful for layouts that should stay 12 columns on tablet.
   */
  columns?: number;
}

export default function Grid({ children, className, rowGap, columns }: GridProps) {
  const style: CSSProperties & Record<string, string> = {};
  if (rowGap) {
    style.rowGap = typeof rowGap === 'number' ? `${rowGap}px` : rowGap;
  }
  if (columns) {
    // CSS custom prop used by `.layout-grid` (see globals.css)
    style['--layout-columns'] = String(columns);
  }

  return (
    <div
      className={cn('layout-grid', className)}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </div>
  );
}
