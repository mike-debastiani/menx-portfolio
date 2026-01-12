import { type ReactNode, type ElementType } from 'react';
import { cn } from '@/lib';

export interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export default function Container({
  children,
  as: Component = 'div',
  className,
}: ContainerProps) {
  return (
    <Component className={cn('layout-container', className)}>
      {children}
    </Component>
  );
}
