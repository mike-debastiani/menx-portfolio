import Image from 'next/image';
import { Container, Grid } from '@/components/layout';
import SectionDescription from '@/components/molecules/SectionDescription';
import ScrollReveal from '@/components/atoms/ScrollReveal';
import { urlForImage } from '@/lib/sanity.client';
import type { SanityImage } from '@/types/sanity';

export interface TestimonialItemData {
  quote: string;
  personName: string;
  personRole: string;
  personImage?: SanityImage;
}

export interface TestimonialSectionProps {
  title?: string;
  testimonials?: TestimonialItemData[];
  className?: string;
}

function TestimonialItem({ quote, personName, personRole, personImage }: TestimonialItemData) {
  const imageUrl = personImage
    ? urlForImage(personImage, {
        width: 120,
        height: 120,
        fit: 'crop',
        quality: 90,
        dpr: 2,
        auto: 'format',
      })
    : null;

  return (
    <div className="flex gap-3 h-full">
      <div className="shrink-0">
        <span className="font-sans font-medium text-5xl leading-none text-primary-950">“</span>
      </div>
      <div className="flex flex-col justify-between h-full gap-8 mt-2">
        <p className="font-sans font-normal text-base leading-[1.5] text-primary-950">
          {quote}
        </p>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden bg-primary-100 shrink-0">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={personName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-medium text-base text-primary-950">
              {personName}
            </span>
            <span className="font-mono font-normal text-base text-primary-400">
              {personRole}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection({
  title,
  testimonials = [],
  className = '',
}: TestimonialSectionProps) {
  if (!title || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 md:py-20 ${className}`}>
      <Container>
        <div className="flex flex-col gap-14 md:gap-16">
          <ScrollReveal>
            <SectionDescription title={title} />
          </ScrollReveal>
          <Grid className="items-stretch gap-y-20 lg:gap-y-10 xl:gap-y-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal
                key={`${testimonial.personName}-${index}`}
                delay={index * 80}
                className="col-span-4 md:col-span-3 xl:col-span-4 h-full pr-4"
              >
                <TestimonialItem {...testimonial} />
              </ScrollReveal>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}
