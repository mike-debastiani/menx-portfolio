import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

interface UseHideOnScrollHeaderOptions {
  isLocked?: boolean;
  resetToken?: string | number;
  topThreshold?: number;
  deltaThreshold?: number;
  minDelta?: number;
  toggleCooldownMs?: number;
  layoutShiftLockMs?: number;
  bottomThreshold?: number;
}

interface UseHideOnScrollHeaderResult {
  isVisible: boolean;
  isNearBottom: boolean;
}

const clampScrollY = (value: number): number => (value < 0 ? 0 : value);

export function useHideOnScrollHeader(
  options: UseHideOnScrollHeaderOptions = {},
): UseHideOnScrollHeaderResult {
  const {
    isLocked = false,
    resetToken,
    topThreshold = 8,
    deltaThreshold = 12,
    minDelta = 2,
    toggleCooldownMs = 200,
    layoutShiftLockMs = 140,
    bottomThreshold = 96,
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const lastScrollYRef = useRef(0);
  const directionRef = useRef<ScrollDirection>('none');
  const anchorYRef = useRef(0);
  const tickingRef = useRef(false);
  const visibleRef = useRef(true);
  const nearBottomRef = useRef(false);
  const lastToggleTimeRef = useRef(0);
  const suppressUntilRef = useRef(0);

  const setVisible = useCallback((next: boolean) => {
    if (visibleRef.current === next) return;
    visibleRef.current = next;
    lastToggleTimeRef.current = performance.now();
    suppressUntilRef.current = lastToggleTimeRef.current + layoutShiftLockMs;
    setIsVisible(next);
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    lastScrollYRef.current = clampScrollY(window.scrollY);
    anchorYRef.current = lastScrollYRef.current;
  }, []);

  useEffect(() => {
    if (!isLocked) return;
    setVisible(true);
    directionRef.current = 'none';
    lastScrollYRef.current = clampScrollY(window.scrollY);
    anchorYRef.current = lastScrollYRef.current;
  }, [isLocked, setVisible]);

  useEffect(() => {
    if (resetToken === undefined) return;
    setVisible(true);
    directionRef.current = 'none';
    lastScrollYRef.current = clampScrollY(window.scrollY);
    anchorYRef.current = lastScrollYRef.current;
  }, [resetToken, setVisible]);

  useEffect(() => {
    const updateNearBottom = (currentY: number) => {
      const doc = document.documentElement;
      const maxScrollY = Math.max(0, doc.scrollHeight - window.innerHeight);
      const nearBottomNow = currentY >= Math.max(0, maxScrollY - bottomThreshold);
      if (nearBottomNow !== nearBottomRef.current) {
        nearBottomRef.current = nearBottomNow;
        setIsNearBottom(nearBottomNow);
      }
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = clampScrollY(window.scrollY);
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;
        const now = performance.now();

        updateNearBottom(currentY);

        if (isLocked) {
          setVisible(true);
          directionRef.current = 'none';
          lastScrollYRef.current = currentY;
          anchorYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        if (now < suppressUntilRef.current) {
          lastScrollYRef.current = currentY;
          anchorYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        if (currentY <= topThreshold) {
          setVisible(true);
          directionRef.current = 'none';
          lastScrollYRef.current = currentY;
          anchorYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        if (Math.abs(delta) < minDelta) {
          lastScrollYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        const direction: ScrollDirection = delta > 0 ? 'down' : 'up';
        if (direction !== directionRef.current) {
          directionRef.current = direction;
          anchorYRef.current = currentY;
        }

        // Only toggle once the user has moved a clear distance
        const distanceFromAnchor = currentY - anchorYRef.current;
        const canToggle = now - lastToggleTimeRef.current >= toggleCooldownMs;
        if (canToggle) {
          if (direction === 'down' && distanceFromAnchor >= deltaThreshold && visibleRef.current) {
            setVisible(false);
            anchorYRef.current = currentY;
          } else if (direction === 'up' && distanceFromAnchor <= -deltaThreshold && !visibleRef.current) {
            setVisible(true);
            anchorYRef.current = currentY;
          }
        }

        lastScrollYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [
    bottomThreshold,
    deltaThreshold,
    isLocked,
    layoutShiftLockMs,
    minDelta,
    setVisible,
    toggleCooldownMs,
    topThreshold,
  ]);

  return { isVisible, isNearBottom };
}
