import { useQuery } from '@tanstack/react-query';
import { getQuizList } from "../api/getQuizList";

export function useQuizListQuery () {
  return useQuery({
    queryKey: ['getQuizList'],
    queryFn: () => getQuizList({}),
    refetchOnMount: false
  })
}
