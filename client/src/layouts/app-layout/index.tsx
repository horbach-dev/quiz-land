import { lazy, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';

import { LoaderController } from '@/features/global-preloader';
import { AppLayoutError } from '@/shared/components/AppLayoutError';

const Layout = lazy(() => import('./AppLayout'));

export const AppLayout = () => {
  const data = useLoaderData();

  return (
    <Suspense fallback={<LoaderController id='AppLayout' />}>
      <Await
        resolve={data.userData}
        errorElement={<AppLayoutError />}
      >
        <Layout />
      </Await>
    </Suspense>
  );
};
