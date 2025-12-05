import { lazy, Suspense } from 'react';

import { PageLoader } from '@/shared/components/PageLoader';

const Page = lazy(() => import('./main-page.tsx'));
export const MainPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
};
