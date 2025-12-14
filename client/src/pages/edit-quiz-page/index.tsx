import { lazy, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

import { LoaderController } from '@/features/global-preloader';
import { AppLayoutError } from '@/shared/components/AppLayoutError';

const Page = lazy(() => import('./edit-quiz-page'));

export const EditQuizPage = () => {
  const data = useLoaderData();
  return (
    <Suspense fallback={<LoaderController id='EditQuizPage' />}>
      <Await
        resolve={data.quizData}
        errorElement={<AppLayoutError />}
      >
        {(props: any) => <Page quizData={props} />}
      </Await>
    </Suspense>
  );
};
