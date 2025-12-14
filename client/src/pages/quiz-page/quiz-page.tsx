import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { QuizIntro } from '@/features/quiz/components/QuizIntro';
import { useQuizQuery } from '@/features/quiz/services/useQuizQuery';
import { QuizSession } from '@/features/quiz-session';
import { useStartSessionMutation } from '@/features/quiz-session/services/useQuizSessionMutation';
import { PageLayout } from '@/layouts/page-layout';
import { useAppStore } from '@/shared/stores/appStore';
import { usePopupStore } from '@/shared/stores/popupStore';

import styles from './quiz-page.module.css';
import { preloadAssets } from './utils';

const SCREENS = {
  main: QuizIntro,
  session: QuizSession,
};

export default function QuizPage() {
  const setRedirectCallback = useAppStore((s) => s.setSwipeRedirectCallback);
  const openPopup = usePopupStore((state) => state.openPopup);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const [screen, setScreen] = useState('main');
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);

  const { id } = useParams();
  const { data, error } = useQuizQuery(id!);
  const { startSession, isLoadingStart, isLoadingRestart } = useStartSessionMutation(id!);

  const onStartSession = (restart?: boolean) => {
    if (data) {
      setIsLoadingImages(true);
      preloadAssets(data, () => {
        setIsLoadingImages(false);
        startSession({ restart }).then(() => handleSetScreen('session'));
      });
    }
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
      <div className={clsx(styles.container, isTransition && styles.containerTransition)}>
        <CurrentScreen
          quizData={data}
          onStartSession={onStartSession}
          isLoadingStart={isLoadingStart || isLoadingImages}
          isLoadingRestart={isLoadingRestart || isLoadingImages}
          setScreen={handleSetScreen}
        />
      </div>
    </PageLayout>
  );
}
