import { type ReactNode } from 'react';
import { cn } from '@/lib';

export interface GridProps {
  children: ReactNode;
  className?: string;
  rowGap?: string | number;
}

export default function Grid({ children, className, rowGap }: GridProps) {
  return (
    <div
      className={cn('layout-grid', className)}
      style={rowGap ? { rowGap: typeof rowGap === 'number' ? `${rowGap}px` : rowGap } : undefined}
    >
      {children}
    </div>
  );
}
