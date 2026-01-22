import { Masonry } from 'masonic';
import { type ReactNode, useCallback, useMemo } from 'react';

import { QuizCardSkeleton } from '@/features/quiz/components/QuizCard/quiz-card-skeleton';
import { useQuizListQuery } from '@/features/quiz/services/useQuizListQuery.ts';
import { IntersectingWrapper } from '@/shared/components/IntersectingWrapper';
import { Loader } from '@/shared/components/Loader';
import type { TQuiz, TQuizListType } from '@/shared/types/quiz';

import styles from './QuizList.module.css';

interface IProps {
  listKey: string;
  params?: { type: TQuizListType };
  renderItem: (value: { data: TQuiz; index: number }) => ReactNode;
}

export const QuizList = ({ listKey, params = { type: 'public' }, renderItem }: IProps) => {
  const { isLoading, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useQuizListQuery(params);

  const flatData = useMemo(() => {
    return data?.pages?.flat() || [];
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !(isLoading || isFetchingNextPage)) return fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  const isShowSkeleton = isLoading && !flatData.length;
  const isShowIntersector = !!flatData?.length && !isLoading && !isFetchingNextPage;
  const isShowEmpty = !flatData?.length && !isLoading && !isFetchingNextPage;

  return (
    <div className={styles.list}>
      {!!flatData?.length && (
        <Masonry
          key={`${listKey}-${flatData.length}`}
          items={flatData}
          columnGutter={16}
          columnWidth={120}
          columnCount={2}
          overscanBy={5}
          render={renderItem}
        />
      )}

      {isShowSkeleton && (
        <div className={styles.container}>
          <QuizCardSkeleton />
          <QuizCardSkeleton />
          <QuizCardSkeleton />
          <QuizCardSkeleton />
        </div>
      )}

      {isFetchingNextPage && (
        <div className={styles.loader}>
          <Loader global={false} />
        </div>
      )}

      {isShowIntersector && (
        <IntersectingWrapper
          options={{ rootMargin: '100px' }}
          onVisible={handleLoadMore}
        >
          <div style={{ height: 1 }} />
        </IntersectingWrapper>
      )}

      {isShowEmpty && (
        <div className={styles.empty}>
          <div className={styles.emptyImage} />
          <p className={styles.emptyTitle}>Ничего не найдено</p>
        </div>
      )}
    </div>
  );
};
