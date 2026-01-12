import { type ReactNode } from 'react';
import { cn } from '@/lib';

export interface ColProps {
  children: ReactNode;
  span: number;
  className?: string;
}

/**
 * Col component for grid column spans.
 * 
 * @param span - Number of columns to span (1-12). Will be clamped to available columns.
 * @param children - Content to render
 * @param className - Additional CSS classes
 * 
 * @example
 * <Grid>
 *   <Col span={12}>Full width</Col>
 *   <Col span={6}>Half width</Col>
 * </Grid>
 */
export default function Col({ children, span, className }: ColProps) {
  // Clamp span to valid range (1-12)
  const clampedSpan = Math.max(1, Math.min(12, span));

  return (
    <div
      className={className}
      style={{
        gridColumn: `span ${clampedSpan} / span ${clampedSpan}`,
      }}
    >
      {children}
    </div>
  );
}
