import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import { CaseStudyDescription, CaseStudyMeta } from '@/components/molecules';

export interface CaseStudyHeaderData {
  projectTitle?: string;
  projectStatement?: string;
  projectDescription?: string;
  attributePills?: string;
  role?: string;
  context?: string;
  timeframe?: string;
  year?: number;
  team?: string;
  outcome?: string;
}

export interface CaseStudyHeaderProps {
  data: CaseStudyHeaderData;
  className?: string;
}

export default function CaseStudyHeader({ data, className = '' }: CaseStudyHeaderProps) {
  // Parse attributePills (comma-separated string) to array
  const attributes = data.attributePills
    ? data.attributePills.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0)
    : undefined;

  // Build timeline string: "Timeframe in Year" (e.g., "12 weeks in 2025")
  const timeline = [data.timeframe, data.year ? `in ${data.year}` : null]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className}>
      <Container>
        <Grid className="py-12 md:py-16 xl:py-20">
          {/* CaseStudyDescription: Mobile full width (span 4), Tablet columns 1-3 (span 3), Desktop columns 1-6 (span 6) */}
          <div className="col-span-4 md:col-span-6 xl:col-span-6">
            <CaseStudyDescription
              projectTitle={data.projectTitle || ''}
              statement={data.projectStatement || ''}
              description={data.projectDescription || ''}
              attributes={attributes}
            />
          </div>

          {/* CaseStudyMeta: Mobile full width below description (span 4), Tablet columns 5-6 (col-start-5 span 2), Desktop columns 10-12 (col-start-10 span 3) */}
          <div className="col-span-4 md:col-start-10 md:col-span-3 xl:col-start-10 xl:col-span-3 mt-8 md:mt-0">
            <CaseStudyMeta
              role={data.role || ''}
              context={data.context || ''}
              timeline={timeline || ''}
              team={data.team || ''}
              outcome={data.outcome || ''}
            />
          </div>
        </Grid>
      </Container>
    </section>
  );
}
