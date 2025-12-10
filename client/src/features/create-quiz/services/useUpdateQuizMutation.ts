import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { IFormData } from '@/features/create-quiz/types';

import { updateQuiz } from '../api/update-quiz';

export const useUpdateQuizMutation = (quizId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IFormData) => updateQuiz(quizId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getQuiz', quizId] });
      queryClient.invalidateQueries({ queryKey: ['getQuizList', { type: 'my' }] });
    },
  });
};
