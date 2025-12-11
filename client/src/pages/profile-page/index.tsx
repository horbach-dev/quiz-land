import { lazy, Suspense } from 'react';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./profile-page'));

export const ProfilePage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
};
