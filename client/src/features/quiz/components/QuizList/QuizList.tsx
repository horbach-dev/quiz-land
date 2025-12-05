import clsx from 'clsx';
import type { ReactNode } from 'react';

import { QuizCardSkeleton } from '@/features/quiz/components/QuizCard/quiz-card-skeleton';
import { IntersectingWrapper } from '@/shared/components/IntersectingWrapper';
import type { TQuiz } from '@/shared/types/quiz';

import styles from './QuizList.module.css';

interface IProps {
  view?: 'column' | 'row';
  data: TQuiz[] | undefined;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  handleLoadMore?: () => void;
  renderItem: (data: TQuiz) => ReactNode;
}

export const QuizList = ({
  view = 'column',
  data,
  handleLoadMore,
  isLoading,
  isLoadingMore,
  renderItem,
}: IProps) => {
  const isShowSkeleton = (isLoading && !data?.length) || isLoadingMore;

  return (
    <>
      <div className={clsx(styles.container, styles[`container-${view}`])}>
        {data?.map(renderItem)}
        {isShowSkeleton && (
          <>
            <QuizCardSkeleton view={view} />
            <QuizCardSkeleton view={view} />
            <QuizCardSkeleton view={view} />
            <QuizCardSkeleton view={view} />
          </>
        )}
      </div>
      {!data?.length && !isLoading && (
        <div className={styles.empty}>
          <div className={styles.emptyImage} />
          <p className={styles.emptyTitle}>Ничего не найдено</p>
        </div>
      )}
      {handleLoadMore && !isLoading && !isLoadingMore && !!data?.length && (
        <IntersectingWrapper onVisible={handleLoadMore} />
      )}
    </>
  );
};
