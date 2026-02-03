import StatItem from '@/components/atoms/StatItem';
import { PortableText as SanityPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export interface CaseStudyMetaProps {
  role: string;
  context: string;
  timeline: string;
  team: string | PortableTextBlock[];
  outcome: string;
  className?: string;
}

export default function CaseStudyMeta({
  role,
  context,
  timeline,
  team,
  outcome,
  className = '',
}: CaseStudyMetaProps) {
  return (
    <div className={`flex flex-col gap-4 items-start max-w-[395px] ${className}`}>
      <StatItem variant="meta" size="base" label="Role" value={role} />
      <StatItem variant="meta" size="base" label="Context" value={context} />
      <StatItem variant="meta" size="base" label="Timeline" value={timeline} />
      <StatItem
        variant="meta"
        size="base"
        label="Team"
        value={typeof team === 'string' ? team : ''}
        valueClassName="whitespace-pre-line"
        renderValue={
          Array.isArray(team)
            ? (valueClassName) => (
                <SanityPortableText
                  value={team}
                  components={{
                    block: {
                      normal: ({ children }) => <p className={valueClassName}>{children}</p>,
                    },
                    marks: {
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      link: ({ children, value }) => {
                        const href = value?.href || '#';
                        const isExternal = href.startsWith('http');
                        return (
                          <a
                            href={href}
                            className="hover:underline"
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                          >
                            {children}
                          </a>
                        );
                      },
                    },
                  }}
                />
              )
            : undefined
        }
      />
      <StatItem variant="meta" size="base" label="Outcome" value={outcome} />
    </div>
  );
}

