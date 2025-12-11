import { QueryClient } from '@tanstack/react-query';

const staleTime = 1000 * 60 * 5;
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime } },
});
