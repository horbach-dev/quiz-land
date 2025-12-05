import { lazy, Suspense } from 'react';

import { PageLoader } from '@/shared/components/PageLoader';

const Page = lazy(() => import('./profile-page'));
export const ProfilePage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
};
