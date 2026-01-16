'use client';

import { useState, useRef, useEffect } from 'react';
import SegmentedControl from '@/components/molecules/SegmentedControl';

export type RoleId = 'for-anyone' | 'recruiters' | 'hiring-managers' | 'designers' | 'engineers';

export interface RoleTab {
  id: RoleId;
  label: string;
}

export type RoleHeroContent =
  | { type: 'headline'; text: string }
  | {
      type: 'code';
      lines: Array<{
        lineNumber: number;
        segments: Array<{
          text: string;
          tone: 'default' | 'purple' | 'green' | 'orange' | 'gray' | 'muted' | 'red';
        }>;
      }>;
    };

export interface RoleBasedHeroProps {
  defaultRoleId?: RoleId;
  tabs?: RoleTab[];
  contentByRole?: Record<RoleId, RoleHeroContent>;
  className?: string;
  showControlsOnly?: boolean;
  showContentOnly?: boolean;
  onRoleChange?: (roleId: RoleId) => void;
  activeRoleId?: RoleId;
}

const defaultTabs: RoleTab[] = [
  { id: 'for-anyone', label: 'For anyone' },
  { id: 'recruiters', label: 'Recruiters' },
  { id: 'hiring-managers', label: 'Hiring Managers' },
  { id: 'designers', label: 'Designers' },
  { id: 'engineers', label: 'Engineers' },
];

const defaultContent: Record<RoleId, RoleHeroContent> = {
  'for-anyone': {
    type: 'headline',
    text: "Hi, I'm a Digital Product Designer who blends aesthetics with logic. I'm a pragmatic problem-solver turning complex questions into intuitive digital products that actually help people.",
  },
  recruiters: {
    type: 'headline',
    text: "I'm a Digital Product Designer currently finishing my Bachelor of Arts in Digital Ideation at HSLU. I combine strong UX research skills with a technical background to build scalable digital products.",
  },
  'hiring-managers': {
    type: 'headline',
    text: 'I reduce the friction between design and dev. By understanding the technical constraints early on, I create intuitive products that are not just beautiful, but actually shippable.',
  },
  'designers': {
    type: 'headline',
    text: 'I love the messy middle of the design process. From deep-dive research to high-fidelity prototyping, I care about the details that make a product feel right.',
  },
  engineers: {
    type: 'code',
    lines: [
      {
        lineNumber: 1,
        segments: [
          { text: 'function ', tone: 'purple' },
          { text: 'Mike', tone: 'orange' },
          { text: '({ role = ', tone: 'default' },
          { text: "'Product Designer'", tone: 'green' },
          { text: ' }) {', tone: 'default' },
        ],
      },
      {
        lineNumber: 2,
        segments: [
          { text: '  ', tone: 'default' },
          { text: 'const', tone: 'purple' },
          { text: ' stack = [', tone: 'default' },
          { text: "'Next.js'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'Angular'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'HTML'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'CSS'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'JS'", tone: 'green' },
          { text: '];', tone: 'default' },
        ],
      },
      {
        lineNumber: 3,
        segments: [
          { text: '  ', tone: 'default' },
          { text: 'const', tone: 'purple' },
          { text: ' tools = [', tone: 'default' },
          { text: "'Jira'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'GitHub'", tone: 'green' },
          { text: ', ', tone: 'default' },
          { text: "'CursorAI'", tone: 'green' },
          { text: '];', tone: 'default' },
        ],
      },
      {
        lineNumber: 4,
        segments: [
          { text: '  // I speak code. In fact, I built this site myself in Next.js', tone: 'muted' },
        ],
      },
      {
        lineNumber: 5,
        segments: [
          { text: '  ', tone: 'default' },
          { text: 'return', tone: 'purple' },
          { text: ' <', tone: 'default' },
          { text: 'SeamlessHandoff', tone: 'red' },
          { text: ' ', tone: 'default' },
          { text: 'technicalUnderstanding', tone: 'orange' },
          { text: '=', tone: 'default' },
          { text: '{true}', tone: 'green' },
          { text: ' />;', tone: 'default' },
        ],
      },
      {
        lineNumber: 6,
        segments: [{ text: '}', tone: 'default' }],
      },
    ],
  },
};

type CodeTone = 'purple' | 'green' | 'orange' | 'gray' | 'muted' | 'red';

const toneColors: Record<CodeTone, string> = {
  purple: '#8f27d5',
  green: '#00822d',
  orange: '#b88c30',
  gray: '#939ba2',
  muted: '#939ba2',
  red: '#ed050e',
};

