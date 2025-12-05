import { createPortal } from 'react-dom';
import { ChevronLeft } from 'lucide-react';
import { useSwipeEvents } from '../hooks/useSwipeEvents';
import { useRef } from 'react';
import styles from './swipe-redirect.module.css';
import { navigateTo } from '@/shared/utils/navigateTo.ts';

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
