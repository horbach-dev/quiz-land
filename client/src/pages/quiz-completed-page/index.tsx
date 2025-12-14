import { lazy, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

import { LoaderController } from '@/features/global-preloader';
import { AppLayoutError } from '@/shared/components/AppLayoutError';

const Page = lazy(() => import('./QuizCompletedPage'));

export const QuizCompletedPage = () => {
  const data = useLoaderData();
  return (
    <Suspense fallback={<LoaderController id='QuizCompletedPage' />}>
      <Await
        resolve={data.sessionData}
        errorElement={<AppLayoutError />}
      >
        {(sessionData: any) => <Page sessionData={sessionData} />}
      </Await>
    </Suspense>
  );
};
