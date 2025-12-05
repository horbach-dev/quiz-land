import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeSession } from '../api/complete-session';

export function useCompleteSessionMutation(quizId: string) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: completeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getQuiz', quizId] });
    },
  });

  return {
    completeSession: mutateAsync,
    isPending,
    isSuccess,
  };
}
