import { useQuery } from '@tanstack/react-query';

import type { TResult } from '../api/start-session';

export function useQuizSessionQuery(id: string) {
  return useQuery<TResult>({
    queryKey: ['getSession', id],
    enabled: false,
    queryFn: () =>
      new Promise((resolve) => {
        resolve({} as TResult);
      }),
  });
}
