import { lazy, Suspense } from 'react';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./main-page'));

export const MainPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
};
