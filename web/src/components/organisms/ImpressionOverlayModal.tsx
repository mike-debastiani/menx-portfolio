'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ImpressionDetailCard, {
  type ImpressionDetailCardProps,
} from '@/components/molecules/ImpressionDetailCard';
import Pill, { type PillVariant } from '@/components/atoms/Pill';

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
            className="relative w-full max-w-[900px] rounded-t-2xl bg-transparent shadow-2xl"
            style={{
              paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
              touchAction: shouldReduceMotion ? 'auto' : 'pan-y',
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

            <div className="px-[var(--layout-margin)] pb-6">
              {/* Shared hero image */}
              <motion.div
                layoutId={sharedLayoutId}
                className="relative w-full overflow-hidden rounded-xl bg-primary-50"
                style={{
                  aspectRatio: '398 / 436',
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

              {/* Body: reuse ImpressionDetailCard markup */}
              <div className="mt-4">
                <ImpressionDetailCard
                  projectLabel={detail.projectLabel}
                  title={detail.title}
                  description={detail.description}
                  buttonLabel={detail.buttonLabel}
                  buttonHref={detail.buttonHref}
                  className="w-full"
                />
              </div>

              {/* Method pill below the detail card (gap 12px) */}
              {methodLabel ? (
                <div className="mt-3 flex flex-wrap items-start gap-3">
                  <Pill variant={methodColorVariant} size="sm">
                    {methodLabel}
                  </Pill>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

