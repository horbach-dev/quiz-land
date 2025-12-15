import { useMemo } from 'react';

import type { TQuiz } from '@/shared/types/quiz';

import { useSessionAnswering } from '../hooks/useSessionAnswering';
import { useSessionNavigation } from '../hooks/useSessionNavigation';
import { useSessionTiming } from '../hooks/useSessionTiming';
import { useQuizSessionQuery } from '../services/useQuizSessionQuery';
import { getInitialStep } from '../utils';
import { Progress } from './Progress';
import { QuizFooter } from './QuizFooter';
import styles from './QuizSession.module.css';
import { QuizSessionStep } from './QuizSessionStep';
import { QuizSessionTimer } from './QuizSessionTimer';

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

  const { step, isTransition, goToNextStep, goToPrevStep } = useSessionNavigation({
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
          isTransition={isTransition}
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
