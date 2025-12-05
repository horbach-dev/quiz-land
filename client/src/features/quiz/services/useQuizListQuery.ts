import { useQuery } from '@tanstack/react-query';
import { getQuizList } from "../api/get-quiz-list";

type TQuizListParams = {
  type: 'shared' | 'my' | 'public'
}

export function useQuizListQuery (params?: TQuizListParams) {
  return useQuery({
    queryKey: ['getQuizList', params],
    queryFn: () => getQuizList(params),
    select: data => {
      return data.length ? data : []
    }
  })
}
