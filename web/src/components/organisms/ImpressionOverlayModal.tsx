'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ImpressionDetailCard, {
  type ImpressionDetailCardProps,
} from '@/components/molecules/ImpressionDetailCard';
import Pill, { type PillVariant } from '@/components/atoms/Pill';

const HERO_WIDTH = 398;
const HERO_HEIGHT = 436;
const HERO_RATIO = HERO_HEIGHT / HERO_WIDTH; // height / width

export interface ImpressionOverlayModalProps {
  open: boolean;
  impressionId: string | null;
  image?: { src: string; alt: string };
  methodLabel?: string;
  methodColorVariant?: PillVariant;
  detail: ImpressionDetailCardProps | null;
  onClose: () => void;
  onAfterClose?: () => void;
}

/**
 * Mobile-only bottom-sheet overlay for an Impression.
 *
 * Notes / limitations:
 * - iOS Safari can be finicky with body scroll locking; we keep it simple with `body.classList`.
 * - "Close on scroll attempt" is implemented via wheel/touchmove listeners. Touchmove is ignored
 *   while the sheet is actively dragging so swipe-to-close still feels natural.
 */
export default function ImpressionOverlayModal({
  open,
  impressionId,
  image,
  methodLabel,
  methodColorVariant = 'default',
  detail,
  onClose,
  onAfterClose,
}: ImpressionOverlayModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const focusTargetRef = useRef<HTMLDivElement | null>(null);
  const hasClosedFromScrollAttemptRef = useRef(false);
  const isDraggingRef = useRef(false);

  const [heroSize, setHeroSize] = useState<{ width: number; height: number } | null>(null);
  const [containerPadding, setContainerPadding] = useState<number>(16);
  const [sheetPaddingTop, setSheetPaddingTop] = useState<number>(16);

  const sharedLayoutId = useMemo(() => {
    if (!impressionId) return undefined;
    if (shouldReduceMotion) return undefined;
    return `impression-image-${impressionId}`;
  }, [impressionId, shouldReduceMotion]);

  // Portal mount guard (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Body scroll lock while open
  useEffect(() => {
    if (!open) return;
    if (typeof document === 'undefined') return;

    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  // Size the hero image and detail card so they fit within the viewport, centered, with layout margin.
  // On screens <500px, ensure both elements fit together without clipping.
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;

    const readLayoutMargin = (): number => {
      const root = document.documentElement;
      const raw = getComputedStyle(root).getPropertyValue('--layout-margin').trim();
      const parsed = Number.parseFloat(raw);
      if (Number.isFinite(parsed)) return parsed;
      return window.innerWidth >= 1280 ? 24 : window.innerWidth >= 768 ? 32 : 16;
    };

    const getViewportHeight = () => window.visualViewport?.height ?? window.innerHeight;

    const update = () => {
      const layoutMargin = readLayoutMargin();
      const viewportWidth = window.innerWidth;
      const viewportHeight = getViewportHeight();
      const isSmallScreen = viewportWidth < 500;
      const isMediumScreen = viewportWidth >= 500 && viewportWidth < 768;
      const isMobileScreen = viewportWidth < 768;

      // Determine side margin and top padding based on screen size
      // <500px: half of layout margin (8px)
      // 500px-768px: full layout margin (32px)
      // >=768px: full layout margin (varies)
      const sideMargin = isSmallScreen ? layoutMargin / 2 : layoutMargin;
      setContainerPadding(sideMargin);
      setSheetPaddingTop(sideMargin); // Top padding should match side margin

      // Available width: viewport minus layout margins on both sides
      const availableWidth = Math.max(240, viewportWidth - 2 * layoutMargin);

      // Estimate detail card height (card content ~180px + padding + button + pill + gap)
      // On small screens, card has pt-4 (16px), px-4 (16px), pb-4 (16px)
      const detailCardHeight = isSmallScreen ? 180 + 16 + 16 + 16 + 40 + 12 + 24 : 212 + 20 + 20 + 20 + 40 + 12 + 24; // content + paddings + button + pill + gap
      const detailCardOverlap = isSmallScreen ? 40 : 0; // negative margin-top overlap

      if (isMobileScreen) {
        // For <768px: apply the same logic - ensure image + card fit together within viewport height
        // Top margin must be at least equal to side margin
        const minTopMargin = sideMargin; // Must be >= side margin
        
        // Available height: viewport minus top margin (minTopMargin), bottom layout margin, and sheet padding
        const sheetPaddingBottom = 16; // pb-6 = 24px, but we use 16px for safety
        const availableHeight = viewportHeight - minTopMargin - layoutMargin - sheetPaddingBottom;

        // Total content height = image height + (card height - overlap)
        // We want: imageHeight + (detailCardHeight - detailCardOverlap) <= availableHeight
        // So: imageHeight <= availableHeight - (detailCardHeight - detailCardOverlap)
        const maxImageHeight = availableHeight - (detailCardHeight - detailCardOverlap);

        // Calculate image dimensions maintaining ratio
        const naturalImageHeight = availableWidth * HERO_RATIO;
        const imageHeight = Math.min(naturalImageHeight, maxImageHeight);
        const imageWidth = imageHeight / HERO_RATIO;

        // Check if the image would exceed the top of viewport or if it's too small
        // If so, fall back to simpler logic (larger image, no special constraints)
        const wouldExceedTop = imageHeight > (viewportHeight - minTopMargin - layoutMargin - sheetPaddingBottom);
        const isTooSmall = imageHeight < 180; // Minimum reasonable size

        if (wouldExceedTop || isTooSmall) {
          // Fall back to simpler logic: use available width, cap height if needed
          const naturalHeight = availableWidth * HERO_RATIO;
          const maxHeroHeight = Math.min(420, Math.max(180, viewportHeight - 380));
          const height = Math.min(naturalHeight, maxHeroHeight);
          const width = naturalHeight > maxHeroHeight ? height / HERO_RATIO : availableWidth;

          setHeroSize({ width: Math.round(width), height: Math.round(height) });
        } else {
          setHeroSize({ width: Math.round(imageWidth), height: Math.round(imageHeight) });
        }
      } else {
        // On larger screens (>=768px): use available width, cap height if needed
        const naturalHeight = availableWidth * HERO_RATIO;
        const maxHeroHeight = Math.min(420, Math.max(180, viewportHeight - 380));
        const height = Math.min(naturalHeight, maxHeroHeight);
        const width = naturalHeight > maxHeroHeight ? height / HERO_RATIO : availableWidth;

        setHeroSize({ width: Math.round(width), height: Math.round(height) });
      }
    };

    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, [open]);

  const detailWidthStyle = useMemo(() => {
    if (!heroSize) return undefined;

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const isSmallScreen = viewportWidth < 500;
    const isMediumScreen = viewportWidth >= 500 && viewportWidth < 768;
    
    // Determine side margin based on screen size
    const layoutMargin = viewportWidth >= 1280 ? 24 : viewportWidth >= 768 ? 32 : 16;
    const sideMargin = isSmallScreen ? layoutMargin / 2 : layoutMargin;

    if (isSmallScreen || isMediumScreen) {
      // On small and medium screens (<768px): DetailCard should be same width as image (1:1)
      return {
        width: `${heroSize.width}px`,
        maxWidth: `calc(100vw - ${2 * sideMargin}px)`,
      } as const;
    }

    // On larger screens (>=768px): 24px wider on both sides than the image => +48px total
    return {
      width: `min(${heroSize.width + 48}px, calc(100vw - ${2 * sideMargin}px))`,
    } as const;
  }, [heroSize]);

  // Focus management: move focus into modal on open
  useEffect(() => {
    if (!open) return;
    hasClosedFromScrollAttemptRef.current = false;

    // Let the modal mount first
    const id = window.setTimeout(() => {
      focusTargetRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(id);
  }, [open]);

  // Close on Escape / scroll attempt (wheel/touchmove). Guard so it only fires once per open.
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;

    const requestCloseOnce = () => {
      if (hasClosedFromScrollAttemptRef.current) return;
      hasClosedFromScrollAttemptRef.current = true;
      onClose();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestCloseOnce();
      }
    };

    const onWheel = () => {
      requestCloseOnce();
    };

    const onTouchMove = (e: TouchEvent) => {
      // Don’t instantly close while user is dragging the sheet (swipe-to-close).
      if (isDraggingRef.current) return;
      requestCloseOnce();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [open, onClose]);

  if (!isMounted) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence onExitComplete={onAfterClose}>
      {open && impressionId && detail ? (
        <motion.div
          key={impressionId}
          className="fixed inset-0 z-[999] flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={detail.title ? `Impression: ${detail.title}` : 'Impression details'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          // Safety: if exit ever gets interrupted, don't keep blocking the page.
          exit={{ opacity: 0, pointerEvents: 'none' }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close impression details"
            className="absolute inset-0 bg-primary-950/40 backdrop-blur-[6px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            exit={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.2 }}
          />

          {/* Bottom sheet */}
          <motion.div
            ref={sheetRef}
            className="relative w-full max-w-[900px] rounded-t-2xl bg-transparent shadow-2xl flex flex-col overflow-x-hidden"
            style={{
              paddingTop: `max(env(safe-area-inset-top), ${sheetPaddingTop}px)`,
              paddingBottom: 'max(env(safe-area-inset-bottom), var(--layout-margin))',
              touchAction: shouldReduceMotion ? 'auto' : 'pan-y',
              minHeight: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
            }}
            initial={{ y: shouldReduceMotion ? 0 : 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: shouldReduceMotion ? 0 : 96, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.26, ease: 'easeOut' }}
            drag={shouldReduceMotion ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.18}
            dragMomentum={false}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={(_, info) => {
              isDraggingRef.current = false;

              // Thresholds tuned for “pull down to dismiss”
              const closeByOffset = info.offset.y > 100;
              const closeByVelocity = info.velocity.y > 900;

              if (closeByOffset || closeByVelocity) {
                onClose();
              }
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Focus target */}
            <div
              ref={focusTargetRef}
              tabIndex={-1}
              className="sr-only"
              aria-hidden="true"
            />

            <div
              className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-y-auto overflow-x-hidden"
              style={{ paddingLeft: `${containerPadding}px`, paddingRight: `${containerPadding}px`, maxWidth: '100%' }}
            >
              <div className="flex flex-col items-center w-full max-w-full">
                {/* Shared hero image */}
                <motion.div
                  layoutId={sharedLayoutId}
                  className="relative mx-auto overflow-hidden rounded-xl bg-primary-50 shrink-0"
                  style={{
                    width: heroSize ? `${heroSize.width}px` : '100%',
                    height: heroSize ? `${heroSize.height}px` : undefined,
                  }}
                >
                  {image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 767px) 100vw, 900px"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-primary-100" aria-hidden="true" />
                  )}
                </motion.div>

                {/* Detail card: sits on top of the image (overlapping) and is 24px wider on both sides */}
                <div className="relative z-10 mx-auto shrink-0" style={detailWidthStyle}>
                  <ImpressionDetailCard
                    projectLabel={detail.projectLabel}
                    title={detail.title}
                    description={detail.description}
                    buttonLabel={detail.buttonLabel}
                    buttonHref={detail.buttonHref}
                    className="w-full !pt-4"
                  />

                  {/* Method pill below the detail card (gap 12px) */}
                  {methodLabel ? (
                    <div className="mt-3 flex flex-wrap items-start gap-3">
                      <Pill variant={methodColorVariant} size="sm">
                        {methodLabel}
                      </Pill>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

