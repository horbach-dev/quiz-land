import { getQuiz } from '@/features/quiz/api/get-quiz.ts';
import { queryClient } from '@/shared/lib';

export const editQuizLoader = ({ params }) => {
  return {
    quizData: queryClient.fetchQuery({
      queryKey: ['getQuiz', params.id],
      queryFn: () => getQuiz(params.id),
    }),
  };
};
