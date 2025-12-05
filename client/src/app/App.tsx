import './styles.css';
import '@/shared/config/i18n';
import { RouterProvider } from 'react-router-dom';
import { setAuthHeader } from '@/shared/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { router } from './Router.tsx';
import { useEffect } from 'react';
import { useRawInitData } from '@tma.js/sdk-react';

const staleTime = 1000 * 60 * 5;
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime } },
});

export function App() {
  const token = useRawInitData();

  useEffect(() => {
    if (token) setAuthHeader(token);
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
