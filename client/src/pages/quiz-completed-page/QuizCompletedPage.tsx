import { CirclePlay, RotateCcw, Share2, Timer } from 'lucide-react';

import { useUserQuery } from '@/features/user/services/useUserQuery';
import { PageLayout } from '@/layouts/page-layout';
import { getTotalPoints, shareResult } from '@/pages/quiz-completed-page/utils';
import { Button } from '@/shared/components/Button';
import { Description } from '@/shared/components/Description';
import { LazyImage } from '@/shared/components/LazyImage';
import { Time } from '@/shared/components/Time';
import { ALGORITHMS_WITH_SCORE } from '@/shared/constants';
import type { TSessionCompleted } from '@/shared/types/quiz';
import { buildUrl } from '@/shared/utils/buildUrl';

import { ProgressBar } from './components/ProgressBar';
import { ResultBars } from './components/ResultBars';
import styles from './QuizCompletedPage.module.css';

interface IProps {
  sessionData: TSessionCompleted;
}

export default function QuizCompletedPage({ sessionData }: IProps) {
  const { data: userData } = useUserQuery();

  const {
    id,
    userId,
    quizId,
    score,
    feedback,
    finalCategory,
    scoringAlgorithm,
    feedbackNotice,
    categoryStatistic,
    quiz: { title: quizTitle, questions, poster },
  } = sessionData;

  const isCurrentUser = userId === userData?.id;
  const totalPoints = getTotalPoints(scoringAlgorithm, questions);
  const percentage = ((score || 0) / totalPoints) * 100;

  const isScoreAlgorithm = ALGORITHMS_WITH_SCORE.includes(scoringAlgorithm);

  return (
    <PageLayout>
      <div className={styles.container}>
        <p className={styles.title}>{quizTitle}</p>
        <div className={styles.resultHeader}>
          {poster && (
            <LazyImage
              className={styles.poster}
              image={buildUrl(poster)}
              title={quizTitle}
            />
          )}
          <div className={styles.resultInfo}>
            <p className={styles.resultTitle}>Результат</p>
            {isScoreAlgorithm ? (
              <div className={styles.resultProgress}>
                <ProgressBar
                  isPositive={sessionData.quiz.resultPositive}
                  percentage={percentage}
                />
                <p className={styles.resultProgressText}>
                  <span className={styles.resultTextResult}>{sessionData.score}</span>
                  {' / '}
                  <span className={styles.resultTextCount}>{totalPoints}</span>
                </p>
              </div>
            ) : (
              <p className={styles.resultCategory}>{finalCategory}</p>
            )}
            <div className={styles.resultTime}>
              <Timer className={styles.resultTimeIcon} />
              <Time seconds={sessionData.timeSpentSeconds} />
            </div>
          </div>
        </div>

        {!!categoryStatistic?.length && <ResultBars categoryStatistic={categoryStatistic} />}

        {feedbackNotice && <p className={styles.feedbackNotice}>{feedbackNotice}</p>}
        {feedback && <Description text={feedback} />}

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
              onClick={() =>
                shareResult({
                  sessionId: id,
                  quizTitle,
                  score: sessionData.score,
                  totalPoints,
                })
              }
            >
              Поделиться результатом
            </Button>
          </div>
        ) : (
          <Button
            to={`/quiz/${quizId}`}
            after={<CirclePlay />}
          >
            Пройти тест
          </Button>
        )}
      </div>
    </PageLayout>
  );
}
