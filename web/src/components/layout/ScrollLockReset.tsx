'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { forceUnlockBodyScroll } from '@/lib/scrollLock';

export default function ScrollLockReset() {
  const pathname = usePathname();

  useEffect(() => {
    forceUnlockBodyScroll();
  }, [pathname]);

  return null;
}
