import { Suspense } from 'react';
import { Await, Outlet, ScrollRestoration, useLoaderData } from 'react-router';

import { Navigation } from '@/features/navigation';
import { Popups } from '@/features/popups';
import { RotationAlert } from '@/features/rotation-alert';
import { SwipeRedirect } from '@/features/swipe-redirect';
import { Background } from '@/shared/components/Background';
import { Loader } from '@/shared/components/Loader';

import { useRouteListener } from '../useRouteListener.ts';
import { useViewportSettings } from '../useViewportSettings.ts';
import styles from './app-layout.module.css';

export default function AppLayout() {
  const data = useLoaderData();
  const { pathname } = useRouteListener();
  const { isMobile } = useViewportSettings();

  // console.log('data', data.userData);

  return (
    <>
      <Background />
      <div className={styles.layout}>
        <Suspense fallback={<Loader />}>
          <Await
            resolve={data.userData}
            errorElement={<div>Error during render page!</div>}
          >
            <Outlet />
          </Await>
        </Suspense>
      </div>
      <ScrollRestoration />
      <Navigation />
      {pathname !== '/' && <SwipeRedirect />}
      {isMobile && pathname !== '/create' && <RotationAlert />}
      <Popups />
    </>
  );
}
