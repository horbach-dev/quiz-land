import { ChevronLeft } from 'lucide-react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useAppStore } from '@/shared/store.ts';

import { useSwipeEvents } from '../hooks/useSwipeEvents';
import styles from './swipe-redirect.module.css';

const portal = document.getElementById('swipe')!;

export const SwipeRedirect = () => {
  const callback = useAppStore((s) => s.swipeRedirectCallback);
  const containerRef = useRef<HTMLDivElement>(null);
  useSwipeEvents(containerRef, callback);

  return createPortal(
    <div
      className={styles.container}
      ref={containerRef}
    >
      <ChevronLeft />
    </div>,
    portal,
  );
};
