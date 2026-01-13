'use client';

import { useState } from 'react';
import RoleBasedHero, { type RoleBasedHeroProps, type RoleId } from './RoleBasedHero';
import SubInfoGroup, { type SubInfoGroupProps, type SubInfoGroupItem } from '@/components/molecules/SubInfoGroup';
import Grid from '@/components/layout/Grid';

export interface HomeHeroSectionProps {
  heroProps?: RoleBasedHeroProps;
  subInfoItems?: SubInfoGroupItem[];
  subInfoVariant?: SubInfoGroupProps['variant'];
  subInfoSize?: SubInfoGroupProps['size'];
  subInfoProps?: SubInfoGroupProps;
  className?: string;
}

/**
 * HomeHeroSection - Hero section for the home page.
 * Combines RoleBasedHero with SubInfoGroup, ensuring proper alignment and spacing.
 * The height is fixed to accommodate the longest hero text content (code block: 280px + segmented control + gap).
 * Only the text content spans 7 columns on desktop (12-column grid), SegmentedControls use full width.
 */
export default function HomeHeroSection({
  heroProps,
  subInfoItems,
  subInfoVariant,
  subInfoSize,
  subInfoProps,
  className = '',
}: HomeHeroSectionProps) {
  const [activeRoleId, setActiveRoleId] = useState<RoleId>(
    heroProps?.defaultRoleId ?? 'for-anyone'
  );

  // Default SubInfoGroup items
  const defaultSubInfoItems: SubInfoGroupItem[] = [
    { label: 'Location:', value: 'Canton of Aargau' },
    { label: 'Status:', value: 'Available for Work', showDot: true },
  ];

  // Combine subInfoItems with subInfoProps, with subInfoItems taking precedence
  const finalSubInfoProps: SubInfoGroupProps | undefined = subInfoItems || subInfoProps
    ? {
        items: subInfoItems ?? subInfoProps?.items ?? defaultSubInfoItems,
        variant: subInfoVariant ?? subInfoProps?.variant,
        size: subInfoSize ?? subInfoProps?.size,
        className: subInfoProps?.className,
      }
    : {
        items: defaultSubInfoItems,
        variant: subInfoVariant,
        size: subInfoSize,
      };

  return (
    <section className={`py-20 ${className}`}>
      <div className="flex flex-col gap-8">
        {/* SegmentedControls - full width */}
        <div className="w-full">
          <RoleBasedHero
            {...heroProps}
            showControlsOnly
            activeRoleId={activeRoleId}
            onRoleChange={setActiveRoleId}
          />
        </div>

        {/* Content area - limited to 7 columns on desktop */}
        <Grid>
          {/* Fixed height container to ensure SubInfoGroup stays in same position */}
          {/* Height set to accommodate all content types (headlines and code block) */}
          <div className="min-h-[240px] flex items-start col-span-4 md:col-span-6 xl:col-span-7 relative">
            <RoleBasedHero
              {...heroProps}
              showContentOnly
              activeRoleId={activeRoleId}
              onRoleChange={setActiveRoleId}
            />
          </div>

          {/* SubInfoGroup with 24px gap and 22px left offset for text alignment */}
          {/* Positioned absolutely at fixed distance from top to prevent jumping */}
          <div className="pl-[22px] col-span-4 md:col-span-6 xl:col-span-7" style={{ marginTop: '24px' }}>
            <SubInfoGroup {...finalSubInfoProps} />
          </div>
        </Grid>
      </div>
    </section>
  );
}
