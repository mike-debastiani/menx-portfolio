'use client';

import { Container, Grid } from '@/components/layout';
import SectionDescription from '@/components/molecules/SectionDescription';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib';
import Link from 'next/link';

export interface FooterSectionProps {
  className?: string;
}

interface FooterRow {
  label: string;
  items: Array<{ label: string; href?: string }>;
}

export default function FooterSection({ className = '' }: FooterSectionProps) {
  // Footer data
  const footerRows: FooterRow[] = [
    {
      label: 'Connect',
      items: [
        { label: 'Behance', href: 'https://www.behance.net' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com' },
        { label: 'Dribbble', href: 'https://dribbble.com' },
      ],
    },
    {
      label: 'Write me',
      items: [
        { label: 'hello@mikedebastiani.ch', href: 'mailto:hello@mikedebastiani.ch' },
        { label: 'Book a Call', href: '#' },
      ],
    },
  ];

  function isExternalUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  return (
    <section className={cn('pt-20 flex', className)}>
      <Container className="flex flex-col gap-32">
        {/* SectionDescription and InfoRows wrapper */}
        <Grid>
          {/* SectionDescription - 6 columns on desktop, full width on mobile */}
          <div className="footer-col-mobile">
            <SectionDescription
              title={
                <>
                  Sparked your interest?
                  <br />
                  Let's turn that into a conversation.
                </>
              }
              cta={{
                label: 'CONTACT ME',
                href: '#',
              }}
            />
          </div>

          {/* InfoRows - 6 columns on desktop, full width on mobile */}
          <div className="footer-col-mobile mt-8 md:mt-0">
            <div className="flex flex-col gap-[88px]">
              {footerRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="border-t border-primary-200 pt-4 flex flex-col gap-4 xl:grid xl:grid-cols-6 xl:gap-6"
                  style={{ borderTopWidth: '0.5px' }}
                >
                  {/* Label - at left edge (takes 3 cols to align items to column 10) */}
                  <div className="xl:col-span-3 font-mono font-normal text-lg leading-[1.5] text-primary-300">
                    {row.label}
                  </div>

                  {/* Items - aligned to column 10 (takes remaining 3 cols) */}
                  <div className="xl:col-span-3 flex flex-col">
                    {row.items.map((item, itemIndex) => {
                      const isLast = itemIndex === row.items.length - 1;
                      const itemClasses = `block font-sans font-medium text-lg leading-[1.5] text-primary-950 ${
                        isLast ? '' : 'mb-[9px]'
                      }`;

                      if (item.href) {
                        const isExternal = isExternalUrl(item.href);

                        if (isExternal || item.href.startsWith('mailto:')) {
                          return (
                            <a
                              key={itemIndex}
                              href={item.href}
                              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                              rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                              className={`${itemClasses} hover:underline`}
                            >
                              {item.label}
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className={`${itemClasses} hover:underline`}
                          >
                            {item.label}
                          </Link>
                        );
                      }

                      return (
                        <span key={itemIndex} className={itemClasses}>
                          {item.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Footer */}
        <Footer />
      </Container>
    </section>
  );
}