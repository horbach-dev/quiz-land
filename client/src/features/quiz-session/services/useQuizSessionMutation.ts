import { useMutation, useQueryClient } from '@tanstack/react-query';

import { startSession } from '../api/start-session';

export function useStartSessionMutation(quizId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ restart }: { restart?: boolean }) => startSession({ id: quizId, restart }),
    onSuccess: (data) => {
      queryClient.setQueryData(['getSession', quizId], data);
      // TODO Убрать костыль после замены хука
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['getQuiz', quizId] });
      }, 500);
    },
  });

  return { startSession: mutateAsync, isPending };
}
