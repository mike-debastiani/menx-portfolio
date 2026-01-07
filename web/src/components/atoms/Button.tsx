import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'base' | 'sm';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: 'none' | 'right';
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// Icon component that uses the uploaded SVG files
const ButtonIcon = ({ variant, size, disabled }: { variant: ButtonVariant; size: ButtonSize; disabled: boolean }) => {
  const iconSize = size === 'sm' ? 14 : 17;
  const iconSrc = variant === 'primary' ? '/icons/button-icon-primary.svg' : '/icons/button-icon-secondary.svg';
  
  return (
    <Image
      src={iconSrc}
      alt=""
      width={iconSize}
      height={iconSize}
      className="shrink-0"
      aria-hidden="true"
    />
  );
};

const variantStyles: Record<
  ButtonVariant,
  {
    base: string;
    hover: string;
    active: string;
    disabled: string;
    text: string;
    textDisabled: string;
  }
> = {
  primary: {
    base: 'bg-primary-950 text-white',
    hover: 'hover:bg-primary-900',
    active: 'active:bg-primary-800',
    disabled: 'bg-primary-300 text-primary-500 cursor-not-allowed',
    text: 'text-white',
    textDisabled: 'text-primary-500',
  },
  secondary: {
    base: 'bg-white text-primary-950 border-[1.5px] border-primary-200 box-border',
    hover: 'hover:border-primary-950',
    active: 'active:border-primary-950',
    disabled: 'bg-white border-[1.5px] border-primary-200 text-primary-300 cursor-not-allowed box-border',
    text: 'text-primary-950',
    textDisabled: 'text-primary-300',
  },
};

const sizeStyles: Record<ButtonSize, { text: string; px: string; py: string; pySecondary: string; iconGap: string }> = {
  base: {
    text: 'text-base',
    px: 'px-6',
    py: 'py-3',
    pySecondary: 'py-[10.5px]', // py-3 (12px) - 1.5px border = 10.5px
    iconGap: 'gap-2',
  },
  sm: {
    text: 'text-sm',
    px: 'px-4',
    py: 'py-3',
    pySecondary: 'py-[10.5px]', // py-3 (12px) - 1.5px border = 10.5px
    iconGap: 'gap-1.5',
  },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'base',
  icon = 'none',
  disabled = false,
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  // Use different padding for secondary buttons to account for border
  const paddingY = variant === 'secondary' ? sizeStyle.pySecondary : sizeStyle.py;

  const baseClasses = `
    group inline-flex items-center justify-center
    rounded-full
    font-mono font-medium uppercase tracking-normal
    box-border
    transition-all duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2
    ${sizeStyle.text} ${sizeStyle.px} ${paddingY}
    ${disabled ? variantStyle.disabled : `${variantStyle.base} ${variantStyle.hover} ${variantStyle.active}`}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <span className={`inline-flex items-center ${sizeStyle.iconGap}`}>
      <span className={disabled ? variantStyle.textDisabled : variantStyle.text}>{children}</span>
      {icon === 'right' && (
        <span className="inline-flex items-center">
          <ButtonIcon variant={variant} size={size} disabled={disabled} />
        </span>
      )}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