// Component to render code with auto-scaling
function AutoScaleCode({ 
  lines, 
  className = '' 
}: { 
  lines: Array<{
    lineNumber: number;
    segments: Array<{
      text: string;
      tone: 'default' | 'purple' | 'green' | 'orange' | 'gray' | 'muted' | 'red';
    }>;
  }>;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        
        // Only use transform scale on screens >= 1010px
        if (window.innerWidth >= 1010) {
          if (contentWidth > containerWidth && containerWidth > 0) {
            const newScale = containerWidth / contentWidth;
            setScale(Math.min(newScale, 1)); // Never scale up, only down
          } else {
            setScale(1);
          }
        } else {
          // On smaller screens, don't use transform scale (we use vw units instead)
          setScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    // Use ResizeObserver for more accurate measurements
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      resizeObserver.disconnect();
    };
  }, [lines]);

  return (
    <div ref={containerRef} className={`flex items-start relative shrink-0 flex-1 min-w-0 overflow-hidden max-w-full ${className}`}>
      <div 
        ref={contentRef}
        className="font-mono font-medium leading-[2] text-[20px] max-[1010px]:text-[2.2vw] text-primary-950"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'left top',
          width: 'fit-content',
          maxWidth: '100%',
        }}
      >
        {lines.map((line, idx) => (
          <p 
            key={line.lineNumber} 
            className="block"
            style={{ 
              margin: 0, 
              whiteSpace: 'pre',
              fontFamily: 'inherit',
            }}
          >
            {line.segments.map((segment, segIdx) => {
              const color = segment.tone === 'default' ? undefined : toneColors[segment.tone as CodeTone];
              return (
                <span key={segIdx} style={color ? { color } : undefined}>
                  {segment.text}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function RoleBasedHero({
  defaultRoleId = 'for-anyone',
  tabs = defaultTabs,
  contentByRole = defaultContent,
  className = '',
  showControlsOnly = false,
  showContentOnly = false,
  onRoleChange,
  activeRoleId: externalActiveRoleId,
}: RoleBasedHeroProps) {
  const [internalActiveRoleId, setInternalActiveRoleId] = useState<RoleId>(defaultRoleId);
  const activeRoleId = externalActiveRoleId ?? internalActiveRoleId;
  const content = contentByRole[activeRoleId];

  const handleRoleChange = (id: string) => {
    const newRoleId = id as RoleId;
    setInternalActiveRoleId(newRoleId);
    onRoleChange?.(newRoleId);
  };

  // Render only controls
  if (showControlsOnly) {
    return (
      <div className={className}>
        <SegmentedControl
          items={tabs}
          value={activeRoleId}
          onChange={handleRoleChange}
          size="base"
        />
      </div>
    );
  }

  // Render only content
  if (showContentOnly) {
    return (
      <div className={className}>
        {content.type === 'headline' ? (
          <div className="flex items-center pl-0 md:pl-[21px] pr-0 py-0 w-full min-[1200px]:w-[1000px]">
            <p className="flex-1 font-sans font-medium leading-[1.25] text-2xl min-[375px]:text-3xl md:text-4xl text-primary-950 whitespace-pre-wrap">
              {content.text}
            </p>
          </div>
        ) : content.type === 'code' ? (
          <div className="flex gap-[10px] h-full items-start overflow-hidden pl-0 md:pl-[23px] pr-0 py-0 w-full max-w-full min-w-0">
            {/* Line Numbers */}
            <div className="flex flex-col h-full items-end overflow-hidden shrink-0">
              <div className="font-mono font-medium leading-[2] text-[20px] max-[1010px]:text-[2.2vw] text-primary-950 whitespace-nowrap pr-4 max-[1010px]:pr-1">
                {content.lines.map((line, idx) => (
                  <p 
                    key={line.lineNumber} 
                    className="block"
                    style={{ 
                      margin: 0, 
                      fontFamily: 'inherit',
                    }}
                  >
                    {line.lineNumber}
                  </p>
                ))}
              </div>
            </div>

            {/* Code */}
            <AutoScaleCode lines={content.lines} className="min-w-0" />
          </div>
        ) : null}
      </div>
    );
  }

  // Render both (default behavior)
  return (
    <div className={`flex flex-col gap-8 items-start ${className}`}>
      {/* SegmentedControl */}
      <SegmentedControl
        items={tabs}
        value={activeRoleId}
        onChange={handleRoleChange}
        size="base"
      />

      {/* Content */}
      {content.type === 'headline' ? (
        <div className="flex items-center pl-0 md:pl-[21px] pr-0 py-0 w-full min-[1200px]:w-[1000px]">
          <p className="flex-1 font-sans font-medium leading-[1.25] text-2xl min-[375px]:text-3xl md:text-4xl text-primary-950 whitespace-pre-wrap">
            {content.text}
          </p>
        </div>
      ) : content.type === 'code' ? (
        <div className="flex gap-[10px] h-full items-start overflow-hidden pl-0 md:pl-[23px] pr-0 py-0 w-full max-w-full min-w-0">
          {/* Line Numbers */}
          <div className="flex flex-col h-full items-end overflow-hidden shrink-0">
            <div className="font-mono font-medium leading-[2] text-[20px] max-[1010px]:text-[2.2vw] text-primary-950 whitespace-nowrap pr-4 max-[1010px]:pr-1">
              {content.lines.map((line, idx) => (
                <p 
                  key={line.lineNumber} 
                  className="block"
                  style={{ 
                    margin: 0, 
                    fontFamily: 'inherit',
                  }}
                >
                  {line.lineNumber}
                </p>
              ))}
            </div>
          </div>

          {/* Code */}
          <AutoScaleCode lines={content.lines} className="min-w-0" />
        </div>
      ) : null}
    </div>
  );
}

