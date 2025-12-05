import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Navigation } from '@/features/navigation';
import { RotationAlert } from '@/features/rotation-alert';
import { SwipeRedirect } from '@/features/swipe-redirect';
import { Background } from '@/shared/components/Background';

import { useRouteListener } from '../useRouteListener.ts';
import { useViewportSettings } from '../useViewportSettings.ts';
import styles from './app-layout.module.css';

export const AppLayout = () => {
  const { isMain, isCreateQuiz } = useRouteListener();
  const { isMobile } = useViewportSettings();

  return (
    <>
      <Background />
      <div className={styles.layout}>
        <Outlet />
      </div>
      <ScrollRestoration />
      <Navigation />
      {!isMain && <SwipeRedirect />}
      {isMobile && !isCreateQuiz && <RotationAlert />}
    </>
  );
};
