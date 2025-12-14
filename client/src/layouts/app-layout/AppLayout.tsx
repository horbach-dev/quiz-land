import { Outlet, ScrollRestoration } from 'react-router';

import { Navigation } from '@/features/navigation';
import { Popups } from '@/features/popups';
import { RotationAlert } from '@/features/rotation-alert';
import { SwipeRedirect } from '@/features/swipe-redirect';
import { Background } from '@/shared/components/Background';

import styles from './AppLayout.module.css';
import { useRouteListener } from './hooks/useRouteListener';
import { useViewportSettings } from './hooks/useViewportSettings';

export default function AppLayout() {
  const { pathname } = useRouteListener();
  const { isMobile } = useViewportSettings();

  return (
    <>
      <Background />
      <div className={styles.layout}>
        <Outlet />
      </div>
      <ScrollRestoration />
      <Navigation />
      {pathname !== '/' && <SwipeRedirect />}
      {isMobile && pathname !== '/create' && <RotationAlert />}
      <Popups />
    </>
  );
}
