import { lazy, Suspense } from 'react';

import { LoaderController } from '@/features/global-preloader';

const Page = lazy(() => import('./QuizzesPage'));

export const QuizzesPage = () => {
  return (
    <Suspense fallback={<LoaderController id='QuizzesPage' />}>
      <Page />
    </Suspense>
  );
};
