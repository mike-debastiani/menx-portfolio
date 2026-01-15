import AboutHeroSection from '@/components/organisms/AboutHeroSection';
import SkillsSection from '@/components/organisms/SkillsSection';
import { getAboutData } from '@/lib/sanity.queries';

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
      {aboutData.skillsSection && (
        <SkillsSection
          sectionTitle={aboutData.skillsSection.sectionTitle}
          description={aboutData.skillsSection.description}
          columns={aboutData.skillsSection.columns}
        />
      )}
    </main>
  );
}
