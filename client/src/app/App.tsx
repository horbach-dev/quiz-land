import './styles.css';
import '@/shared/config/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import { GlobalPreloader } from '@/features/global-preloader';
import { queryClient } from '@/shared/lib';

import { ErrorBoundary } from './ErrorBoundary';
import { router } from './Router';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <GlobalPreloader />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
