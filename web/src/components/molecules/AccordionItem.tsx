'use client';

import { useState, ReactNode } from 'react';

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className = '',
  id,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const buttonId = id ? `${id}-button` : undefined;
  const contentId = id ? `${id}-content` : undefined;

  const handleToggle = () => {
    const newOpen = !isOpen;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <div
      className={`
        border-b border-primary-200
        flex flex-col
        px-0
        pt-[15px]
        ${isOpen ? 'pb-4' : 'pb-[15px]'}
        ${className}
      `}
      style={{ borderBottomWidth: '0.5px' }}
    >
      <button
        id={buttonId}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex items-center justify-between w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <div className="font-sans font-medium text-lg leading-[1.4] text-primary-950">
          {title}
        </div>
        <div
          className={`
            flex-shrink-0 flex items-center justify-center
            transition-transform duration-300 ease-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        >
          <img
            src="/icons/accordion-arrow.svg"
            alt=""
            width={14}
            height={8}
            className="w-[14px] h-2"
          />
        </div>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`
          grid
          transition-[grid-template-rows,opacity,margin] duration-300 ease-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}
        `}
      >
        <div className="overflow-hidden">
          <div className="font-sans font-normal text-base leading-[1.5] text-primary-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

