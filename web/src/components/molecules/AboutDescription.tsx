'use client';

import { useState, useEffect } from 'react';
import SubInfoGroup, { type SubInfoGroupProps, type SubInfoGroupItem } from './SubInfoGroup';

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

export interface AboutDescriptionProps {
  greeting?: string;
  heading: string;
  description: string;
  subInfoItems?: SubInfoGroupItem[];
  subInfoVariant?: SubInfoGroupProps['variant'];
  subInfoSize?: SubInfoGroupProps['size'];
  className?: string;
}

export default function AboutDescription({
  greeting,
  heading,
  description,
  subInfoItems,
  subInfoVariant,
  subInfoSize,
  className = '',
}: AboutDescriptionProps) {
  const screenWidth = useScreenSize();
  const isExtraSmallScreen = screenWidth > 0 && screenWidth <= 375;

  // Set size to 'sm' if screen is <= 375px, otherwise use provided size or default 'base'
  const finalSubInfoSize: SubInfoGroupProps['size'] = isExtraSmallScreen ? 'sm' : (subInfoSize ?? 'base');

  return (
    <div className={`flex flex-col gap-6 items-start ${className}`}>
      {/* UpperInfo: Greeting + Heading */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* Greeting */}
        {greeting && (
          <p className="text-2xl leading-[1.25] font-normal text-primary-400 w-full">
            {greeting}
          </p>
        )}
        
        {/* Main Heading */}
        <p className="text-3xl leading-[1.2] font-medium text-primary-950 w-full">
          {heading}
        </p>
      </div>

      {/* Description */}
      <p className="text-base leading-[1.5] font-normal text-primary-400 w-full">
        {description}
      </p>

      {/* SubInfoGroup with responsive styling matching HomeHeroSection */}
      {subInfoItems && subInfoItems.length > 0 && (
        <div className="mt-6 max-[475px]:mt-10 max-[480px]:mt-8 w-full">
          <SubInfoGroup
            items={subInfoItems}
            variant={subInfoVariant || 'row'}
            size={finalSubInfoSize}
          />
        </div>
      )}
    </div>
  );
}
