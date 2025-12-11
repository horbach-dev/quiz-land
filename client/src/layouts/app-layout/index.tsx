import { lazy, Suspense } from 'react';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./ui/app-layout'));

export const AppLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
};
