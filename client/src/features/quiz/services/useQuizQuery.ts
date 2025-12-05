import { useQuery } from '@tanstack/react-query';
import { getQuiz } from '../api/get-quiz';
import { BASE_URL } from '@/shared/constants';

export function useQuizQuery(id: string) {
  return useQuery({
    queryKey: ['getQuiz', id],
    queryFn: () => getQuiz(id),
    select: (data) => {
      return {
        ...data,
        poster: BASE_URL + data.poster,
      };
    },
  });
}
