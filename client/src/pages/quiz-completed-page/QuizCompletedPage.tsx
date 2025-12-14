import { shareURL } from '@tma.js/sdk-react';
import { CirclePlay, RotateCcw, Share2, Timer } from 'lucide-react';

import { useUserQuery } from '@/features/user/services/useUserQuery';
import { Button } from '@/shared/components/Button';
import { Description } from '@/shared/components/Description';
import { LazyImage } from '@/shared/components/LazyImage';
import { Time } from '@/shared/components/Time';
import { APP_URL } from '@/shared/constants';
import type { TSessionCompleted } from '@/shared/types/quiz.ts';
import { buildUrl } from '@/shared/utils/buildUrl';

import { ProgressBar } from './components/ProgressBar';
import styles from './QuizCompletedPage.module.css';

interface IProps {
  sessionData: TSessionCompleted;
}

export default function QuizCompletedPage({ sessionData }: IProps) {
  const { data: userData } = useUserQuery();

  const isCurrentUser = sessionData.userId === userData?.id;
  const questionsLength = sessionData.quiz.questions.length;
  const quizId = sessionData.quizId;
  const quizTitle = sessionData.quiz.title;
  const percentage = ((sessionData?.score || 0) / questionsLength) * 100;

  const feedback = sessionData.quiz?.resultFeedbacks?.find((i) => {
    return percentage >= Number(i.from) && percentage <= Number(i.to);
  });

  const handleShare = () => {
    shareURL(
      `${APP_URL}?startapp=${quizId}/completed`,
      `Мой результат в тесте: ${quizTitle} ${sessionData?.score} из ${questionsLength}`,
    );
  };

  return (
    <div className={styles.quizCompleted}>
      <div className={styles.content}>
        <p className={styles.title}>{quizTitle}</p>
        <div className={styles.resultHeader}>
          {sessionData.quiz?.poster && (
            <LazyImage
              className={styles.poster}
              image={buildUrl(sessionData.quiz.poster)}
              title={quizTitle}
            />
          )}
          <div className={styles.resultInfo}>
            <p className={styles.resultTitle}>
              {isCurrentUser ? 'Ваш результат' : 'Результат'}
            </p>
            <div className={styles.resultProgress}>
              <ProgressBar percentage={percentage} />
              <p className={styles.resultProgressText}>
                <span className={styles.resultTextResult}>{sessionData.score}</span>
                {' / '}
                <span className={styles.resultTextCount}>{questionsLength}</span>
              </p>
            </div>
            <div className={styles.resultTime}>
              <Timer className={styles.resultTimeIcon} />
              <Time seconds={sessionData.timeSpentSeconds} />
            </div>
          </div>
        </div>

        {isCurrentUser ? (
          <div className={styles.actions}>
            <Button
              to={`/quiz/${quizId}`}
              after={<RotateCcw />}
            >
              Повторить
            </Button>
            <Button
              after={<Share2 />}
              onClick={handleShare}
            >
              Поделиться результатом
            </Button>
          </div>
        ) : (
          <Button
            to={`/quiz/${sessionData.quiz.id}`}
            after={<CirclePlay />}
          >
            Пройти тест
          </Button>
        )}

        {feedback && <Description text={feedback.text} />}
      </div>
    </div>
  );
}
