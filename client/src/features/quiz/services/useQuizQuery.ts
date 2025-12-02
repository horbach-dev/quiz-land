import { useQuery } from '@tanstack/react-query';
import { getQuiz } from "../api/get-quiz";
import { BASE_URL } from "@/constants";
import mock from './mock.json'
import type { TQuiz } from "@/features/quiz/types.ts";

export function useQuizQuery (id: string) {
  return useQuery({
    queryKey: ['getQuiz', id],
    queryFn: () => getQuiz(id),
    select: (data) => {
      return {
        ...data,
        poster: BASE_URL + data.poster,
      }
    },
    placeholderData: (): TQuiz => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return mock
    }
  })
}
