import { lazy, Suspense } from 'react';

import { LoaderController } from '@/features/global-preloader';

const Page = lazy(() => import('./main-page'));

export const MainPage = () => {
  return (
    <Suspense fallback={<LoaderController id='MainPage' />}>
      <Page />
    </Suspense>
  );
};
