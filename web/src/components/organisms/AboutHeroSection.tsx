import Image from 'next/image';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import AboutDescription from '@/components/molecules/AboutDescription';
import { type SubInfoGroupItem } from '@/components/molecules/SubInfoGroup';

export interface AboutHeroSectionProps {
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  description: {
    greeting?: string;
    heading: string;
    description: string;
    subInfoItems?: SubInfoGroupItem[];
  };
  className?: string;
}

export default function AboutHeroSection({
  image,
  description,
  className = '',
}: AboutHeroSectionProps) {
  return (
    <section className={className}>
      <Container>
        <Grid className="pt-12 md:pt-20">
          {/* AboutDescription: Mobile full width below image (span 4), Tablet 3 columns (span 3), Desktop (>=1200px) columns 1-6 (span 6) */}
          {/* Order: 2 on mobile (below image), 1 on tablet/desktop (left side) */}
          <div className="about-hero-description col-span-4 md:col-span-3 lg:col-span-6 xl:col-span-6 order-2 md:order-1 mt-8 md:mt-0">
            <AboutDescription
              greeting={description.greeting}
              heading={description.heading}
              description={description.description}
              subInfoItems={description.subInfoItems}
              subInfoVariant="row"
              subInfoSize="base"
            />
          </div>

          {/* Image: Mobile full width above (span 4), Tablet (>=768px): 3 columns (col-start-4 span 3), Desktop (>=1200px): 3 columns (col-start-10 span 3) right-aligned */}
          {/* Order: 1 on mobile (above description), 2 on tablet/desktop (right side) */}
          {image && (
            <div className="about-hero-image col-span-4 md:col-start-4 md:col-span-3 lg:col-start-10 lg:col-span-3 xl:col-start-10 xl:col-span-3 2xl:col-start-10 2xl:col-span-3 order-1 md:order-2">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 33vw, 25vw"
                />
              </div>
            </div>
          )}
        </Grid>
      </Container>
    </section>
  );
}
