import { lazy, Suspense } from 'react';

import { PageLoader } from '@/shared/components/PageLoader';

const Page = lazy(() => import('./create-quiz-page'));
export const CreateQuizPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  );
};
