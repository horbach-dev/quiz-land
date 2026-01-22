import { useInfiniteQuery } from '@tanstack/react-query';

import type { TQuizListType } from '@/shared/types/quiz.ts';

import { getQuizList } from '../api/get-quiz-list';

type TQuizListParams = {
  type: TQuizListType;
  limit?: number;
};

export function useQuizListQuery(params: TQuizListParams) {
  const limit = params?.limit ?? 15;

  return useInfiniteQuery({
    queryKey: ['getQuizList', params],
    queryFn: ({ pageParam }) => getQuizList({ pageParam, limit, type: params.type }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.length) return undefined;
      return allPages.length + 1;
    },
  });
}
