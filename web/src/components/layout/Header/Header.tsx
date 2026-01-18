import { getAboutData } from '@/lib/sanity.queries';
import HeaderClient from './HeaderClient';

const navItems = [
  { label: 'Work', href: '/relevant-work' },
  { label: 'Lab', href: '/lab-projects' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'About', href: '/about' },
];

export default async function Header() {
  const aboutData = await getAboutData();

  return (
    <HeaderClient
      navItems={navItems}
      aboutImage={aboutData?.image}
      aboutSubInfoItems={aboutData?.subInfoItems}
      footerCtaTitle={aboutData?.footerCtaTitle}
      footerPrimaryButtonText={aboutData?.footerPrimaryButtonText}
      footerPrimaryButtonFileUrl={aboutData?.footerPrimaryButtonFileUrl}
      footerSecondaryButtonText={aboutData?.footerSecondaryButtonText}
      footerSecondaryButtonLink={aboutData?.footerSecondaryButtonLink}
    />
  );
}
