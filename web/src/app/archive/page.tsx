import type { Metadata } from 'next';
import FooterSection from '@/components/organisms/FooterSection';
import ScrollReveal from '@/components/atoms/ScrollReveal';

export const metadata: Metadata = {
  title: 'Archive - Mike De Bastiani',
  description: 'Projektarchiv von Mike De Bastiani - Übersicht aller Digital Product Design Projekte.',
};

export default function Archive() {
  return (
    <main>
      <ScrollReveal>
        <h1>Archive</h1>
        <p>This is the archive page placeholder.</p>
      </ScrollReveal>
      <FooterSection />
    </main>
  );
}
