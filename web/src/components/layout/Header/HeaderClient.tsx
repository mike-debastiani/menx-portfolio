'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@/components/atoms/Button';
import { Container, Grid } from '@/components/layout';
import FooterSection from '@/components/organisms/FooterSection';
import SubInfoGroup, { type SubInfoGroupItem } from '@/components/molecules/SubInfoGroup';
import { useHideOnScrollHeader } from '@/lib/useHideOnScrollHeader';
import { lockBodyScroll } from '@/lib/scrollLock';

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderClientProps {
  navItems: HeaderNavItem[];
  aboutImage?: {
    src: string;
    alt: string;
  };
  aboutSubInfoItems?: SubInfoGroupItem[];
  footerCtaTitle?: string;
  footerPrimaryButtonText?: string;
  footerPrimaryButtonFileUrl?: string;
  footerSecondaryButtonText?: string;
  footerSecondaryButtonLink?: string;
}

interface FooterRow {
  label: string;
  items: Array<{ label: string; href?: string }>;
}

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

const quickInfoCopy = {
  greeting: 'Hello,',
  leading:
    "I’m Mike De Bastiani",
  description:
    'Currently studying Digital Ideation, I work end‑to‑end: from framing problems and research to prototypes, design systems and polished UI.',
};

export default function HeaderClient({
  navItems,
  aboutImage,
  aboutSubInfoItems,
  footerCtaTitle,
  footerPrimaryButtonText,
  footerPrimaryButtonFileUrl,
  footerSecondaryButtonText,
  footerSecondaryButtonLink,
}: HeaderClientProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuickInfoOpen, setIsQuickInfoOpen] = useState(false);
  const [projectCategory, setProjectCategory] = useState<'relevant-work' | 'lab' | null>(null);
  const [isWorkflowInView, setIsWorkflowInView] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const quickInfoRef = useRef<HTMLDivElement>(null);
  const quickInfoButtonRef = useRef<HTMLButtonElement>(null);

  const isAnyOverlayOpen = isMenuOpen || isQuickInfoOpen;
  const { isVisible: isHeaderVisible, isNearBottom } = useHideOnScrollHeader({
    isLocked: isAnyOverlayOpen,
    resetToken: pathname,
  });
  const isHeaderHidden = !isHeaderVisible;

  // Load project category when on a project page
  useEffect(() => {
    const projectSlugMatch = pathname.match(/^\/projects\/(.+)$/);
    if (projectSlugMatch) {
      const slug = projectSlugMatch[1];
      // Fetch project category
      fetch(`/api/project-category?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.category === 'relevant-work' || data.category === 'lab') {
            setProjectCategory(data.category);
          } else {
            setProjectCategory(null);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch project category:', error);
          setProjectCategory(null);
        });
    } else {
      // Reset category when not on a project page
      setProjectCategory(null);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setIsWorkflowInView(false);
      return;
    }

    const section = document.getElementById('workflow');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsWorkflowInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      if (href === '/#workflow') return pathname === '/' && isWorkflowInView;
      
      // Check if pathname starts with href (normal behavior)
      if (pathname.startsWith(href)) return true;
      
      // Check if we're on a project page and the category matches
      if (pathname.startsWith('/projects/') && projectCategory) {
        // Map hrefs to categories
        if (href === '/relevant-work' && projectCategory === 'relevant-work') {
          return true;
        }
        if (href === '/lab-projects' && projectCategory === 'lab') {
          return true;
        }
      }
      
      return false;
    },
    [pathname, projectCategory, isWorkflowInView],
  );

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, closeMenu]);

  const openQuickInfo = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsQuickInfoOpen(true);
  }, []);

  const closeQuickInfo = useCallback(() => {
    setIsQuickInfoOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  // Close overlays on route change
  useEffect(() => {
    closeMenu();
    closeQuickInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close quick info on small screens (safety)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handle = () => {
      if (mql.matches) setIsQuickInfoOpen(false);
    };
    handle();
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, []);

  // Escape key closes whichever overlay is open
  useEffect(() => {
    if (!isAnyOverlayOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isQuickInfoOpen) closeQuickInfo();
      if (isMenuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isAnyOverlayOpen, isQuickInfoOpen, isMenuOpen, closeMenu, closeQuickInfo]);

  // Click outside closes mobile menu only
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen, closeMenu]);

  // Lock body scroll when any overlay is open
  useEffect(() => {
    if (!isAnyOverlayOpen) return;
    const unlock = lockBodyScroll();
    return unlock;
  }, [isAnyOverlayOpen]);

  // Focus trap (mobile menu)
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    return () => menu.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  // Focus trap (quick info overlay)
  useEffect(() => {
    if (!isQuickInfoOpen || !quickInfoRef.current) return;
    const overlay = quickInfoRef.current;
    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    overlay.addEventListener('keydown', handleTabKey);
    // Prefer focusing the close button in the overlay header
    quickInfoButtonRef.current?.focus();
    return () => overlay.removeEventListener('keydown', handleTabKey);
  }, [isQuickInfoOpen]);

  const quickInfoNavItems = useMemo(() => {
    const base = navItems.filter((i) => i.href !== '/contact');
    // Ensure "Home" is always present in the sitemap (even if not in the regular header nav).
    if (!base.some((i) => i.href === '/')) {
      return [{ label: 'Home', href: '/' }, ...base];
    }
    return base;
  }, [navItems]);

  return (
    <>
      {/* Header spacer so content can slide up when header hides */}
      <div
        aria-hidden="true"
        className={`overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none ${
          isHeaderHidden && !isNearBottom ? 'h-0' : 'h-16'
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-transform duration-300 ease-out motion-reduce:transition-none will-change-transform ${
          isHeaderHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <Container as="nav" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="font-sans text-lg font-medium text-primary-950 hover:text-primary-700 transition-colors"
            >
              Mike De Bastiani
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-base font-medium transition-colors ${
                    isActive(item.href) ? 'text-primary-950' : 'text-primary-350 hover:text-primary-950'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Button
                variant="primary"
                size="sm"
                icon="right"
                iconSrc="/icons/button-icon-primary.svg"
                iconSize={14}
                onClick={openQuickInfo}
              >
                QuickInfo
              </Button>
            </div>

            {/* Mobile/Tablet Hamburger Button with MENU text */}
            <button
              ref={hamburgerButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="md:hidden flex items-center gap-2 text-primary-950 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
            >
              <Image
                src="/icons/hamburger-icon-primary400.svg"
                alt=""
                width={15}
                height={10}
                className="shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono font-normal text-base uppercase tracking-normal">MENU</span>
            </button>
          </div>
        </Container>
      </header>

      {/* Tablet/Desktop Quick Info Overlay */}
      {isQuickInfoOpen && (
        <div
          ref={quickInfoRef}
          className="fixed inset-0 z-[60] bg-white hidden md:block overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Quick info"
        >
          <div className="flex flex-col h-full">
            {/* Overlay Header (Logo + Close) */}
            <header className="flex-shrink-0 border-none" style={{ borderBottomWidth: '0.5px' }}>
              <Container as="div">
                <div className="flex h-16 items-center justify-between">
                  <Link
                    href="/"
                    onClick={closeQuickInfo}
                    className="font-sans text-lg font-medium text-primary-950 hover:text-primary-700 transition-colors"
                  >
                    Mike De Bastiani
                  </Link>

                  <button
                    ref={quickInfoButtonRef}
                    type="button"
                    onClick={closeQuickInfo}
                    aria-label="Close quick info"
                    className="flex items-center gap-2 text-primary-350 hover:text-primary-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
                  >
                    <Image
                      src="/icons/close-icon-primary400.svg"
                      alt=""
                      width={11}
                      height={11}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-mono font-normal text-base uppercase tracking-normal">CLOSE</span>
                  </button>
                </div>
              </Container>
            </header>

            {/* Main content */}
            <div className="flex-1 min-h-0 flex flex-col">
              <Container className="flex-1 min-h-0">
                <Grid columns={12} className="pt-8 pb-10">
                  {/* SmallAboutBlock: Image (3 cols) + Text (3 cols) => total 6 cols */}
                  {aboutImage && (
                    <div className="col-span-3">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={aboutImage.src}
                          alt={aboutImage.alt}
                          fill
                          className="object-cover grayscale"
                          sizes="(min-width: 1200px) 25vw, 33vw"
                        />
                      </div>
                    </div>
                  )}

                  <div className={`${aboutImage ? 'col-span-3' : 'col-span-6'} flex flex-col gap-6`}>
                    <div className="flex flex-col gap-2 items-start w-full">
                      <p className="text-2xl leading-[1.25] font-normal text-primary-350 w-full">
                        {quickInfoCopy.greeting}
                      </p>
                      <p className="text-3xl leading-[1.2] font-medium text-primary-950 w-full">
                        {quickInfoCopy.leading}
                      </p>
                    </div>
                    <p className="text-base leading-[1.4] font-normal text-primary-350 w-full">
                      {quickInfoCopy.description}
                    </p>
                    {!!aboutSubInfoItems?.length && (
                      <div className="pt-3 overflow-visible">
                        <SubInfoGroup
                          items={aboutSubInfoItems}
                          variant="column"
                          size="base"
                          className="whitespace-nowrap w-max"
                        />
                      </div>
                    )}
                  </div>

                  {/* NavigationBlock: Columns 10-12 */}
                  <nav className="col-start-10 col-span-3" aria-label="Sitemap">
                    <div className="border-b border-primary-200 pt-0 pb-2" style={{ borderBottomWidth: '0.5px' }}>
                    <div className="font-mono font-normal text-base leading-[1.4] text-primary-350">Sitemap</div>
                    </div>

                    <div className="pt-4 flex flex-col">
                      {quickInfoNavItems.map((item, idx) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeQuickInfo}
                          className={`font-sans font-medium text-4xl leading-[1.1] transition-colors ${
                            isActive(item.href) ? 'text-primary-950' : 'text-primary-350 hover:text-primary-950'
                          } ${idx === quickInfoNavItems.length - 1 ? '' : 'mb-4'}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </Grid>
              </Container>

              {/* Reduced FooterSection (About CTA with 2 buttons) */}
              <div className="mt-auto pb-10">
                <FooterSection
                  // 1:1 footer like About page, but without the bottom copyright footer
                  showBottomFooter={false}
                  customCtaTitle={footerCtaTitle}
                  primaryButtonText={footerPrimaryButtonText}
                  primaryButtonFileUrl={footerPrimaryButtonFileUrl}
                  secondaryButtonText={footerSecondaryButtonText}
                  secondaryButtonLink={footerSecondaryButtonLink}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header Section with Logo and Close Button */}
          <div className="flex items-center justify-between px-4 pt-4 pb-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-sans text-lg font-medium text-primary-950 hover:text-primary-700 transition-colors"
            >
              MDB
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex items-center gap-2 text-primary-350 hover:text-primary-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
            >
              <Image
                src="/icons/close-icon-primary400.svg"
                alt=""
                width={11}
                height={11}
                className="shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono font-normal text-base uppercase tracking-normal">CLOSE</span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col justify-between min-h-0">
            {/* Navigation Links */}
            <nav className="flex-1 min-h-0 px-4 pt-2 overflow-y-auto" aria-label="Mobile navigation">
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <li key={item.href}>
                    {index > 0 && (
                      <div className="border-t border-primary-200 my-3" style={{ borderTopWidth: '0.5px' }} />
                    )}
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block font-mono font-medium text-3xl leading-[1.4] transition-colors ${
                        isActive(item.href) ? 'text-primary-950' : 'text-primary-350 hover:text-primary-950'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Section: InfoRows + Button */}
            <div className="flex-shrink-0 mt-auto">
              {/* InfoRows Section - using same code as FooterSection */}
              <div className="px-4 pt-0">
                {/* >=450px: regular 50/50 layout */}
                <div className="flex flex-col gap-12 max-[449px]:hidden">
                  {footerRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="info-rows-row border-t border-primary-200 pt-3 grid grid-cols-2 gap-3 md:gap-6"
                      style={{ borderTopWidth: '0.5px' }}
                    >
                      <div className="info-rows-label font-mono font-normal text-base leading-[1.4] text-primary-350">
                        {row.label}
                      </div>

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
                              <Link key={itemIndex} href={item.href} className={`${itemClasses} hover:underline`}>
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
                      <div className="col-span-2 border-t border-primary-200" style={{ borderTopWidth: '0.5px' }} />
                      <div className="info-rows-label min-w-0 pt-3 font-mono font-normal text-base leading-[1.4] text-primary-350">
                        {row.label}
                      </div>
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
                              <Link key={itemIndex} href={item.href} className={`${itemClasses} hover:underline`}>
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
                      {rowIndex < footerRows.length - 1 && <div className="col-span-2 h-12" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="px-4 pb-4 pt-8">
                <Button
                  variant="primary"
                  size="sm"
                  icon="right"
                  href="https://cal.com/mike-de-bastiani-4xbsfh"
                  onClick={closeMenu}
                  className="w-full justify-center"
                >
                  BOOK A CALL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

