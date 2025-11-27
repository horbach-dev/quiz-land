import './styles.css'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
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
