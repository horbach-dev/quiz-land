import { useMutation } from '@tanstack/react-query';
import { submitAnswer } from '../api/submit-answer';

export function useSubmitAnswerMutation() {
  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: submitAnswer,
  });

  return {
    submitAnswer: mutateAsync,
    isPending,
    isSuccess,
  };
}
