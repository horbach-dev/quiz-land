import { useMutation } from "@tanstack/react-query";
import { createQuiz } from "@/features/quiz/api/create-quiz";

export const useCreateQuizMutation = () => {
  return useMutation({
    mutationFn: createQuiz,
    meta: {
      invalidates: ['getQuizList']
    }
  })
}
