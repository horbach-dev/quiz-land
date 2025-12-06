import { Share2 } from 'lucide-react';

import { useCompletedSessionQuery } from '@/features/quiz-session/services/useCompletedSessionQuery.ts';
import { Button } from '@/shared/components/Button';
import { LazyImage } from '@/shared/components/LazyImage';
import type { TQuiz } from '@/shared/types/quiz.ts';

import styles from './quiz-completed.module.css';
import { ProgressBar } from './ui/ProgressBar';

interface IProps {
  quizData: TQuiz;
}

export const QuizCompleted = ({ quizData }: IProps) => {
  const { data } = useCompletedSessionQuery(quizData.id);

  const handleShare = () => {};

  if (!data) return null;

  return (
    <div className={styles.quizCompleted}>
      {quizData.poster && (
        <LazyImage
          image={quizData?.poster}
          title={quizData?.title}
        />
      )}
      <p className={styles.resultTitle}>Ваш результат</p>
      <div className={styles.result}>
        <ProgressBar percentage={((data?.score || 0) / data.totalQuestions) * 100} />
        <p className={styles.resultText}>
          <span className={styles.resultTextResult}>{data.score}</span>
          {' / '}
          <span className={styles.resultTextCount}>{data.totalQuestions}</span>
          {/*{data.score} из {data.totalQuestions}*/}
        </p>
      </div>
      <Button
        after={<Share2 />}
        onClick={handleShare}
      >
        Поделиться результатом
      </Button>
    </div>
  );
};
