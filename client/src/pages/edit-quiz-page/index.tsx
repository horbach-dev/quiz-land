import { lazy, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

import { Loader } from '@/shared/components/Loader';

const Page = lazy(() => import('./edit-quiz-page'));

export const EditQuizPage = () => {
  const data = useLoaderData();
  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={data.quizData}
        errorElement={<div>Error during render page!</div>}>
        {(props: any) => <Page quizData={props} />}
      </Await>
    </Suspense>
  );
};
