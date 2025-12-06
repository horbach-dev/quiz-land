import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { startSession } from '../api/start-session';

export function useStartSessionMutation(quizId: string) {
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ restart }: { restart?: boolean }) => startSession({ id: quizId, restart }),
    onMutate: ({ restart }) => setIsRestart(!!restart),
    onSuccess: (data) => {
      queryClient.setQueryData(['getSession', quizId], data);
    },
  });

  return {
    startSession: mutateAsync,
    isLoadingStart: isPending && !isRestart,
    isLoadingRestart: isPending && isRestart,
    isPending,
  };
}
