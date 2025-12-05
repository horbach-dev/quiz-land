import {useMutation, useQueryClient} from "@tanstack/react-query";
import { createQuiz } from "../api/create-quiz";

export const useCreateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getQuizList', { type: 'my' }] });
    },
  })
}
