import { useMemo } from 'react';

import { useSessionAnswering } from '@/features/quiz-session/hooks/useSessionAnswering';
import { useSessionTiming } from '@/features/quiz-session/hooks/useSessionTiming';
import type { TQuiz } from '@/shared/types/quiz';

import { useSessionNavigation } from '../hooks/useSessionNavigation';
import { useQuizSessionQuery } from '../services/useQuizSessionQuery';
import { getInitialStep } from '../utils';
import { Progress } from './Progress';
import styles from './quiz-session.module.css';
import { QuizSessionStep } from './quiz-session-step';
import { QuizSessionTimer } from './quiz-session-timer';
import { QuizFooter } from './QuizFooter';

interface IProps {
  quizData: TQuiz;
}

export function QuizSession({ quizData }: IProps) {
  const { data } = useQuizSessionQuery(quizData.id);

  const session = data?.session;
  const quizQuestions = quizData.questions;

  const initialStep = useMemo(() => {
    return getInitialStep(quizQuestions, data?.nextQuestionId);
  }, [quizQuestions, data?.nextQuestionId]);

  const { step, isHide, goToNextStep, goToPrevStep } = useSessionNavigation({
    initialStep,
    totalSteps: quizQuestions.length,
  });

  const { timeSpent } = useSessionTiming(session?.id, data?.session?.timeSpentSeconds);

  const { answers, submit, isPending } = useSessionAnswering({
    session,
    quizId: quizData.id,
    questionsLength: quizQuestions.length,
    timeSpentSeconds: timeSpent.current,
  });

  const currentQuestion = quizQuestions[step];

  const handleSubmitAnswer = (value: string) =>
    submit({ questionId: currentQuestion.id, value, step, goToNextStep });

  if (!currentQuestion || !session) return null;

  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Progress
          step={step}
          timer={<QuizSessionTimer timeSpent={timeSpent} />}
          length={quizQuestions.length}
        />
        <QuizSessionStep
          isHide={isHide}
          isLoading={isPending}
          value={currentAnswer || ''}
          setValue={handleSubmitAnswer}
          question={currentQuestion}
        />
      </div>
      <QuizFooter
        isDone={false}
        disabled={step === 0}
        onClick={goToPrevStep}
      />
    </div>
  );
}
