'use client';

import { useState, useMemo, useEffect } from 'react';
import RoleBasedHero, { type RoleBasedHeroProps, type RoleId, type RoleTab, type RoleHeroContent } from './RoleBasedHero';
import SubInfoGroup, { type SubInfoGroupProps, type SubInfoGroupItem } from '@/components/molecules/SubInfoGroup';
import Grid from '@/components/layout/Grid';
import ScrollReveal from '@/components/atoms/ScrollReveal';
import type { HomeData } from '@/lib/sanity.queries';

// Hook to detect screen size
function useScreenSize() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export interface HomeHeroSectionProps {
  homeData?: HomeData | null;
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
  homeData,
  heroProps,
  subInfoItems,
  subInfoVariant,
  subInfoSize,
  subInfoProps,
  className = '',
}: HomeHeroSectionProps) {
  const screenWidth = useScreenSize();
  const isVerySmallScreen = screenWidth > 0 && screenWidth < 475;
  const isExtraSmallScreen = screenWidth > 0 && screenWidth <= 375;

  // Convert Sanity homeData to RoleBasedHero format
  const { tabs, contentByRole, defaultRoleId } = useMemo<{
    tabs?: RoleTab[];
    contentByRole?: Record<RoleId, RoleHeroContent>;
    defaultRoleId: RoleId;
  }>(() => {
    if (!homeData?.roles || homeData.roles.length === 0) {
      // Fallback to heroProps or defaults
      return {
        tabs: heroProps?.tabs,
        contentByRole: heroProps?.contentByRole,
        defaultRoleId: heroProps?.defaultRoleId ?? 'for-anyone',
      };
    }

    // Convert roles to tabs
    const tabs: RoleTab[] = homeData.roles.map((role) => ({
      id: role.id as RoleId,
      label: role.label,
    }));

    // Convert roles to contentByRole
    const contentByRole: Record<RoleId, RoleHeroContent> = {} as Record<RoleId, RoleHeroContent>;
    homeData.roles.forEach((role) => {
      if (role.contentType === 'headline' && role.headlineText) {
        contentByRole[role.id as RoleId] = {
          type: 'headline',
          text: role.headlineText,
        };
      } else if (role.contentType === 'code' && role.codeLines && role.codeLines.length > 0) {
        contentByRole[role.id as RoleId] = {
          type: 'code',
          lines: role.codeLines.map((line) => ({
            lineNumber: line.lineNumber,
            segments: line.segments.map((segment) => ({
              text: segment.text,
              tone: segment.tone,
            })),
          })),
        };
      }
    });

    const selectedDefaultRoleId = (homeData.roles[0]?.id as RoleId) ?? 'for-anyone';

    return {
      tabs,
      contentByRole: Object.keys(contentByRole).length > 0 ? contentByRole : undefined,
      defaultRoleId: selectedDefaultRoleId,
    };
  }, [homeData, heroProps]);

  const [activeRoleId, setActiveRoleId] = useState<RoleId>(defaultRoleId);

  // Default SubInfoGroup items
  const defaultSubInfoItems: SubInfoGroupItem[] = [
    { label: 'Location:', value: 'Canton of Aargau, Switzerland' },
    { label: 'Status:', value: 'Available for Work', showDot: true },
  ];

  // Combine subInfoItems with subInfoProps, with subInfoItems taking precedence
  // Set size to 'sm' if screen is <= 375px
  const finalSubInfoSize: SubInfoGroupProps['size'] = isExtraSmallScreen ? 'sm' : (subInfoSize ?? subInfoProps?.size);
  
  const finalSubInfoProps: SubInfoGroupProps = subInfoItems || subInfoProps
    ? {
        items: subInfoItems ?? subInfoProps?.items ?? defaultSubInfoItems,
        variant: subInfoVariant ?? subInfoProps?.variant,
        size: finalSubInfoSize,
        className: subInfoProps?.className,
      }
    : {
        items: defaultSubInfoItems,
        variant: subInfoVariant,
        size: finalSubInfoSize,
      };

  // Merge heroProps with Sanity data (Sanity data takes precedence)
  const finalHeroProps: RoleBasedHeroProps = {
    ...heroProps,
    tabs: tabs ?? heroProps?.tabs,
    contentByRole: contentByRole ?? heroProps?.contentByRole,
    defaultRoleId: defaultRoleId ?? heroProps?.defaultRoleId,
  };

  return (
    <ScrollReveal
      as="section"
      className={`pt-12 md:pt-20 pb-12 md:pb-20 max-[475px]:pb-10 overflow-x-hidden max-w-full ${className}`}
    >
      <div className="flex flex-col gap-4 max-[480px]:gap-4 w-full">
        {/* SegmentedControls - full width */}
        <div className="w-full">
          <RoleBasedHero
            {...finalHeroProps}
            showControlsOnly
            activeRoleId={activeRoleId}
            onRoleChange={setActiveRoleId}
          />
        </div>

        {/* Content area - limited to 7 columns on desktop */}
        <Grid>
          {/* Container that spans 7 columns and contains both RoleBasedHero and SubInfoGroup vertically */}
          <div className="col-span-4 md:col-span-12 xl:col-span-12 flex flex-col">
            {/* Fixed height container to ensure SubInfoGroup stays in same position */}
            {/* Height set to accommodate all content types (headlines and code block) */}
            <div className="min-h-[220px] md:min-h-[240px] flex items-start relative">
              <RoleBasedHero
                {...finalHeroProps}
                showContentOnly
                activeRoleId={activeRoleId}
                onRoleChange={setActiveRoleId}
              />
            </div>

            {/* SubInfoGroup with 24px gap and 22px left offset for text alignment */}
            {/* Always positioned below RoleBasedHero */}
            <div className="pl-0 md:pl-[0px] mt-6 max-[475px]:mt-10 max-[480px]:mt-8 max-[375px]:mt-8">
              <SubInfoGroup {...finalSubInfoProps} />
            </div>
          </div>
        </Grid>
      </div>
    </ScrollReveal>
  );
}
