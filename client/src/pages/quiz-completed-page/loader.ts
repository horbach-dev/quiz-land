import { getCompletedSession } from '@/features/quiz-session/api/get-completed-session';
import { queryClient } from '@/shared/lib';

export const quizCompletedLoader = ({ params }) => {
  return {
    sessionData: queryClient.fetchQuery({
      queryKey: ['getCompletedSession', params.id],
      queryFn: () => getCompletedSession(params.id),
    }),
  };
};
