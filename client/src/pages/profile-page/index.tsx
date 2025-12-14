import { lazy, Suspense } from 'react';

import { LoaderController } from '@/features/global-preloader';

const Page = lazy(() => import('./profile-page'));

export const ProfilePage = () => {
  return (
    <Suspense fallback={<LoaderController id='ProfilePage' />}>
      <Page />
    </Suspense>
  );
};
