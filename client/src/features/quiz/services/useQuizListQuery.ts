import { useQuery } from '@tanstack/react-query';
import { getQuizList } from "../api/get-quiz-list";
import mock from './mock.json'

type TQuizListParams = {
  type: 'friends' | 'my' | 'public'
}

export function useQuizListQuery (params?: TQuizListParams) {
  return useQuery({
    queryKey: ['getQuizList', params],
    queryFn: () => getQuizList(params),
    placeholderData: () => {
      return [{ ...mock, id: '1' }, { ...mock, id: '2' }, { ...mock, id: '3' }, { ...mock, id: '4' }]
    }
  })
}
