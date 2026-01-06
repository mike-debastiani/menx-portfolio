'use client';

import { useState, ReactNode } from 'react';
import AccordionItem from '@/components/molecules/AccordionItem';

export interface AccordionGroupItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionGroupProps {
  items: AccordionGroupItem[];
  defaultOpenId?: string;
  openId?: string;
  onOpenIdChange?: (id: string | null) => void;
  className?: string;
}

export default function AccordionGroup({
  items,
  defaultOpenId,
  openId,
  onOpenIdChange,
  className = '',
}: AccordionGroupProps) {
  const isControlled = openId !== undefined;
  const [internalOpenId, setInternalOpenId] = useState<string | null>(defaultOpenId ?? null);

  const currentOpenId = isControlled ? openId : internalOpenId;

  const handleOpenChange = (itemId: string, newOpen: boolean) => {
    if (newOpen) {
      // Opening: set this item as open
      const newOpenId = itemId;
      if (!isControlled) {
        setInternalOpenId(newOpenId);
      }
      onOpenIdChange?.(newOpenId);
    } else {
      // Closing: set to null
      if (!isControlled) {
        setInternalOpenId(null);
      }
      onOpenIdChange?.(null);
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {items.map((item) => {
        const isOpen = currentOpenId === item.id;
        return (
          <AccordionItem
            key={item.id}
            title={item.title}
            open={isOpen}
            onOpenChange={(newOpen) => handleOpenChange(item.id, newOpen)}
          >
            {item.content}
          </AccordionItem>
        );
      })}
    </div>
  );
}

