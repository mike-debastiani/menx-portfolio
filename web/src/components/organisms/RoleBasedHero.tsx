'use client';

import { useState } from 'react';
import SegmentedControl from '@/components/molecules/SegmentedControl';

export type RoleId = 'for-anyone' | 'recruiters' | 'hiring-managers' | 'product-designers' | 'engineers';

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
}

const defaultTabs: RoleTab[] = [
  { id: 'for-anyone', label: 'For anyone' },
  { id: 'recruiters', label: 'Recruiters' },
  { id: 'hiring-managers', label: 'Hiring Managers' },
  { id: 'product-designers', label: 'Product Designers' },
  { id: 'engineers', label: 'Engineers' },
];

const defaultContent: Record<RoleId, RoleHeroContent> = {
  'for-anyone': {
    type: 'headline',
    text: "Hi, I'm a Digital Product Designer who blends aesthetics with logic. I'm a pragmatic problem-solver turning complex questions into intuitive digital products that actually help people.",
  },
  recruiters: {
    type: 'headline',
    text: "I'm a Digital Product Designer currently finishing my BSc at HSLU. I combine strong UX research skills with a technical background to build scalable digital products.",
  },
  'hiring-managers': {
    type: 'headline',
    text: 'I reduce the friction between design and dev. By understanding the technical constraints early on, I create intuitive products that are not just beautiful, but actually shippable.',
  },
  'product-designers': {
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
      /*{
        lineNumber: 4,
        segments: [{ text: ' ', tone: 'default' }],
      },*/
      {
        lineNumber: 5,
        segments: [
          { text: '  // I speak code. In fact, I built this site myself in Next.js', tone: 'muted' },
        ],
      },
      {
        lineNumber: 6,
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
        lineNumber: 7,
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

export default function RoleBasedHero({
  defaultRoleId = 'for-anyone',
  tabs = defaultTabs,
  contentByRole = defaultContent,
  className = '',
}: RoleBasedHeroProps) {
  const [activeRoleId, setActiveRoleId] = useState<RoleId>(defaultRoleId);
  const content = contentByRole[activeRoleId];

  return (
    <div className={`flex flex-col gap-8 items-start ${className}`}>
      {/* SegmentedControl */}
      <SegmentedControl
        items={tabs}
        value={activeRoleId}
        onChange={(id) => setActiveRoleId(id as RoleId)}
        size="base"
      />

      {/* Content */}
      {content.type === 'headline' ? (
        <div className="flex items-center pl-[21px] pr-0 py-0 w-full">
          <p className="flex-1 font-sans font-medium leading-[1.25] text-4xl text-primary-950 whitespace-pre-wrap">
            {content.text}
          </p>
        </div>
      ) : content.type === 'code' ? (
        <div className="flex gap-[10px] h-[280px] items-start overflow-clip pl-[23px] pr-0 py-0 w-full">
          {/* Line Numbers */}
          <div className="flex flex-col h-full items-end overflow-clip shrink-0">
            <div className="font-mono font-medium leading-[2] text-[20px] text-primary-950 whitespace-nowrap pr-4">
              {content.lines.map((line, idx) => (
                <p key={line.lineNumber} className={idx < content.lines.length - 1 ? 'mb-0' : ''}>
                  {line.lineNumber}
                </p>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="flex items-start relative shrink-0 flex-1 min-w-0">
            <div className="font-mono font-medium leading-[2] text-[20px] text-primary-950 whitespace-pre-wrap">
              {content.lines.map((line, idx) => (
                <p key={line.lineNumber} className={idx < content.lines.length - 1 ? 'mb-0' : ''}>
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
        </div>
      ) : null}
    </div>
  );
}

