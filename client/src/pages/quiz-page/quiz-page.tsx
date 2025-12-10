import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { QuizCompleted } from '@/features/quiz/components/QuizCompleted';
import { QuizIntro } from '@/features/quiz/components/QuizIntro';
import { useQuizQuery } from '@/features/quiz/services/useQuizQuery';
import { QuizSession } from '@/features/quiz-session';
import { useStartSessionMutation } from '@/features/quiz-session/services/useQuizSessionMutation';
import { PageLayout } from '@/layouts/page-layout';
import { useAppStore } from '@/shared/stores/appStore';
import { usePopupStore } from '@/shared/stores/popupStore.ts';

import styles from './quiz-page.module.css';

const SCREENS = {
  main: QuizIntro,
  session: QuizSession,
  finish: QuizCompleted,
};

export const QuizPage = () => {
  const setRedirectCallback = useAppStore((s) => s.setSwipeRedirectCallback);
  const openPopup = usePopupStore((state) => state.openPopup);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const [screen, setScreen] = useState('main');

  const { id } = useParams();
  const { data, error } = useQuizQuery(id!);
  const { startSession, isLoadingStart, isLoadingRestart } =
    useStartSessionMutation(id!);

  const onStartSession = (restart?: boolean) => {
    startSession({ restart }).then(() => handleSetScreen('session'));
  };

  const handleSessionBack = useCallback(() => {
    openPopup('sessionEndConfirmation', {
      onConfirm: () => setScreen('main'),
    });
  }, [openPopup]);

  const handleSetScreen = (screen: string) => {
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setScreen(screen);
    }, 300);
  };

  useEffect(() => {
    if (error) {
      openPopup('quizError', {
        text: 'Похоже такого теста не существует :(',
        overlayClose: false,
      });
    }
  }, [error, openPopup]);

  useEffect(() => {
    if (screen === 'session') {
      setRedirectCallback(handleSessionBack);
    } else if (screen === 'finish') {
      setRedirectCallback(() => setScreen('main'));
    }

    return () => {
      setRedirectCallback('default');
    };
  }, [handleSessionBack, screen, setRedirectCallback]);

  const CurrentScreen = SCREENS[screen];

  return (
    <PageLayout
      backCallback={screen === 'session' ? handleSessionBack : undefined}
      withNavigation={screen !== 'session'}
    >
      <div
        className={clsx(
          styles.container,
          isTransition && styles.containerTransition,
        )}
      >
        <CurrentScreen
          quizData={data}
          onStartSession={onStartSession}
          isLoadingStart={isLoadingStart}
          isLoadingRestart={isLoadingRestart}
          setScreen={handleSetScreen}
        />
      </div>
    </PageLayout>
  );
};
