import type { Metadata } from 'next';
import FooterSection from '@/components/organisms/FooterSection';

export const metadata: Metadata = {
  title: 'Archive - Mike De Bastiani',
  description: 'Projektarchiv von Mike De Bastiani - Übersicht aller Digital Product Design Projekte.',
};

export default function Archive() {
  return (
    <main>
      <h1>Archive</h1>
      <p>This is the archive page placeholder.</p>
      <FooterSection />
    </main>
  );
}
