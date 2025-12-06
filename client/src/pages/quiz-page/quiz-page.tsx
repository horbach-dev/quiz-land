import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { QuizCompleted } from '@/features/quiz/components/QuizCompleted';
import { QuizIntro } from '@/features/quiz/components/QuizIntro';
import { useQuizQuery } from '@/features/quiz/services/useQuizQuery';
import { QuizSession } from '@/features/quiz-session';
import { useStartSessionMutation } from '@/features/quiz-session/services/useQuizSessionMutation';
import { PageLayout } from '@/layouts/page-layout';
import { useAppStore } from '@/shared/store';

import { ExitSessionConfirmation } from './components/ExitSessionConfirmation';
import styles from './quiz-page.module.css';

const SCREENS = {
  main: QuizIntro,
  session: QuizSession,
  finish: QuizCompleted,
};

export const QuizPage = () => {
  const [isConfirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const [screen, setScreen] = useState('main');

  const { id } = useParams();
  const { data } = useQuizQuery(id!);
  const { startSession, isLoadingStart, isLoadingRestart } = useStartSessionMutation(id!);
  const setRedirectCallback = useAppStore((s) => s.setSwipeRedirectCallback);

  const onStartSession = (restart?: boolean) => {
    startSession({ restart }).then(() => handleSetScreen('session'));
  };

  const handleSessionBack = () => {
    setConfirmationOpen(true);
  };

  const handleSetScreen = (screen: string) => {
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setScreen(screen);
    }, 300);
  };

  useEffect(() => {
    if (screen === 'session') {
      setRedirectCallback(handleSessionBack);
    } else if (screen === 'finish') {
      setRedirectCallback(() => setScreen('main'));
    }

    return () => {
      setRedirectCallback('default');
    };
  }, [screen, setRedirectCallback]);

  const CurrentScreen = SCREENS[screen];

  return (
    <PageLayout
      backCallback={screen === 'session' ? handleSessionBack : undefined}
      withNavigation={screen !== 'session'}
    >
      <div className={clsx(styles.container, isTransition && styles.containerTransition)}>
        <CurrentScreen
          quizData={data}
          onStartSession={onStartSession}
          isLoadingStart={isLoadingStart}
          isLoadingRestart={isLoadingRestart}
          setScreen={handleSetScreen}
        />
      </div>
      <ExitSessionConfirmation
        isOpen={isConfirmationOpen}
        onCancel={() => setConfirmationOpen(false)}
        onConfirm={() => {
          setScreen('main');
          setConfirmationOpen(false);
        }}
      />
    </PageLayout>
  );
};
