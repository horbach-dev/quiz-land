import { shareURL } from '@tma.js/sdk-react';
import { Play, RotateCcw, Share } from 'lucide-react';

import { Button } from '@/shared/components/Button';
import { LazyImage } from '@/shared/components/LazyImage';
import { APP_URL } from '@/shared/constants';
import type { TQuiz } from '@/shared/types/quiz';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './quiz-intro.module.css';
import { QuizIntroSkeleton } from './quiz-intro-skeleton';

interface IProps {
  quizData: TQuiz | undefined;
  isLoadingStart: boolean;
  isLoadingRestart: boolean;
  onStartSession: (restart?: boolean) => void;
}

export const QuizIntro = ({
  quizData,
  onStartSession,
  isLoadingStart,
  isLoadingRestart,
}: IProps) => {
  const handleShare = () => {
    shareURL(`${APP_URL}?startapp=${quizData?.id}`, `Пройди тест: ${quizData?.title}`);
  };

  const disabled = isLoadingStart || isLoadingRestart;
  const poster = quizData?.poster ? buildUrl(quizData.poster) : undefined;

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
              disabled={disabled}
              loading={isLoadingStart}
              className={styles.resumeButton}
              onClick={() => onStartSession()}
              after={<Play />}
            >
              Продолжить
            </Button>
          )}

          <div className={styles.actions}>
            {quizData?.hasActiveSession ? (
              <Button
                disabled={disabled}
                loading={isLoadingRestart}
                onClick={() => onStartSession(true)}
                after={<RotateCcw />}
              >
                Начать заново
              </Button>
            ) : (
              <Button
                disabled={disabled}
                loading={isLoadingStart}
                onClick={() => onStartSession()}
                after={<Play />}
              >
                Начать
              </Button>
            )}
            <Button
              disabled={disabled}
              onClick={handleShare}
              after={<Share />}
            >
              Поделиться
            </Button>
          </div>

          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: quizData?.description || '' }}
          />
        </>
      ) : (
        <QuizIntroSkeleton />
      )}
    </div>
  );
};
