import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useQuizQuery } from '@/features/quiz/services/useQuizQuery';
import { useStartSessionMutation } from '@/features/quiz-session/services/useQuizSessionMutation';
import { preloadAssets } from '@/pages/quiz-page/utils';
import { useAppStore } from '@/shared/stores/appStore';
import { usePopupStore } from '@/shared/stores/popupStore';

type TScreen = 'intro' | 'session';

export const useQuizPage = () => {
  const [screen, setScreen] = useState<TScreen>('intro');
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false);
  const [isTransition, setIsTransition] = useState<boolean>(false);

  const { id } = useParams();
  const { data: quizData, error } = useQuizQuery(id!);
  const { startSession, isPending } = useStartSessionMutation(id!);

  const setRedirectCallback = useAppStore((s) => s.setSwipeRedirectCallback);
  const openPopup = usePopupStore((state) => state.openPopup);

  const handleSessionBack = useCallback(() => {
    openPopup('sessionEndConfirmation', {
      onConfirm: () => setScreen('intro'),
    });
  }, [openPopup]);

  const handleSetScreen = (screen: TScreen) => {
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setScreen(screen);
    }, 300);
  };

  const onStartSession = (restart?: boolean) => {
    if (quizData) {
      setIsLoadingAssets(true);
      preloadAssets(quizData, () => {
        startSession({ restart })
          .then(() => handleSetScreen('session'))
          .finally(() => setIsLoadingAssets(false));
      });
    }
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
    }

    return () => {
      setRedirectCallback('default');
    };
  }, [handleSessionBack, screen, setRedirectCallback]);

  return {
    quizData,
    screen,
    isTransition,
    onStartSession,
    handleSessionBack,
    isLoading: isPending || isLoadingAssets,
  };
};
