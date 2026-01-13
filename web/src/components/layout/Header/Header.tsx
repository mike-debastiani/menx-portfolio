'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { Container } from '@/components/layout';
import HamburgerIcon from './HamburgerIcon';

const navItems = [
  { label: 'Work', href: '/' },
  { label: 'Lab', href: '/lab' },
  { label: 'Workflow', href: '/workflow' },
  { label: 'About', href: '/about' },
];

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
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-primary-100">
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
          <div className="hidden lg:flex lg:items-center lg:gap-8">
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

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="lg:hidden p-2 text-primary-950 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-primary-950/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
            aria-hidden="true"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="fixed top-16 right-0 bottom-0 z-50 w-full max-w-sm bg-white border-l border-primary-100 shadow-xl transition-transform duration-300 ease-out lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-primary-100">
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 text-primary-950 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 rounded"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`block font-mono text-lg font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-primary-950'
                            : 'text-primary-700 hover:text-primary-950'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button */}
              <div className="px-6 pb-8 pt-4 border-t border-primary-100">
                <Button
                  variant="primary"
                  size="base"
                  icon="right"
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full justify-center"
                >
                  CONTACT
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
