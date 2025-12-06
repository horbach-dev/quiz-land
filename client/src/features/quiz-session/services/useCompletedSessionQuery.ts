import { useQuery } from '@tanstack/react-query';

import type { TSessionCompleted } from '@/shared/types/quiz';

export function useCompletedSessionQuery(quizId: string) {
  return useQuery<TSessionCompleted>({
    queryKey: ['getCompletedSession', quizId],
    enabled: false,
    queryFn: () =>
      new Promise((resolve) => {
        resolve({} as TSessionCompleted);
      }),
  });
}
