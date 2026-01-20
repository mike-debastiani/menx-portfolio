'use client';

import { Container, Grid } from '@/components/layout';
import SectionDescription from '@/components/molecules/SectionDescription';
import PortableText from '@/components/atoms/PortableText';
import { cn } from '@/lib';
import type { PortableTextBlock } from '@portabletext/types';

export interface TextBlockSectionProps {
  className?: string;
  sectionTitle?: string;
  content?: PortableTextBlock[];
}

export default function TextBlockSection({
  className = '',
  sectionTitle,
  content,
}: TextBlockSectionProps) {
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

          {/* TextBlock - Columns 7-12 on desktop, positioned similarly to InfoColumns */}
          <div className="col-span-4 info-col-single">
            {content && content.length > 0 && (
              <div className="text-block-content mt-6 md:mt-6 lg:mt-0 [&_p]:!font-sans [&_p]:!text-base [&_p]:!text-primary-500 [&_p]:!leading-[1.4]">
                <PortableText content={content} />
              </div>
            )}
          </div>
        </Grid>
      </Container>
    </section>
  );
}
