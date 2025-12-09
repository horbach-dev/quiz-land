import { useMutation } from '@tanstack/react-query';

import { submitAnswer } from '../api/submit-answer';

export function useSubmitAnswerMutation() {
  const { mutateAsync, isPending, error, isSuccess } = useMutation({
    mutationFn: submitAnswer,
  });

  console.log('error', error);

  return {
    submitAnswer: mutateAsync,
    isPending,
    isSuccess,
  };
}
