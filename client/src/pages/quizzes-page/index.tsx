import { lazy, Suspense } from 'react';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./QuizzesPage'));

export const QuizzesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
};
