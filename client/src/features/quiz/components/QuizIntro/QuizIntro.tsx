import { shareURL } from '@tma.js/sdk-react';
import { Play, RotateCcw, Share } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/Button';
import { Description } from '@/shared/components/Description';
import { LazyImage } from '@/shared/components/LazyImage';
import { APP_URL } from '@/shared/constants';
import type { TQuiz } from '@/shared/types/quiz';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './QuizIntro.module.css';
import { QuizIntroSkeleton } from './QuizIntroSkeleton';

const handleShare = (id: string, quizTitle: string) => {
  shareURL(`${APP_URL}?startapp=${id}/start`, `Пройди тест: ${quizTitle}`);
};

interface IProps {
  quizData?: TQuiz;
  isLoading: boolean;
  onStartSession: (restart?: boolean) => void;
}

export const QuizIntro = ({ quizData, onStartSession, isLoading }: IProps) => {
  const [isLoadingRestart, setIsLoadingRestart] = useState(false);
  const poster = quizData?.poster ? buildUrl(quizData.poster) : undefined;

  const handleStart = (restart: boolean) => {
    setIsLoadingRestart(restart);
    onStartSession(restart);
  };

  return (
    <div className={styles.container}>
      <LazyImage
        image={poster}
        title={quizData?.title}
      />
      {quizData ? (
        <>
          <p className={styles.title}>{quizData?.title}</p>

          {quizData?.hasActiveSession && (
            <Button
              disabled={isLoading}
              loading={isLoading && !isLoadingRestart}
              className={styles.resumeButton}
              onClick={() => handleStart(false)}
              after={<Play />}
            >
              Продолжить
            </Button>
          )}

          <div className={styles.actions}>
            {quizData?.hasActiveSession ? (
              <Button
                disabled={isLoading}
                loading={isLoading && isLoadingRestart}
                onClick={() => handleStart(true)}
                after={<RotateCcw />}
              >
                Начать заново
              </Button>
            ) : (
              <Button
                disabled={isLoading}
                loading={isLoading && !isLoadingRestart}
                onClick={() => handleStart(false)}
                after={<Play />}
              >
                Начать
              </Button>
            )}

            <Button
              disabled={isLoading}
              onClick={() => handleShare(quizData?.id, quizData?.title)}
              after={<Share />}
            >
              Поделиться
            </Button>
          </div>

          {quizData?.description && <Description text={quizData?.description} />}
        </>
      ) : (
        <QuizIntroSkeleton />
      )}
    </div>
  );
};
