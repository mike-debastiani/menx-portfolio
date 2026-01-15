'use client';

import { Container, Grid } from '@/components/layout';
import SectionDescription from '@/components/molecules/SectionDescription';
import InfoColumns from '@/components/molecules/InfoColumns';
import { cn } from '@/lib';

export interface SkillsSectionProps {
  className?: string;
  sectionTitle?: string;
  description?: string;
  columns: Array<{
    title: string;
    items: string[];
  }>;
}

export default function SkillsSection({
  className = '',
  sectionTitle,
  description,
  columns,
}: SkillsSectionProps) {
  // Convert columns data to InfoColumns format
  const infoColumns = columns.map((column) => ({
    title: column.title,
    items: column.items.map((item) => ({
      label: item,
    })),
  }));

  return (
    <section className={cn('py-20 flex', className)}>
      <Container className="flex flex-col gap-30">
        <Grid>
          {/* SectionDescription - Full width on tablet (768px-1199px), Column 1-5 on desktop (1200px+) */}
          <div className="col-span-4 skills-col-lg">
            {sectionTitle && (
              <SectionDescription
                title={sectionTitle}
                titleAs="h2"
              />
            )}
          </div>

          {/* InfoColumns - Columns 7-12 on desktop */}
          {/* Description and columns are positioned directly in the grid */}
          <InfoColumns
            description={description}
            columns={infoColumns}
            size="lg"
          />
        </Grid>
      </Container>
    </section>
  );
}
