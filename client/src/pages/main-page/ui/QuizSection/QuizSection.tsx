import { CircleCheckBig } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { QuizCard } from '@/features/quiz/components/QuizCard';
import { QuizList } from '@/features/quiz/components/QuizList';
import { useQuizListQuery } from '@/features/quiz/services/useQuizListQuery';
import { Button } from '@/shared/components/Button';
import { BASE_URL } from '@/shared/constants';

import styles from './QuizSection.module.css';

export const QuizSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuizListQuery();

  return (
    <div className={styles.quizSection}>
      <div className={styles.quizList}>
        <QuizList
          listKey='main-page'
          isLoading={isLoading}
          data={data}
          renderItem={(item) => (
            <QuizCard
              key={item.id}
              image={BASE_URL + item.poster}
              title={item.title}
              link={`quiz/${item.id}`}
            />
          )}
        />
      </div>
      <div className={styles.quizAll}>
        <Button
          to='/quizzes'
          after={<CircleCheckBig />}
        >
          {t('common.all_quizzes')}
        </Button>
      </div>
    </div>
  );
};
