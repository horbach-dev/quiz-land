import { lazy, Suspense } from 'react';

import { LoaderController } from '@/features/global-preloader';

export const Page = lazy(() => import('./create-quiz-page'));

export const CreateQuizPage = () => {
  return (
    <Suspense fallback={<LoaderController id='CreateQuizPage' />}>
      <Page />
    </Suspense>
  );
};
