import { type ReactNode } from 'react';

export type PillVariant = 'default' | 'blue' | 'purple' | 'magenta' | 'orange' | 'green' | 'darkgrey';
export type PillSize = 'sm' | 'xs';

export interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
}

const variantStyles: Record<PillVariant, { bg: string; text: string }> = {
  default: {
    bg: 'bg-primary-50',
    text: 'text-primary-400',
  },
  blue: {
    bg: 'bg-[#6ad3e5]',
    text: 'text-[#356a73]',
  },
  purple: {
    bg: 'bg-[#cb99fa]',
    text: 'text-[#684e80]',
  },
  magenta: {
    bg: 'bg-[#f491c2]',
    text: 'text-[#804c65]',
  },
  orange: {
    bg: 'bg-[#fbab73]',
    text: 'text-[#80573a]',
  },
  green: {
    bg: 'bg-[#70d5b3]',
    text: 'text-[#284d40]',
  },
  darkgrey: {
    bg: 'bg-[#a2acb9]',
    text: 'text-[#43474d]',
  },
};

const sizeStyles: Record<PillSize, { text: string; px: string; py: string }> = {
  sm: {
    text: 'text-sm',
    px: 'px-[18px]',
    py: 'py-[8px]',
  },
  xs: {
    text: 'text-xs',
    px: 'px-[12px]',
    py: 'py-[4px]',
  },
};

export default function Pill({ children, variant = 'default', size = 'sm', className = '' }: PillProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-mono font-normal leading-[1.25] ${variantStyle.bg} ${variantStyle.text} ${sizeStyle.text} ${sizeStyle.px} ${sizeStyle.py} ${className}`}
    >
      {children}
    </span>
  );
}

