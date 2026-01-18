'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { Container } from '@/components/layout';

const navItems = [
  { label: 'Work', href: '/relevant-work' },
  { label: 'Lab', href: '/lab-projects' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'About', href: '/about' },
];

// Footer data for mobile menu (same as FooterSection)
const footerRows = [
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Close menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // Restore focus to hamburger button
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsMenuOpen(true);
    }
  }, [isMenuOpen, closeMenu]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen, closeMenu]);

  // Handle click outside
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    const html = document.documentElement;

    const scrollY = window.scrollY;

    const originalBodyOverflow = body.style.overflow;
    const originalBodyPosition = body.style.position;
    const originalBodyTop = body.style.top;
    const originalBodyWidth = body.style.width;
    const originalBodyPaddingRight = body.style.paddingRight;
    const originalHtmlOverflow = html.style.overflow;

    // Prevent layout shift when the scrollbar disappears (desktop)
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // iOS-safe scroll lock: freeze the body in place
    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = originalBodyOverflow;
      body.style.position = originalBodyPosition;
      body.style.top = originalBodyTop;
      body.style.width = originalBodyWidth;
      body.style.paddingRight = originalBodyPaddingRight;
      html.style.overflow = originalHtmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  // Focus trap
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

    return () => {
      menu.removeEventListener('keydown', handleTabKey);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white md:border-b border-primary-100">
        <Container as="nav" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-mono text-base font-medium text-primary-950 hover:text-primary-700 transition-colors"
            >
              &lt;mike de bastiani/&gt;
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-950'
                      : 'text-primary-700 hover:text-primary-950'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="primary" size="sm" icon="right" href="/contact">
                CONTACT
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
              <span className="font-mono font-normal text-base uppercase tracking-normal">
                MENU
              </span>
            </button>
          </div>
        </Container>
      </header>

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
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="font-mono text-base font-medium text-primary-950 hover:text-primary-700 transition-colors"
            >
              &lt;mdb/&gt;
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex items-center gap-2 text-primary-300 hover:text-primary-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
            >
              <Image
                src="/icons/close-icon-primary400.svg"
                alt=""
                width={11}
                height={11}
                className="shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono font-normal text-base uppercase tracking-normal">
                CLOSE
              </span>
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
                        isActive(item.href)
                          ? 'text-primary-950'
                          : 'text-primary-300 hover:text-primary-950'
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
                      <div className="info-rows-label font-mono font-normal text-base leading-[1.4] text-primary-300">
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
                      <div className="info-rows-label min-w-0 pt-3 font-mono font-normal text-base leading-[1.4] text-primary-300">
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
                        <div className="col-span-2 h-12" aria-hidden="true" />
                      )}
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
