import clsx from 'clsx';
import { Masonry } from 'masonic';
import type { ReactNode } from 'react';

import { QuizCardSkeleton } from '@/features/quiz/components/QuizCard/quiz-card-skeleton';
import { IntersectingWrapper } from '@/shared/components/IntersectingWrapper';
import type { TQuiz } from '@/shared/types/quiz';

import styles from './QuizList.module.css';

interface IProps {
  view?: 'column' | 'row';
  listKey: string;
  data: TQuiz[] | undefined;
  isLoading?: boolean;
  isLoadingMore?: boolean;
  handleLoadMore?: () => void;
  renderItem: (value: { data: TQuiz; index: number }) => ReactNode;
}

export const QuizList = ({
  listKey,
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
      {data?.length ? (
        <Masonry
          key={listKey}
          items={data}
          columnGutter={12}
          columnWidth={120}
          columnCount={2}
          overscanBy={5}
          render={renderItem}
        />
      ) : (
        <div className={clsx(styles.container, styles[`container-${view}`])}>
          {isShowSkeleton && (
            <>
              <QuizCardSkeleton view={view} />
              <QuizCardSkeleton view={view} />
              <QuizCardSkeleton view={view} />
              <QuizCardSkeleton view={view} />
            </>
          )}
        </div>
      )}
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
