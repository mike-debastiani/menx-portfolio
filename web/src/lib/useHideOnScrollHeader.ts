import { useCallback, useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

interface UseHideOnScrollHeaderOptions {
  isLocked?: boolean;
  resetToken?: string | number;
  topThreshold?: number;
  deltaThreshold?: number;
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
    bottomThreshold = 96,
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const lastScrollYRef = useRef(0);
  const directionRef = useRef<ScrollDirection>('none');
  const deltaAccRef = useRef(0);
  const tickingRef = useRef(false);
  const visibleRef = useRef(true);
  const nearBottomRef = useRef(false);

  const setVisible = useCallback((next: boolean) => {
    if (visibleRef.current === next) return;
    visibleRef.current = next;
    setIsVisible(next);
  }, []);

  useEffect(() => {
    visibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    lastScrollYRef.current = clampScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    if (!isLocked) return;
    setVisible(true);
    directionRef.current = 'none';
    deltaAccRef.current = 0;
    lastScrollYRef.current = clampScrollY(window.scrollY);
  }, [isLocked, setVisible]);

  useEffect(() => {
    if (resetToken === undefined) return;
    setVisible(true);
    directionRef.current = 'none';
    deltaAccRef.current = 0;
    lastScrollYRef.current = clampScrollY(window.scrollY);
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

        updateNearBottom(currentY);

        if (isLocked) {
          setVisible(true);
          directionRef.current = 'none';
          deltaAccRef.current = 0;
          lastScrollYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        if (currentY <= topThreshold) {
          setVisible(true);
          directionRef.current = 'none';
          deltaAccRef.current = 0;
          lastScrollYRef.current = currentY;
          tickingRef.current = false;
          return;
        }

        if (delta !== 0) {
          const direction: ScrollDirection = delta > 0 ? 'down' : 'up';
          if (direction !== directionRef.current) {
            directionRef.current = direction;
            deltaAccRef.current = 0;
          }

          deltaAccRef.current += delta;

          if (direction === 'down' && deltaAccRef.current >= deltaThreshold) {
            setVisible(false);
            deltaAccRef.current = 0;
          } else if (direction === 'up' && deltaAccRef.current <= -deltaThreshold) {
            setVisible(true);
            deltaAccRef.current = 0;
          }
        }

        lastScrollYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [bottomThreshold, deltaThreshold, isLocked, setVisible, topThreshold]);

  return { isVisible, isNearBottom };
}
