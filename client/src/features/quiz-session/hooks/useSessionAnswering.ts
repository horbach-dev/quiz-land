import { useCallback, useEffect, useState } from 'react';

import { getDoneAnswers } from '@/features/quiz-session/utils';
import { navigateTo } from '@/shared/utils/navigateTo.ts';

import { useCompleteSessionMutation } from '../services/useCompleteSessionMutation';
import { useSubmitAnswerMutation } from '../services/useSubmitAnswerMutation';

interface IParams {
  session: any;
  quizId: string;
  timeSpentSeconds: number;
  questionsLength: number;
}

export function useSessionAnswering({
  session,
  quizId,
  timeSpentSeconds,
  questionsLength,
}: IParams) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { submitAnswer, isPending } = useSubmitAnswerMutation();
  const { completeSession } = useCompleteSessionMutation(quizId);

  useEffect(() => {
    if (session?.userAnswers?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(getDoneAnswers(session.userAnswers));
    }
  }, [session]);

  const submit = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    async ({ step, questionId, value, goToNextStep }) => {
      if (!session.id || !questionId || isPending) return;

      // локальное обновление ответа
      setAnswers((prev) => ({ ...prev, [questionId]: value }));

      try {
        await submitAnswer({
          sessionId: session.id,
          questionId,
          timeSpentSeconds,
          submittedOptionIds: [value],
        });

        // конец теста
        if (step + 1 === questionsLength) {
          await completeSession(session.id);
          navigateTo(`/completed/${session.id}`, false);
        } else {
          goToNextStep();
        }
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log('Не удалось отправить ответ', e.message);
      }
    },
    [session.id, isPending, timeSpentSeconds, questionsLength],
  );

  return { answers, isPending, submit };
}
