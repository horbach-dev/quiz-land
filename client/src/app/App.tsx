import './styles.css'
import '@/shared/config/i18n'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary.tsx";
import { router } from './Router.tsx';

const staleTime = 1000 * 60 * 5
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime } }
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
