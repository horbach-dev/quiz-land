import { useEffect, useRef, useState } from 'react';

import type { TQuiz } from '@/shared/types/quiz';

import { updateSessionTime } from '../api/update-session-time';
import { useQuizSessionNavigation } from '../hooks/useQuizSessionNavigation';
import { useCompleteSessionMutation } from '../services/useCompleteSessionMutation';
import { useQuizSessionQuery } from '../services/useQuizSessionQuery';
import { useSubmitAnswerMutation } from '../services/useSubmitAnswerMutation';
import { getDoneAnswers, getInitialStep } from '../utils';
import { Progress } from './Progress';
import styles from './quiz-session.module.css';
import { QuizSessionStep } from './quiz-session-step';
import { QuizSessionTimer } from './quiz-session-timer';
import { QuizFooter } from './QuizFooter';

interface IProps {
  quizData: TQuiz;
  setScreen: (screen: 'main' | 'finish') => void;
}

export function QuizSession({ quizData, setScreen }: IProps) {
  const { data } = useQuizSessionQuery(quizData.id);
  const { submitAnswer } = useSubmitAnswerMutation();
  const { completeSession } = useCompleteSessionMutation(quizData.id);

  const timeSpent = useRef<number>(data?.session?.timeSpentSeconds || 0);
  const [answers, setAnswers] = useState<Record<string, string> | []>([]);

  const session = data?.session;
  const quizQuestions = quizData.questions;
  const initialStep = getInitialStep(data?.nextQuestionId as string, quizQuestions);

  useEffect(() => {
    if (!session) return;

    if (session?.userAnswers?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswers(getDoneAnswers(session.userAnswers));
    }

    return () => {
      updateSessionTime({
        sessionId: session.id,
        seconds: timeSpent.current,
      }).catch((_) => {});
    };
  }, [session]);

  const { step, isHide, goToNextStep, goToPrevStep } = useQuizSessionNavigation({
    initialStep,
    totalSteps: quizQuestions.length,
  });

  const currentQuestion = quizQuestions[step];

  if (!currentQuestion || !session) return null;

  const handleSetAnswer = async (value: string) => {
    if (!session) return;

    try {
      await submitAnswer({
        sessionId: session.id,
        questionId: currentQuestion.id,
        submittedOptionIds: [value],
        timeSpentSeconds: timeSpent.current,
      });

      if (step + 1 === quizQuestions.length) {
        completeSession(session.id).then(() => {
          setScreen('finish');
        });
      } else {
        goToNextStep();
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [currentQuestion.id]: value,
        }));
      }
    } catch (error) {
      console.error('Не удалось отправить ответ', error);
    }
  };

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
          value={currentAnswer || ''}
          setValue={handleSetAnswer}
          question={currentQuestion}
        />
      </div>
      <QuizFooter isDone={false} disabled={step === 0} onClick={goToPrevStep} />
    </div>
  );
}
