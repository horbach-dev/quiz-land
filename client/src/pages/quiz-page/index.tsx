import { lazy, Suspense } from 'react';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./quiz-page'));

export const QuizPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
};
