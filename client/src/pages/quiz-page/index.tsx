import { lazy, Suspense } from 'react';

import { LoaderController } from '@/features/global-preloader';

const Page = lazy(() => import('./quiz-page'));

export const QuizPage = () => {
  return (
    <Suspense fallback={<LoaderController id='QuizPage' />}>
      <Page />
    </Suspense>
  );
};
