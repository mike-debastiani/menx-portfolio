import StatItem from '@/components/atoms/StatItem';

export interface CaseStudyMetaProps {
  role: string;
  context: string;
  timeline: string;
  team: string;
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
      <StatItem variant="meta" size="base" label="Team" value={team} />
      <StatItem variant="meta" size="base" label="Outcome" value={outcome} />
    </div>
  );
}

