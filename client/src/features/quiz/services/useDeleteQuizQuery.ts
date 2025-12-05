import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteQuiz } from '../api/delete-quiz';

export function useDeleteQuizQuery(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getQuizList', { type: 'my' }],
      });
    },
  });
}
