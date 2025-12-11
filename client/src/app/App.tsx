import './styles.css';
import '@/shared/config/i18n';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import { queryClient } from '@/shared/lib';

import { ErrorBoundary } from './ErrorBoundary.tsx';
import { router } from './Router.tsx';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
