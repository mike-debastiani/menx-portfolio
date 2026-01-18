import SectionDescription from './SectionDescription';
import SubInfoGroup, { type SubInfoGroupItem } from './SubInfoGroup';

export interface ProjectArchiveHeaderProps {
  title: string;
  description?: string;
  category: string;
  projectCount: number;
  countLabel: string; // e.g., "Case Studies" or "Projects"
  className?: string;
}

/**
 * ProjectArchiveHeader - Combines SectionDescription with SubInfoGroup
 * for displaying archive page headers with category and project count information.
 * Responsive column spans:
 * - Mobile (base): 4 columns (full width)
 * - Tablet (md): 3 columns (half width of 6-column grid)
 * - Desktop (xl): 5 columns (out of 12-column grid)
 */
export default function ProjectArchiveHeader({
  title,
  description,
  category,
  projectCount,
  countLabel,
  className = '',
}: ProjectArchiveHeaderProps) {
  const subInfoItems: SubInfoGroupItem[] = [
    {
      label: 'Category:',
      value: category,
    },
    {
      label: 'Number:',
      value: `${projectCount} ${countLabel}`,
    },
  ];

  return (
    <>
      <div className={`col-span-4 md:col-span-6 xl:col-span-5 ${className}`}>
        <div className="flex flex-col gap-8">
          <SectionDescription title={title} description={description} titleAs="h1" />
          <SubInfoGroup items={subInfoItems} variant="row" size="base" />
        </div>
      </div>
    </>
  );
}
