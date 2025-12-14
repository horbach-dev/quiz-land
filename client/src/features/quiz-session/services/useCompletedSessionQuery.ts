import { useQuery } from '@tanstack/react-query';

import { getCompletedSession } from '@/features/quiz-session/api/get-completed-session';

export function useCompletedSessionQuery(sessionId: string) {
  return useQuery({
    queryKey: ['getCompletedSession', sessionId],
    queryFn: () => getCompletedSession(sessionId),
  });
}
