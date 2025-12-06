import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { QuizCompleted } from '@/features/quiz/components/QuizCompleted';
import { QuizIntro } from '@/features/quiz/components/QuizIntro';
import { useQuizQuery } from '@/features/quiz/services/useQuizQuery';
import { QuizSession } from '@/features/quiz-session';
import { useQuizSessionQuery } from '@/features/quiz-session/services/useQuizSessionQuery';
import { PageLayout } from '@/layouts/page-layout';
import { useAppStore } from '@/shared/store';

import styles from './quiz-page.module.css';

const SCREENS = {
  main: QuizIntro,
  session: QuizSession,
  finish: QuizCompleted,
};

export const QuizPage = () => {
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const [screen, setScreen] = useState('main');
  const { id } = useParams();
  const { data } = useQuizQuery(id!);
  const { refetch: startSession, isLoading: isSessionLoading } = useQuizSessionQuery(id!);
  const setRedirectCallback = useAppStore((s) => s.setSwipeRedirectCallback);

  useEffect(() => {
    if (screen === 'session') {
      setRedirectCallback('default');
    } else {
      setRedirectCallback('default');
    }

    return () => {
      setRedirectCallback('default');
    };
  }, [screen, setRedirectCallback]);

  const handleSetScreen = (screen: string) => {
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setScreen(screen);
    }, 300);
  };

  const handleSessionBack = () => handleSetScreen('main');
  const CurrentScreen = SCREENS[screen];

  return (
    <PageLayout
      backCallback={screen === 'session' ? handleSessionBack : undefined}
      withNavigation={screen !== 'session'}
    >
      <div className={clsx(styles.container, isTransition && styles.containerTransition)}>
        <CurrentScreen
          quizData={data}
          startSession={startSession}
          isSessionLoading={isSessionLoading}
          setScreen={handleSetScreen}
        />
      </div>
    </PageLayout>
  );
};
