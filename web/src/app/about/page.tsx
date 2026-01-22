import type { Metadata } from 'next';
import AboutHeroSection from '@/components/organisms/AboutHeroSection';
import FooterSection from '@/components/organisms/FooterSection';
import ContentBlocksRenderer from '@/components/organisms/ContentBlocksRenderer';
import { getAboutData } from '@/lib/sanity.queries';

export const metadata: Metadata = {
  title: 'About - Mike De Bastiani',
  description: 'Lerne Mike De Bastiani kennen - Student und Digital Product Designer. Erfahre mehr über meine Skills, meinen Hintergrund und meinen Designprozess.',
};

// Disable caching to ensure draft documents are always fetched
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const aboutData = await getAboutData();

  // Fallback data if no Sanity data is available
  if (!aboutData) {
    return (
      <main>
        <div className="py-20 text-center">
          <p className="text-primary-400">
            About content is being set up. Please check back soon.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <AboutHeroSection
        image={aboutData.image}
        description={{
          greeting: aboutData.greeting,
          heading: aboutData.heading,
          description: aboutData.description,
          subInfoItems: aboutData.subInfoItems,
        }}
      />
      {aboutData.contentBlocks && aboutData.contentBlocks.length > 0 && (
        <ContentBlocksRenderer blocks={aboutData.contentBlocks} />
      )}
      <FooterSection
        customCtaTitle={aboutData.footerCtaTitle}
        primaryButtonText={aboutData.footerPrimaryButtonText}
        primaryButtonFileUrl={aboutData.footerPrimaryButtonFileUrl}
        secondaryButtonText={aboutData.footerSecondaryButtonText}
        secondaryButtonLink={aboutData.footerSecondaryButtonLink}
      />
    </main>
  );
}
