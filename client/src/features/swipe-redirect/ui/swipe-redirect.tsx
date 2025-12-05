import { ChevronLeft } from 'lucide-react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { navigateTo } from '@/shared/utils/navigateTo.ts';

import { useSwipeEvents } from '../hooks/useSwipeEvents';
import styles from './swipe-redirect.module.css';

const portal = document.getElementById('swipe')!;

export const SwipeRedirect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useSwipeEvents(containerRef, () => navigateTo('back-navigate'));

  return createPortal(
    <div className={styles.container} ref={containerRef}>
      <ChevronLeft />
    </div>,
    portal,
  );
};
