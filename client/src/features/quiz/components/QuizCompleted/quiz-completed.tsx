import { useCompletedSessionQuery } from '@/features/quiz-session/services/useCompletedSessionQuery';
import { LazyImage } from '@/shared/components/LazyImage';
import type { TQuiz } from '@/shared/types/quiz.ts';
import { buildUrl } from '@/shared/utils/buildUrl';

import styles from './quiz-completed.module.css';
import { ProgressBar } from './ui/ProgressBar';

interface IProps {
  quizData: TQuiz;
}

export const QuizCompleted = ({ quizData }: IProps) => {
  const { data } = useCompletedSessionQuery(quizData.id);

  if (!data) return null;

  return (
    <div className={styles.quizCompleted}>
      <div className={styles.content}>
        <p className={styles.title}>{quizData.title}</p>
        {quizData.poster && (
          <LazyImage
            className={styles.poster}
            image={buildUrl(quizData.poster)}
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
      </div>
      {/*<Button*/}
      {/*  after={<Share2 />}*/}
      {/*  onClick={handleShare}*/}
      {/*  // onClick={handleShare}*/}
      {/*>*/}
      {/*  Поделиться результатом*/}
      {/*</Button>*/}
    </div>
  );
};
