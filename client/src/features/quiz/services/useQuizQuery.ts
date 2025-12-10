import { useQuery } from '@tanstack/react-query';

import { getQuiz } from '../api/get-quiz';

export function useQuizQuery(id: string) {
  return useQuery({
    queryKey: ['getQuiz', id],
    queryFn: () => getQuiz(id),
  });
}
