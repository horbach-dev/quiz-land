import type { TQuizAnswer, TQuizQuestion } from '@/shared/types/quiz';

export const getDoneAnswers = (answers: TQuizAnswer[]) => {
  const serverAnswers = {};

  if (answers) {
    answers.forEach((ua) => {
      // Учитываем, что у нас пока single choice (value: submittedOptionIds[0])
      if (ua.submittedOptionIds && ua.submittedOptionIds.length > 0) {
        serverAnswers[ua.questionId] = ua.submittedOptionIds[0];
      }
    });
    return serverAnswers;
  }

  return serverAnswers;
};

export const getInitialStep = (questions: TQuizQuestion[], nextQuestionId?: string) => {
  const initialStepIndex = nextQuestionId
    ? questions.findIndex((q) => q.id === nextQuestionId)
    : 0;

  return initialStepIndex === -1 || initialStepIndex === undefined ? 0 : initialStepIndex;
};
