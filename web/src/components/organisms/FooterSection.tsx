'use client';

import { Container, Grid } from '@/components/layout';
import SectionDescription from '@/components/molecules/SectionDescription';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/atoms';
import { cn } from '@/lib';
import Link from 'next/link';
import { type ReactNode } from 'react';

export interface FooterSectionProps {
  className?: string;
  containerClassName?: string;
  containerGapClassName?: string;
  infoRowsGapClassName?: string;
  // Optional props for About page custom footer
  customCtaTitle?: string | ReactNode;
  primaryButtonText?: string;
  primaryButtonFileUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  /**
   * Controls rendering of the bottom copyright footer (`<Footer />`).
   * Useful for full-viewport overlays that must not show the copyright line.
   */
  showBottomFooter?: boolean;
}

interface FooterRow {
  label: string;
  items: Array<{ label: string; href?: string }>;
}

export default function FooterSection({ 
  className = '',
  containerClassName = '',
  containerGapClassName,
  infoRowsGapClassName,
  customCtaTitle,
  primaryButtonText,
  primaryButtonFileUrl,
  secondaryButtonText,
  secondaryButtonLink,
  showBottomFooter = true,
}: FooterSectionProps) {
  // Footer data
  const footerRows: FooterRow[] = [
    {
      label: 'Connect',
      items: [
        { label: 'Behance', href: 'https://www.behance.net/mikedebastiani1' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mike-de-bastiani-aab161290' },
        { label: 'GitHub', href: 'https://github.com/mike-debastiani' },
      ],
    },
    {
      label: 'Write me',
      items: [
        { label: 'hello@mikedebastiani.ch', href: 'mailto:hello@mikedebastiani.ch' },
        { label: 'Book a call', href: 'https://cal.com/mike-de-bastiani-4xbsfh' },
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

  // Check if this is a custom footer (About page)
  const isCustomFooter = !!customCtaTitle;

  // Format title with line breaks if it's a string
  const formatTitle = (title: string | ReactNode): ReactNode => {
    if (typeof title === 'string') {
      return title.split('\n').map((line, index, array) => (
        <span key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </span>
      ));
    }
    return title;
  };

  return (
    <section className={cn('pt-20 flex', className)}>
      <Container
        className={cn(
          'flex flex-col',
          containerGapClassName ?? 'gap-20 md:gap-30',
          containerClassName
        )}
      >
        {/* SectionDescription and InfoRows wrapper */}
        <Grid>
          {/* SectionDescription - 6 columns on desktop, full width on mobile */}
          <div className="footer-col-mobile">
            {isCustomFooter ? (
              <div className="flex flex-col gap-4 items-start">
                <h2 className="font-sans font-medium text-2xl md:text-3xl leading-[1.2] text-primary-950">
                  {formatTitle(customCtaTitle)}
                </h2>
                {(primaryButtonText || secondaryButtonText) && (
                  <div className="flex flex-row gap-3">
                    {primaryButtonText && (
                      primaryButtonFileUrl ? (
                        <a
                          href={primaryButtonFileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center rounded-full font-mono font-medium uppercase tracking-normal text-sm px-4 py-2.5 bg-primary-950 text-white hover:bg-primary-900 active:bg-primary-800 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2"
                        >
                          {primaryButtonText}
                        </a>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          icon="none"
                        >
                          {primaryButtonText}
                        </Button>
                      )
                    )}
                    {secondaryButtonText && secondaryButtonLink && (
                      <a
                        href={secondaryButtonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center rounded-full font-mono font-medium uppercase tracking-normal text-sm px-4 py-[10px] bg-white text-primary-950 border-[1px] border-primary-200 box-border hover:bg-primary-50 active:border-primary-950 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2"
                      >
                        {secondaryButtonText}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <SectionDescription
                title={
                  <>
                    Sparked your interest?
                    <br />
                    Let&apos;s turn that into a conversation.
                  </>
                }
                cta={{
                  label: 'BOOK A CALL',
                  href: 'https://cal.com/mike-de-bastiani-4xbsfh',
                }}
              />
            )}
          </div>

          {/* InfoRows - 6 columns on desktop, full width on mobile */}
          <div className="footer-col-mobile mt-12 md:mt-0">
            {/* >=450px: regular 50/50 layout */}
            <div
              className={cn(
                'flex flex-col max-[449px]:hidden',
                infoRowsGapClassName ?? 'gap-16 md:gap-[88px]'
              )}
            >
              {footerRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="info-rows-row border-t border-primary-200 pt-3 grid grid-cols-2 gap-3 md:gap-6"
                  style={{ borderTopWidth: '0.5px' }}
                >
                  {/* Label - always takes 50% of width */}
                  <div className="info-rows-label font-mono font-normal text-base leading-[1.4] text-primary-400">
                    {row.label}
                  </div>

                  {/* Items - always takes 50% of width */}
                  <div className="flex flex-col">
                    {row.items.map((item, itemIndex) => {
                      const isLast = itemIndex === row.items.length - 1;
                      const itemClasses = `info-rows-item block font-sans font-medium text-base leading-[1.4] text-primary-950 ${
                        isLast ? '' : 'mb-[9px] max-[449px]:mb-[6px]'
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

            {/* <450px: width determined by widest right content */}
            <div className="hidden max-[449px]:grid grid-cols-[minmax(0,1fr)_max-content] gap-x-3">
              {footerRows.map((row, rowIndex) => (
                <div key={rowIndex} className="contents">
                  <div
                    className="col-span-2 border-t border-primary-200"
                    style={{ borderTopWidth: '0.5px' }}
                  />
                  {/* Label - always takes 50% of width */}
                  <div className="info-rows-label min-w-0 pt-3 font-mono font-normal text-base leading-[1.4] text-primary-400">
                    {row.label}
                  </div>

                  {/* Items - always takes 50% of width */}
                  <div className="pt-3 flex flex-col">
                    {row.items.map((item, itemIndex) => {
                      const isLast = itemIndex === row.items.length - 1;
                      const itemClasses = `info-rows-item block font-sans font-medium text-base leading-[1.4] text-primary-950 ${
                        isLast ? '' : 'mb-[9px] max-[449px]:mb-[6px]'
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
                  {rowIndex < footerRows.length - 1 && (
                    <div className="col-span-2 h-16 md:h-[88px]" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Footer */}
        {showBottomFooter && <Footer />}
      </Container>
    </section>
  );
}